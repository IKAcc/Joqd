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
