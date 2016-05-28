/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var crypto = require('crypto');
module.exports = {

  attributes: {
    name: {
        type: 'string',
        required: true
    },

    email: {
        type: 'string',
        required: true
    },

    mobile: {
        type: 'string'
    },

    password: {
        type: 'string',
        required: true
    },

    wallet_amount: {
        type: 'integer',
        defaultsTo: 0
    },

    device_id: {
        type: 'string',
        defaultsTo: 0
    },

    role: {
        type: 'string',
        defaultsTo: 'standard',
        in: ['standard', 'admin']
    }
  },

  loginOrSignUp: function(opts, cb){
      User.findOne({email: opts.email}).exec(function(userfindErr, user){
          if(userfindErr){
              cb(userfindErr, null);
          }else if(user){
              validatePassword(opts.password, user.password,function(res){
                  if(res){
                      delete user['password'];
                      cb(null,user);
                  }
                  else{
                      cb("Email or password does not match", null);
                  }
              });
          }else{
              saltAndHash(opts.password,function(hash){
                  opts.password = hash;
                  User.create(opts).exec(function(userCreationErr, createdUser){
                      if(userCreationErr){
                          cb(userCreationErr, null);
                      }else{
                          delete createdUser['password'];
                          cb(null,createdUser);
                      }
                  });
              });
          }
      });
  }
};

var generateSalt = function(){
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(hashedPass === validHash);
}

