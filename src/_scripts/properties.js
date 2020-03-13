'use strict';

// Constructor
var Properties = {
    get: function(url) {
        return new Promise(function(resolve, reject) {
            resolve(
                $.when(
                    $.get(url, function (data, status) {
                        return data;
                    })
                ).done(function(data) {
                    return data
                })
            );
        });
    },
};

module.exports = Properties;
