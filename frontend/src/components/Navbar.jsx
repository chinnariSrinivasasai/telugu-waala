import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = JSON.parse(localStorage.getItem("user"));

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load theme
  useEffect(() => {
    const t = localStorage.getItem("theme");
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const NavButton = ({ children, onClick }) => (
    <button
      onClick={onClick}
      style={styles.navBtn}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#facc15",e.currentTarget.style.color = "black")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = "white")}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* TOP BAR */}
      <div style={styles.topbar}>
        <div style={styles.inner}>

          {/* LOGO */}
          <div
            onClick={() => navigate("/dashboard")}
            style={styles.logo}
          >
            <div style={styles.icon}>⚡</div>
            <span>Telugu Waala</span>
          </div>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <div style={styles.menu}>
              <NavButton onClick={() => navigate("/dashboard")}>🏠 Home</NavButton>

              {user?.isAdmin && (
                <NavButton onClick={() => navigate("/admin")}>🛡️ Admin</NavButton>
              )}

              <NavButton onClick={toggleTheme}>
                {dark ? "🌞 Light" : "🌙 Dark"}
              </NavButton>

              <NavButton onClick={logout}>🚪 Logout</NavButton>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <button onClick={() => setOpen(true)} style={styles.hamburger}>
              ☰
            </button>
          )}

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobile && (
        <div
          style={{
            ...styles.drawer,
            transform: open ? "translateX(0)" : "translateX(100%)"
          }}
        >
          <div style={styles.drawerHeader}>
            <b>Menu</b>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div style={styles.drawerBody}>
            <NavButton onClick={() => { navigate("/dashboard"); setOpen(false); }}>
              🏠 Home
            </NavButton>

            {user?.isAdmin && (
              <NavButton onClick={() => { navigate("/admin"); setOpen(false); }}>
                🛡️ Admin
              </NavButton>
            )}

            <NavButton onClick={toggleTheme}>
              {dark ? "🌞 Light" : "🌙 Dark"}
            </NavButton>

            <NavButton onClick={logout}>🚪 Logout</NavButton>
          </div>
        </div>
      )}
    </>
  );
}

/* STYLES */
const styles = {
  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#020617",
    color: "white",
    borderBottom: "1px solid #1e293b"
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  icon: {
    width: 32,
    height: 32,
    background: "#facc15",
    color: "black",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  navBtn: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
  },
  hamburger: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer"
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: "260px",
    background: "#020617",
    color: "white",
    transition: "0.3s",
    zIndex: 2000,
    display: "flex",
    flexDirection: "column"
  },
  drawerHeader: {
    padding: "16px",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    justifyContent: "space-between"
  },
  drawerBody: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
};
