'use strict';

var Price = function() {
    if ($('input[type="range"]').length > 0) {
        var priceInputRange = $('.js-range-price');
        var priceLabelLow = $('.js-range-price-low');
        var priceLabelHigh = $('.js-range-price-high');
        var priceInputFrom = $('#inputPriceFrom');
        var priceInputTo = $('#inputPriceTo');

        function updatePriceRangeValues() {
            var priceInputValue = $('.js-range-price.original');

            var valueLow = priceInputValue.get(0).valueLow;
            var valueHigh = priceInputValue.get(0).valueHigh;

            priceLabelLow.html('<span>$' + valueLow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.') + '</span>');
            priceLabelHigh.html('<span>$' + valueHigh.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.') + '</span>');

            priceInputFrom.val(valueLow);
            priceInputTo.val(valueHigh);

            updatePriceLabelPosition(valueLow, valueHigh);
        }

        function updatePriceLabelPosition(low, high) {
            priceLabelLow.css('left', (low * 100)/1500000 + '%');
            priceLabelHigh.css('left', (high * 100)/1500000 + '%');
        }

        priceInputRange.on('input', updatePriceRangeValues);
        updatePriceRangeValues();
    }
}

module.exports = Price;