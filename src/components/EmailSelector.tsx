import React from 'react';
import { emailTemplates } from '../emailTemplates';

type EmailSelectorProps = {
  onSelect: (templateId: string) => void;
};

const EmailSelector: React.FC<EmailSelectorProps> = ({ onSelect }) => (
  <select onChange={e => onSelect(e.target.value)}>
    <option value="">Select an email template</option>
    {emailTemplates.map(t => (
      <option key={t.id} value={t.id}>{t.subject}</option>
    ))}
  </select>
);

export default EmailSelector;