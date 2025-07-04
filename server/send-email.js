const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY); // use environment variable

const app = express();
app.use(cors({
  origin: 'https://magical-beignet-f0bfea.netlify.app'
}));
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, body, cc } = req.body;
  // No need to replace \n with <br> anymore!
  try {
    const data = await resend.emails.send({
  from: 'karl@360spaces.co.uk',
  to,
  cc: cc && cc.length ? cc : undefined, // only include if provided
  subject,
  html: body,
});
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Email API running on port 3001'));