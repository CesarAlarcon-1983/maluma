'use strict';

// Constructor
var Properties = function() {
    $.ajax({
        url: "http://panel.siprop.com/propiedades/export/id/7iDg5YPlEZ",
        type: "GET",
        crossDomain: true,
    }).done(function (data) {
        console.log(data);
    });
    // $.ajax({
    //     url:"http://panel.siprop.com/propiedades/export/id/7iDg5YPlEZ",
        // headers: { "Accept": "application/json"},
        // type:"GET",
        // crossDomain: true,
        // beforeSend: function(xhr){
        //     xhr.withCredentials = true;
        // },
    // }).done(
    //     function(res) {
    //         console.log("AJAX", res)
    //     }
    // )

    // function getImages() {
    //     $.when(
    //         getInstagramDataFromHashtags(),
    //         console.log('inside when')
    //     ).done(
    //         function(instagramResponse) {
    //             console.log("response", instagramResponse);
    //         },

    //         console.log('inside done'),
    //     );
    // }

    // function getInstagramDataFromHashtags(){
    //     console.log("hola")
    //     return new Promise(function(resolve, reject) {
    //         resolve(
    //             $.get('http://panel.siprop.com/propiedades/export/id/7iDg5YPlEZ', function (data, status) {
    //                 return data;
    //             })
    //         );
    //     });
    // }

    // getImages();
};

module.exports = Properties;
