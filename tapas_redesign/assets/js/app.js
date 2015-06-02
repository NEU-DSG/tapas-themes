// Highlight the top nav as scrolling occurs
jQuery('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
jQuery('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

(function($) {
  $(document).ready(function() {
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    //trigger carousel
    jQuery('#myCarousel').carousel({
        interval: 10000
    });
  });
})(jQuery);

//toggle star to favorite
jQuery(".record-helpers a.favorite").click(function(e){
  e.preventDefault();
  jQuery(this).find("i").toggleClass("fa-bookmark-o").toggleClass("fa-bookmark");
})
