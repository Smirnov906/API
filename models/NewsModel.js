/**
 * Created by maxsimsmirnov on 21.05.17.
 */
var mongoose = require('mongoose');
var newsModelSchema = mongoose.Schema({
    Title:String,
    Time:String,
    Description:String
});
var News = mongoose.model('News',newsModelSchema);
module.exports = News;