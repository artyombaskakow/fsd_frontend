(function(){

    let rateInputs = document.querySelectorAll('.form-button-rate__input');
    let checkedClassName = 'form-button-rate__star-elem_checked';

    for(let i=0; i<rateInputs.length; i++){

        rateInputs[i].addEventListener('change', function(){

            let starElem = this.parentNode;
            let btnElem = starElem.parentNode;

            for(let k=0; k<btnElem.childNodes.length; k++){
                btnElem.childNodes[k].classList.remove(checkedClassName);
            }

            starElem.classList.add(checkedClassName);
        });
    }

})();