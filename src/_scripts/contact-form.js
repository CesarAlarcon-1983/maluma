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

        var data = {
            name: name,
            mail: mail,
            telefono: telefono,
            mensaje: mensaje,
        }

        return data;
    }

    function sendPropertyConfirmByEmail(data) {
        $.ajax({
            type: "POST",
            url: '/enviar.php',
            crossDomain: true,
            data: {            
                inputName: data.name,
                inputEmail: data.mail,
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

    console.log($('[name=mail]').val());

    function validateContactForm()  {
        var validInputs = 0;

        for(var i = 0; i < contactFormInputs.length; i++) {
            if($(contactFormInputs[i]).attr('name') === "mail") {
                if(!validateEmail($('[name=mail]').val())) {
                    contactInputError.addClass('-show');
                    return;
                } else {
                    contactInputError.removeClass('-show');
                    validInputs++;
                }
            } else {
                if($(contactFormInputs[i]).val() !== "") {
                    validInputs++;
                }
            }
            
        }

        console.log(validInputs);

        return validInputs === contactFormInputs.length;
    }

    var contactData = {}

    function getContactFormData() {
        for(var i = 0; i < contactFormInputs.length; i++) {
            contactData.push(`${$(contactFormInputs[i]).attr('name')}:${$(contactFormInputs[i]).val()}`);
        }
        return contactData;
    }

    function sendContactConfirmByEmail(data) {
        $.ajax({
            type: "POST",
            url: '/enviar.php',
            crossDomain: true,
            data: {            
                inputName: data.name,
                inputEmail: data.mail,
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

    contactFormInputs.on('change', function() {
        var isValid = validateContactForm();

        if(isValid) {
            contactFormButton.removeAttr('disabled');
        } else {
            contactFormButton.attr('disabled', true);
        }
    })

    propertyContactSubmitButton.on('click', function(e) {
        e.preventDefault();
        var dataForMail = getContactFormData();
        console.log(dataForMail);

        sendContactConfirmByEmail(dataForMail);
    });
}

module.exports = ContactForm;