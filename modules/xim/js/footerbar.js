/*
* You may not change or alter any portion of this comment or credits
* of supporting developers from this source code or any supporting source code
* which is considered copyrighted (c) material of the original comment or credit authors.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
* XIM - Xoops Instant Messenger
*
* A one-on-one messenger written for xoops. Inspired by Anant Garg's -(anantgarg.com | inscripts.com)-
* 2009 tutorial on jquery messenger & by the original facebook messenger and a few more. This module has
* been adapted, written, re-written and extended heavily by Andrax & Culex.
*
* @copyright       The XOOPS Project http://sourceforge.net/projects/xoops/
* @license         http://www.fsf.org/copyleft/gpl.html GNU public license
* @package         modules
* @subpackage      xim
* @since           2.4.0
* @author          Andrax - homepage.: http://guxbrasil.org & email.: lcbc@ig.com.br
* @author          Culex  - homepage.: http://culex.dk		& email.: culex@culex.dk
*/

/* Credit: http://www.sohtanaka.com  */

xoops_im(document).ready(function(){

	//Adjust panel height
	xoops_im.fn.adjustPanel = function(){ 
		xoops_im(this).find("ul, .subpanel").css({ 'height' : 'auto'}); //Reset subpanel and ul height
		
		var windowHeight = xoops_im(window).height(); //Get the height of the browser viewport
		var panelsub = xoops_im(this).find(".subpanel").height(); //Get the height of subpanel	
		var panelAdjust = windowHeight - 100; //Viewport height - 100px (Sets max height of subpanel)
		var ulAdjust =  panelAdjust - 25; //Calculate ul size after adjusting sub-panel (27px is the height of the base panel)
		
		if ( panelsub >= panelAdjust ) {	 //If subpanel is taller than max height...
			xoops_im(this).find(".subpanel").css({ 'height' : panelAdjust }); //Adjust subpanel to max height
			xoops_im(this).find("ul").css({ 'height' : ulAdjust}); //Adjust subpanel ul to new size
		}
		else if ( panelsub < panelAdjust ) { //If subpanel is smaller than max height...
			xoops_im(this).find("ul").css({ 'height' : 'auto'}); //Set subpanel ul to auto (default size)
		}
	};
	
	//Execute function on load
	xoops_im("#chatpanel").adjustPanel(); //Run the adjustPanel function on #chatpanel
	xoops_im("#alertpanel").adjustPanel(); //Run the adjustPanel function on #alertpanel
	
	//Each time the viewport is adjusted/resized, execute the function
	xoops_im(window).resize(function () { 
		xoops_im("#chatpanel").adjustPanel();
		xoops_im("#alertpanel").adjustPanel();
	});
	
	//Click event on Chat Panel + Alert Panel	
	xoops_im("#chatpanel a:first, #alertpanel a:first").click(function() { //If clicked on the first link of #chatpanel and #alertpanel...
		if(xoops_im(this).next(".subpanel").is(':visible')){ //If subpanel is already active...
			xoops_im(this).next(".subpanel").hide(); //Hide active subpanel
			xoops_im("#footpanel li a").removeClass('active'); //Remove active class on the subpanel trigger
		}
		else { //if subpanel is not active...
			xoops_im(".subpanel").hide(); //Hide all subpanels
			xoops_im(this).next(".subpanel").toggle(); //Toggle the subpanel to make active
			xoops_im("#footpanel li a").removeClass('active'); //Remove active class on all subpanel trigger
			xoops_im(this).toggleClass('active'); //Toggle the active class on the subpanel trigger
		}
		return false; //Prevent browser jump to link anchor
	});
	
	//Click event outside of subpanel
	xoops_im(document).click(function() { //Click anywhere and...
		xoops_im(".subpanel").hide(); //hide subpanel
		xoops_im("#footpanel li a").removeClass('active'); //remove active class on subpanel trigger
	});
	xoops_im('.subpanel ul').click(function(e) { 
		e.stopPropagation(); //Prevents the subpanel ul from closing on click
	});
	
	//Delete icons on Alert Panel
	xoops_im("#alertpanel li").hover(function() {
		xoops_im(this).find("a.delete").css({'visibility': 'visible'}); //Show delete icon on hover
	},function() {
		xoops_im(this).find("a.delete").css({'visibility': 'hidden'}); //Hide delete icon on hover out
	});
	
});