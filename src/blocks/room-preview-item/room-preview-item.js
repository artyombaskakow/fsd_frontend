$(document).ready(function(){

    $('.room-preview-item__slider-nav-right').on('click', function(){
        slideRoomPhoto($(this), 'right');
    });

    $('.room-preview-item__slider-nav-left').on('click', function(){
        slideRoomPhoto($(this), 'left');
    });

    function slideRoomPhoto($elem, direction){
        
        let $sliderElem = $elem.closest('.room-preview-item__slider');
        let $checkedButton = $sliderElem.find('.room-preview-item__slider-input:checked');
        let nextIndex = getNextSlideIndex(
            +$checkedButton.attr('data-index'), 
            +$checkedButton.attr('data-slide-count'),
            direction
        );

        $sliderElem.find(`.room-preview-item__slider-input[data-index=${nextIndex}]`).click();
    }

    function getNextSlideIndex(currentIndex, slideCount, direction){
        if(direction==='right'){
            return currentIndex===slideCount-1 ? 0 : currentIndex + 1;
        } else{
            return currentIndex===0 ? slideCount - 1 : currentIndex - 1;
        }
    }

})