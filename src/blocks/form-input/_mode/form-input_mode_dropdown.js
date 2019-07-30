(function(){

    let dropdownInputs = document.querySelectorAll('.form-input_mode_dropdown');

    dropdownInputsInit(dropdownInputs);

    function dropdownInputsInit(dropdownInputs){

        for(let i=0; i<dropdownInputs.length; i++){
            dropdownInputs[i].addEventListener('click', handleDropdownInputClick);
            let formInputContainer = dropdownInputs[i].querySelector('.form-input__container');
            setInputText(formInputContainer);
        }

        let countElems = document.querySelectorAll('.form-input__dropdown-elem-minus, .form-input__dropdown-elem-plus');
        for(let i=0; i<countElems.length; i++){
            countElems[i].addEventListener('click', handleCountClick);
        }

        let applyButtons = document.querySelectorAll('.form-input__dropdown-apply');
        for(let i=0; i<applyButtons.length; i++){
            applyButtons[i].addEventListener('click', handleApplyClick);
        }

        let clearButtons = document.querySelectorAll('.form-input__dropdown-clear');
        for(let i=0; i<clearButtons.length; i++){
            clearButtons[i].addEventListener('click', handleClearClick);
        }

        document.body.addEventListener('click', handleBodyClick);
    }
    

    function handleDropdownInputClick(e){
        if(e.target.classList.contains('form-input__input') || e.target.classList.contains('form-input__icon')){
            this.classList.toggle('form-input_expanded');
        }
    }

    function handleBodyClick(e){
        let formInput = e.target.closest(".form-input_mode_dropdown");

        for(let i=0; i<dropdownInputs.length; i++){
            if(dropdownInputs[i]!=formInput){
                dropdownInputs[i].classList.remove('form-input_expanded');
            }
        }
    }


    function handleCountClick(){

        let inputElem = this.parentNode.querySelector('.form-input__dropdown-elem-input');
        let count = inputElem.value = this.classList.contains('form-input__dropdown-elem-minus') ?
            ( inputElem.value>0 ? --inputElem.value : 0 ) :
            ++inputElem.value;
        inputElem.setAttribute('value', count);
        setInputText(this);

    }

    function setInputText(elem){

        let inputText = '';
        let inputContainer = elem.classList.contains('form-input__container') ?
                elem :
                elem.closest('.form-input__container');
        
        let dataText = inputContainer.getAttribute('data-text');
        let listElems = inputContainer.querySelectorAll('.form-input__dropdown-elem');

        if(dataText.length){

            let totalCount = 0;
            for(let i=0; i<listElems.length; i++){
                totalCount+= +listElems[i].querySelector('.form-input__dropdown-elem-input').value;
            }

            if(totalCount>0){
                inputText = totalCount + ' ' + dataText;
            }
            
        } else{

            for(let i=0; i<listElems.length; i++){
                let title = listElems[i].querySelector('.form-input__dropdown-elem-title').innerHTML;
                let count = +listElems[i].querySelector('.form-input__dropdown-elem-input').value;
                if(count){
                    inputText += (inputText.length ? ', ' : '') + `${count} ${title}`;
                }
            }
        }

        inputText = inputText.toLocaleLowerCase();
        inputContainer.querySelector('.form-input__input').value = inputText;
    }

    function handleApplyClick(){
        closeFormInput(this);
    }

    function handleClearClick(){
        console.log(this);
        let inputContainer = this.closest('.form-input__container');
        let listElems = inputContainer.querySelectorAll('.form-input__dropdown-elem');

        for(let i=0; i<listElems.length; i++){
            listElems[i].querySelector('.form-input__dropdown-elem-input').value = 0;
        }

        inputContainer.querySelector('.form-input__input').value = '';
        closeFormInput(this);

    }

    function closeFormInput(elem){
        let formInput = elem.closest('.form-input_mode_dropdown');
        formInput.classList.remove('form-input_expanded');
    }

})();