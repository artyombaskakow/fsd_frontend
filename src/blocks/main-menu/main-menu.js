$(document).ready(function(){

    console.log('main menu');
    let subMenuItemActiveClass = 'main-menu__list-elem_submenu_shown';

    handleSubmenuItemClick();
    handleBodyClick();



    function handleSubmenuItemClick(){

        

        $('.main-menu__list-elem_type_submenu').on('click', function(){

            if($(this).hasClass(subMenuItemActiveClass)){
                $(this).removeClass(subMenuItemActiveClass);
            } else{
                $('.'+subMenuItemActiveClass).removeClass(subMenuItemActiveClass);
                $(this).addClass(subMenuItemActiveClass);
            }
            
        });
    }

    function handleBodyClick(){

        $('body').on('click', function(e){
            let activeSubmenuParent = $(e.target).closest('.'+subMenuItemActiveClass);

            if(!activeSubmenuParent.length){
                $('.'+subMenuItemActiveClass).removeClass(subMenuItemActiveClass);
            }
        });
    }
    

});