// const router = require('express').Router();
// const { Workout, User } = require('../models');
// const withAuth = require('../utils/auth');

// // Use withAuth middleware to prevent access to route
// router.get('/', async(req, res) => {
//     try {
//         console.log("this is session", req.session)
//             // Find the logged in user based on the session ID
//         if (!req.session.user_id) return res.redirect('/login');
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
        
//         });
//         console.log(userData)
//         const user = userData.get({ plain: true });
//         // console.log(user)
//         res.render('profile', {
//             backgroundImage: "/Images/landing.jpg",
//             ...user,
//             user_id: req.session.user_id,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



// router.get('/workout/:id', async(req, res) => {
//     try {
//         const workoutData = await User.findByPk(req.params.id, {
//             include: [{
//                 model: User,
//                 attributes: ['name'],
//             }, ],
//         });

//         const workouts = workoutData.get({ plain: true });
        
//         res.render('workout', {
//             ...workouts,
//             user_id: req.session.user_id,
//             logged_in: req.session.logged_in,
//             backgroundImage: "/Images/WZ-FUTURE-003.jpg",
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });




// router.get('/login', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });

// module.exports = router;

const router = require('express').Router();
const { Workout, User } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const workoutData = await Workout.findAll({
        include: [{model: User, as: 'user'}],
        raw: true
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      workouts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/workout/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const workout = workoutData.get({ plain: true });

    res.render('workout', {
      ...workout,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/workout', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
