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
