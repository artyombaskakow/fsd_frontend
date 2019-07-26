import 'jquery-ui-slider/jquery-ui';

($(document).ready(function(){

    $( ".slider-range__slider" ).each(function(){

        let min = +$(this).attr('data-min');
        let max = +$(this).attr('data-max');
        let startValue = +$(this).attr('data-start-value');
        let endValue = +$(this).attr('data-end-value');
        let step = +$(this).attr('data-step');

        setLableHintText(this, [startValue, endValue]);

        $(this).slider({
            range: true,
            min: min,
            max: max,
            step: step,
            values: [ startValue, endValue ],
            slide: function( event, ui ) {
                setLableHintText(event.target, ui.values);
            }
          });

    });

    function setLableHintText(elem, values){
        let sliderRange = $(elem).closest('.slider-range');
        let hint = sliderRange.find('.form-label__hint');
        let hintText = getPriceFormat(values[0]) + '₽ - ' + getPriceFormat(values[1]) + '₽';
        hint.html(hintText);
    }

    function getPriceFormat(value){
        return (value).toLocaleString('ru');
    }
    
}))