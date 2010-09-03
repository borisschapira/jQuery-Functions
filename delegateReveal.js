(function($) {

	/**
	* Manage the undisplay/reveal of elements in a container by
	* defining a trigger event on other elements inside the container, with target definition.
	* 
	* The default behaviour that triggers the reveal is 'click'.
	* You can embricate several reveal areas.
	*
	* @version 	1.2
	* @since 	2010-07-27
	* @author 	Boris Schapira <postmaster@borisschapira.com>
	* @requires jQuery 1.4.x
	* 
	* <code type="text/javascript">
	*  	$('.reveal-click-source').delegateReveal();
	* </code>
	*
	* <code type="text/html">
	*   <div class="reveal-click-area">
	*
	*   <span class="reveal-click-source reveal-click-target-foo">Reveal target with id = "foo"</span>
	*   <span class="reveal-click-source reveal-click-target-bar">Reveal target with id = "bar"</span>
	*
	*   <span class="reveal-click-item" id="foo">Item Foo</span>
	*   <span class="reveal-click-item" id="bar">Item Bar</span>
	*	
	*   </div>
	* </code>
	*/
	$.fn.delegateReveal = function(options) {
		var default_options = {
			/**
			* Event that triggers delegate Reveal
			* @type {string}
			*/
			delegateEvent: 'click',
			/**
			* Apply active effect, or not
			* @type {boolean}
			*/
			active: false,
			/**
			* Apply hovering effect, or not
			* @type {boolean}
			*/
			hover: false,
			/**
			* Selector of the area containing items to click and
			* items to reveal on click
			* @type {string}
			*/
			revealAreaSelector: '.reveal-click-area',
			/**
			* Selector of the items to reveal (target items)
			* @type {string}
			*/
			targetItemsSelector: '.reveal-click-item',
			/**
			* Class to apply on the target items that are not revealed
			* @type {string}
			*/
			targetItemsHiddenClass: 'nodisplay',
			/**
			* Pattern matched to extract href ID
			* This must be a regular expression
			* @type {pattern}
			*/
			idPattern: /reveal-click-target-([^\s$]+)/i,
			/**
			* Classname applied on the active source item
			* @type {string}
			*/
			activeClassName: 'active',
			/**
			* Classname applied on the hovered source item
			* @type {string}
			*/
			hoverClassName: 'hovered'
		};

		/*
		* Merge options
		*/
		options = $.extend({}, default_options, options);

		/*
		* Optional hovering effect
		*/
		if (options.hover === true) {
			this
				.bind('mouseenter', function() {
					$(this).addClass(options.hoverClassName);
				})
				.bind('mouseleave', function() {
					$(this).removeClass(options.hoverClassName);
				});
		}

		/*
		* Delegate event
		*/
		return this.live(options.delegateEvent, function(event) {
			var $target,
				$this = $(this);

			/*
			* Collecting the remote target through ID pattern
			*/
			$this.attr('class').replace(options.idPattern, function(m, id) {
				$target = $this.parents(options.revealAreaSelector).filter(':first').find('#' + id);
			});

			/*
			* Show/Hide behaviour
			*/
			if ($target.length) {

				/*
				* Optional active effect
				*/
				if (options.active === true) {
					/*
					* Desactivate all sources then activate this
					*/
					$this.parents(options.revealAreaSelector).filter(':first').find('.' + options.activeClassName).removeClass(options.activeClassName);
					$this.addClass(options.activeClassName)
				}

				/*
				* Hide all targets except from the designated one
				*/
				$this.parents(options.revealAreaSelector).filter(':first').find(options.targetItemsSelector).addClass(options.targetItemsHiddenClass);
				$target.removeClass(options.targetItemsHiddenClass);
			}
		});
	};
})(jQuery);