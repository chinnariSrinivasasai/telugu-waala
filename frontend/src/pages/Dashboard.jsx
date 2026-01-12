import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!user) return null;

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>

        <h1 style={styles.title}>⚡ Telugu <span>Waala</span></h1>
        <h2 style={{ ...styles.subtitle, color: "yellow" }}>Hello, {user.username} 👋</h2>
        <div style={styles.coins}>💰 Coins: {user.coins}</div>

        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)"
          }}
        >
          <Card icon="👤" title="Profile" onClick={() => navigate("/profile")} />
          <Card icon="🎯" title="Actions" onClick={() => navigate("/actions")} />
          <Card icon="🔥" title="Streak" onClick={() => navigate("/streak")} />
            <Card icon="💸" title="Withdraw" onClick={() => navigate("/withdraw")} />
          <Card icon="📜" title="History" onClick={() => navigate("/history")} />
           </div>

        <div style={styles.footer}>
          © 2026 copyrights reserved, chinnari srinivasasai
        </div>

      </div>
    </div>
  );
}

function Card({ icon, title, onClick }) {
  return (
   <div
  style={styles.card}
  onMouseEnter={e => {e.currentTarget.style.transform="translateY(-6px) scale(1.03)"}}
  onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
  onClick={onClick}
>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <b>{title}</b>
    </div>
  );
}

function MainButton({ text, color, onClick }) {
  return (
    <button style={{ ...styles.btn, background: color }} onClick={onClick}>
      {text}
    </button>
  );
}

/* STYLES */
const styles = {
  page: { minHeight: "100vh", background: "var(--bg)", color: "var(--text)" },
  container: { maxWidth: 1100, margin: "0 auto", padding: 20 },
  title: { fontSize: 36, fontWeight: "800", color: "#facc15" },
  subtitle: { fontSize: 26, marginTop: 10 },
  coins: { marginTop: 10, fontSize: 18, color: "#22c55e", fontWeight: "bold" },
  grid: { display: "grid", gap: 24, marginTop: 30 },
  card: {
    background: "linear-gradient(135deg, #6366f1, #22c55e)",
    borderRadius: 20,
    padding: "50px 20px",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  cardHover: { transform: "scale(2.05)"},
  bottom: { display: "flex", gap: 16, marginTop: 30 },
  btn: {
    padding: 16,
    borderRadius: 14,
    border: "none",
    fontSize: 18,
    fontWeight: "bold",
    cursor: "pointer",
    color: "white"
  },
  footer: { textAlign: "center", marginTop: 40, opacity: 0.9, fontSize: 12, color: "yellow", fontWeight: "bold" }
};
