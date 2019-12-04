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

    var filterButton = $('.venta__filtros__filter-icon');
    var filtersContainer = $('.venta__filtros__options');

    filterButton.on('click', function() { 
        filtersContainer.toggleClass('-open');
    });

    //venta-detalle tabs & images functionallity
    var ventaDetalleTabs = $('.venta-detalle__details__tab');
    var galleryImages = $('.venta-detalle__image-gallery__image img')
    var mainImage = $('.venta-detalle__main-image img');

    function imagesInit() {
        var firstImage = $(galleryImages).first().attr('src');

        mainImage.attr('src', firstImage);
    }

    galleryImages.on('click', function() {
        var clickedImage = $(this).attr('src');

        mainImage.attr('src', clickedImage);
    })

    imagesInit();

    console.log(galleryImages);

    ventaDetalleTabs.first().addClass('-active');

    ventaDetalleTabs.on('click', function() {
    ventaDetalleTabs.removeClass('-active');
        $(this).addClass('-active');
    });

};

module.exports = Header;
