const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp =new Date().getTime();
    return jwt.encode( { sub: user.id,iat:timestamp },config.secret);
}

exports.signin = function(req, res, next) {
    //
    res.send({token: tokenForUser(req.user)});
}


exports.signup =function(req, res, next) {
    //res.send({ success: 'true'});
    
    console.log('BODY:',req.body);

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send( { error: 'Provide email and password'});
    }

    //See if a user with given email exists
    User.findOne({ email: email}, function(err,existingUser) {
        if(err) { 
            return next(err);
        }

        console.log('email',email);
        console.log('password',password);
        
        //if user does not exist return error
        if(existingUser) {
            
            return res.status(422).send( { error: 'Email in use'});
        }

        const user =new User({
           email: email,
           password: password     
        });

        user.save(function(err){
            if(err) {
                return next(err);
            }
            //respond to user
            res.json({ token: tokenForUser(user)});
        });

    });
    




}