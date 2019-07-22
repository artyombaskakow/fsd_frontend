(function(){

    let formLabels = document.querySelectorAll(
        `.form-checkbox-group_expandable_expanded .form-checkbox-group__label,
        .form-checkbox-group_expandable_close .form-checkbox-group__label`
    );

    for(let i=0; i<formLabels.length; i++){

        formLabels[i].addEventListener('click', function(){
    
            let parent = this.parentElement;
        
            if(parent.classList.contains('form-checkbox-group_expandable_expanded')){
                parent.classList.remove('form-checkbox-group_expandable_expanded');
                parent.classList.add('form-checkbox-group_expandable_close');
            }
            else if(parent.classList.contains('form-checkbox-group_expandable_close')){
                parent.classList.remove('form-checkbox-group_expandable_close');
                parent.classList.add('form-checkbox-group_expandable_expanded');
            }
        });
    }

}());

    
