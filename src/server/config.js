const path = require('path');
const exphbs = require('express-handlebars');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');

const morgan =require('morgan');
const multer = require('multer'); 
const express = require('express'); 
const errohandler = require('errorhandler');

const routes = require('../routes/index','../routes/users');
 

module.exports = app => {

    //settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }))
    app.set('view engine', '.hbs');

    //middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('tesis'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    //Cuando se mandan datos del login, poder entenderlo
    app.use(express.urlencoded({extended:false}));
    //enviar varios tipos de metodos en el formulario
    app.use(methodOverride('_method'));
    app.use(session({
        secret: 'clavesecreta',
        resave: true,
        saveUninitialized: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error= req.flash('error');


        next();
    });


    //routes
    
    routes(app);

    //statics files
    app.use('/public',express.static(path.join(__dirname, '../public')));

    //errohandlers
    if('development' === app.get('env')){
        app.use(errohandler);
    }


    return app;
}