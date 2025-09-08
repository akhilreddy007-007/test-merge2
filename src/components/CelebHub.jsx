import React, { useState } from "react";
import "./CelebHub.css"; // ✅ we'll add some styling

const celebs = [
  {
    name: "Cristiano Ronaldo ⚽",
    img: "/assets/cristaiano.jpg",
    workout: [
      "Warm-up: 15 min cardio",
      "Core: Plank (3x60s), Crunches (3x20)",
      "Legs: Squats (4x15), Lunges (3x20)",
      "Upper body: Pushups (4x20), Pullups (3x10)"
    ],
    diet: [
      "Breakfast: Egg whites, avocado toast",
      "Snack: Protein shake, fruit",
      "Lunch: Grilled chicken + salad",
      "Dinner: Fish + veggies"
    ]
  },
  {
    name: "Virat Kohli 🏏",
    img: "/assets/virat.jpg",
    workout: [
      "Cardio: Treadmill sprints 20 min",
      "Strength: Deadlifts (4x10), Bench press (4x10)",
      "Core: Hanging leg raises (3x15)"
    ],
    diet: [
      "Breakfast: Oats + almond milk",
      "Snack: Nuts + fruits",
      "Lunch: Lean meat + quinoa",
      "Dinner: Paneer / Fish + greens"
    ]
  },
  {
    name: "Arnold Schwarzenegger 💪",
    img: "/assets/arnold.jpg",
    workout: [
      "Chest: Bench press (5x10), Flys (4x12)",
      "Back: Pullups (5x12), Rows (4x12)",
      "Arms: Bicep curls (5x15), Tricep dips (4x12)",
      "Legs: Squats (5x15)"
    ],
    diet: [
      "Breakfast: Oatmeal + eggs",
      "Snack: Protein shake",
      "Lunch: Chicken + rice",
      "Dinner: Steak + broccoli"
    ]
},
  {
    name: "Dwayne Johnson 🪨 (The Rock)",
    img: "/assets/rock.jpg",
    workout: [
      "Warm-up: 30 min cardio",
      "Chest/Back: Incline press (5x12), Rows (4x12)",
      "Legs: Leg press (5x15), Lunges (4x20)",
      "Shoulders/Arms: Shoulder press (4x12), Curls (4x12)"
    ],
    diet: [
      "Breakfast: Eggs + oatmeal + fruit",
      "Snack: Protein shake",
      "Lunch: Chicken breast + rice + broccoli",
      "Dinner: Salmon + veggies + sweet potato"
    ]
  },
  {
    name: "Hrithik Roshan 🎬",
    img: "/assets/hrithik.jpg",
    workout: [
      "Warm-up: Cycling 15 min",
      "Strength: Deadlifts (4x8), Bench press (4x12)",
      "Core: Hanging leg raises (3x15), Plank (3x60s)",
      "Cardio: HIIT 20 min"
    ],
    diet: [
      "Breakfast: Egg whites + avocado + fruits",
      "Snack: Almonds + protein shake",
      "Lunch: Grilled chicken + brown rice",
      "Dinner: Fish + steamed veggies"
    ]
  },
  {
  name: "Bruce Lee",
  img: "/assets/bruce.jpg",
  workout: [
    "💪 Morning: 2 hours martial arts + speed training",
    "🏋️ Strength: Circuit training with weights",
    "🥊 Combat drills + Wing Chun practice",
    "🧘 Flexibility + core conditioning",
  ],
  diet: [
    "🍚 Rice + vegetables + lean beef/chicken",
    "🥛 Protein shakes with eggs",
    "🥗 Leafy greens + fruits",
    "❌ No refined flour, avoided baked goods",
  ]
},
{
    name: "MS Dhoni 🏏",
    img: "/assets/dhoni.jpg",
    workout: ["Running & endurance drills", "Strength training", "Agility practice"],
    diet: ["Balanced diet with lean proteins", "Plenty of fruits & vegetables", "Hydration-focused"]
  },
  {
    name: "Mike Tyson 🥊",
    img: "/assets/mike.jpg",
    workout: ["Boxing drills (daily)", "Strength & Conditioning", "Core exercises"],
    diet: ["High-protein meals", "Minimal processed food", "Focus on raw vegetables & meat"]
  },
  {
    name: "Lionel Messi ⚽",
    img: "/assets/messi.jpg",
    workout: ["Agility & sprint drills", "Ball control exercises", "Strength training"],
    diet: ["Mediterranean diet", "Fresh fruits & vegetables", "Avoid sugar & processed food"]
  }
];

function CelebHub() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="celeb-hub">
      <h1>🌟 Celebrity Fitness Hub</h1>
      <p>Click a celebrity to explore their workout & diet plan</p>

      <div className="celeb-grid">
        {celebs.map((celeb, idx) => (
          <div
            key={idx}
            className="celeb-card"
            onClick={() => setSelected(celeb)}
          >
            <img src={celeb.img} alt={celeb.name} />
            <h3>{celeb.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="close-btn" onClick={() => setSelected(null)}>
              ✖
            </button>
            <h2>{selected.name}</h2>

            <h3>🏋️ Workout Plan</h3>
            <ul>
              {selected.workout.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3>🥗 Diet Plan</h3>
            <ul>
              {selected.diet.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CelebHub;
