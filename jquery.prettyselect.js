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
				settings,
				init,
				setListeners

			this.defaults = {};
			this.$el = false;
			
			init = function ($el, settings) {
				var $attach = $el.parent(),
					$options = $el.children('option'),
					$pretty, $prettyResults,
					attachPos;

				self.$el = $el;
				$pretty = $('<div/>', { 
					'id': $el.attr('id') + '-ps', 
					'class': 'ps-container ps-active',
					'data-original': $el.attr('id'),
					'style': 'width: ' + ((settings.width) ? settings.width : 'auto') + ';'
				});

				$pretty.html('<a class="ps-inner"><span class="ps-label">' + $el.find('option[selected="selected"]').text() + '</span><div><b></b></div></a><div class="ps-drop" style="display: none;"><ul class="ps-results"></ul></div>');
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
							$drop = $pretty.find('.ps-drop');

						// if a result was clicked, update the original element's value
						if ($target.attr('class') === 'active-result') {
							if (typeof settings.selectCallback === 'function') {
								settings.selectCallback($target.data('val'));
							}

							$($pretty.data('original')).val($target.data('val'));
							$pretty.find('.ps-label').text($target.text());
						}

						// toggle results drop
						$drop.toggle();
					});
			};

			settings = $.extend({}, this.defaults, options);

			return this.each( function() {
				init($(this), settings);
				setListeners(settings);
			});
		}
	});

}(jQuery));