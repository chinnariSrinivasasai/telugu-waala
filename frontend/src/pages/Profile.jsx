import Navbar from "../components/Navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>👤 My Profile</h1>

        <div style={styles.card}>
          <Row label="Username" value={user.username} />
          <Row label="Email" value={user.email} />
          <Row label="User ID" value={user._id} />
          <Row label="Status" value="Active" />
          <Row label="Coins" value={user.coins} />
          <Row label="Login Streak" value={`${user.loginStreak || 0} days`} />
        </div>

        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
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
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20
  },
  card: {
    background: "var(--card)",
    color: "var(--cardText)",
    borderRadius: 20,
    padding: 24,
    textAlign: "left",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    marginBottom: 30
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(0,0,0,0.1)"
  },
  label: {
    fontWeight: "bold",
    opacity: 0.8
  },
  value: {
    fontWeight: "600"
  },
  logoutBtn: {
    padding: "14px 28px",
    borderRadius: 999,
    border: "none",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    background: "#ef4444",
    color: "white"
  }
};
