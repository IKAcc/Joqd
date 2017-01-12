/*
=================================================================================================
# 5 Tabs Effect
-------------------------------------------------------------------------------------------------
*/

  (function( $ ) {

    $.fn.tab = function(options) {

      var settings = $.extend({ // These are the defaults.
        duration: 200, // default tab change speed is set to 2 mili seconds
        normalClasses: 'grey-text grey-darken-3-text-hover', // default tab class in normal state
        activeClasses: 'grey-darken-4-text' // default tab class in active state
      }, options );

      $(this).find('.tab-links').find('a').on('click', function(e){

        var tab = $(this);
        var href = tab.attr('href');

        if ( !tab.hasClass('active') && !tab.hasClass('disabled') ) {
          tab.removeClass(settings.normalClasses).addClass(settings.activeClasses).addClass('active').parent().siblings('li').children().removeClass(settings.activeClasses).removeClass('active').addClass(settings.normalClasses); // toggle active tab
          tab.parents('.tab').find('.tab-contents').find('.active').fadeOut(settings.duration, function(){ // fade out the previous active tab-content
            $(this).removeClass('active').siblings('#' + href).fadeIn(settings.duration).addClass('active');  // fade in the current active tab-content
          })
        }

        e.preventDefault();

      })

    };

  }( jQuery ));
