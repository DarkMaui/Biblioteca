const ctrl = {};

const { Tesis } = require('../models');

const sidebar  = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    const todasTesis = await Tesis.find().sort({Timestamp: -1});
    let viewModel = {todasTesis:[]};
    viewModel.todasTesis = todasTesis;
    viewModel = await sidebar (viewModel);
    console.log(viewModel)
    res.render('index', viewModel);
    
   
};

ctrl.home = async (req, res) => {
    const todasTesis = await Tesis.find().sort({Timestamp: -1});
    let viewModel = {todasTesis:[]};
    viewModel.todasTesis = todasTesis;
    viewModel = await sidebar (viewModel);
    console.log(viewModel)
    res.render('home', viewModel);
    
   
};

module.exports = ctrl; 