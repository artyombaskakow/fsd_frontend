(function(){

    let likeBtns = document.querySelectorAll('.form-button-like');

    for(let i=0; i<likeBtns.length; i++){

        likeBtns[i].addEventListener('click', function(){
            let countElem = this.querySelector('.form-button-like__count');
            let likeCount = +countElem.innerHTML;
            let likedClassName = 'form-button-like_liked';
    
            if(this.classList.contains(likedClassName)){
                this.classList.remove(likedClassName);
                likeCount--;
            }
            else{
                this.classList.add(likedClassName);
                likeCount++;
            }
    
            countElem.innerHTML = likeCount;
        });
    }

    
})();