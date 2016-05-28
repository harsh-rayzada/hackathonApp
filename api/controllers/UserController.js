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
            console.log(req.body);
            User.loginOrSignUp(req.body, function(err, user){
                if(err){
                    res.negotiate(err);
                }
                else{
                    sails.log.debug('created/found user', user);
                    var token  = jwt.sign(user, secret, {expiresIn: 60*5*100});
                    user.token = token;
                    req.user = user;
                    sails.log.debug('user sign up/log in', user);
                    res.send(user);
                }
            });
        }
    },

    logout : function(req, res){
        delete req['user'];
        res.send({success: true});
    },




};

