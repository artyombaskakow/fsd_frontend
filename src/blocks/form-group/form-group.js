(function(){

    let formLabels = document.querySelectorAll(
        `.form-group_expandable_expanded .form-label,
        .form-group_expandable_close .form-label`
    );

    for(let i=0; i<formLabels.length; i++){

        formLabels[i].addEventListener('click', function(){
    
            let formGroup = this.closest('.form-group');
        
            if(formGroup.classList.contains('form-group_expandable_expanded')){
                formGroup.classList.remove('form-group_expandable_expanded');
                formGroup.classList.add('form-group_expandable_close');
            }
            else if(formGroup.classList.contains('form-group_expandable_close')){
                formGroup.classList.remove('form-group_expandable_close');
                formGroup.classList.add('form-group_expandable_expanded');
            }
        });
    }

}());

    
