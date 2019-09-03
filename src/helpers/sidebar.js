const Stats = require('./stats');
const Tesis = require('./tesis');

module.exports = async viewModel => {

   const results = await Promise.all([
    Stats(),
    Tesis.popular()
   ]);

   viewModel.sidebar = {
       stats: results[0],
       popular: results[1]
   };

   return viewModel;

}