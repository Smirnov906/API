/**
 * Created by maxsimsmirnov on 02.03.17.
 */
var mongoose = require('mongoose');
var userModelSchema = mongoose.Schema({
    FullName:String,
    Login:String,
    Password:String,
    CarMark:String,
    CarName:String,
    CarYear:String,
    CarEngineCapacity:String

});
var AppUser = mongoose.model('AppUser',userModelSchema);
module.exports = AppUser;