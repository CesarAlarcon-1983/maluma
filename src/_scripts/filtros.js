'user strict'

var Properties = require('./properties');

var Filtros = function(phpRootPath, enviroment) {
  var contextVenta = $('.venta');
  var contextAlquiler = $('.alquiler');
  var contextHome = $('.home');
  // var contextEmprendimiento = $('.home');
  
  // if (contextVenta.length > 0 || contextAlquiler.length > 0 || contextHome.length > 0 || contextEmprendimiento.length > 0) {
  if (contextVenta.length > 0 || contextAlquiler.length > 0 || contextHome.length > 0) {
    var barriosData = {}
    var barriosContainer = $('.-js-barrios');
    var tipoInmuebleContainer = $('.-js-inmueble');
    var tipoOperacionInput = $('input[name=operacion]');
    var currencyInput = $('input[name=currency]')
    var pesosGroup = $('.-js-pesos-group');
    

    $(tipoOperacionInput[0]).attr('checked', true)
    $(currencyInput[0]).attr('checked', true)
    pesosGroup.attr('hidden', true);


    var operacion = function() {
      if(window.location.href.indexOf('venta') > 0 || window.location.href.indexOf('alquiler') > 0) {
        return (window.location.href.indexOf('venta') > 0 ? 'venta' : 'alquiler');
      } else {
        return ($(tipoOperacionInput[0]).is(':checked') ? 'venta' : 'alquiler');
      }
    }

    tipoOperacionInput.on("change", function() {
      if($(tipoOperacionInput[0]).is(':checked')) {
        pesosGroup.attr("hidden", true);
      } else {
        pesosGroup.removeAttr("hidden");
      }
    })

    var barriosUrl = function() {
      if(enviroment === "dev") {
        return phpRootPath + '/propiedades.php?data=barrios&in_bar';
      } else {
        return '/propiedades.php?data=barrios&in_bar';
      }
    }

    $.when(
      Properties.get(barriosUrl())
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
      var tipoFilterHtml = data.map(function(inmueble) {
          if(inmueble.descripcion !== 'INDISTINTO') {
              return(
                `${inmueble.descripcion ? `<option>${inmueble.descripcion}</option>` : ""}`
              )
          }
      })

      tipoFilterHtml.splice(3, 0, '<option>PH</option>');
      tipoFilterHtml.push('<option>Venta en pozo</option>');

      return tipoFilterHtml;
    }

    var inmuebleSelect = $('.-js-inmueble');
    var tipoInmueble = "";

    var barrioSelect = $('.-js-barrios');     
    var barrio = '';

    var moneda = function() {
        return ($(currencyInput[0]).is(':checked') ? 'U$S' : '$');
    }

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
      if(ambientesSelect.val() === 7){
        ambientes = '7A';
      } else {
        ambientes = ambientesSelect.val().slice(0,3).replace(/\ /g,'');
      }
    })

    var filtersButton = $('.-js-filtros-submit');
      
    filtersButton.on('click', function(e) {
      e.preventDefault();
      // window.location.href = `/${operacion()}/?page=1${tipoInmueble !== '' ? "&tipo=" + tipoInmueble : ""}${barrio !== '' ? "&barrio=" + barrio : ""}${ambientesMin !== '' ? "&ambientesMin=" + ambientesMin : ""}${ambientesMax !== '' ? "&ambientesMax=" + ambientesMax : ""}&moneda=${moneda()}&min=${valorMinimoSelect.val()}&max=${valorMaximoSelect.val()}`;
      window.location.href = `/${operacion()}/?page=1${tipoInmueble !== '' ? "&tipo=" + tipoInmueble : ""}${barrio !== '' ? "&barrio=" + barrio : ""}${ambientes !== '' ? "&ambientes=" + ambientes : ""}&moneda=${moneda()}&min=${valorMinimoSelect.val()}&max=${valorMaximoSelect.val()}`;
    })
  }
}

module.exports = Filtros;