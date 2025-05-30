const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const resend = new Resend('re_X2MytDch_QJA6Z7yohoK3fhBFRk6TpHUe'); // use your onboarding key

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  // No need to replace \n with <br> anymore!
  try {
    const data = await resend.emails.send({
  from: 'karl@360spaces.co.uk',
  to, // now dynamic!
  subject,
  html: body,
});
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Email API running on port 3001'));