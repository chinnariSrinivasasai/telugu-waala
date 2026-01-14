import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const u = await api.get("/admin/users");
    const w = await api.get("/admin/withdraws");
    setUsers(u.data);
    setWithdraws(w.data);
    setLoading(false);
  };

  const approve = async (id) => {
    await api.post("/admin/withdraw/approve/" + id);
    load();
  };

  const reject = async (id) => {
    await api.post("/admin/withdraw/reject/" + id);
    load();
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>

        <h1 style={styles.title}>🛡️ Admin Panel</h1>

        {loading && <p>Loading...</p>}

        {/* ================= WITHDRAWS ================= */}
        <h2 style={styles.sectionTitle}>💸 Withdraw Requests</h2>

        {withdraws.length === 0 && (
          <div style={styles.empty}>No withdraw requests.</div>
        )}

        {withdraws.map((w) => (
          <div key={w._id} style={styles.card}>
            <div style={styles.row}>
              <b>User:</b> {w.user?.username || "Deleted User"}
            </div>
            <div style={styles.row}>
              <b>Amount:</b> ₹{w.amount}
            </div>
            <div style={styles.row}>
              <b>Method:</b> {w.method}
            </div>
            <div style={styles.row}>
              <b>Account:</b> {w.account}
            </div>
            <div style={styles.row}>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    w.status === "approved"
                      ? "#22c55e"
                      : w.status === "rejected"
                      ? "#ef4444"
                      : "#facc15",
                  fontWeight: "bold"
                }}
              >
                {w.status.toUpperCase()}
              </span>
            </div>

            {w.status === "pending" && (
              <div style={styles.actionRow}>
                <button
                  style={{ ...styles.btn, background: "#22c55e" }}
                  onClick={() => approve(w._id)}
                >
                  ✅ Approve
                </button>
                <button
                  style={{ ...styles.btn, background: "#ef4444" }}
                  onClick={() => reject(w._id)}
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </div>
        ))}

        {/* ================= USERS ================= */}
        <h2 style={styles.sectionTitle}>👥 Users</h2>

        {users.length === 0 && (
          <div style={styles.empty}>No users found.</div>
        )}

        {users.map((u) => (
          <div key={u._id} style={styles.userCard}>
            <div>
              <b>{u.username}</b>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{u.email}</div>
            </div>

            <div>
              💰 Coins: <b style={{ color: "#22c55e" }}>{u.coins}</b>
            </div>

            <div
              style={{
                fontWeight: "bold",
                color: u.isAdmin ? "#facc15" : "#60a5fa"
              }}
            >
              {u.isAdmin ? "ADMIN" : "USER"}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)"
  },

  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 20
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 22,
    marginTop: 40,
    marginBottom: 16,
    borderBottom: "1px solid #334155",
    paddingBottom: 6
  },

  empty: {
    opacity: 0.7,
    fontStyle: "italic"
  },

  card: {
    background: "linear-gradient(135deg, #0f172a, #020617)",
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  },

  row: {
    marginBottom: 6
  },

  actionRow: {
    display: "flex",
    gap: 12,
    marginTop: 12
  },

  btn: {
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
    color: "black"
  },

  userCard: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
  }
};
