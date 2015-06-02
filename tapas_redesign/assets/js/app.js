// jQuery for page scrolling feature - requires jQuery Easing plugin
(function ($) {
  $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
}(jQuery));


// Highlight the top nav as scrolling occurs
jQuery('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
jQuery('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//trigger carousel
jQuery(document).ready(function() {
  jQuery('#myCarousel').carousel({
	    interval: 10000
	})
  //trying to put all the tooltips on top instead of right because it pushes them off the screen
  jQuery('[data-toggle="tooltip"]').data('bs.tooltip').options.placement = 'top';
});

// //collapses clicks on outside click for collapses - taking this out because it was causing collapses to close automatically even if you click inside the collapse itself
// jQuery(document).on('click',function(){
//   jQuery('.collapse').collapse('hide');
// })

//toggle star to favorite
jQuery(".record-helpers a.favorite").click(function(e){
  e.preventDefault();
  jQuery(this).find("i").toggleClass("fa-bookmark-o").toggleClass("fa-bookmark");
})
