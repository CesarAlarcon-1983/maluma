'use strict';

var Properties = require('./properties');
var Pagination = require('./pagination');

// Constructor
var Alquiler = function(phpRootPath, enviroment) {
  var context = $('.alquiler');
  
  if(context.length > 0) {
    var propiedadesAlquiler = {};
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var arrowLeft = $('.-js-arrow-left');
    var arrowRight = $('.-js-arrow-right');
    var operacion = 'alquiler';
    var currentPage = new URL(window.location.href).searchParams.get('page');

    var getParams = function (url) {
      var params = {};
      var parser = document.createElement('a');
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split('&');
    
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      
      return params;
    };

    var paramsInUrl = getParams(window.location.href);

    body.addClass('-hideOverflow');

    function paramsConstructor(params) {
      var keys = Object.keys(params);
      var formattedParams = [];

      if(keys.length > 1) {
        console.log('inside if')
        for(var i = 0; i < keys.length; i++) {
          if(params[keys[i]] !== "" && keys[i] !== "page") {
            formattedParams.push( keys[i] + "=" + params[keys[i]])
          }
        }

        return "&" + formattedParams.join('&');
      } else {
        return "";
      }
    }

    var url = function() {
      if(enviroment === "dev") {
        return `${phpRootPath}/propiedades.php?data=${operacion}&tipo_operacion=${operacion}&page=${currentPage}&${paramsConstructor(paramsInUrl)}`;
      } else {
        return `/propiedades.php?data=${operacion}&tipo_operacion=${operacion}&page=${currentPage}&${paramsConstructor(paramsInUrl)}`;
      }
    }

    $.when(
      Properties.get(url())
    ).done(function(data) {
      propiedadesAlquiler = JSON.parse(data);
      var page = propiedadesAlquiler.resultado.datos.SiguientePag !== "" ? propiedadesAlquiler.resultado.datos.SiguientePag - 1 : propiedadesAlquiler.resultado.datos.paginas;
      
      console.log(propiedadesAlquiler);
      
      generatePropiedadesHtml(propiedadesAlquiler.resultado, page);
      Pagination.generate(propiedadesAlquiler.resultado.datos.paginas, page, 'alquiler');
      
      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');
      
      if(page === 1) {
        arrowLeft.addClass('-disabled');
      }
  
      if(page === propiedadesAlquiler.resultado.datos.paginas) {
        arrowRight.addClass('-disabled');
      }
    });

    arrowLeft.on('click', function(e) {
      e.preventDefault();
      var navigationPage = parseInt(currentPage) - 1;
      var arrowsNavUrl = `/${operacion}/?page=${navigationPage}${paramsConstructor(paramsInUrl)}`;
      window.location.href = arrowsNavUrl;
    })

    arrowRight.on('click', function(e) {
      e.preventDefault();
      var navigationPage = parseInt(currentPage) + 1;
      var arrowsNavUrl = `/${operacion}/?page=${navigationPage}${paramsConstructor(paramsInUrl)}`;
      window.location.href = arrowsNavUrl;
    })

    var sliderImages = function(propiedadesAlquiler) {
      var slides = propiedadesAlquiler.map(function(image) {
        return(
          `<div class="propiedad__slide">
            <div class="propiedad__image">
              <img src="${image}"/>
            </div>
          </div>`
        )        
      })
     
      return slides;
    };

    function generatePropiedadesHtml(propiedadesAlquiler, page) {
      var propiedadesContainer = $('.propiedades__container');

      var propiedadesEnAlquiler;

      if(propiedadesAlquiler.fichas) {
        propiedadesEnAlquiler = propiedadesAlquiler.fichas.map(function(propiedad, index) {
          return(
            `<div class="col-24 col-md-8">
              <div class="venta__propiedades__propiedad">
                <a href="/alquiler-detalle?id=${propiedad.in_num}" class="propiedad">
                  <div class="_slider propiedad__slider">
                    ${sliderImages(propiedadesAlquiler.img[index])}
                  </div>
                  <div class="propiedad__content">
                    <div class="propiedad__content-group">
                      <h4 class="propiedad__type">${propiedad.tipo}</h4>
                      <h3 class="propiedad__address">${propiedad.direccion_completa}</h3>
                    </div>
                    <div class="propiedad__group">
                      <div class="propiedad__wrapper">
                        <div class="propiedad__wrapper-group"><img src="/images/square-meter-icon.png"/><span>mts2</span></div>
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
      } else {
        propiedadesEnAlquiler =
        `<div class="col-24">
          <p class="venta__propiedades__text">No se encontraron propiedades</p>
        </div>`
      }

      propiedadesContainer.append(propiedadesEnAlquiler);

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

module.exports = Alquiler;
