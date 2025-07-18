import React, { useState } from 'react';
import './App.css';
import ClientForm from './components/ClientForm';
import MainMenu from './components/MainMenu';
import { emailTemplates, fillTemplate } from './emailTemplates';
import { ClientDetails } from './types';
import { supabase } from './supabaseClient';

type Screen = 'menu' | 'add' | 'send' | 'search' | 'sent';

const App: React.FC = () => {
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [screen, setScreen] = useState<Screen>('menu');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<'send' | 'add' | null>(null);

  const selectedTemplate = emailTemplates.find(t => t.id === selectedTemplateId);

  // Fill template with client info
  const subject = selectedTemplate && clientDetails
    ? fillTemplate(selectedTemplate.subject, clientDetails)
    : '';
  const body = selectedTemplate && clientDetails
    ? fillTemplate(selectedTemplate.body, clientDetails)
    : '';

  const handleClientDetailsChange = (details: ClientDetails) => setClientDetails(details);
  const handleEmailTemplateChange = (id: string) => setSelectedTemplateId(id);

  const handleSend = async () => {
    if (!clientDetails || !selectedTemplate) return;
    setSending(true);
    setError(null);

    const to = clientDetails.business_email
      .split(';')
      .map((email: string) => email.trim())
      .filter((email: string) => email.length > 0);

    const copy_to = clientDetails.copy_to
      ? clientDetails.copy_to.split(';').map((email: string) => email.trim()).filter((email: string) => email.length > 0)
      : undefined;

    try {
      // Save record in Supabase
      const { error } = await supabase.from('clientcontact').insert([
        {
          ...clientDetails,
          return_date: clientDetails.return_date || null,
        }
      ]);
      if (error) throw error;

      // Send email via your backend
      const response = await fetch('https://clientcontactapp.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          cc: copy_to,
          subject,
          body,
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send email');
      }

      setLastAction('send');
      setScreen('sent');
    } catch (err: any) {
      setError(err.message || JSON.stringify(err) || 'Failed to save record or send email.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {screen === 'menu' && (
        <MainMenu
          onAddNew={() => {
            setClientDetails(null);
            setSelectedTemplateId('');
            setScreen('add');
          }}
          onSendEmail={() => {
            setClientDetails(null);
            setSelectedTemplateId('');
            setScreen('send');
          }}
          onSearch={() => setScreen('search')}
        />
      )}

      {(screen === 'add' || screen === 'send') && (
        <ClientForm
          onChange={handleClientDetailsChange}
          onNext={() => {
            if (screen === 'send') {
              handleSend();
            } else {
              if (clientDetails) {
                supabase.from('clientcontact').insert([
                  {
                    ...clientDetails,
                    return_date: clientDetails.return_date || null,
                  }
                ]).then(() => {
                  setLastAction('add');
                  setScreen('sent');
                });
              }
            }
          }}
          emailTemplates={emailTemplates}
          selectedTemplateId={selectedTemplateId}
          onTemplateChange={handleEmailTemplateChange}
          onBack={() => setScreen('menu')}
        />
      )}

      {screen === 'search' && (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Search (to be implemented)</h2>
          <button onClick={() => setScreen('menu')}>Back to Menu</button>
        </div>
      )}

      {screen === 'sent' && (
        <div style={{
          background: '#c3d82e',
          borderRadius: '16px',
          padding: '2em',
          width: 350,
          margin: '2em auto',
          fontFamily: 'sans-serif',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <h2>We have a winner</h2>
          <p>
            {lastAction === 'send'
              ? `That is now winging its way to ${clientDetails?.business_email}`
              : 'Record saved for later.'}
          </p>
          <button
            onClick={() => setScreen('menu')}
            style={{
              marginTop: 12,
              width: '100%',
              padding: '0.5em',
              background: '#fff',
              color: '#333',
              border: 'none',
              borderRadius: 3,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Main Menu
          </button>
          <button
            onClick={() => {
              setClientDetails(null);
              setSelectedTemplateId('');
              setScreen(lastAction === 'send' ? 'send' : 'add');
            }}
            style={{
              marginTop: 12,
              width: '100%',
              padding: '0.5em',
              background: '#fff',
              color: '#333',
              border: 'none',
              borderRadius: 3,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Send Another
          </button>
        </div>
      )}

      {error && (
        <div style={{
          color: 'red',
          textAlign: 'center',
          marginTop: 20,
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {sending && (
        <div style={{
          color: '#333',
          textAlign: 'center',
          marginTop: 20,
        }}>
          Sending...
        </div>
      )}
    </div>
  );
}

export default App;