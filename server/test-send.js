const { Resend } = require('resend');
const resend = new Resend('re_MJj45Fix_6Z29yK5eNn1fbMDneGsCycHt');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'karl@360spaces.co.uk',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
}).then(console.log).catch(console.error);