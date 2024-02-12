require('dotenv').config();
const passport = require('passport-google-oauth20').Strategy;
const User = require('./models/User')
const GoogleStrategy = require('passport-google-oauth20').Strategy; 



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback"
   },
    async (accessToken, refeshToken, profile, done) => {
      const currentUser = await User.findOne({googleId: profile.id});
      if (currentUser) {
        done(null, currentUser)
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          username: profile.displayName
        })
        done(null, newUser)
      }
    }
   
   ));
  
   passport.serializeUser((user, done) => {
    done(null, user.id); 
   })
  
   passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user); 
    })
   })