/**
 * Created by maxsimsmirnov on 21.05.17.
 */
var mongoose = require('mongoose');
var reviewModelSchema = mongoose.Schema({
    Review:String,
    User:String,
});
var Review = mongoose.model('Review',reviewModelSchema);
module.exports = Review;
