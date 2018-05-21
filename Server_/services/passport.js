const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =  require('passport-jwt').ExtractJwt;
const localStrategy =  require('passport-local');

//Create local strategy
const localLogin = new localStrategy( { usernameField:'email'},  function(email, password, done){
    //verify email/password
    User.findOne({email:email},function(err, user){
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null,false);
        }
        console.log('user',user.comparePassword)
        user.comparePassword(password,function(err,isMatch){
            if(err) {
                return done(err);
            }
            if(!isMatch) {
                return done(null,false);
            }
            return done(null,user);

        });

    });

});


const jwtOptions ={ 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

};

//create jwt staretgy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //see if user id in payload exists in db 
    User.findById(payload.sub,function(err,user) {
        if(err) {
            return done(err,false);
        }

        if(user) {
            done(null,user);

        }
        else {
            done(null,false);
        }

    });

});

//tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);