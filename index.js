/**
 * Created by maxsimsmirnov on 02.03.17.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost/carhelperdatabase');
app.set('port',process.env.PORT || 2203);
app.use(bodyParser.json());
app.use(require('cookie-parser')());

var AppUser = require('./models/userModel');
var Error = require('./models/errorModel');
var Admin = require('./models/AdminModel');
var Review = require('./models/ReviewModel');
var News = require('./models/NewsModel');

AppUser.find(function(err,users){
    if (err) return console.error(err);
    if(users.length) return console.log(users);
    new AppUser ({
        FullName: 'Смирнов Максим',
        Login: 'test123',
        Password: '123',
        CarMark: 'Chevrolet',
        CarName: 'Aveo',
        CarYear: '2012',
        CarEngineCapacity: '1.6'
    }).save()
});

Admin.find(function(err,admin){
    if (err) return console.error(err);
    if(admin.length) return console.log(admin);
    new Admin ({
        FullName: 'Смирнов Максим',
        Login: 'admin',
        Password: '123',
        AccessLevel: 3
    }).save()
});
Error.find(function(err,error){
    if (err) return console.error(err);
    if(error.length) return console.log(error);
    new Error ({
        CarMark: 'Chevrolet',
        CarName: 'Aveo',
        CarYear: '2012',
        ErrorCode: '24',
        Description: 'test',
        ErrorSolution: 'test solution'
    }).save()
});
app.get('/',function(req,res){
    res.type('text/plain');
    AppUser.find({},function(err,userModel){
        res.send(userModel);
    })
});
app.get('/admin',function(req,res){
    res.type('text/plain');
    Admin.find({},function(err,AdminModel){
        res.send(AdminModel);
    })
});
app.get('/Review',function(req,res){
    res.type('text/plain');
    Review.find({},function(err,ReviewModel){
        res.send(ReviewModel);
    })
});
app.get('/News',function(req,res){
    res.type('text/plain');
    News.find({},function(err,NewsModel){
        res.send(NewsModel);
    })
});
app.post('/admin/signin',function(req,res){
    console.log(req.body);
    Admin.findOne({Login:req.body.Login},
        function(err,obj){
            if(err) return res.send({result:'server_error'});
            if (obj == null) return res.send({result: 'log_pass_error'});
            if (obj.Password == req.body.Password)
                return res.send({
                    result: 'OK',
                    data: {
                        id: obj._id,
                        FullName: obj.FullName,
                        Login: obj.Login,
                        Password: obj.Password,
                        AccessLevel: obj.AccessLevel
                    }
                });
        });
});
app.post('/admin/signup',function(req,res){
    console.log(req.body);
    Admin.findOne({Login:req.body.Login},function(err,admin){
        var newAdmin = new Admin({
            FullName: req.body.FullName,
            Login: req.body.Login,
            Password: req.body.Password,
	    AccessLevel: req.body.AccessLevel

        });
        newAdmin.save();
        res.send({
            result: 'OK'
        });
    });
});

app.post('/user/signin',function(req,res){

    console.log(req.body);
    AppUser.findOne({Login:req.body.Login},
        function(err,user){
            if(err) return res.send({result:'server_error'});
            if (err || !user || user.Password !== req.body.Password) return res.send({result: 'log_pass_error'});
            if (user.Password == req.body.Password)
                return res.send({
                    result: 'OK',
                    data: {
                        id: user._id,
                        FullName: user.FullName,
                        Login: user.Login,
                        Password: user.Password,
                        CarMark: user.CarMark,
                        CarName: user.CarName,
                        CarYear: user.CarYear ,
                        CarEngineCapacity: user.CarEngineCapacity
                    }
                });
        });
});


app.post('/user/signup',function(req,res){
    console.log(req.body);
    AppUser.findOne({Login:req.body.Login},function(err,user){
	if(!user) {

	 var newAppUser = new AppUser({
            FullName: req.body.FullName,
            Login: req.body.Login,
            Password: req.body.Password,
            CarMark: req.body.CarMark,
            CarName: req.body.CarName,
            CarYear: req.body.CarYear,
            CarEngineCapacity: req.body.CarEngineCapacity

        });
       	 
	}
	else
       		if (user.Login == req.body.Login) return res.send({result: 'UserError'});

        newAppUser.save();
        res.send({
            result: 'OK',
            data: {
                id: newAppUser._id,
                FullName: newAppUser.FullName,
                Login: newAppUser.Login,
                Password: newAppUser.Password,
                CarMark: newAppUser.CarMark,
                CarName: newAppUser.CarName,
                CarYear: newAppUser.CarYear ,
                CarEngineCapacity: newAppUser.CarEngineCapacity

            }
        });
    });
});

app.post('/ErrorAdd',function(req,res){
    console.log(req.body);
    Error.findOne({ErrorCode:req.body.ErrorCode,CarName:req.body.CarName,CarMark:req.body.CarMark},function(err,error){
        if(err || !error) return res.send({result: 'ErrorAlreadyExists'})
        var newError = new Error({
            CarMark: req.body.CarMark,
            CarName: req.body.CarName,
            CarYear: req.body.CarYear,
            ErrorCode: req.body.ErrorCode,
            Description: req.body.Description,
            ErrorSolution: req.body.ErrorSolution

        });
        newError.save();
        res.send({
        	result: 'OK'
        });
    });
});

app.post('/ErrorInfo',function(req,res){
    console.log(req.body);
    Error.findOne({CarMark:req.body.CarMark,CarName:req.body.CarName,CarYear:req.body.CarYear,ErrorCode:req.body.ErrorCode},
        function(err,obj){
            if(err) return res.send({result:'server_error'});
            if(!obj || obj.CarMark === null && obj.CarName === null && obj.CarYear === null) return res.send({result: 'ErrorNotFound'});
            if(obj.CarMark == req.body.CarMark && obj.CarName == req.body.CarName && obj.CarYear == req.body.CarYear &&  obj.ErrorCode == req.body.ErrorCode)
                return res.send({
                    result: 'OK',
                    data: {
                        _id: obj._id,
                        ErrorCode: obj.ErrorCode,
                        Description: obj.Description,
                        ErrorSolution: obj.ErrorSolution
                    }
                });
        });
});
app.post('/ReviewAdd',function(req,res){
    console.log(req.body);
    Review.find({Review:req.body.Review},function(err,error){
        var newReview = new Review({
            Review: req.body.Review,
            User: req.body.User,
        });
        newReview.save();
        res.send({
            result: 'OK'
        });
    });
});
app.post('/NewsAdd',function(req,res){
    console.log(req.body);
    News.find({Title:req.body.Title},function(err,error){
        var newNews = new News({
            Title: req.body.Title,
            Time: req.body.Time,
            Description: req.body.Description
        });
        newNews.save();
        res.send({
            result: 'OK'
        });
    });
});

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - server error');
});

app.listen(app.get('port'), function () {
    console.log('Server start on ' + app.get('port') + '. Ctrl + C for exit.');
});
