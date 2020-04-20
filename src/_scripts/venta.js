'use strict';

var Properties = require('./properties');
var Pagination = require('./pagination');

// Constructor
var Venta = function(phpRootPath, enviroment) {
  var context = $('.venta');
  
  if(context.length > 0) {
    var propiedadesVenta = {};
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var arrowLeft = $('.-js-arrow-left');
    var arrowRight = $('.-js-arrow-right');
    var operacionUrl = 'venta';
    var operacionPHP = 'V';
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
        return `${phpRootPath}/propiedades.php?data=${operacionUrl}&tipo_operacion=${operacionPHP}&page=${currentPage}${paramsConstructor(paramsInUrl)}`;
      } else {
        return `/propiedades.php?data=${operacionUrl}&tipo_operacion=${operacionPHP}&page=${currentPage}&${paramsConstructor(paramsInUrl)}`;
      }
    }

    $.when(
      Properties.get(url())
    ).done(function(data) {
      propiedadesVenta = JSON.parse(data);
      var page = propiedadesVenta.resultado.datos.SiguientePag !== "" ? propiedadesVenta.resultado.datos.SiguientePag - 1 : propiedadesVenta.resultado.datos.paginas;

      console.log(propiedadesVenta);

      generatePropiedadesHtml(propiedadesVenta.resultado);
      Pagination.generate(propiedadesVenta.resultado.datos.paginas, page, 'venta');

      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');


      if(page === 1) {
        arrowLeft.addClass('-disabled');
      }
      
      if(page === propiedadesVenta.resultado.datos.paginas) {
        arrowRight.addClass('-disabled');
      }
    });

    
    arrowLeft.on('click', function(e) {
      e.preventDefault();
      var navigationPage = parseInt(currentPage) - 1;
      var arrowsNavUrl = `/${operacion}/index.html?page=${navigationPage}${paramsConstructor(paramsInUrl)}`;
      window.location.href = arrowsNavUrl;
    })

    arrowRight.on('click', function(e) {
      e.preventDefault();
      var navigationPage = parseInt(currentPage) + 1;
      var arrowsNavUrl = `/${operacion}/index.html?page=${navigationPage}${paramsConstructor(paramsInUrl)}`;
      window.location.href = arrowsNavUrl;
    })

    var sliderImages = function(propiedadesVenta) {
      var propiedadesArray = [propiedadesVenta]; 

      var slides = propiedadesArray.map(function(image) {
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

    function generatePropiedadesHtml(propiedadesVenta) {
      var propiedadesContainer = $('.venta__propiedades__container');

      var propiedadesEnVenta;

      if(propiedadesVenta.fichas && propiedadesVenta.fichas.length > 0) {
        propiedadesEnVenta = propiedadesVenta.fichas.map(function(propiedad, index) {
          return(
            `<div class="col-24 col-md-8">
              <div class="venta__propiedades__propiedad">
                <a href="/venta-detalle/index.html?id=${propiedad.in_num}" class="propiedad">
                  <div class="_slider propiedad__slider">
                    ${sliderImages(propiedadesVenta.img[index])}
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
        propiedadesEnVenta =
        `<div class="col-24">
          <p class="venta__propiedades__text">No se encontraron propiedades</p>
        </div>`
      }

      propiedadesContainer.append(propiedadesEnVenta);

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

module.exports = Venta;
