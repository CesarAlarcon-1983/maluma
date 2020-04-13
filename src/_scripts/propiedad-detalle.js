'use strict';

var Properties = require('./properties');

// Constructor
var PropiedadDetalle = function(phpRootPath, enviroment) {
  var context = $('.-js-propiedad-detalle');
  
  if(context.length > 0) {
    var dataPropiedades = {};    
    var properties = {};    
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var sliderContainer = $('.propiedad-detalle__main-image');
    var id = new URL(window.location.href).searchParams.get('id');
    var detailsWrapper = $('.propiedad-detalle__details__wrapper');
    var rowContainer = $('.propiedad-detalle__details__row-container');
    var detallesContainer = $('.-js-detalles-container');
    var caracteristicasContainer = $('.-js-caracteristicas-container');
    var medidasContainer = $('.-js-medidas-container');
    var propertiesImagesContainer = $('.-js-other-properties');
    var targets = $('[data-target]');
    var contents = $('[data-content]');
    var operacion = window.location.href.indexOf('venta-detalle') > 0 ? 'venta' : 'alquiler';
    var direccionInput = $('#propiedad-direccion');
    var operacionInput = $('#propiedad-operacion');

    var url = function() {
      if(enviroment === "dev") {
        return `${phpRootPath}/propiedades.php?data=propiedad&ficha=${id}`;
      } else {
        return `/propiedades.php?data=propiedad&ficha=${id}`;
      }
    }

    $.when(
      Properties.get(url())
    ).done(function(data) {
      dataPropiedades = JSON.parse(data);

      console.log(dataPropiedades);

      sliderHtml(dataPropiedades);
      innerHtmlContent(dataPropiedades);

      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');

      detallesContainer.append(detallesHtmlStructure(dataPropiedades));

      targets.first().addClass('-active');
      contents.first().addClass('-active');
  
      rowContainer.height(detailsWrapper.height() + 60);

      caracteristicasContainer.append(caracteristicasHtmlStructure(dataPropiedades));
      medidasContainer.append(medidasHtmlStructure(dataPropiedades));

      direccionInput.val(dataPropiedades.resultado.ficha[0].direccion);
      operacionInput.val(operacion);
    });

    $.when(
      Properties.get(`/propiedades.php?data=${operacion}&tipo_operacion=${operacion}&page=1`)
    ).done(function(data) {
      properties = JSON.parse(data);
      console.log('properties', properties);

      otherPropertiesHtml(properties, operacion);
    });

    function sliderHtml(propiedad) {

      var sliderMain = 
        `<div class="_slider propiedad-detalle__slider">
          ${sliderImagesStructure(propiedad)}
        </div>`;

        sliderContainer.append(sliderMain);

        var slider = $('._slider');

        slider.each(function(){
          $(this).slick({
              dots: true,
              fade: true,
              arrows:  true,
              autoplay: false
        });
      });
    }

    function sliderImagesStructure(propiedad) {
      var sliderImagesHtml;

      if(propiedad.resultado.img.length > 0) {
        sliderImagesHtml = propiedad.resultado.img.map(function(image) {
          return(
            `<div class="propiedad-detalle__slide">
                <img src="${image}"/>
              </div>`
          )
        })
      } else {
        sliderImagesHtml =`<div class="propiedad-detalle__slide">
          <img src="${propiedad.resultodo.ficha[0].img_princ}"/>
        </div>`
      }

      console.log(propiedad.resultado.img.length);
      return sliderImagesHtml;
    }

    function innerHtmlContent(propiedad) {
      var operationType = $('.-js-type');
      var description = $('.-js-description');
      var address = $('.-js-address');
      var price = $('.-js-price');
      var size = $('.-js-size');
      var rooms = $('.-js-rooms');
      var bathrooms = $('.-js-bathrooms');
      var fullDescription = $('.-js-full-description');

      operationType.html(propiedad.resultado.ficha[0].operacion);
      description.html(propiedad.resultado.ficha[0].titulo);
      address.html(propiedad.resultado.ficha[0].direccion);
      price.html(propiedad.resultado.ficha[0].precio);
      size.html(propiedad.resultado.ficha[0].in_cub);
      rooms.html(propiedad.resultado.ficha[0].ambientes);

      if(propiedad.resultado.ficha[0].in_bao !== "") {
        bathrooms.html(propiedad.resultado.ficha[0].in_bao);
      } else {
        bathrooms.html('1');
      }
      
      var descriptionFormated = propiedad.resultado.ficha[0].in_obs;

      fullDescription.html($('<div />').html(descriptionFormated).text().toLowerCase());
    }

    function detallesHtmlStructure(propiedad) {
      var descriptionHtml = `
        <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
          <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Operación</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].operacion}</p>
          </div>
        </div>
        ${propiedad.resultado.ficha[0].in_loc && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Localidad</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_loc}</p>
          </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_bar && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Barrio</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_bar}</p>
          </div>
        </div>`}
        ${propiedad.resultado.ficha[0].direccion && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Dirección</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].direccion}</p>
          </div>
        </div>`}
        ${propiedad.resultado.ficha[0].ambientes && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Ambientes</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].ambientes}</p>
          </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_ant && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Atigüedad</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_ant}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_npi && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Pisos</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_npi}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_agu && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Agua caliente</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_agu}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_gas && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Gas</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_gas}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_ale && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Calefacción</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_ale}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_bao && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Baños</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_bao}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].in_esa && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Estado</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].in_esa}</p>
            </div>
        </div>`}
        ${propiedad.resultado.ficha[0].garage && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
              <h3 class="propiedad-detalle__details__group-title">Cocheras</h3>
              <p class="propiedad-detalle__details__group-text">${propiedad.resultado.ficha[0].garage}</p>
            </div>
        </div>`}
      `;

      return descriptionHtml;
    }

    function iconSelector(caracteristica) {
      var iconClass = "";

      switch (caracteristica) {
        case "Aire acondicionado":
          iconClass = "mlm-aire-acondicionado";
          break;
        case "Alarma":
          iconClass = "mlm-alarma";
          break;
        case "Calefaccion":
          iconClass = "mlm-calefaccion";
          break;
        case "Motores":
          iconClass = "mlm-motores";
          break;
        case "Parrilla":
          iconClass = "mlm-parrilla";
          break;
        case "Quincho":
          iconClass = "mlm-quincho";
          break;
        case "Termotanque":
          iconClass = "mlm-termotanque";
          break;
        case "Cocina":
          iconClass = "mlm-cocina";
          break;
        case "Dormitorio en suite":
          iconClass = "mlm-dormitorio-suite";
          break;
        case "Jardin":
          iconClass = "mlm-jardin";
          break;
        case "Lavadero":
          iconClass = "mlm-lavadero";
          break;
        case "Living comedor":
          iconClass = "mlm-living-comedor";
          break;
        case "Patio":
          iconClass = "mlm-patio";
          break;
        case "Terraza":
          iconClass = "mlm-terraza";
          break;
        case "Agua corriente":
          iconClass = "mlm-agua-corriente";
          break;
        case "Gas Natural":
          iconClass = "mlm-gas-natural";
          break;
        case "Luz":
          iconClass = "mlm-luz";
          break;
        default:
          iconClass = "mlm-check";
      }

      return iconClass;
    }

    function caracteristicasHtmlStructure(propiedad) {
      var caracteristicasHtml;

      if(propiedad.resultado.caracteristicas_generales_personalizadas && propiedad.resultado.caracteristicas_generales_personalizadas.length > 0) {
        caracteristicasHtml = propiedad.resultado.caracteristicas_generales_personalizadas.map(function(caracteristica) {
          return(
            `<div class="col-24 col-md-6">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--caracteristicas">
                <i class=${iconSelector(caracteristica)}></i>
                <p class="propiedad-detalle__details__group-text">${caracteristica}</p>
              </div>
            </div>`
          )
        })
      } else {
        caracteristicasHtml = 
          `<div class="col-24">
            <div class="propiedad-detalle__details__contact-wrapper">
              <p class="propiedad-detalle__details__contact-text">Para más informacion, contactar a la inmobiliaria:</p>
              <div class="propiedad-detalle__details__contact-phones">
                <i class="fa fa-mobile"></i>
                <div class="propiedad-detalle__details__group-wrapper">
                  <a class="propiedad-detalle__details__contact-text" href="tel:4641-4702">4641-4702</a>
                  <a class="propiedad-detalle__details__contact-text" href="tel:4641-4246">4641-4246</a>
                  <a class="propiedad-detalle__details__contact-text" href="tel:4644-0337">4644-0337</a>
                </div>
              </div>
              <div class="propiedad-detalle__details__contact-mail">
                <i class="fa fa-envelope-o"></i>
                <a class="propiedad-detalle__details__contact-text" href="mailto:malumapropiedades@gmail.com" target="_blank">malumapropiedades@gmail.com</a>
              </div>
            </div>
          </div>`
      }

      return caracteristicasHtml;
    }

    function medidasHtmlStructure(propiedad) {
      var medidasHtml;

      console.log(propiedad.resultado.superficie.cantidad);

      if(propiedad.resultado.superficie.cantidad && propiedad.resultado.superficie.cantidad > 0) {
        medidasHtml = propiedad.resultado.superficie.title.map(function(medida, index) {
          return(
            `<div class="col-24 col-md-12">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--medidas">
                <h3 class="propiedad-detalle__details__group-title">${medida}</h3>
                <p class="propiedad-detalle__details__group-text propiedad-detalle__details__group-text--medidas">${propiedad.resultado.superficie.dato[index]}</p>
              </div>
            </div>`
          )
        })
      } else {
        medidasHtml = 
          `<div class="col-24">
            <div class="propiedad-detalle__details__contact-wrapper">
              <p class="propiedad-detalle__details__contact-text">Para más informacion, contactar a la inmobiliaria:</p>
              <div class="propiedad-detalle__details__contact-phones">
                <i class="fa fa-mobile"></i>
                <div class="propiedad-detalle__details__group-wrapper">
                  <a class="propiedad-detalle__details__contact-text" href="tel:4641-4702">4641-4702</a>
                  <a class="propiedad-detalle__details__contact-text" href="tel:4641-4246">4641-4246</a>
                  <a class="propiedad-detalle__details__contact-text" href="tel:4644-0337">4644-0337</a>
                </div>
              </div>
              <div class="propiedad-detalle__details__contact-mail">
                <i class="fa fa-envelope-o"></i>
                <a class="propiedad-detalle__details__contact-text" href="mailto:malumapropiedades@gmail.com" target="_blank">malumapropiedades@gmail.com</a>
              </div>
            </div>
          </div>`
      }

      return medidasHtml;
    }

    function otherPropertiesHtml(properties, operacion) {
      var propertiesHtml = "";

      if(properties.resultado.img && properties.resultado.img.length > 0) {
        propertiesHtml = properties.resultado.img.map(function(propertyImage, index) {
          return(
            `<a class="propiedad-detalle__others__image" href="/${operacion}-detalle/index.html?id=${properties.resultado.fichas[index].in_num}">
              <img src=${propertyImage}/>
            </a>`
          )
        })
      }      

      propertiesImagesContainer.append(propertiesHtml);
    }
  }
};

module.exports = PropiedadDetalle;
