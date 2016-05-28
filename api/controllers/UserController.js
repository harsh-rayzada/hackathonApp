/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var jwt = require('jsonwebtoken');
var secret = "SierraOscarCharlie"
module.exports = {
    login : function(req, res){
        if(!req.body || !req.body.email || !req.body.password)
            res.badRequest('Email or password missing in request');
        else{
            User.loginOrSignUp(req.body, function(err, user){
                if(err){
                    res.negotiate(err);
                }
                else{
                    var token  = jwt.sign(user, secret, {expiresInMinutes: 60*5*100});
                    user.token = token;
                    req.user = user;
                    res.send(user);
                }
            });
        }
    },


};

