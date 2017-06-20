/**
 * Created by maxsimsmirnov on 07.03.17.
 */
var mongoose = require('mongoose');
var AdminModelSchema = mongoose.Schema({
    FullName:String,
    Login:String,
    Password:String,
    AccessLevel:Number
});
var Admin = mongoose.model('Admin',AdminModelSchema);
module.exports = Admin;