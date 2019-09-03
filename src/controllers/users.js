
const ctrl = {};

const passport = require('passport');


const {User} = require('../models');


ctrl.signin = async (req, res) => {
   
    res.render('users/signin',{layout:'users'});

};

ctrl.signup = async (req, res) => {
   
    res.render('users/signup',{layout:'users'});

};

ctrl.create = async (req, res) => {
    const{name, email, password, confirm_password} = req.body;
    const errors = [];
    if(password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'minimo 4 caracteres en la contraseña'});
    }
    if(errors.length > 0){
        res.render('users/signup', {layout:'users', errors, name, email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            res.redirect('/users/signup');
            req.flash('error_msg','registrado');
        }else{
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','registrado');
       res.redirect('/users/signin');
        }
    }
    
    console.log(errors);
};

ctrl.createSi = passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/users/signin',
    failureFlash: true
});
module.exports = ctrl; 