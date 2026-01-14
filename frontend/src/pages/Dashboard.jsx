import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Logos
  const logos = [
    "/images/logo1.png",
    "/images/logo2.png"
  ];

  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 3000);

    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, []);

  if (!user) return null;

  return (
    <div style={styles.page}>
      <Navbar />

      {/* LOGO SLIDER */}
      <div style={styles.sliderOuter}>
        <div
          style={{
            ...styles.sliderInner,
            transform: `translateX(-${logoIndex * 100}%)`
          }}
        >
          {logos.map((logo, i) => (
            <div key={i} style={styles.slide}>
              <img src={logo} alt="Telugu Waala" style={styles.logoImg} />
            </div>
          ))}
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.subtitle}>Hello, {user.username} 👋</h2>
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

/* CARD */
function Card({ icon, title, onClick }) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: 42 }}>{icon}</div>
      <b>{title}</b>
    </div>
  );
}

/* STYLES */
const styles = {
  page: { minHeight: "100vh", background: "var(--bg)", color: "var(--text)" },

  /* SLIDER */
  sliderOuter: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    overflow: "hidden"
  },

  sliderInner: {
    display: "flex",
    width: "100%",
    maxWidth: 700,
    transition: "transform 0.8s ease-in-out"
  },

  slide: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  logoImg: {
    maxWidth: "100%",
    maxHeight: 140,
    objectFit: "contain"
  },

  /* CONTENT */
  container: { maxWidth: 1100, margin: "0 auto", padding: 20 },

  subtitle: { fontSize: 26, marginTop: 10, color: "#facc15" },

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
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
  },

  footer: {
    textAlign: "center",
    marginTop: 50,
    opacity: 0.9,
    fontSize: 12,
    color: "#facc15",
    fontWeight: "bold"
  }
};
