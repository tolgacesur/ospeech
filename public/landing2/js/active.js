$('document').ready(function(){

     //======>  Pricing Toggle Functionality

    $("[class*='btn--toggle']").on('change',function(e){
        
        
        var getTarget = $(this).attr('data-tab-target'); 
        var inpSelect = $(this).children().children('input[type="checkbox"]');

        if($(inpSelect).is(':checked')){
            if($(getTarget).hasClass('monthly')){
                $(getTarget).removeClass('monthly');
                $(getTarget).addClass('yearly');
          
            }
        }else{
            // $(getTarget).removeClass('monthly');
            if($(getTarget).hasClass('yearly')){
                $(getTarget).removeClass('yearly');
                $(getTarget).addClass('monthly');
          
            }
        }      
    })

  
})

//======>  Mobile Menu Activation
$('.main-navigation').meanmenu({
    meanScreenWidth: "992",
    meanMenuContainer: '.mobile-menu',
    meanMenuClose: "<i class='icon icon-simple-remove'></i>",
    meanMenuOpen: "<i class='icon icon-menu-34'></i>",
    meanExpand: "",
});

var header = document.getElementById("header");
var sticky = header.offsetTop;
header.style.backgroundColor = '#f8f8f8';
header.style.zIndex = 2;
header.style.paddingBottom = '8px';

window.onscroll = function() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

