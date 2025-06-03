import React from 'react';

type MainMenuProps = {
  onAddNew: () => void;
  onSendEmail: () => void;
  onSearch: () => void;
};

const MainMenu: React.FC<MainMenuProps> = ({ onAddNew, onSendEmail, onSearch }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: `url('https://karlmcclelland.com/contactapp/app_screen_1.png') center center / cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '0 0 8vh 8vw',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2em',
        marginBottom: '2em',
        width: 260,
      }}>
        <button
          style={menuButtonStyle}
          onClick={onAddNew}
        >
          Add New Contact
        </button>
        <button
          style={menuButtonStyle}
          onClick={onSendEmail}
        >
          Send Templated Email
        </button>
        <button
          style={menuButtonStyle}
          onClick={onSearch}
        >
          Search fo Contact
        </button>
      </div>
    </div>
  );
};

const menuButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '1em',
  borderRadius: 10,
  border: 'none',
  background: 'rgba(255,255,255,0.55)',
  color: '#333',
  fontWeight: 400,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'background 0.2s',
  textAlign: 'left',
};

export default MainMenu;