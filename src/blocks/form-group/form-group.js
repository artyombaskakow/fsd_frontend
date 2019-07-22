(function(){

    let formLabels = document.querySelectorAll(
        `.form-group_expandable_expanded .form-group__label,
        .form-group_expandable_close .form-group__label`
    );

    for(let i=0; i<formLabels.length; i++){

        formLabels[i].addEventListener('click', function(){
    
            let parent = this.parentElement;
        
            if(parent.classList.contains('form-group_expandable_expanded')){
                parent.classList.remove('form-group_expandable_expanded');
                parent.classList.add('form-group_expandable_close');
            }
            else if(parent.classList.contains('form-group_expandable_close')){
                parent.classList.remove('form-group_expandable_close');
                parent.classList.add('form-group_expandable_expanded');
            }
        });
    }

}());

    
