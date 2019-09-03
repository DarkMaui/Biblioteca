const moment = require('moment');
const helpers = {};

helpers.timeago = timestamp => {
   return moment(timestamp).startOf('minute').fromNow();
};

helpers.Fecha = fecha => {
   return moment(fecha).format('DD-MM-YY');
};

helpers.hoy = hoy => {
   return moment( Date.now ).format('DD-MM-YY');
};
module.exports = helpers;