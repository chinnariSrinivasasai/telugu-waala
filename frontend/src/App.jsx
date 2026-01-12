import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Spin from "./pages/Spin";
import Scratch from "./pages/Scratch";
import Withdraw from "./pages/Withdraw";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Actions from "./pages/Actions";
import Streak from "./pages/Streak";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/spin" element={<Spin />} />
      <Route path="/scratch" element={<Scratch />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/actions" element={<Actions />} />
      <Route path="/streak" element={<Streak />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
