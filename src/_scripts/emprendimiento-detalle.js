'use strict';

var Properties = require('./properties');

// Constructor
var EmprendimientoDetalle = function(phpRootPath, enviroment) {
  var context = $('.-js-emprendimiento-detalle');
  
  if(context.length > 0) {
    var emprendimiento = {};    
    var loadingScreen = $('.loading-screen');
    var body = $('body');
    var sliderContainer = $('.emprendimiento-detalle__main-image');
    var id = new URL(window.location.href).searchParams.get('id');
    var detailsWrapper = $('.emprendimiento-detalle__details__wrapper');
    var rowContainer = $('.emprendimiento-detalle__details__row-container');
    var detallesContainer = $('.-js-detalles-container');
    var caracteristicasContainer = $('.-js-caracteristicas-container');
    var formaDePagoContainer = $('.-js-forma-de-pago-container');
    var propertiesImagesContainer = $('.-js-other-properties');
    var targets = $('[data-target]');
    var contents = $('[data-content]');
    var operacion = 'emprendimiento';
    var direccionInput = $('#propiedad-direccion');
    var operacionInput = $('#propiedad-operacion');

    console.log(id);
    var url = function() {
      if(enviroment === "dev") {
        return `${phpRootPath}/propiedades.php?data=emprendimiento&ficha=${id}`;
      } else {
        return `/propiedades.php?data=emprendimiento&ficha=${id}`;
      }
    }

    $.when(
      Properties.get(url())
    ).done(function(data) {

      emprendimiento = JSON.parse(data);

      console.log(emprendimiento);

      loadingScreen.addClass('-hide');
      body.removeClass('-hideOverflow');

      sliderHtml(emprendimiento);
      innerHtmlContent(emprendimiento);

      detallesContainer.append(detallesHtmlStructure(emprendimiento));

      targets.first().addClass('-active');
      contents.first().addClass('-active');
  
      rowContainer.height(detailsWrapper.height() + 60);

      caracteristicasContainer.append(caracteristicasHtmlStructure(emprendimiento));
      formaDePagoContainer.append(formaDePagoHtmlStructure(emprendimiento));

      direccionInput.val(emprendimiento.resultado.emprendimiento[0].ed_nom);
      operacionInput.val(operacion);
    });

    // $.when(
    //   Properties.get(`/propiedades.php?data=${operacion}&tipo_operacion=${operacion}&page=1`)
    // ).done(function(data) {
    //   properties = JSON.parse(data);
    //   console.log('properties', properties);

    //   otherPropertiesHtml(properties, operacion);
    // });

    function sliderHtml(propiedad) {

      var sliderMain = 
        `<div class="_slider emprendimiento-detalle__slider">
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

      if(propiedad.resultado.img[0][0].length > 0) {
        sliderImagesHtml = propiedad.resultado.img[0].map(function(image) {
          console.log()
          return(
            `<div class="emprendimiento-detalle__slide">
                <img src="${image}"/>
              </div>`
          )
        })
      } else {
        sliderImagesHtml =
          `<div class="emprendimiento-detalle__slide">
            <img src="${propiedad.resultodo.ficha[0].img_princ}"/>
          </div>`
      }

      console.log(propiedad.resultado.img[0].length);
      return sliderImagesHtml;
    }

    function innerHtmlContent(propiedad) {
      // var operationType = $('.-js-type');
      var description = $('.-js-description');
      var address = $('.-js-address');
      // var price = $('.-js-price');
      // var size = $('.-js-size');
      // var rooms = $('.-js-rooms');
      // var bathrooms = $('.-js-bathrooms');
      var fullDescription = $('.-js-full-description');

      // operationType.html(propiedad.resultado.ficha[0].operacion);
      description.html(propiedad.resultado.emprendimiento[0].tipo);
      address.html(propiedad.resultado.emprendimiento[0].ed_nom);
      // price.html(propiedad.resultado.ficha[0].precio);
      // size.html(propiedad.resultado.ficha[0].in_cub);
      // rooms.html(propiedad.resultado.ficha[0].ambientes);

      // if(propiedad.resultado.ficha[0].in_bao !== "") {
      //   bathrooms.html(propiedad.resultado.ficha[0].in_bao);
      // } else {
      //   bathrooms.html('1');
      // }
      var description = `${propiedad.resultado.emprendimiento[0].ed_asp !== "" ? propiedad.resultado.emprendimiento[0].ed_asp  + '<br/><br/>' : ""}${propiedad.resultado.emprendimiento[0].ed_pre !== "" ? propiedad.resultado.emprendimiento[0].ed_pre  + '<br/><br/>' : ""}${propiedad.resultado.emprendimiento[0].ed_cue !== "" ? propiedad.resultado.emprendimiento[0].ed_cue  + '<br/><br/>' : ""}`;
      fullDescription.html(description);
    }

    function detallesHtmlStructure(propiedad) {
      var descriptionHtml = `
        <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
          <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Nombre</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_nom}</p>
          </div>
        </div>
        ${propiedad.resultado.emprendimiento[0].ed_cat && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Categoria</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_cat}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].tipo && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Tipo</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].tipo}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].ed_est && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Estado</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_est}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].ed_loc && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Localidad</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_loc}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].ed_pos && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Posesión y entrega</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_pos}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].ed_bar && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Barrio</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_bar}</p>
          </div>
        </div>`}
        ${propiedad.resultado.emprendimiento[0].ed_des && `
          <div class="col-24 col-md-12 propiedad-detalle__details__background-color">
            <div class="propiedad-detalle__details__group">
            <h3 class="propiedad-detalle__details__group-title">Ambientes</h3>
            <p class="propiedad-detalle__details__group-text">${propiedad.resultado.emprendimiento[0].ed_des}</p>
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
        case "SUM":
          iconClass = "mlm-sum";
          break;
        case "Solarium":
          iconClass = "mlm-solarium";
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

      if(propiedad.resultado.caracteristicas && propiedad.resultado.caracteristicas.length > 0) {
        caracteristicasHtml = propiedad.resultado.caracteristicas.map(function(caracteristica) {
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

    function formaDePagoHtmlStructure(propiedad) {
      var medidasHtml;

      if(propiedad.resultado.emprendimiento && propiedad.resultado.emprendimiento.length > 0) {
        medidasHtml = propiedad.resultado.emprendimiento.map(function(item, index) {
          return(
            `<div class="col-24 col-md-8">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--medidas">
                <h3 class="propiedad-detalle__details__group-title">Porcentaje Boleto</h3>
                <p class="propiedad-detalle__details__group-text propiedad-detalle__details__group-text--medidas">${item.porcentaje_boleto}</p>
              </div>
            </div>
            <div class="col-24 col-md-8">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--medidas">
                <h3 class="propiedad-detalle__details__group-title">Porcentaje Cuotas</h3>
                <p class="propiedad-detalle__details__group-text propiedad-detalle__details__group-text--medidas">${item.porcentaje_cuotas}</p>
              </div>
            </div>
            <div class="col-24 col-md-8">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--medidas">
                <h3 class="propiedad-detalle__details__group-title">Cantidad Cuotas</h3>
                <p class="propiedad-detalle__details__group-text propiedad-detalle__details__group-text--medidas">${item.cantidad_cuotas}</p>
              </div>
            </div>
            <div class="col-24">
              <div class="propiedad-detalle__details__group propiedad-detalle__details__group--medidas">
                <h3 class="propiedad-detalle__details__group-title propiedad-detalle__details__group-title--emprendimiento">${item.ed_fpa}</h3>
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

module.exports = EmprendimientoDetalle;
