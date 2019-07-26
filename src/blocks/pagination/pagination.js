import 'paginationjs';

($(document).ready(function(){

    $('.pagination-block__pagination').each(function(){

        let currentElem = $(this);
        let elemCount = $(this).attr('data-elem-count');
        let pageSize = $(this).attr('data-page-size'); 
        let descr = $(this).attr('data-descr');
        let dataSource = [];

        for(let i=0; i<elemCount; i++){
            dataSource.push(i+1);
        }

        let getDescriptionText = function(data, pagination){
            let startElem = +pagination.pageSize * (pagination.pageNumber - 1) + 1;
            let endElem = +pagination.pageSize + startElem -1;
            let total = pagination.totalNumber > 100 ? '100+' : pagination.totalNumber;

            return `${startElem} - ${endElem} из ${total} ${descr}`;
        }

        let afterRender = function(){
            currentElem.find('.J-paginationjs-next a').addClass('material-icons');
        }

        $(this).pagination({
            dataSource: dataSource,
            pageSize: pageSize,
            showPrevious: false,
            pageRange: 1,
            classPrefix: 'pagination-block__elem',
            className: '',
            activeClassName: 'pagination-block__page-elem_active',
            disableClassName: 'pagination-block__page-elem_disabled',
            ulClassName: 'pagination-block__page-container',
            nextText: 'arrow_forward',
            callback: function(data, pagination) {
                let descripton = getDescriptionText(data, pagination);
                let descrElem = $(pagination.el).closest('.pagination-block').find('.pagination-block__text');
                descrElem.html(descripton);
            },
            afterRender: afterRender
        
        });
        


    });


}));