/**
* plugin: jquery.naviDropDown.js
* author: kt.cheung @ Brandammo
* website: www.brandammo.co.uk
* version: 1.0
* date: 19th feb 2011
* description: simple jquery navigation drop down menu with easing and hoverIntent
**/

(function($){

  $.fn.naviDropDown = function(options) {  
  
	//set up default options 
	var defaults = { 
		dropDownClass: 'dropdown', //the class name for your drop down
		dropDownWidth: 'auto',	//the default width of drop down elements
		slideDownEasing: 'easeInOutBack', //easing method for slideDown
		slideUpEasing: 'easeInOutCirc', //easing method for slideUp
		slideDownDuration: 0, //easing duration for slideDown
		slideUpDuration: 0, //easing duration for slideUp
		orientation: 'vertical', //orientation - either 'horizontal' or 'vertical'
		dropdownMode: 'custom' // switch dropdown mode, leave empty for default functionality
	}; 
  	
	var opts = $.extend({}, defaults, options); 	

    return this.each(function() {  
	  var $this = $(this);
	  $this.find('.'+opts.dropDownClass).css('width', opts.dropDownWidth).css('display', 'none');
	  
	  var buttonWidth = $this.find('.'+opts.dropDownClass).parent().width() + 'px';
	  var buttonHeight = $this.find('.'+opts.dropDownClass).parent().height() + 'px';
	  if(opts.orientation == 'horizontal') {
		$this.find('.'+opts.dropDownClass).css('left', '0px').css('top', buttonHeight);
	  }
	  if(opts.orientation == 'vertical') {
		$this.find('.'+opts.dropDownClass).css('left', buttonWidth).css('top', '0px');
	  }
	  
	  $this.find('li').hoverIntent(getDropDown, hideDropDown);
    });
	
	function getDropDown(){
		activeNav = $(this);
		showDropDown();

		if(opts.dropdownMode === 'custom') {

		var childDropdown = activeNav.find('.dropdown'),
			currentLiMarginBottom = parseInt(activeNav.css('marginBottom').substring(0 -2)),
			currentLiheight = activeNav.height()+currentLiMarginBottom,
			prevSiblingsLi = activeNav.prevAll(),
			prevSiblingsLiLength = prevSiblingsLi.length,
			actualTopPosition = -prevSiblingsLiLength*currentLiheight;

			childDropdown.css('top', actualTopPosition+'px');
		}
	}
	
	function showDropDown(){

		var childDropdown = activeNav.find('.'+opts.dropDownClass),
			targetElement = childDropdown.find('.menu_earcontent'),
			targetElementLength = targetElement.length,
			targetElementTextLen = targetElement.text().length,
			childDropdownAttrId = childDropdown.attr('id'),
			childDropdownId = childDropdownAttrId.split('_');

		if(!activeNav.hasClass('menustatic') && !activeNav.hasClass('menuimg')){

			if(targetElementLength === 1){				
				if(targetElementTextLen === 0){
					$.get('menu_banners.phtml', { id:childDropdownId[1]}, function(result){ targetElement.html(result); });	
				}
			}

			activeNav.css('background-color','#ffc000');
			childDropdown.slideDown({duration:opts.slideDownDuration, easing:opts.slideDownEasing});
		}
	}
	
	function hideDropDown(){

		if(!activeNav.hasClass('menustatic') && !activeNav.hasClass('menuimg')){

			activeNav.css('background-color','#a4a4a5');
			activeNav.find('.'+opts.dropDownClass).slideUp({duration:opts.slideUpDuration, easing:opts.slideUpEasing}); //hides the current dropdown		
		}
	}
	
  };
})(jQuery);



