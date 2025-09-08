// src/components/Leaderboard.jsx
import React, { useState } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [open, setOpen] = useState(false);

  const loadLeaderboard = () => {
    const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
    data.sort((a, b) => b.score - a.score);
    setLeaderboard(data);
  };

  return (
    <div className={`leaderboard-widget ${open ? "open" : ""}`}>
      {/* Floating toggle button */}
      <button className="leaderboard-toggle" onClick={() => setOpen(!open)}>
        {open ? "❌ Close" : "🏆 Leaderboard"}
      </button>

      {/* Collapsible Panel */}
      {open && (
        <div className="leaderboard-panel">
          <h3>🏆 Leaderboard</h3>

          <button className="reload-btn" onClick={loadLeaderboard}>
            🔄 Reload
          </button>

          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="3">No scores yet!</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.user}>
                    <td>{index + 1}</td>
                    <td>{entry.user}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
