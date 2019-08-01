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
        let $calendarElement = $(this).find('.form-input__input');
        let selectedDatesAttr = $.trim( $(this).attr('data-selected-dates') );

        if(!$calendarElement.length){
            $calendarElement = $(this);
        }

        $calendarElement.datepicker({
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
                //console.log('formattedDate', formattedDate);
                //console.log('date', date);
                //console.log('inst', inst);
            },
            onRenderCell: function (date, cellType) {
                if(cellType=='day'){
                    return {
                        html: '<span class="datepicker--cell-day-value">'+date.getDate()+'</span>'
                    }
                }
            },
        });

        if(selectedDatesAttr.length){
            let strDatesArr = selectedDatesAttr.split(',');
            let selectedDates = [];

            for(let i=0; i<strDatesArr.length && i<2; i++){
               selectedDates.push( getDateObjectFromStr(strDatesArr[i]) );
            }
            $calendarElement.datepicker().data('datepicker').selectDate(selectedDates);
        }
        

    });

    $(".form-datepicker .form-input__icon").on('click', function(){
        let datepicker = $(this).closest('.form-input__container').find('.form-input__input').datepicker().data('datepicker');
        datepicker.show();
        console.log(datepicker);
    });

    let applyBtn = `<span class="datepicker--button" data-action="hide">Применить</span>`;
    $(".datepicker--buttons").append(applyBtn);

    function getDateObjectFromStr(str){
        if(str.length){
            let parts = $.trim(str).split('.');
            if(parts.length==3){
                return new Date( parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]) );
            }
        }

        return new Date();
        
    }

}));