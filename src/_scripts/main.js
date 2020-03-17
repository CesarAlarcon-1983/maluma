// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

global.$ = global.jQuery;
//global._ = require('underscore');

var Header = require('../_modules/header/header');
var Slider = require('../_modules/slider/slider');
var Multirange = require('../_modules/multirange/multirange');
var Price = require('../_modules/multirange/price');
var Home = require('./home');
var Venta = require('./venta');
var Alquiler = require('./alquiler');
var QuienesSomos = require('./quienes-somos');
var PropiedadDetalle = require('./propiedad-detalle');
var Filtros = require('./filtros');
var ContactForm = require('./contact-form');

$(function() {

    new Header();
    new Slider();
    new Multirange();
    new Price();
    new Home();
    new QuienesSomos();
    new Venta();
    new Alquiler();
    new PropiedadDetalle();
    new Filtros();
    new ContactForm();
});
