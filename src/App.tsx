import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import { emailTemplates, fillTemplate } from './emailTemplates';
import { ClientDetails } from './types';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(''); // empty string
  const [step, setStep] = useState<'entry' | 'preview' | 'sent'>('entry');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    // Split TO and CC fields by semicolon
    const to = clientDetails.business_email
      .split(';')
      .map((email: string) => email.trim())
      .filter((email: string) => email.length > 0);

    const copy_to = clientDetails.copy_to
  ? clientDetails.copy_to.split(';').map((email: string) => email.trim()).filter((email: string) => email.length > 0)
  : undefined;

    try {
      // Save record in Supabase (as before)
      const { error } = await supabase.from('clientcontact').insert([
        {
          ...clientDetails,
          return_date: clientDetails.return_date || null,
        }
      ]);
      if (error) throw error;

      // Send email via your backend
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          cc: copy_to, // <-- use copy_to here
          subject,
          body,
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send email');
      }

      setStep('sent');
    } catch (err: any) {
      setError(err.message || JSON.stringify(err) || 'Failed to save record or send email.');
    } finally {
      setSending(false);
    }
  };

  // Utility to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      {step === 'entry' && (
        <ClientForm
          onChange={handleClientDetailsChange}
          onNext={() => setStep('preview')}
          emailTemplates={emailTemplates}
          selectedTemplateId={selectedTemplateId}
          onTemplateChange={handleEmailTemplateChange}
        />
      )}
      {step === 'preview' && clientDetails && selectedTemplate && (
        <div style={{
          background: '#c3d82e',
          borderRadius: '16px',
          padding: '2em',
          width: 350,
          margin: '2em auto',
          fontFamily: 'sans-serif',
          boxSizing: 'border-box'
        }}>
          <h2>Email Preview</h2>
          <strong>To:</strong> {clientDetails.business_email}<br />
          <strong>Subject:</strong>
          <span style={{ marginLeft: 8 }}>{subject}</span>
          <button
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={() => copyToClipboard(subject)}
            type="button"
          >Copy</button>
          <br />
          <strong>Body:</strong>
          <button
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={() => copyToClipboard(body)}
            type="button"
          >Copy</button>
          <pre style={{ background: '#fff', padding: '1em', borderRadius: 4 }}>{body}</pre>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <button
            onClick={handleSend}
            disabled={sending}
            style={{
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
            {sending ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      )}
      {step === 'sent' && (
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
          <h2>Yeoow Success!</h2>
          <p>That is now winging it's way to {clientDetails?.business_email}.</p>
          <button
            onClick={() => {
              setClientDetails(null);
              setSelectedTemplateId('welcome');
              setStep('entry');
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
            Another One?
          </button>
        </div>
      )}
    </div>
  );
};

export default App;