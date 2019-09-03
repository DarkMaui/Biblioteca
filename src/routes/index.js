const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const tesis = require('../controllers/tesis');
const users = require('../controllers/users');

module.exports = app => {

    router.get('/', home.home); 
    router.get('/home', home.index); 
    router.get('/tesis/:tesis_id', tesis.index); 
    router.get('/tesis/:pdf/:tesis_id', tesis.pdf);  
    router.post('/tesis', tesis.create); 
    router.post('/tesis/:tesis_id/like', tesis.like); 
    router.post('/tesis/:tesis_id/comment', tesis.comment); 
    router.delete('/tesis/:tesis_id', tesis.remove); 

    router.get('/users/signin', users.signin);
    router.get('/users/signup', users.signup);
    router.post('/users/signup', users.create);
    router.post('/users/signin', users.createSi);

    app.use(router);
};