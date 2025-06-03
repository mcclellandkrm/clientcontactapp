import React from "react";

const MainMenu = ({ onAddNew, onSendEmail, onSearch }) => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #555 0%, #b6e100 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Large Rotated Logo */}
    <div
      style={{
        position: "absolute",
        left: "-50px",
        top: "0",
        fontSize: "8rem",
        fontWeight: "bold",
        color: "#fff",
        transform: "rotate(-30deg)",
        opacity: 0.15,
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      360Spaces
    </div>

    {/* Menu Buttons */}
    <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <button
        style={menuBtnStyle}
        onClick={onAddNew}
      >
        add new
      </button>
      <button
        style={menuBtnStyle}
        onClick={onSendEmail}
      >
        send email
      </button>
      <button
        style={menuBtnStyle}
        onClick={onSearch}
      >
        search for
      </button>
    </div>

    {/* Footer */}
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        color: "#b6e100",
        fontSize: "0.9rem",
        opacity: 0.7,
        zIndex: 1,
      }}
    >
      2025 © 360spaces.co.uk
    </div>
  </div>
);

const menuBtnStyle = {
  background: "#b6e100",
  color: "#222",
  border: "none",
  borderRadius: "8px",
  padding: "1rem 2.5rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  transition: "background 0.2s",
};

export default MainMenu;