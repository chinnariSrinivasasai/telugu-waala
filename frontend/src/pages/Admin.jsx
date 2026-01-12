import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const u = await api.get("/admin/users");
    const w = await api.get("/admin/withdraws");
    setUsers(u.data);
    setWithdraws(w.data);
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
    <div>
      <Navbar />
      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">🛡️ Admin Panel</h1>

        <h2 className="text-xl mt-6 mb-2">Withdraw Requests</h2>

        {withdraws.map(w => (
          <div key={w._id} className="border p-3 mb-2 rounded">
            <b>{w.user?.username}</b> — {w.amount}₹ — {w.method} — {w.account} — {w.status}

            {w.status === "pending" && (
              <div className="mt-2">
                <button className="bg-green-500 px-3 py-1 mr-2" onClick={() => approve(w._id)}>Approve</button>
                <button className="bg-red-500 px-3 py-1" onClick={() => reject(w._id)}>Reject</button>
              </div>
            )}
          </div>
        ))}

        <h2 className="text-xl mt-6 mb-2">Users</h2>

        {users.map(u => (
          <div key={u._id} className="border p-3 mb-2 rounded">
            {u.username} — Coins: {u.coins} — {u.isAdmin ? "ADMIN" : "USER"}
          </div>
        ))}

      </div>
    </div>
  );
}
