const path = require('path');
const {randomNumber} = require('../helpers/libs');
const ctrl = {};
const fs = require('fs-extra');

const {Tesis} = require('../models');
const sidebar = require('../helpers/sidebar');


ctrl.index = async (req,res) => {
    let viewModel = {tesis: {}};
    const  tesis = await Tesis.findOne({filename: {$regex: req.params.tesis_id}});
    if(tesis){
    tesis.views = tesis.views + 1;
    viewModel.tesis = tesis;
    await tesis.save();
   
    viewModel = await sidebar(viewModel);
    res.render('tesis',viewModel);
    }else{
        res.redirect('/');
    }
};

ctrl.pdf = async (req, res) => {
    const  tesis = await Tesis.findOne({filename: {$regex: req.params.tesis_id}});
    console.log(tesis);
    
    res.render('pdf2',{tesis,layout:null});
};

ctrl.create =  (req,res) => {

    const savetesis = async () => {

        const imgUrl = randomNumber();
        const TodasTesis =await Tesis.find({filename: imgUrl});
         if(TodasTesis.length > 0 ){
            savetesis();
        }else{

        console.log(imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

    if( ext === '.pdf'){
        await fs.rename(imageTempPath, targetPath);

        const newTesis = new Tesis({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description,
            fecha: req.body.date 
        });
        const tesisSaved = await newTesis.save();
        res.redirect('/tesis/' + imgUrl);
    }else{ 
        await fs.unlink(imageTempPath);
       res.status(500).json({error: 'Solo se pueden subir archivos .pdf'})
    }

    }
    };

    savetesis();

    
};

ctrl.like = async(req,res) => {
    const  tesis = await Tesis.findOne({filename: {$regex: req.params.tesis_id}});
    if(tesis){
        tesis.likes = tesis.likes + 1;
        await tesis.save();
        res.json({likes: tesis.likes});
    }else{
        res.status(500).json({error: 'error interno'});
    }
};

ctrl.comment = (req,res) => {
    res.send('Index page');
};

ctrl.remove = async (req,res) => {
   const tesis = await Tesis.findOne({filename: {$regex: req.params.tesis_id}});
   if(tesis){
    await fs.unlink(path.resolve('./src/public/upload/' +  tesis.filename));
    await tesis.remove();
    res.json(true);
   }
};


module.exports = ctrl;