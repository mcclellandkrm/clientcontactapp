import React, { useState } from 'react';
import { ClientDetails } from '../types';
import logo from '../360spaces_logo.svg';

type ClientFormProps = {
  onChange: (details: ClientDetails) => void;
  onNext: () => void;
  emailTemplates: { id: string; subject: string; label: string }[]; // <-- add label here
  selectedTemplateId: string;
  onTemplateChange: (id: string) => void;
};

const initialState: ClientDetails = {
  business_name: '',
  contact_name: '',
  first_name: '',
  business_email: '',
  telephone: '',
  notes: '',
  business_type: '',
  business_location: '',
  return_date: '',
  copy_to: '', // <-- Add this line
};

const ClientForm: React.FC<ClientFormProps> = ({
  onChange,
  onNext,
  emailTemplates,
  selectedTemplateId,
  onTemplateChange
}) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange(updated);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const formContainerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 75% 70%, #ffd966 0%, #555 80%)',
    // Optionally add your background image here as well:
    // backgroundImage: 'url("https://karlmcclelland.com/sig/appbackground.jpg")',
    // backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '0',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: 16,
    padding: '0.9em',
    borderRadius: 8,
    border: 'none',
    fontSize: 18,
    background: 'rgba(255,255,255,0.18)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    outline: 'none',
    fontWeight: 400,
    letterSpacing: 0.5,
    '::placeholder': {
      color: '#e0e0e0',
      opacity: 1,
    },
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: 18,
    width: '100%',
    padding: '0.9em',
    background: 'rgba(255,255,255,0.18)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 18,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'background 0.2s',
  };

  return (
    <form
      onSubmit={handleNext}
      style={{
        ...formContainerStyle,
        alignItems: 'center',
      }}
    >
      <div style={{
        width: 350,
        background: 'rgba(80,80,80,0.45)',
        borderRadius: 18,
        padding: '2.5em 1.5em 1.5em 1.5em',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={logo} alt="360spaces Logo" style={{ height: 40, marginBottom: 24 }} />
        {/* <h2 style={{ margin: '0 0 1em 0', fontWeight: 600, color: '#fff' }}>Enter Client</h2> */}
        <input
          name="business_name"
          placeholder="Business Name"
          value={form.business_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="contact_name"
          placeholder="Contact Name"
          value={form.contact_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="business_email"
          placeholder="Email"
          value={form.business_email}
          onChange={handleChange}
          style={inputStyle}
          type="text"
          required
        />
        <input
          name="copy_to"
          placeholder="CC (semicolon separated)"
          value={form.copy_to}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="telephone"
          placeholder="Phone"
          value={form.telephone}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="business_type"
          placeholder="Business Type"
          value={form.business_type}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="business_location"
          placeholder="Business Location"
          value={form.business_location}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          name="return_date"
          placeholder="Return Date"
          value={form.return_date}
          onChange={handleChange}
          style={inputStyle}
          type="date"
        />
        
        <select
          value={selectedTemplateId}
          onChange={e => onTemplateChange(e.target.value)}
          style={inputStyle}
          required
        >
          <option value="">Choose Template</option>
          {emailTemplates.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
        <textarea
          name="notes"
          placeholder="Any notes?"
          value={form.notes}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: 60 }}
        />
        <button type="submit" style={buttonStyle}>
          add and send
        </button>
      </div>
    </form>
  );
};

export default ClientForm;