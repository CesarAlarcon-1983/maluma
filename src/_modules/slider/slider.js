'use strict';

// Constructor
var Slider = function() {
    var slider = $('._slider');
    if (slider) {
        slider.each(function(){
            $(this).slick({
                dots: true,
                fade: true,
                arrows:  true,
                autoplay: false
            });
        });
    }

    var arrows = $('.slick-arrow');

    arrows.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log(e);
    })
    console.log(arrows);
};

module.exports = Slider;
