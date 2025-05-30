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
  return_date: ''
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

  return (
    <form
      onSubmit={handleNext}
      style={{
        background: '#c3d82e',
        borderRadius: '16px',
        padding: '2em',
        width: 350,
        margin: '2em auto',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ textAlign: 'left', marginBottom: '1em' }}>
        <img src={logo} alt="360spaces Logo" style={{ height: 40, marginBottom: 10 }} />
      </div>
      <h2 style={{ margin: '0 0 1em 0', fontWeight: 600 }}>Enter Client</h2>
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
        type="email"
        required
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
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        style={{ ...inputStyle, minHeight: 60 }}
      />
      <button
        type="submit"
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
        Next
      </button>
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: 12,
  padding: '0.5em',
  borderRadius: 3,
  border: 'none',
  fontSize: 16,
  boxSizing: 'border-box'
};

export default ClientForm;