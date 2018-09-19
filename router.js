const express = require('express');
const router = express.Router();
const emailService = require('./emailService');

const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Publication = require('./models/Publication');
const Submission = require('./models/Submission');
const Piece = require('./models/Piece');

router.post('/login', requireSignin, Authentication.signin);
router.post('/register', Authentication.signup);

router.get('/publications', (req, res, next) => {
  Publication.find({})
    .then(pubs => {res.json(pubs)})
    .catch((err) => next(err));
});

router.post('/publications', (req, res, next) => {
  const pub = new Publication({...req.body});
  pub.save()
    .then(pub => {res.json(pub)})
    .catch((err) => next(err));
});

router.get('/publications/:id', (req, res, next) => {
  if (typeof req.params.id === 'string') {
    Publication.find({slug: req.params.id})
      .exec()
      .then(pub => res.json(pub))
      .catch(err => next(err));
  } else {
    Publication.findById(req.params.id)
      .exec()
      .then(pub => {res.json(pub)})
      .catch(err => next(err));
  }

});

router.get('/submissions', (req, res, next) => {
  Submission.find({})
    .exec()
    .then(subs => res.json(subs))
    .catch((err) => next(err));
});

router.post('/new-user-email', (req, res, next) => {
  emailService.send({
        template: 'new-user',
        message: {
          to: req.body.email
        },
        locals: {
          name: req.body.name,
          confirmationLink: req.body.confirmationLink
        }
      })
      .then(console.log)
      .catch(console.error);
    res.json({message: 'Message Sent'});
  });

module.exports = router;
