(function(){
    console.log('dropdown');

    let dropdownInputs = document.querySelectorAll('.form-input_mode_dropdown');
    let dropdownOpenClasses = ['form-input_mode_dropdown', 'form-input__icon'];

    let countElems = document.querySelectorAll('.form-input__dropdown-elem-minus, .form-input__dropdown-elem-plus');
    for(let i=0; i<countElems.length; i++){
        countElems[i].addEventListener('click', makeHandleCountClick);
    }

    let hideDropdownInputs = function(){
        let expandedDropdownInput = document.querySelectorAll('.form-input_expanded');
        for(let i=0; i<expandedDropdownInput.length; i++){
            expandedDropdownInput[i].classList.remove('form-input_expanded');
        }
    }

    document.body.addEventListener('click', function(e){
        //console.log('body', e);
        for(let i=0; i<dropdownOpenClasses.length; i++){
            if(e.target.classList.contains(dropdownOpenClasses[i])){
                //console.log('contains');
                return;
            } 
        }

        let dropDownContainer = e.target.closest(".form-input__dropdown-elems-container");

        if(dropDownContainer==null){
            //hideDropdownInputs();
        }
    });

    dropdownInputs[0].addEventListener('click', function(e){
        //console.log(e);
        if(e.target.classList.contains('form-input__input') || e.target.classList.contains('form-input__icon')){
            this.classList.toggle('form-input_expanded');
        }
    });





    function makeHandleCountClick(){

        let inputElem = this.parentNode.querySelector('.form-input__dropdown-elem-input');
        let count = inputElem.value = this.classList.contains('form-input__dropdown-elem-minus') ?
            ( inputElem.value>0 ? --inputElem.value : 0 ) :
            ++inputElem.value;
        inputElem.setAttribute('value', count);
        setInputText(this);

    }

    function setInputText(elem){

        let inputContainer = elem.closest('.form-input__container');
        let listElems = inputContainer.querySelectorAll('.form-input__dropdown-elem');

        for(let i=0; i<listElems.length; i++){
            
        }
        console.log(listElems);
    }

})();