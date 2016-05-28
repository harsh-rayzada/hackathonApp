/**
* Menu.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        name: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        price: {
            type: 'number',
            required: true
        },
        special: {
            type: 'boolean'
        }
  },

  get: function(cb){
      Menu.find({}).exec(cb);
  },

  updateItem: function(opts, body){
      Menu.findOne({id: opts.menuItemId}).exec(function(menuItemFetchErr, menuItem){
          if(menuItemFetchErr){
              cb(menuItemFetchErr, null);
          }else if(menuItem){
              menuItem.name = opts.name || menuItem.name;
              menuItem.description = opts.description || menuItem.description;
              menuItem.price = opts.price || menuItem.price;
              Menu.update({id: opts.menuItemId}, menuItem).exec(cb);
          }else{
              cb('No such menu item', null);
          }
      });
  },

  add: function(opts, cb){
      Menu.create(opts).exec(cb);
  },

  deleteItem: function(itemId, cb){
      Menu.destroy({id: itemId}).exec(function(itemDeletionErr){
          if(itemDeletionErr){
              cb(itemDeletionErr, null);
          }else{
              cb(null, true);
          }
      })
  }
};

