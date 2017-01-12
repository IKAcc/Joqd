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
