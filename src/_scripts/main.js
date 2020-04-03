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
var Emprendimiento = require('./emprendimiento');
var QuienesSomos = require('./quienes-somos');
var PropiedadDetalle = require('./propiedad-detalle');
var EmprendimientoDetalle = require('./emprendimiento-detalle');
var Filtros = require('./filtros');
var ContactForm = require('./contact-form');

$(function() {
    var phpRootPath = "http://maluma.test"
    var enviroment = "dev";

    new Header();
    new Slider();
    new Multirange();
    new Price();
    new Home(phpRootPath, enviroment);
    new QuienesSomos(phpRootPath, enviroment);
    new Venta(phpRootPath, enviroment);
    new Alquiler(phpRootPath, enviroment);
    new Emprendimiento(phpRootPath, enviroment);
    new PropiedadDetalle(phpRootPath, enviroment);
    new EmprendimientoDetalle(phpRootPath, enviroment);
    new Filtros(phpRootPath, enviroment);
    new ContactForm();
});
