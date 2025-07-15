const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

const corsOptions = {
  origin: 'https://magical-beignet-f0bfea.netlify.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('/send-email', cors(corsOptions)); // Handle preflight

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, body, cc } = req.body;
  try {
    const data = await resend.emails.send({
      from: 'karl@360spaces.co.uk',
      to,
      cc: cc && cc.length ? cc : undefined,
      subject,
      html: body,
    });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use the port provided by Render or default to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Email API running on port ${PORT}`));