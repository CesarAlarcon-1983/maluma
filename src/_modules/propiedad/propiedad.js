'use strict';

var Properties = require('./properties');

// Constructor
var Propiedad = function() {
  var context = $('.-js-propiedad-detalle');
  
  if(context.length > 0) {
    console.log('detalle');
  }
};

module.exports = Propiedad;
