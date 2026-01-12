import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Withdraw() {
  const [coins, setCoins] = useState("");
  const [method, setMethod] = useState("upi");
  const [account, setAccount] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const submitWithdraw = async () => {
    try {
      const c = parseInt(coins);

      if (!c || c < 1000) {
        return setPopup({
          show: true,
          message: "Minimum withdraw is 1000 coins (₹10)"
        });
      }

      if (!account) {
        return setPopup({
          show: true,
          message: "Please enter UPI ID or Paytm number"
        });
      }

      await api.post("/withdraw", {
        coins: c,
        method,
        account
      });

      setPopup({
        show: true,
        message: "✅ Withdraw request submitted successfully!"
      });

      setCoins("");
      setAccount("");
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Withdraw failed"
      });
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.centerWrap}>
        <div style={styles.card}>

          <h1 style={styles.title}>💸 Withdraw</h1>
          <p style={styles.subtitle}>Convert your coins into real money</p>

          <div style={styles.infoBox}>
            <div style={styles.coinsText}>💰 Your Coins: {user.coins}</div>
            <div style={styles.smallText}>100 coins = ₹1</div>
            <div style={styles.smallText}>Minimum withdraw = 1000 coins (₹10)</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Coins to withdraw</label>
            <input
              type="number"
              placeholder="Eg: 1000"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Withdraw method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={styles.input}
            >
              <option value="upi">UPI</option>
              <option value="paytm">Paytm</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              {method === "upi" ? "UPI ID" : "Paytm Number"}
            </label>
            <input
              type="text"
              placeholder={method === "upi" ? "example@upi" : "Enter Paytm number"}
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={submitWithdraw} style={styles.submitBtn}>
            Submit Withdraw Request
          </button>

        </div>
      </div>

      {/* POPUP */}
      {popup.show && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>{popup.message}</h3>
            <button
              onClick={() => setPopup({ show: false, message: "" })}
              style={styles.popupBtn}
            >
              OK
            </button>
          </div>
        </div>
      )}
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
  centerWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px"
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "var(--card)",
    color: "var(--cardText)",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
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
  infoBox: {
    background: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    marginBottom: 25
  },
  coinsText: {
    fontWeight: "bold",
    color: "#22c55e"
  },
  smallText: {
    fontSize: 13,
    opacity: 0.7
  },
  field: {
    marginBottom: 14
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: 4
  },
  input: {
    width: "90%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 16
  },
  submitBtn: {
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
    color: "#000",
    padding: 24,
    borderRadius: 12,
    textAlign: "center",
    minWidth: 280
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
