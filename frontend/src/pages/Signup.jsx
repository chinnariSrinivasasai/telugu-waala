import { useState } from "react";
import api from "../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });

  const submit = async () => {
    try {
      await api.post("/auth/signup", { username, email, password });
      setPopup({ show: true, message: "✅ Account created! You can login now." });
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Signup failed"
      });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.centerWrap}>
        <div style={styles.card}>

          <h1 style={styles.title}>⚡ Telugu Waala</h1>
          <p style={styles.subtitle}>Create your account</p>

          <div style={styles.field}>
            <input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={submit} style={styles.mainBtn}>
            Create Account
          </button>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => window.location.href = "/"}>
              Login
            </span>
          </p>

        </div>
      </div>

      {popup.show && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>{popup.message}</h3>
            <button style={styles.popupBtn} onClick={() => setPopup({ show: false, message: "" })}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #020617)",
    color: "white"
  },
  centerWrap: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#0f172a",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 4
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 20
  },
  field: {
    marginBottom: 12
  },
  input: {
    width: "80%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    fontSize: 15
  },
  mainBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 999,
    border: "none",
    fontSize: 16,
    fontWeight: "bold",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#000",
    cursor: "pointer",
    marginTop: 10
  },
  bottomText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 14
  },
  link: {
    color: "#22c55e",
    fontWeight: "bold",
    cursor: "pointer"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  popup: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    textAlign: "center",
    minWidth: 260,
    color: "#000"
  },
  popupBtn: {
    marginTop: 16,
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#22c55e",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
