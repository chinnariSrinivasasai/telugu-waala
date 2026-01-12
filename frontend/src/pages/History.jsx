import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function History() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/transactions").then(res => {
      setList(res.data);
    });
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.centerWrap}>
        <div style={styles.card}>

          <h1 style={styles.title}>📜 Transaction History</h1>

          {list.length === 0 && (
            <p style={styles.empty}>No transactions yet.</p>
          )}

          {list.length > 0 && (
            <div style={styles.list}>
              {list.map((t) => (
                <div key={t._id} style={styles.item}>
                  <div style={styles.row}>
                    <div>
                      <div style={styles.type}>
                        {t.type.toUpperCase()}
                      </div>
                      <div style={styles.desc}>
                        {t.description}
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.amount,
                        color: t.coins >= 0 ? "#22c55e" : "#ef4444"
                      }}
                    >
                      {t.coins >= 0 ? `+${t.coins}` : t.coins} coins
                    </div>
                  </div>

                  <div style={styles.date}>
                    {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
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
  centerWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px"
  },
  card: {
    width: "100%",
    maxWidth: 600,
    background: "var(--card)",
    color: "var(--cardText)",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  empty: {
    textAlign: "center",
    opacity: 0.7
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  item: {
    background: "rgba(0,0,0,0.05)",
    padding: 14,
    borderRadius: 12
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10
  },
  type: {
    fontWeight: "bold",
    fontSize: 14
  },
  desc: {
    fontSize: 13,
    opacity: 0.8
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
    whiteSpace: "nowrap"
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.6
  }
};
