/**
 * Created by maxsimsmirnov on 02.03.17.
 */
var mongoose = require('mongoose');

var errorModelSchema = new mongoose.Schema({
    CarMark: String,
    CarName: String,
    CarYear: String,
    ErrorCode: String,
    Description: String,
    ErrorSolution: String
});

var Error = mongoose.model('Error',errorModelSchema);
module.exports = Error;