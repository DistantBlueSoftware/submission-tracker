const express = require('express');
const router = express.Router();
const emailService = require('./emailService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const postStripeCharge = (res, user) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}
router.post('/save-stripe-token', function (req, res, next) {
  const { token, amount, user } = req.body;
  const convertedAmount = amount * 100;
  if (!token) {
    res.status(500).send({error: 'Error: payment info not valid or not provided.'});
    return;
  }
  stripe.charges.create({
    source: token.id, 
    amount: convertedAmount, 
    currency: 'usd',
  }, postStripeCharge(res, user))
});

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
  Publication.findOne({slug: req.params.id})
    .exec()
    .then(pub => {
      if (pub) {
        //don't try to update id
        delete req.body._id;
        for (value in req.body) {
          pub[value] = req.body[value];
        };
        pub.save()
          .then(() => res.json(pub))
          .catch(err => next(err));
      } else {
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
      }
      
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

router.get('/submissions/:id', (req, res, next) => {
  Submission.findById(req.params.id)
    .exec()
    .then(sub => {res.json(sub)})
    .catch(err => next(err));
});

router.put('/submissions/:id', (req, res, next) => {
  Submission.findOne({title: req.params.id})
    .exec()
    .then(sub => {
      if (sub) {
        for (value in req.body) {
          sub[value] = req.body[value];
        };
        sub.save()
          .then(() => res.json(sub))
          .catch(err => next(err));
      } else {
          Submission.findById(req.params.id)
          .exec()
          .then(sub => {
            for (value in req.body) {
              sub[value] = req.body[value];
            };
            sub.save()
              .then(() => res.json(sub))
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
      
    })
    .catch(err => next(err));

});

router.post('/submissions', (req, res, next) => {
  const sub = new Submission({...req.body});
  sub.save()
    .then(sub => {res.json(sub)})
    .catch((err) => next(err));
});

router.put('/:user/favorites', (req, res, next) => {
  User.findOne({username: req.params.user})
    .exec()
    .then(user => {
      user.favorites.push(req.body._id || req.body.slug);
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
