import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Actions() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>🎯 Actions</h1>
        <p style={styles.subtitle}>Choose an action and earn coins</p>

        <div style={styles.grid}>
          <ActionCard
            icon="🎡"
            title="Spin & Win"
            desc="Try your luck and win coins"
            gradient="linear-gradient(135deg, #6366f1, #22c55e)"
            onClick={() => navigate("/spin")}
          />

          <ActionCard
            icon="🎟️"
            title="Scratch & Win"
            desc="Scratch and get instant coins"
            gradient="linear-gradient(135deg, #f97316, #facc15)"
            onClick={() => navigate("/scratch")}
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, gradient, onClick }) {
  return (
    <div
      style={{ ...styles.card, background: gradient }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-6px) scale(1.03)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <div style={styles.icon}>{icon}</div>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardDesc}>{desc}</div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)"
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 30
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24
  },
  card: {
    borderRadius: 22,
    padding: "50px 20px",
    color: "white",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)"
  },
  icon: {
    fontSize: 48,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  cardDesc: {
    marginTop: 6,
    opacity: 0.9
  }
};
