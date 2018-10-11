const express = require('express');
const router = express.Router();
const emailService = require('./emailService');

const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Publication = require('./models/Publication');
const User = require('./models/User');
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

router.put('/publications/:id', (req, res, next) => {
  Publication.findById(req.params.id)
    .exec()
    .then(pub => {
      for (value in req.body) {
        pub[value] = req.body[value];
      };
      pub.save()
        .then(() => res.json(pub))
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

router.get('/publications/:id', (req, res, next) => {
  Publication.findOne({slug: req.params.id})
    .exec()
    .then(pub => {
      if (pub) {
        res.json(pub)
      } else {
        Publication.findById(req.params.id)
          .exec()
          .then(pub => {res.json(pub)})
          .catch(err => next(err));
        }
    })
    .catch(err => next(err));
});

router.get('/submissions', (req, res, next) => {
  Submission.find({})
    .exec()
    .then(subs => res.json(subs))
    .catch((err) => next(err));
});

router.get('/submission/:id', (req, res, next) => {
  Submission.findById(req.params.id)
    .exec()
    .then(sub => {res.json(sub)})
    .catch(err => next(err));
});

router.post('/submissions', (req, res, next) => {
  const sub = new Submission({...req.body});
  sub.save()
    .then(sub => {res.json(sub)})
    .catch((err) => next(err));
});

router.put('/:user', (req, res, next) => {
  User.findOne({username: req.params.user})
    .exec()
    .then(user => {
      user.favorites && user.favorites.length ? user.favorites.push(req.body._id) : user.favorites = [req.body._id];
      user.save()
        .then(() => res.json(user))
        .catch(err => next(err));
    })
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
