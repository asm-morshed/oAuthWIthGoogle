
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys')


const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    //This method executes after being completed the below callback ***
    done(null, user.id) //This id here is the assigned ID by mongo in DB
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch()
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                //User ID exist 
                console.log("ID exist");
                done(null, existingUser) // this is the callback ***
            } else {
                //New User Save to DB
                new User({ googleId: profile.id }).save()
                    .then(user => {
                        done(null, user) // this is the callback ***
                    })
                    .catch()
            }
        })
        .catch()

})
);