'use strict';

var Properties = require('./properties');

// Constructor
var Home = function(phpRootPath, enviroment) {
  var context = $('.home');
  
  if(context.length > 0) {
    var destacados = {};
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var destacadosContainer = $('.-js-destacados-container');
    body.addClass('-hideOverflow');
    

    var url = function() {
      if(enviroment === "dev") {
        return phpRootPath + '/propiedades.php?data=destacados';
      } else {
        return '/propiedades.php?data=destacados';
      }
    }

    $.when(
      Properties.get(url())
    ).done(function(data) {
      destacados = JSON.parse(data);

      console.log(destacados);

      generateDestacadosHtml(destacados.resultado);
      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');
    });

    var sliderImages = function(destacados, index) {
      var images = [];
      
      function photosStructure(fichaIndex) {
        var photoHtml = destacados.img[fichaIndex].map(function(photo, index) {
          return(
            `<div class="propiedad__image">
              <img src="${photo}"/>
            </div>`
          )
        })
        return photoHtml;
      }
        

      for(var i=0; i < destacados.img[i].length; i++) {
        images.push(
          `<div class="propiedad__slide">
            ${photosStructure(index)}
          </div>`
        )
      }

      return images.join("");
    };

    function generateDestacadosHtml(destacados) {
      var propiedadesDestacadas = destacados.fichas.map(function(propiedad, index) {
          return(
            `<div class="col-24 col-md-8">
              <div class="home__search__propiedad">
                <a href="/${propiedad.operacion.toLowerCase()}-detalle/index.html?id=${propiedad.in_num}" class="propiedad">
                  <div class="_slider propiedad__slider">
                    ${sliderImages(destacados, index)}
                  </div>
                  <div class="propiedad__content">
                    <div class="propiedad__content-group">
                      <h4 class="propiedad__type">${propiedad.tipo}</h4>
                      <h3 class="propiedad__address">${propiedad.direccion_completa}</h3>
                    </div>
                    <div class="propiedad__group">
                      <div class="propiedad__wrapper">
                        <div class="propiedad__wrapper-group"><img src="/images/square-meter-icon.png"/><span>Sin Data</span></div>
                        ${propiedad.ambientes !== "" ? `<div class="propiedad__wrapper-group"><i class="fa fa-bed"></i><span>${propiedad.ambientes}</span></div>`: ''}
                        <div class="propiedad__wrapper-group"><i class="fa fa-bath"></i><span>Sin Data</span></div>
                    </div>
                      <div class="propiedad__price"><span>${propiedad.precio}</span></div>
                    </div>
                  </div>
                </a>
              </div>
            </div>`
          );
      });

      destacadosContainer.append(propiedadesDestacadas.slice(0,9));

      var slider = $('._slider');

      slider.each(function(){
        $(this).slick({
            dots: true,
            fade: true,
            arrows:  true,
            autoplay: false
        });
      });

      var arrows = $('.slick-arrow');

      arrows.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
      })
    }
  }
};

module.exports = Home;
