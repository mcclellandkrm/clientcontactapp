const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({
  origin: 'https://clientcontact-v2.netlify.app'
}));
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, body, cc } = req.body;
  
  console.log('=== EMAIL REQUEST ===');
  console.log('To:', to);
  console.log('Subject:', subject);
  
  try {
    // Use Gmail SMTP (simpler setup)
    const transporter = nodemailer.createTransport({  // ← Remove the 'er'
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      cc,
      subject,
      html: body,
      replyTo: 'karl@360spaces.co.uk'
    });
    
    console.log('✅ Email sent successfully');
    res.status(200).json({ success: true });
  } catch (err) {
    console.log('❌ Email error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Email API running on port ${PORT}`));