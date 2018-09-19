const Email = require('email-templates');
const path = require('path');

const emailService = new Email({
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(__dirname, 'client/build')
    }
  },
  message: {
    from: '"subtrack" <no-reply@phrasemagazine.com>'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: {
    jsonTransport: true
  }
});

module.exports = emailService;
