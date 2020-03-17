'user strict'

var Properties = require('./properties');

var Filtros = function() {
  var contextVenta = $('.venta');
  var contextAlquiler = $('.alquiler');
  var contextHome = $('.home');

  if (contextVenta.length > 0 || contextAlquiler.length > 0 || contextHome.length > 0) {
    var barrios = '/propiedades.php?data=barrios&in_bar';
    var barriosData = {}
    var barriosContainer = $('.-js-barrios');
    var tipoInmuebleContainer = $('.-js-inmueble');
    var tipoOperacionInput = $('#radio1');

    var operacion = function() {
      if(window.location.href.indexOf('venta') > 0 || window.location.href.indexOf('alquiler') > 0) {
        return (window.location.href.indexOf('venta') > 0 ? 'venta' : 'alquiler');
      } else {
        return (tipoOperacionInput.is(':checked') ? 'venta' : 'alquiler');
      }
    }

    $.when(
      Properties.get(barrios)
    ).done(function(data) {
      barriosData = JSON.parse(data);
      console.log('barrios data', barriosData);

      barriosContainer.append(barriosFilterStructure(barriosData.resultado.barrio));
      tipoInmuebleContainer.append(tipoInmuebleFilterStructure(barriosData.resultado.tipo));
    })

    function barriosFilterStructure(data) {
      var barriosFilterHtml = data.map(function(barrio) {
          return(
            `${barrio.data ? `<option>${barrio.data}</option>` : ""}`
          )
      })

      return barriosFilterHtml;
    }

    function tipoInmuebleFilterStructure(data) {
      var barriosFilterHtml = data.map(function(inmueble) {
          if(inmueble.descripcion !== 'INDISTINTO') {
              return(
                `${inmueble.descripcion ? `<option>${inmueble.descripcion}</option>` : ""}`
              )
          }
      })

      return barriosFilterHtml;
    }

    var inmuebleSelect = $('.-js-inmueble');
    var tipoInmueble = "";

    var barrioSelect = $('.-js-barrios');     
    var barrio = '';

    var ambientesSelect = $('.-js-ambientes');
    var ambientes = '';

    var valorMinimoSelect = $('.-js-minimo');

    var valorMaximoSelect = $('.-js-maximo');
   
    inmuebleSelect.on('change', function() {
      tipoInmueble = inmuebleSelect.val();
    })

    barrioSelect.on('change', function() {
      barrio = barrioSelect.val();
    })

    ambientesSelect.on('change', function() {
      ambientes = ambientesSelect.val().charAt(0);
    })

    var filtersButton = $('.-js-filtros-submit');
      
    filtersButton.on('click', function(e) {
      e.preventDefault();
      // console.log(operacion());
      window.location.href = `/${operacion()}/?page=1${tipoInmueble.length > 0 ? "&tipo=" + tipoInmueble : ""}${barrio.length > 0 ? "&barrio=" + barrio : ""}${ambientes.length > 0 ? "&ambientes=" + ambientes : ""}&min=${valorMinimoSelect.val()}&max=${valorMaximoSelect.val()}`;
    })
  }
}

module.exports = Filtros;