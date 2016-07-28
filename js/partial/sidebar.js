/*
=================================================================================================
# 2 Sidebar Toggle
-------------------------------------------------------------------------------------------------
*/

    (function( $ ) {

        $.fn.navside = function (options) {

          var settings = $.extend({ // These are the defaults.
            toggleSpeed : '200', // defaults toggle speed set to 200 miliseconds
            maxOpacity : '0.3', // defaults wrapper's max opacity set to 0.5
            activeClasses: 'grey-lighten-3',
            stackSpeed: '200'
          }, options );

          var element = this;

          $(element).css('right', -($(element).outerWidth() + 10)); // adjust navside properly

          $('body').prepend('<div id="navsideTempWrapper" class="joqd close-navside"></div>'); // prepend a temp wrapper to body

          $('.joqd.open-navside').on('click', function(){ // when opening trigger is clicked

            $('body').css('overflow', 'hidden'); // disable scroll

            $('#navsideTempWrapper').css('display', 'block').animate({opacity: settings.maxOpacity}, parseInt(settings.toggleSpeed)); // view temp wrapper
            $(element).animate({right: '0px'}, parseInt(settings.toggleSpeed)); // view navside

          })

          $('.joqd.close-navside').on('click', function(){ // when closeing trigger is clicked

            $('body').css('overflow', 'auto'); // enable scroll

            $('#navsideTempWrapper').animate({opacity: '0'} , parseInt(settings.toggleSpeed)).css('display', 'none'); // hide temp wrapper
            $(element).animate({right: - ($(element).outerWidth() + 10)}, parseInt(settings.toggleSpeed)); // hide navside

          })

          $('.joqd.navside-body a').on('click', function(e) { // when clicked on a link

            if ( $(this).siblings('ul.joqd.stack').size() > 0 ) { // if had sub menu

              e.preventDefault();
              $(this).addClass(settings.activeClasses).parent().siblings('li').find('a.' + settings.activeClasses).removeClass(settings.activeClasses);
              $(this).siblings('ul.joqd.stack').slideToggle(parseInt(settings.stackSpeed));

            }

          })

        }

    }( jQuery ));
