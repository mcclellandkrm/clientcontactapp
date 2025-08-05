import React from 'react';
import { ClientDetails } from '../types';

type SendEmailButtonProps = {
  onSendEmail: () => void;
  clientDetails: ClientDetails | null;
  selectedTemplate: { subject: string; body: string } | undefined;
};

const SendEmailButton: React.FC<SendEmailButtonProps> = ({ onSendEmail }) => (
  <button onClick={onSendEmail}>Send Email</button>
);

export default SendEmailButton;