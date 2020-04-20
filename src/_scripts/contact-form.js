'use strict';

// Constructor
var ContactForm = function() {
    // Propiedad input classes
    var propertyContactName = $('.-js-property-contact-nombre');
    var propertyContactMail = $('.-js-property-contact-mail');
    var propertyContactTelefono = $('.-js-property-contact-telefono');
    var propertyContactMensaje = $('.-js-property-contact-mensaje');
    var propertyContactSubmitButton = $('.-js-property-contact-submit-button');
    var inputError = $('.propiedad-detalle__form__error');
    var propertyFormInputs = $('.propiedad-detalle__form__input');

    // Contacto input classes
    var contactFormInputs = $('.-js-contact-input');
    var contactInputError = $('.contacto__mensaje__form-error');
    var contactFormButton = $('.contacto__mensaje__form-button');

    // Tasaciones input classes
    var tasacionesFormInputs = $('.-js-tasaciones-input');
    var tasacionesInputError = $('.tasaciones__details__form-error');
    var tasacionesFormButton = $('.tasaciones__details__form-button');


    propertyFormInputs.on('change', function() {
        var isValid = validatePropertyForm();

        if(isValid) {
            propertyContactSubmitButton.removeAttr('disabled');
        } else {
            propertyContactSubmitButton.attr('disabled', true);
        }
    })

    function validateEmail(mail) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
    }

    function validatePropertyForm()  {
        var validInputs = 0;

        if(propertyContactName.val() !== "") {
            validInputs++;
        }

        if(propertyContactMail.val() !== "") {
            if(!validateEmail(propertyContactMail.val())) {
                inputError.addClass('-show');
                return;
            } else {
                inputError.removeClass('-show');
            }

            validInputs++;
        }


        if(propertyContactTelefono.val() !== "") {
            validInputs++;
        }

        if(propertyContactMensaje.val() !== "") {
            validInputs++;
        }

        console.log(validInputs);

        return validInputs === 4;
    }

    function getPropertyFormData() {
        var name = propertyContactName.val();
        var mail = propertyContactMail.val();
        var telefono = propertyContactTelefono.val();
        var mensaje = propertyContactMensaje.val();
        var operacion = $('#propiedad-operacion').val();
        var direccion = $('#propiedad-direccion').val();
        var subject = `Consulta sobre propiedad en ${operacion} ubicada en ${direccion}`

        var data = {
            name: name,
            mail: mail,
            subject: subject,
            telefono: telefono,
            mensaje: mensaje,
        }

        return data;
    }

    function sendPropertyConfirmByEmail(data) {
        $.ajax({
            type: "POST",
            url: '/consulta.php',
            crossDomain: true,
            data: {            
                inputName: data.name,
                inputEmail: data.mail,
                subject: data.subject,
                inputPhone: data.telefono,
                message: data.mensaje
            }
        }).done(function(response) {
            console.log('success AJAX', response);
            // if(response === 'success') {
            // }
        }).fail(function(response) {
            console.log('fail', response);
        });
    }

    propertyContactSubmitButton.on('click', function(e) {
        e.preventDefault();
        var dataForMail = getPropertyFormData();
        console.log(dataForMail);

        sendPropertyConfirmByEmail(dataForMail);
    });

    function validateContactForm()  {
        var validInputs = 0;

        for(var i = 0; i < contactFormInputs.length; i++) {
            if($(contactFormInputs[i]).attr('name') !== "mail") {
                if($(contactFormInputs[i]).val() !== "") {
                    validInputs++;
                } else {
                    return false;
                }
            } else {
                if($(contactFormInputs[i]).val() === "") {
                    return false;
                } else if(!validateEmail($('[name=mail]').val())) {
                    contactInputError.addClass('-show');
                } else {
                    contactInputError.removeClass('-show');
                    validInputs++;
                }
            }
        }

        console.log(validInputs);

        return validInputs === contactFormInputs.length;
    }


    function getContactFormData() {
        var contactData = {};

        for(var i = 0; i < contactFormInputs.length; i++) {
            contactData[$(contactFormInputs[i]).attr('name')] = $(contactFormInputs[i]).val();
        }

        return contactData;
    }

    function sendContactConfirmByEmail(data) {
        $.ajax({
            type: "POST",
            url: '/contacto.php',
            crossDomain: true,
            data: data
        }).done(function(response) {
            console.log('success AJAX', response);
            // if(response === 'success') {
            // }
        }).fail(function(response) {
            console.log('fail', response);
        });
    }

    contactFormInputs.on('focusout', function() {
        var isValid = validateContactForm();

        if(isValid) {
            contactFormButton.removeAttr('disabled');
        } else {
            contactFormButton.attr('disabled', true);
        }
    })

    contactFormButton.on('click', function(e) {
        e.preventDefault();
        var dataForMail = getContactFormData();
        console.log(dataForMail);

        sendContactConfirmByEmail(dataForMail);
    });

    // Tasaciones Form Logic
    function getTasacionesFormData() {
        var contactData = {};

        for(var i = 0; i < tasacionesFormInputs.length; i++) {
            contactData[$(tasacionesFormInputs[i]).attr('name')] = $(tasacionesFormInputs[i]).val();
        }

        return contactData;
    }

    function validateTasacionesForm()  {
        var validInputs = 0;

        for(var i = 0; i < tasacionesFormInputs.length; i++) {
            if($(tasacionesFormInputs[i]).attr('name') !== "mail") {
                if($(tasacionesFormInputs[i]).val() !== "") {
                    validInputs++;
                } else {
                    return false;
                }
            } else {
                if($(tasacionesFormInputs[i]).val() === "") {
                    return false;
                } else if(!validateEmail($('[name=mail]').val())) {
                    tasacionesInputError.addClass('-show');
                } else {
                    tasacionesInputError.removeClass('-show');
                    validInputs++;
                }
            }
        }

        console.log(validInputs);

        return validInputs === tasacionesFormInputs.length;
    }

    tasacionesFormInputs.on('focusout', function() {
        var isValid = validateTasacionesForm();

        if(isValid) {
            tasacionesFormButton.removeAttr('disabled');
        } else {
            tasacionesFormButton.attr('disabled', true);
        }
    })

    tasacionesFormButton.on('click', function(e) {
        e.preventDefault();
        var dataForMail = getTasacionesFormData();
        console.log(dataForMail);

        sendTasacionesConfirmByEmail(dataForMail);
    });

    function sendTasacionesConfirmByEmail(data) {
        $.ajax({
            type: "POST",
            url: '/tasaciones.php',
            crossDomain: true,
            data: data
        }).done(function(response) {
            console.log('success AJAX', response);
            // if(response === 'success') {
            // }
        }).fail(function(response) {
            console.log('fail', response);
        });
    }

}

module.exports = ContactForm;
