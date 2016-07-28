/*
                                ___
   ___                         |\  \
  |\  \  ________  ________  __\_\  \
  \ \  \|\   __  \|\   __  \|\   ___ \
   \ \  \ \  \|\  \ \  \|\  \ \  \_|\ \
 __ \ \  \ \  \\\  \ \  \\\  \ \  \ \\ \
|\  \\_\  \ \  \\\  \ \  \\\  \ \  \_\\ \
\ \________\ \_______\ \_____  \ \_______\
 \|________|\|_______|\|___| \__\|_______|
                            \|__|

						Joqd Framework
						Created by @setarekarimi and @JavidIzadfar
						Last edit on July 28, 2016
*/

/*
=================================================================================================
Index
-------------------------------------------------------------------------------------------------

# 1 ::::::::::::::::: Ripple Effect
# 2 ::::::::::::::::: Sidebar Toggle
# 3 ::::::::::::::::: Input
# 4 ::::::::::::::::: Toast
# 5 ::::::::::::::::: Tab
# 6 ::::::::::::::::: Select
# 7 ::::::::::::::::: Tooltip


=================================================================================================
-------------------------------------------------------------------------------------------------
*/

/*
=================================================================================================
# 1 Ripple Effect
-------------------------------------------------------------------------------------------------
*/

  (function( $ ) {

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

  }( jQuery ));

/*
=================================================================================================
# 2 Sidebar Toggle
-------------------------------------------------------------------------------------------------
*/

    (function( $ ) {

        $.fn.navside = function (options) {

          var settings = $.extend({ // These are the defaults.
            toggleSpeed : '200', // defaults toggle speed set to 200 miliseconds
            maxOpacity : '0.5', // defaults wrapper's max opacity set to 0.5
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

/*
=================================================================================================
# 3 Input
-------------------------------------------------------------------------------------------------
*/

    (function( $ ) {

        $.fn.input = function(options) {

            var openInputColorRGB;

            var settings = $.extend({ // These are the defaults.
                openLabelColor: 'blue', // default open label text color is set to blue
                openInputColor: 'blue' // default open input border color is set to blue
            }, options );

            var initial = { // These are the curents
                inputLabelKind: 'open-input',
                labelColor: '', // initial label text color
                inputColor: '' // initial input border color
            };

            settings.openLabelColor = settings.openLabelColor + '-text'; // convert color to useable color
            settings.openInputColor = settings.openInputColor + '-border'; // convert color to useable color

            // create a temp div to get open input color RGB and save it as a shadow
            $('body').append('<div id="joqdTempforColor" class="joqd ' + settings.openInputColor + '"></div>');
            var openInputColorRGB = '0 1px 0 0 ' + $('#joqdTempforColor').css('border-bottom-color');
            $('#joqdTempforColor').remove();

              initial.inputColor = String($(this).attr('class').match(/([\w]*[^-bottom]-border)/g)); // gets initial input bottom border color
              initial.labelColor = String($(this).siblings('label').attr('class').match(/([\w]*-text)/g)); // gets initial label text color

              if ( $(this).siblings().hasClass('always-open-input') ) { // if input was "Always Open"
                  initial.inputLabelKind == '';
              }

              if ( $(this).val() ) { // if input had initial value
                  openInput(this);
              }

              $(this).focus(function(){ // open input on focus
                  openInput(this);
              })
              $(this).focusout(function(){ // close input on focus out
                  if( !$(this).val() ){ // if input was empty
                      closeInput(this);
                  }
              })

            function openInput(element){
                $(element).removeClass(initial.inputColor).addClass('thin-bottom-border ' + settings.openInputColor).css({'-webkit-box-shadow' : openInputColorRGB, '-moz-box-shadow' : openInputColorRGB, 'box-shadow' : openInputColorRGB}).siblings('label, .prefix').removeClass(initial.labelColor).addClass('joqd ' + settings.openLabelColor + ' open-input');
            }

            function closeInput(element){
                $(element).addClass(initial.inputColor).removeClass(settings.openInputColor).css({'-webkit-box-shadow' : 'none', '-moz-box-shadow' : 'none', 'box-shadow' : 'none'}).siblings('label, .prefix').removeClass( settings.openLabelColor + ' ' + initial.inputLabelKind).addClass(initial.labelColor);
            }

        };

    }( jQuery ));

/*
=================================================================================================
# 4 Toast
-------------------------------------------------------------------------------------------------
*/

    (function( $ ) {

        $.fn.toast = function(options) {

            var wrapper, lastToast, lastToastId, currentToastId, toastMarkup;

            var settings = $.extend({ // These are the defaults.
                position: 'right-top', // default position is set to right top of the view port
                backgroundColor: 'grey-darken-4', // default background color is set to grey
                corner: 'soft-corner', // default corner is set to soft
                duration: 5, // default toast duration is set to 5 seconds
                opacity: 97, // default background color opacity is set 97%
                content: '' // default toast contetn is set to nothing
            }, options );

            var temp = {
                backgroundColor: '', // temporary background color
                corner: '', // temporary corner
                position: '' // temporary position
            };

            if (!$(".joqd.toast-wrapper")[0]){
                $('body').prepend('<div class="joqd toast-wrapper '+ settings.position +'"></div>'); // add toast wrapper div to body if it's not there
            }else{
                wrapper = $(".joqd.toast-wrapper");

                temp.position = String(wrapper.attr('class').match(/[\w]*-bottom/)); // gets desired position of toast

                temp.backgroundColor = String(wrapper.attr('class').match(/[\w]*-background-toast/)).replace(/-background-toast/, ""); // gets desired background color of toast
                if(temp.backgroundColor !== 'null') settings.backgroundColor = temp.backgroundColor;

                temp.corner = String(wrapper.attr('class').match(/[\w]*-corner-toast/)).replace(/-toast/, ""); // gets desired background color of toast
                if(temp.corner !== 'null') settings.corner = temp.corner;
            }

            if(temp.position.match('-bottom')) var isBottom = true;

            if (!$('body .joqd.toast-wrapper').children().length > 0) { // check's if wrapper is empty
                currentToastId = 1;
            } else {
                if(isBottom) lastToast = $('.toast:first-child');
                else lastToast = $('.toast:last-child');
                lastToastId = parseInt(lastToast.attr('id'));
                currentToastId = lastToastId + 1;
            }

            toastMarkup = '\
                <div class="joqd toast" id="' + currentToastId + 'toast">\
                    <div class="joqd toast-content ' + settings.backgroundColor + ' ' + settings.corner + '">\
                        '+ settings.content +'\
                    </div>\
                </div>';

            if (isBottom) {
                $('body .joqd.toast-wrapper').prepend(toastMarkup); // adds toast markup at the first of wrapper
            } else {
                $('body .joqd.toast-wrapper').append(toastMarkup); // adds toast markup at the end of wrapper
            }

            $('.joqd.toast-content').css('background-color', glass($('.joqd.toast-content'), settings.opacity)); // glassifies toast background color

            setTimeout(function () {
                $('#' + currentToastId + 'toast').addClass('show');

                setTimeout(function () {
                    $('#' + currentToastId + 'toast').removeClass('show');
                    setTimeout(function () {
                        $('#' + currentToastId + 'toast').removeClass('show');
                        $('#' + currentToastId + 'toast').remove();
                    }, 1000);
                }, settings.duration * 1000);

            }, 1);

        };

    }( jQuery ));

/*
=================================================================================================
# 5 Tabs
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

/*
=================================================================================================
# 6 Select
-------------------------------------------------------------------------------------------------
*/

	(function( $ ) {

		$.fn.select = function (options) {

			var settings = $.extend({ // These are the defaults.
				dropdownColor : 'white', // defaults dropdown background-color set to white
				normalClasses: 'joqd blue-text blue-text-hover grey-lighten-3-hover', // defaults dropdown item classes
				activeClasses : 'joqd blue-text blue-text-hover grey-lighten-2 grey-lighten-2-hover', // defaults dropdown selected item classes
				disabledClasses: 'joqd disabled'  // defaults dropdown disabled item classes
			}, options );

			var element = $(this);

			attributes = {
				id: element.attr('id'), // id of input
				classes: element.attr('class'), // classes of input
				value: element.find('option:selected').text() // text of input
			}

			var input = '<input id="' + attributes.id + '" class="' + attributes.classes + ' select-input" placeholder="" type="text" value="' + attributes.value + '">'

			var dropdown = '<ul class="joqd dropdown select-dropdown ' + settings.dropdownColor + '">' + dropdownItem(element, settings.disabledClasses, settings.activeClasses, settings.normalClasses) + '</ul>';
			var tempWrapper = '<div id="dropdownTempWrapper"></div>';

			element.parent().append(input, dropdown);

			$('.select-input').on('click', function(){ // when clicked on select input

				var thisDropdown = this;
				openDropdown(thisDropdown); // open the this dropdown

				$('#dropdownTempWrapper').on('click', function(){ // when clicked on temp wrapper

					closeDropdown(thisDropdown); // close this the dropdown

				})

				$('ul.joqd.select-dropdown li').unbind().on('click', function(){

					if ( !$(this).hasClass(settings.disabledClasses) ) { // if clicked item was not disabled

						$(this).removeClass(settings.normalClasses).addClass(settings.activeClasses); // switch classes to selected item
						$(this).siblings( '.' + settings.activeClasses.replace(/\s/g, '.') ).removeClass(settings.activeClasses).addClass(settings.normalClasses); // switch classes of pervious selected item

						$(thisDropdown).val( $(this).text() ); // update input text
						$(thisDropdown).siblings('select').find('option[value="' + $(this).attr('id').replace($(thisDropdown).attr('id'), '') + '"]').attr('selected','selected').siblings().removeAttr("selected"); // switch actual select options

						closeDropdown(thisDropdown); // close this the dropdown

					}

				})

			})

		}

		function dropdownItem(select, disabled, selected, normal){

			var dropdownItem = '';

			select.find('option').each(function(){

				var classes = $(this).attr('class');
				var stateClass = '';

				if ( $(this).is(':disabled') ) { // if option was disabled
					stateClass = disabled;
				} else if ( $(this).is(':selected') ) { // if option was selected
					stateClass = selected;
				} else {  // if option was normal
					stateClass = normal
				}

				if ( classes.toLowerCase().indexOf(stateClass) != -1 ){ // if dropdown item had state class
					// do nothing
				} else { // else
					classes = classes.concat(' ', stateClass); // add state class to dropdown item
				}

				dropdownItem = dropdownItem + '<li class="' + classes + '" id="' + $(this).parent('select').attr('id') + $(this).val() + '">' + $(this).text() + '</li>'; // creat items

			})

			return dropdownItem;
		}

		function openDropdown(input){
			$('body').prepend('<div id="dropdownTempWrapper"></div>'); // add a temp wrapper
			$(input).siblings('ul.joqd.select-dropdown').slideDown('fast'); // slide down the dropdown
		}

		function closeDropdown(input){
			$('#dropdownTempWrapper').remove(); // delete the temp wrapper
			$(input).siblings('ul.joqd.select-dropdown').fadeOut(); // fade out the dropdown
		}

	}( jQuery ));

/*
=================================================================================================
# 7 Tooltip
-------------------------------------------------------------------------------------------------
*/

  (function( $ ) {

    $.fn.tooltip = function(options) {

      var settings = $.extend({ // These are the defaults.
      	position: 'auto', // default tooltip position set to  auto
        color: 'grey-darken-3', // default tooltip color set to grey-darken-3
        corner: 'soft-corner', // default tooltip corner set to soft-corner
        text: '', // default tooltip text set to nothing
        border: '', // default tooltip border set to nothing

      }, options );

      var element;

      var tooltip = {
      	markup: '',
      	class: 'active-tooltip',
      	content: '',
      	position: '',
      	width: '',
      	height: ''
      }

      $(function() {
       $(".joqd.tooltiped").hover(function(e) {

	    	element = $(this);
	    	tooltip.content = element.attr('title'); // get element's title as tooltip content
	    	tooltip.markup = '<span class="joqd ' + tooltip.class + ' ' + settings.color + ' ' + settings.corner + ' ' + settings.text + ' ' + settings.border + '">' + tooltip.content + '</span>';  // make tooltip markup

	    	if (settings.position == 'auto') { // if positioning was dynamic
	    		tooltip.position = closestEdge(e.offsetX, e.offsetY, element.width(), element.height())
	    	} else { // if positioning was manual
	    		tooltip.position = settings.position;
	    	}

	    	element.prop('title', '').append(tooltip.markup).find('.' + tooltip.class).fadeIn(200);

	    	tooltip.width = $('.' + tooltip.class).outerWidth();
	    	tooltip.height = $('.' + tooltip.class).outerHeight();

	    	switch (tooltip.position){
	    		case 'right':
		    		positionTooltip(
		    			(tooltip.height / 4), 	// top
		    			-(tooltip.width + 12), 	// right
		    			'auto', 				// bottom
		    			'auto'  				// left
	    			);
	    			break;
	    		case 'top':
		    		positionTooltip(
		    			-(tooltip.height + 12),	// top
		    			'-24px',				// right
		    			'auto', 				// bottom
		    			'-24px'  				// left
	    			);
	    			break;
	    		case 'left':
		    		positionTooltip(
		    			(tooltip.height / 4), 	// top
		    			'auto',				 	// right
		    			'auto', 				// bottom
		    			-(tooltip.width + 12)	// left
	    			);
	    			break;
	    		case 'bottom':
		    		positionTooltip(
		    			'auto',					// top
		    			'-24px',				// right
		    			-(tooltip.height + 12), // bottom
		    			'-24px'  				// left
	    			);
	    			break;
	    	}

       }, function(e) {

          $('.' + tooltip.class).fadeOut(100);
	    	     setTimeout(function () {
	    		    $('.' + tooltip.class).remove();
            }, 101);
          element.prop('title', tooltip.content);

	      });

      });

  		function closestEdge(x,y,w,h) {
        var topEdgeDist = distMetric(x,y,w,0);
        var bottomEdgeDist = distMetric(x,y,w,h);
        var leftEdgeDist = distMetric(x,y,0,h/2);
        var rightEdgeDist = distMetric(x,y,w,h/2);
        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
        switch (min) {
            case leftEdgeDist:
                return 'left';
            case rightEdgeDist:
                return 'right';
            case topEdgeDist:
                return 'top';
            case bottomEdgeDist:
                return 'bottom';
        }
  		}

  		function distMetric(x,y,x2,y2) {
  		    var xDiff = x - x2;
  		    var yDiff = y - y2;
  		    return (xDiff * xDiff) + (yDiff * yDiff);
  		}

  		function positionTooltip(t, r, b, l){
  			$('.' + tooltip.class).css({
  	    		'top' : t,
  	    		'right': r,
  	    		'bottom': b,
  	    		'left': l
	    	})
  		}

    };

  }( jQuery ));
