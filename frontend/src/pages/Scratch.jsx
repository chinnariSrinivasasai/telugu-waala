import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Scratch() {
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const scratchNow = async () => {
    try {
      const res = await api.post("/scratch");
      const reward = res.data.reward;

      let msg = reward === 0
        ? "😢 Better luck next time!"
        : `🎉 You won ${reward} coins!`;

      const updatedUser = { ...user, coins: res.data.coins };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPopup({ show: true, message: msg });
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Scratch failed"
      });
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>🎟️ Scratch & Win</h1>
        <div style={styles.coins}>💰 Coins: {user.coins}</div>

        <div
          style={{ ...styles.card, background: "linear-gradient(135deg, #f97316, #facc15)" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={styles.bigIcon}>🎟️</div>
          <div style={styles.cardText}>Scratch and see!</div>

          <button style={styles.actionBtn} onClick={scratchNow}>
            SCRATCH NOW
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup.show && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>{popup.message}</h2>
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

/* SAME STYLES AS SPIN */
const styles = {
  page: { minHeight: "100vh", background: "var(--bg)", color: "var(--text)" },
  container: { maxWidth: 600, margin: "0 auto", padding: 20, textAlign: "center" },
  title: { fontSize: 36, fontWeight: "800", marginBottom: 10 },
  coins: { fontSize: 18, color: "#22c55e", fontWeight: "bold", marginBottom: 20 },
  card: {
    borderRadius: 30,
    padding: "50px 20px",
    color: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },
  bigIcon: { fontSize: 80 },
  cardText: { fontSize: 22, margin: "10px 0 20px" },
  actionBtn: {
    padding: "16px 40px",
    fontSize: 20,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#020617",
    color: "white"
  }
};

const overlayStyle = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
  alignItems: "center", justifyContent: "center", zIndex: 2000
};

const popupStyle = {
  background: "var(--card)", color: "var(--cardText)",
  padding: "30px", borderRadius: "20px", textAlign: "center", minWidth: "280px"
};

const closeBtn = {
  marginTop: "20px", padding: "12px 30px", borderRadius: "999px",
  border: "none", background: "#22c55e", fontWeight: "bold", cursor: "pointer"
};
