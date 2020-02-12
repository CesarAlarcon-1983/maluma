// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

global.$ = global.jQuery;
//global._ = require('underscore');

var Header = require('../_modules/header/header');
var Slider = require('../_modules/slider/slider');
var Multirange = require('../_modules/multirange/multirange');
var Price = require('../_modules/multirange/price');
var Properties = require('./properties');

$(function() {

    new Header();
    new Slider();
    new Multirange();
    new Price();
    new Properties();
});
