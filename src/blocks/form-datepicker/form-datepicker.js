import 'air-datepicker';

($(document).ready(function(){

    console.log('datepicker');

    let $inputContainers = $(`
        .form-datepicker__input-range-container,
        .form-datepicker__input-from, 
        .form-datepicker__input-to`
    );


    $inputContainers.each(function(){

        let dateFormat = $(this).attr('data-date-format');
        let range = $(this).attr('data-range');
        let $input = $(this).find('.form-input__input');

        $input.datepicker({
            range: range,
            clearButton: true,
            dateFormat: dateFormat,
            multipleDatesSeparator: ' - ',
            navTitles: {
                days: 'MM yyyy'
            },
            prevHtml: '<i class="material-icons">arrow_back</i>',
            nextHtml: '<i class="material-icons">arrow_forward</i>',
            onSelect: function(formattedDate, date, inst){
                console.log('formattedDate', formattedDate);
                console.log('date', date);
                console.log('inst', inst);
            }
        });

    });

    let applyBtn = `<span class="datepicker--button" data-action="hide">Применить</span>`;
    $(".datepicker--buttons").append(applyBtn);

}));