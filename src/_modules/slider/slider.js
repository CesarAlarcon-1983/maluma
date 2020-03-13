'use strict';

// Constructor
var Slider = function() {
    var slider = $('._slider');
    var sliderAlt = $('._slider-alt');
    var sliderAll = $('._slider-all');
    var sliderMulti = $('._slidermulti');
    var sliderFourSlides = $('._slider-fourslides');
    var sliderThumbnail = $('._slider-thumbnail');

    if (slider) {
        slider.each(function(){
            $(this).slick({
                dots: false,
                fade: true,
                arrows: true,
                infinite: true,
                autoplay: true
            });
        });
    }

    if (sliderThumbnail) {
        sliderThumbnail.each(function(){
            $(this).slick({
                dots: false,
                fade: true,
                arrows: true,
                infinite: true,
                asNavFor: '.slider-nav',
                autoplay: true
            });

            $('.slider-nav').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: sliderThumbnail,
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true
            });
        });
    }

    if (sliderAlt) {
        sliderAlt.each(function(){
            $(this).slick({
                dots: true,
                fade: true,
                arrows: false,
                infinite: true,
                autoplay: true
            });
        });
    }

    if (sliderAll) {
        sliderAll.each(function(){
            $(this).slick({
                dots: true,
                fade: true,
                arrows: true,
                infinite: true,
                autoplay: true
            });
        });
    }

    if (sliderMulti) {
        sliderMulti.each(function(){
            $(this).slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: false,
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: false,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    }

    if (sliderFourSlides) {
        sliderFourSlides.each(function(){
            $(this).slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false,
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    }
};

module.exports = Slider;
