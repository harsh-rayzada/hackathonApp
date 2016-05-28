/**
 * MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    showMenu: function(req, res){
        Menu.get(function(err, menu){
            if(err){
                res.serverError(err);
            }else{
                res.send(menu);
            }
        });
    },

    updateMenuItem: function(req, res){
        if(!req.body.menuItemId){
            res.badRequest('menu item id required');
        }else{
            Menu.updateItem(req.body, function(menuUpdateErr, updatedManuItem){
                if(menuUpdateErr){
                    res.negotiate(menuUpdateErr);
                }else{
                    res.send(updatedMenuItem);
                }
            });
        }
    },

    addMenuItem: function(req, res){
        if(!req.body.name || !req.body.price || !req.body.description){
            res.badRequest('Details missing');
        }else{
            Menu.add(req.body, function(menuAddErr, addedMenuItem){
                if(menuUpdateErr){
                    res.negotiate(menuUpdateErr);
                }else{
                    res.send(addedMenuItem);
                }
            });
        }
    },

    deleteMenuItem: function(req, res){
        if(!req.body.menuItemId){
            res.badRequest('menu item id missing');
        }else{
            Menu.deleteItem(req.body.menuItemId, function(menuItemDeletionErr, deletionStatus){
                if(menuItemDeletionErr){
                    res.negotiate(menuItemDeletionErr);
                }else{
                    res.send(deletionStatus);
                }
            });
        }
    }
};

