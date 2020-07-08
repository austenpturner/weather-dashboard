const db = require('../models');
const router = require('express').Router();

// remember that we add '/api' within the server so we can leave it off here

// get all the users
router.get('/api/users', (req, res) => {
    db.User.find({})
        .then(data => {
            res.json(data);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});
  
router.post('/api/users', (req, res) => {
    // console.log(req.body);
    db.User.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error);
        });
});
  
router.put('/api/users', (req, res) => {
    db.User.find({
        username: req.body.username,
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
        });
});
  
router.put('/api/dashboard/email', (req, res) => {
    // console.log(req.body);
    db.User.find({ email: req.body.email }).then(data => {
            res.json(data);
        });
});

// SIGN UP ROUTE

router.post('/api/account/signup', (req, res) => {
    const { body } = req;
    let { email, password, username } = body;
  
    if (!email) {
        return res.send({
            success: false,
            message: 'Input an email',
        });
    }
  
    if (!password) {
        return res.send({
            success: false,
            message: 'Input a password',
        });
    }
  
    email = email.toLowerCase();
  
    // verify username
  
    db.User.find(
        {
            username: username,
        },
        (err, previousUserNames) => {
            if (err) {
                return res.send({
                    success: false,
                    message: `Please see error message: ${err}`,
                });
            } else if (previousUserNames.length > 0) {
                return res.send({
                    success: false,
                    message: 'That username is already taken. Please select another.',
            });
            } else {
                db.User.find(
                    {
                        email: email,
                    },
                    (err, previousUsers) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: `Please see error message: ${err}`,
                            });
                        } else if (previousUsers.length > 0) {
                            return res.send({
                                success: false,
                                message:
                                    'This email address already has an account associated with it.',
                            });
                        } else {
                            // save the email
  
                            const newUser = new db.User();
  
                            newUser.email = email;
                            newUser.username = username;
                            newUser.password = newUser.generateHash(password);
                            newUser.save(err => {
                                if (err) {
                                    return res.send({
                                    success: false,
                                    message: `Please see error message: ${err}`,
                                    });
                                }
                            return res.send({
                                success: true,
                                message: 'You have created an account. Please log in.',
                            });
                        });
                    }
                }
            );
        }
    }
);
  
// Verify email doesn't exist
});
  
// SIGN IN SET UP
  
router.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    let { email, password } = body;
  
    if (!email) {
        return res.send({
            success: false,
            message: 'Input an email',
        });
    }
  
    if (!password) {
        return res.send({
            success: false,
            message: 'Input a password',
        });
    }
  
    email = email.toLowerCase();
  
    db.User.find(
        {
            email: email,
        },
        (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: `Please see error message: ${err}
                    location 1`,
                });
            }
            if (users.length != 1) {
                return res.send({
                    succcess: false,
                    message: "WHAT HAVE YOU DONE!? THAT'S NOT RIGHT!",
                });
            }
  
            const user = users[0];
  
            if (!user.validPassword(password)) {
                return res.send({
                    succcess: false,
                    message: 'That password is wrong... who are you?!',
                });
            }
  
            const userSession = new db.UserSession();
  
            userSession.userId = user._id;
  
            userSession.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: `Please see error message: ${err}
                        location 2`,
                    });
                }
                return res.send({
                    userData: user,
                    success: true,
                    message: 'SUCCESS! YOU HAVE SIGNED IN! IT IS TEE TIME!!! FOOOOURRRRR',
                    token: doc._id,
                });
            });
        }
    );
});
  
  // VERIFY SET UP
  
router.get('/api/account/verify', (req, res) => {
    db.UserSession.find({})
        .then(data => {
            res.json(data);
        })
        .catch(({ message }) => {
            console.log('Message:', message);
        });
});
  
// LOG OUT SET UP
  
router.get('/api/account/logout', (req, res, next) => {
    //get the token
    // const query = req;
    // console.log(req.body);
    const token = req.body._id;
    const updateLogOut = {
        isDeleted: true,
    };
    console.log(`Token: ${token}`);
    //verify the token is one of a kind and is not deleted
  
    db.UserSession.findOneAndUpdate(
        {
            _id: token,
            isDeleted: false,
        },
        updateLogOut,
        null,
        err => {
            if (err) {
                return res.send({
                    success: false,
                    message: `Please see error message: ${err}
                    location 3`,
                });
            }
            return res.send({
                success: true,
                message: 'We have logged you out',
            });
        }
    );
});

  module.exports = router;