'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');

    menuOpen.on('click', function(){
        header.toggleClass('-open');
        body.toggleClass('-hideOverflow');
    });

    // searchbox functionallity
    // var tabs = $('.home__search__tab');
  
    // tabs.first().addClass('-active');

    // tabs.on('click', function() {
    //     tabs.removeClass('-active')
    //     $(this).addClass('-active');
    // })

    //filter show mobile functionallity

    var filterButton = $('.-js-filter-button');
    var filtersContainer = $('.-js-filter-container');

    filterButton.on('click', function() { 
        filtersContainer.toggleClass('-open');
    });

    //venta-detalle tabs & images functionallity
    var targets = $('[data-target]');
    var contents = $('[data-content]');

    var rowContainer = $('.propiedad-detalle__details__row-container');
    var detailsWrapper = $('.propiedad-detalle__details__wrapper');

    rowContainer.height(detailsWrapper.height() + 60);

    targets.first().addClass('-active');
    contents.first().addClass('-active');

    targets.on('click', function() {
        targets.removeClass('-active');
        contents.removeClass('-active');

        var targettedContent = $(this).data("target");

        contents.filter('[data-content=' + targettedContent + ']').addClass('-active');
        $(this).addClass('-active');

        rowContainer.height(contents.filter('[data-content=' + targettedContent + ']').height() + 60);
    });
};

module.exports = Header;
