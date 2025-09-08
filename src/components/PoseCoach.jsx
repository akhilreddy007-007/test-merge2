// src/components/PoseCoach.jsx
import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";

function PoseCoach() {
  const [exercise, setExercise] = useState("bicep");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const [challengeTime, setChallengeTime] = useState(30);
  const [challengeActive, setChallengeActive] = useState(false);

  // --- Speak
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }

  // --- Timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (challengeActive && t + 1 >= challengeTime) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setChallengeActive(false);
            speak(`Challenge over! You did ${count} reps`);
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, challengeActive, challengeTime, count]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Rep counters
  const leftReps = useRef(0);
  const rightReps = useRef(0);
  const squatReps = useRef(0);
  const leftArmUp = useRef(false);
  const rightArmUp = useRef(false);
  const squatDown = useRef(false);

  // --- Angle calculator
  function calculateAngle(a, b, c) {
    const AB = { x: a.x - b.x, y: a.y - b.y };
    const CB = { x: c.x - b.x, y: c.y - b.y };

    let dot = AB.x * CB.x + AB.y * CB.y;
    let magAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
    let magCB = Math.sqrt(CB.x * CB.x + CB.y * CB.y);

    let angle = Math.acos(dot / (magAB * magCB));
    return (angle * 180) / Math.PI;
  }

  function drawAngle(ctx, landmark, angle, color) {
    ctx.fillStyle = color;
    ctx.font = "10px Arial";
    ctx.fillText(
      `${Math.round(angle)}°`,
      landmark.x * ctx.canvas.width,
      landmark.y * ctx.canvas.height
    );
  }

  // --- Save reps to leaderboard
  function updateLeaderboard(newCount) {
    const user = localStorage.getItem("loggedUser");
    if (!user) return;

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const existing = leaderboard.find((entry) => entry.user === user);

    if (existing) {
      existing.score = Math.max(existing.score, newCount); // ✅ keep best score
    } else {
      leaderboard.push({ user, score: newCount });
    }

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }

  // --- Count reps
  function countExercise(angle, side, exercise) {
    let newCount = count;

    if (exercise === "bicep") {
      if (side === "left") {
        if (angle > 150) leftArmUp.current = false;
        if (angle < 50 && !leftArmUp.current) {
          leftReps.current += 1;
          leftArmUp.current = true;
          newCount = leftReps.current + rightReps.current;
          setCount(newCount);
        }
      } else {
        if (angle > 150) rightArmUp.current = false;
        if (angle < 50 && !rightArmUp.current) {
          rightReps.current += 1;
          rightArmUp.current = true;
          newCount = leftReps.current + rightReps.current;
          setCount(newCount);
        }
      }
    } else if (exercise === "squat") {
      if (angle < 90 && !squatDown.current) {
        squatReps.current += 1;
        squatDown.current = true;
        newCount = squatReps.current;
        setCount(newCount);
      }
      if (angle > 160) squatDown.current = false;
    }

    if (newCount > 0 && newCount % 10 === 0) {
      speak(`${newCount} completed!`);
    }

    // ✅ Save to leaderboard
    updateLeaderboard(newCount);
  }

  // --- Mediapipe
  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 2,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
        radius: 2.5,
      });

      const landmarks = results.poseLandmarks;

      if (exercise === "squat") {
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const leftAnkle = landmarks[27];
        if (leftHip && leftKnee && leftAnkle) {
          const leftLegAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
          drawAngle(canvasCtx, leftKnee, leftLegAngle, "purple");
          countExercise(leftLegAngle, "left", exercise);
        }

        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];
        const rightAnkle = landmarks[28];
        if (rightHip && rightKnee && rightAnkle) {
          const rightLegAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
          drawAngle(canvasCtx, rightKnee, rightLegAngle, "orange");
          countExercise(rightLegAngle, "right", exercise);
        }
      } else if (exercise === "bicep") {
        const leftShoulder = landmarks[11];
        const leftElbow = landmarks[13];
        const leftWrist = landmarks[15];
        if (leftShoulder && leftElbow && leftWrist) {
          const leftAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
          drawAngle(canvasCtx, leftElbow, leftAngle, "blue");
          countExercise(leftAngle, "left", exercise);
        }

        const rightShoulder = landmarks[12];
        const rightElbow = landmarks[14];
        const rightWrist = landmarks[16];
        if (rightShoulder && rightElbow && rightWrist) {
          const rightAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
          drawAngle(canvasCtx, rightElbow, rightAngle, "red");
          countExercise(rightAngle, "right", exercise);
        }
      }
    }
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start().then(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }
      });
    }
  }, []);

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setTime(0);
    setCount(0);
    leftReps.current = 0;
    rightReps.current = 0;
    squatReps.current = 0;
    squatDown.current = false;
    leftArmUp.current = false;
    rightArmUp.current = false;
    setIsRunning(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏋️ Pose Coach</h1>
      </header>

      <div className="controls">
        <label>Select Exercise: </label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option value="bicep">💪 Bicep Curls</option>
          <option value="squat">🦵 Squats</option>
        </select>

        <label style={{ marginLeft: "1rem" }}>⏱️ Challenge Time: </label>
        <input
          type="number"
          value={challengeTime}
          onChange={(e) => setChallengeTime(Number(e.target.value))}
          style={{ width: "60px", marginLeft: "0.5rem" }}
        />{" "}
        seconds

        <button
          id="b"
          onClick={() => {
            setChallengeActive(true);
            setIsRunning(true);
            setTime(0);
            setCount(0);
            speak(`Challenge started for ${challengeTime} seconds!`);
          }}
        >
          Start Challenge
        </button>
      </div>

      <div className="dashboard">
        <div className="counter">
          <h2>
            Reps: <span>{count}</span>
          </h2>
        </div>
        <div className="timer">
          <h2>
            Time: <span>{time}s</span>
          </h2>
        </div>
      </div>

      <div className="video-container">
        <video ref={videoRef} className="input-video" autoPlay></video>
        <canvas ref={canvasRef} className="output-canvas"></canvas>
      </div>

      <div className="buttons">
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default PoseCoach;
