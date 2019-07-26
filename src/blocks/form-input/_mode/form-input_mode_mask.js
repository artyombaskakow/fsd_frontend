import 'jquery-mask-plugin';

($(document).ready(function(){

    $('.form-input_mode_mask .form-input__input').each(function(){
        let maskValue = $(this).attr('mask');
        console.log(maskValue);
        $(this).mask(maskValue);
    }); 

}));
