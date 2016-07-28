/*
=================================================================================================
# 1 Ripple Effect 
-------------------------------------------------------------------------------------------------
*/

    $(function(){
        var ripple, d, x, y;
        $(".joqd.ripple-click").click(function(e){
            if($(this).find(".joqd.ripple-effect").length === 0){
                $(this).prepend("<span class='joqd ripple-effect'></span>");
            }
                 
            ripple = $(this).find(".joqd.ripple-effect");
            ripple.removeClass("ripple-animate");
            
            if(!ripple.height() && !ripple.width()){
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                ripple.css({height: d, width: d});
            }

            if($(this).hasClass('ripple-darken')){
                ripple.addClass('ripple-effect-darken');
            }else{
                ripple.addClass('ripple-effect-lighten');
            };
             
            x = e.pageX - $(this).offset().left - ripple.width()/2;
            y = e.pageY - $(this).offset().top - ripple.height()/2;
             
            ripple.css({top: y+'px', left: x+'px'}).addClass("ripple-animate");

        });
    });