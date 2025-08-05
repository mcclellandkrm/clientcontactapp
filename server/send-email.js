app.post('/send-email', async (req, res) => {
  const { to, subject, body, cc } = req.body;
  
  // Add debugging
  console.log('=== EMAIL REQUEST ===');
  console.log('API Key exists:', !!process.env.RESEND_API_KEY);
  console.log('To:', to);
  console.log('CC:', cc);
  console.log('Subject:', subject);
  console.log('From: karl@360spaces.co.uk');
  
  try {
    const data = await resend.emails.send({
      from: 'karl@360spaces.co.uk',
      to,
      cc: cc && cc.length ? cc : undefined,
      subject,
      html: body,
    });
    
    console.log('✅ Resend SUCCESS:', data);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.log('❌ Resend ERROR:', err.message);
    console.log('Full error:', err);
    res.status(500).json({ error: err.message });
  }
});