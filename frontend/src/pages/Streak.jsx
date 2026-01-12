import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";


export default function Streak() {
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const rewards = [20, 30, 40, 50, 60, 70, 80]; // Day1 -> Day7

  const claim = async () => {
    try {
      const res = await api.post("/streak/claim");

      const updatedUser = {
        ...user,
        coins: res.data.coins,
        loginStreak: res.data.loginStreak
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPopup({
        show: true,
        message: `🎉 You got ${res.data.reward} coins!`
      });

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Error"
      });
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Navbar />

      <h1>🔥 Login Streak</h1>

      <p>Current Streak: {user.loginStreak || 0} days</p>

      {/* Streak Grid */}
      <div style={grid}>
        {rewards.map((coins, index) => {
          const day = index + 1;

          let bg = "#e5e7eb"; // gray
          let text = "#000";

          if (day < user.loginStreak) {
            bg = "#22c55e"; // green (claimed)
            text = "#fff";
          } else if (day === user.loginStreak) {
            bg = "#facc15"; // yellow (today)
          }

          return (
            <div key={day} style={{ ...box, background: bg, color: text }}>
              <b>Day {day}</b>
              <div>{coins} coins</div>
            </div>
          );
        })}
      </div>

      <br />

    <button
  onClick={claim}
  style={claimBtn}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  🎁 Claim Today Reward
</button>
      {/* POPUP */}
      {popup.show && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>{popup.message}</h3>
            <button
              onClick={() => setPopup({ show: false, message: "" })}
              style={closeBtn}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Styles */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 15,
  marginTop: 20,
  marginBottom: 20
};

const box = {
  padding: 20,
  borderRadius: 10,
  textAlign: "center",
  fontWeight: "bold"
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const popupStyle = {
  background: "#fff",
  color: "#000",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  minWidth: "300px"
};

const closeBtn = {
  marginTop: "20px",
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  background: "#22c55e",
  fontWeight: "bold",
  cursor: "pointer"
};

const claimBtn = {
  display: "block",
  margin: "30px auto 0",
  padding: "16px 40px",
  fontSize: "20px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  color: "white",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  transition: "0.25s"
};

