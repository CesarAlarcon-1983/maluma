'use strict';

var Properties = require('./properties');
var Pagination = require('./pagination');

// Constructor
var Emprendimiento = function(phpRootPath, enviroment) {
  var context = $('.emprendimientos');
  
  if(context.length && context.length > 0) {
    var emprendimientos = {};
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var arrowLeft = $('.-js-arrow-left');
    var arrowRight = $('.-js-arrow-right');
    var operacion = 'emprendimientos';
    var currentPage = new URL(window.location.href).searchParams.get('page');

    body.addClass('-hideOverflow');

    var getParams = function(url) {
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
        return `${phpRootPath}/propiedades.php/?data=${operacion}${paramsConstructor(paramsInUrl)}`;
      } else {
        return `/propiedades.php/?data=${operacion}${paramsConstructor(paramsInUrl)}`;
      }
    }

    console.log(url());

    $.when(
      Properties.get(url())
    ).done(function(data) {
      emprendimientos = JSON.parse(data);

      console.log(emprendimientos);

      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');

      var totalEmprendimientos = emprendimientos.resultado.emprendimiento.length;
      var totalPages = Math.ceil(totalEmprendimientos / 12);  
      var page = currentPage;

      console.log(page)
      
      generatePropiedadesHtml(emprendimientos.resultado);
      Pagination.generate(totalPages, parseInt(page), 'emprendimientos');

      if(page === 1) {
        arrowLeft.addClass('-disabled');
      }
      
      if(page === totalPages) {
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

    var sliderImages = function(emprendimientos) {
      var propiedadesArray = [emprendimientos]; 

      console.log(propiedadesArray)

      var slides = propiedadesArray[0].map(function(image) {
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

    function generatePropiedadesHtml(emprendimientos) {
      var emprendimientosContainer = $('.emprendimientos__propiedades__container');

      var emprendimientosDisponibles;

      if(emprendimientos.emprendimiento && emprendimientos.emprendimiento.length > 0) {
        emprendimientosDisponibles = emprendimientos.emprendimiento.map(function(emprendimiento, index) {
          return(
            `<div class="col-24 col-md-8">
              <div class="venta__propiedades__propiedad">
                <a href="/emprendimiento-detalle?id=${emprendimiento.ed_idl}" class="propiedad">
                  <div class="_slider propiedad__slider">
                    ${sliderImages(emprendimientos.img[0])}
                  </div>
                  <div class="propiedad__content">
                    <div class="propiedad__content-group">
                      <h4 class="propiedad__type">${emprendimiento.tipo}</h4>
                      <h3 class="propiedad__address">${emprendimiento.ed_nom}</h3>
                    </div>
                    <div class="propiedad__group">
                      <div class="propiedad__wrapper">
                        <div class="propiedad__wrapper-group">
                          <span class="-emprendimiento">${emprendimiento.ed_est}</span>
                        </div>
                      </div>
                      <div class="propiedad__price"><span>Consultar</span></div>
                    </div>
                  </div>
                </a>
              </div>
            </div>`
          );
        });
      } else {
        emprendimientosDisponibles =
        `<div class="col-24">
          <p class="venta__propiedades__text">No se encontraron propiedades</p>
        </div>`
      }

      emprendimientosContainer.append(emprendimientosDisponibles);

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

module.exports = Emprendimiento;
