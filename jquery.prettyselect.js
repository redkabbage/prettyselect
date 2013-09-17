/*!
 * Pretty Select
 * Author: Matt Stills (https://github.com/mattacular)
 * Licensed under the MIT license
 */
;(function($) {
	'use strict';

	$.fn.extend( {
		prettySelect: function (options) {
			var self = this,
				defaults = {},
				settings, convert, setListeners;
			
			convert = function ($el, settings) {
				var $attach = $el.parent(),
					$options = $el.children('option'),
					$pretty, $prettyResults,
					attachPos;

				$pretty = $('<div/>', { 
					'id': $el.attr('id') + '-ps', 
					'class': 'ps-container ps-active' + (settings.wrapperClass ? ' ' + settings.wrapperClass : ''),
					'data-original': $el.attr('id'),
					'style': 'width: ' + ((settings.width) ? settings.width : 'auto') + ';'
				});

				$pretty.html('<a class="ps-inner"><span class="ps-label">' + $el.find('option[selected]').text() + '</span><div><b></b></div></a><div class="ps-drop" style="display: none;"><ul class="ps-results"></ul></div>');
				$pretty.data('original', $el.attr('id'));
				$el.hide().before($pretty);
				$prettyResults = $('.ps-results', $pretty);

				$options.each(function (idx, opt) {
					opt = $(opt);

					$prettyResults.append('<li class="active-result" data-val="' + opt.attr('value') + '" >' + opt.text() + '</li>');
				});
			};

			setListeners = function (settings) {
				$(document)
					.off('click', '.ps-container')
					.on('click', '.ps-container', function (event) {
						var $target = $(event.target),
							$pretty = $(this),
							$drop = $pretty.find('.ps-drop'),
							$original = $('#' + $pretty.data('original'));

						// if a result was clicked
						if ($target.attr('class') === 'active-result') {
							// update the value on the parent <select/> element
							$original.val($target.data('val'));
							$pretty.find('.ps-label').text($target.text());

							// also move the "selected" attribute to the right <option/>
							$original.find('option[selected]').attr('selected', null);
							$original.find('option[value=' + $target.data('val') + ']').attr('selected', '');

							// if a select callback was passed via settings, call it here
							if (typeof settings.selectCallback === 'function') {
								settings.selectCallback($target.data('val'));
							}
						}

						// toggle results drop
						$drop.toggle();
					});
			};

			settings = $.extend({}, defaults, options);

			return this.each(function () {
				convert($(this), settings);
				setListeners(settings);
			});
		}
	});

}(jQuery));