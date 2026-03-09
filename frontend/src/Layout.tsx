import { NavLink, Outlet } from "react-router-dom";

const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: "white",
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  backgroundColor: isActive ? "#334155" : "transparent",
  fontWeight: 600,
});

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", color: "white" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 20px",
          borderBottom: "1px solid #1e293b",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "1.8rem", fontWeight: 700, marginRight: "12px" }}>
          OfferRoute
        </div>

        <NavLink to="/" end style={getLinkStyle}>
          Accueil
        </NavLink>

        <NavLink to="/search" style={getLinkStyle}>
          Recherche
        </NavLink>

        <NavLink to="/tracker" style={getLinkStyle}>
          Suivi
        </NavLink>

        <NavLink to="/companies" style={getLinkStyle}>
          Entreprises
        </NavLink>

        <NavLink to="/stats" style={getLinkStyle}>
          Stats
        </NavLink>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}