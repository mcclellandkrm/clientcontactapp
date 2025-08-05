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
          className="menu-btn"
          onClick={onAddNew}
        >
          Add New Contact
        </button>
        <button
          className="menu-btn"
          onClick={onSendEmail}
        >
          Send Templated Email
        </button>
        <button
          className="menu-btn"
          onClick={onSearch}
        >
          Search for Contact
        </button>
      </div>
    </div>
  );
};

export default MainMenu;