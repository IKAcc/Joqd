
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
