import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: "white",
  background: isActive ? "#334155" : "transparent",
});

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "white" }}>
      <header
        style={{
          display: "flex",
          gap: 8,
          padding: 16,
          borderBottom: "1px solid #1f2a44",
          alignItems: "center",
        }}
      >
        <strong style={{ marginRight: 12 }}>OfferRoute</strong>
        <NavLink to="/" style={linkStyle} end>
          Accueil
        </NavLink>
        <NavLink to="/search" style={linkStyle}>
          Recherche
        </NavLink>
        <NavLink to="/tracker" style={linkStyle}>
          Suivi
        </NavLink>
        <NavLink to="/companies" style={linkStyle}>
          Entreprises
        </NavLink>
        <NavLink to="/stats" style={linkStyle}>
          Stats
        </NavLink>

        <div style={{ marginLeft: "auto", opacity: 0.8, fontSize: 12 }}>
          Version MVP
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}