import 'air-datepicker';
import { isNull } from 'util';

($(document).ready(function(){

    let multipleDatesSeparator = ' - ';
    let dpContainerClass = '.form-datepicker__container';
    let $datepickerContainers = $(dpContainerClass);

    initDatepickers($datepickerContainers);
    handleBodyClick();
    addApplyCalendarButton();
    handleFocusDateInput();
    handleClickInputIcon();
    handleBlurDateInput();



    // FUNCTIONS

    function initDatepickers($datepickerContainers){

        $datepickerContainers.each(function(){

            let dateFormat = $(this).attr('data-date-format');
            let values = $.trim( $(this).attr('data-values') );
            let $calendarContainer = $(this);
    
            $calendarContainer.datepicker({
                range: true,
                clearButton: true,
                dateFormat: dateFormat,
                multipleDatesSeparator: multipleDatesSeparator,
                offset: 5,
                navTitles: {
                    days: 'MM yyyy'
                },
                prevHtml: '<i class="material-icons datepicker--nav-action-icon">arrow_back</i>',
                nextHtml: '<i class="material-icons datepicker--nav-action-icon">arrow_forward</i>',
                onSelect: onSelectDate,
                onRenderCell: onRenderDateCell,
            });
    
            setDatesToCalendar(values, $calendarContainer);
    
        });

    }

    function handleClickInputIcon(){
        $(".form-datepicker .form-input__icon").on('click', function(){
            $(this)
                .closest('.form-input__container')
                .find('.form-input__input')
                .focus();
        });
    }
    
    function setDatesToCalendar(values, $calendarContainer){

        let selectedDates = [];

        if(typeof values=='string'){
            if(values.length){
                let strDatesArr = values.split(',');
                values = strDatesArr;
            }
        } 

        for(let i=0; i<values.length; i++){
            selectedDates.push( getDateObjectFromStr(values[i]) );
        }

        let $calendar = $calendarContainer.datepicker().data('datepicker');
        $calendar.clear();
        $calendar.selectDate(selectedDates);
        
    }

    function onRenderDateCell(date, cellType) {
        if(cellType=='day'){
            return {
                html: '<span class="datepicker--cell-day-value">'+date.getDate()+'</span>'
            }
        }
    }

    function onSelectDate(formattedDate, date, inst){
        let mode = inst.$el.attr('data-mode');
        let inputs = inst.$el.closest('.form-datepicker').find('.form-input__input');

        switch(mode){
            case 'filter':
                $(inputs[0]).val(formattedDate);
                break;

            case 'separate':

                if(!formattedDate.length){
                    inputs[0].value = inputs[1].value = '';
                    return;
                }

                let dates = formattedDate.split(multipleDatesSeparator);

                $(inputs[0]).val(dates[0]);
                if(dates.length==2){
                    $(inputs[1]).val(dates[1]);
                }
                break;
            
            default: break;
        }

    }

    function handleBlurDateInput(){

        let inputSelector = `.form-datepicker__input-from .form-input__input, 
                            .form-datepicker__input-to .form-input__input`;

        $(inputSelector).blur(function(){

            let $inputContainer = $(this).closest('.form-datepicker__input-container');
            let values = [];

            $inputContainer.find('.form-input__input').each(function(){
                let value = $(this).val();
                if(value.length==10){
                    values.push( $(this).val() );
                }
            });

            if(values.length==0) return;

            let $calendarContainer = $(this)
                                        .closest('.form-datepicker')
                                        .find(dpContainerClass);

            
            setDatesToCalendar(values, $calendarContainer);
        });
    }

    function getCalendarContainer($elem){
        return $elem
                .closest('.form-datepicker')
                .find('.form-datepicker__container');
    }

    function handleFocusDateInput(){
        $(".form-datepicker__input-container .form-input__input").focus(function(e){

            $(this)
                .closest('.form-datepicker')
                .find('.form-datepicker__container')
                .addClass('form-datepicker__container_active');
        });

        $(".form-datepicker__input-to .form-input__input").focus(function(){

        });
    }

    function handleBodyClick(){

        $("body").click(function(e){

            if( $(e.target).hasClass('datepicker--cell') || 
                $(e.target).hasClass('datepicker--cell-day-value') ||
                $(e.target).hasClass('datepicker--nav-action') ||
                $(e.target).hasClass('datepicker--nav-action-icon') ||
                $(e.target).hasClass('datepicker--nav-title')
            ){
                return;
            }

            let datepickerContainer = e.target.closest('.form-datepicker');
            let activeDatepickersSelector = ".form-datepicker__container.form-datepicker__container_active";
            let isInputContainer = $(e.target).hasClass('form-datepicker__input-container');

            if(isNull(datepickerContainer) || isInputContainer){
                $(activeDatepickersSelector).removeClass('form-datepicker__container_active');
                return;
            }
            
            $(activeDatepickersSelector).each(function(){
                let currentContainer = $(this).closest('.form-datepicker')[0];

                if(currentContainer!=datepickerContainer){
                    $(this).removeClass('form-datepicker__container_active');
                }
            })


        });
    }

    function addApplyCalendarButton(){

        let applyBtn = `<span class="datepicker--button datepicker--button-apply" data-action="hide">Применить</span>`;
        $(".datepicker--buttons").append(applyBtn);

        $(".datepicker--button-apply").click(function(){
            $(this)
                .closest('.form-datepicker')
                .find('.form-datepicker__container')
                .removeClass('form-datepicker__container_active'); 
        });

    }

    function getDateObjectFromStr(str){
        if(str.length && str.length==10){
            let parts = $.trim(str).split('.');
            if(parts.length==3){
                return new Date( parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]) );
            }
        }

        return new Date();
        
    }

}));