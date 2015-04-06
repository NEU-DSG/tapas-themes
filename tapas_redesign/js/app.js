// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//trigger carousel
$(document).ready(function() {
    $('#myCarousel').carousel({
	    interval: 10000
	})
});

//toolbar toggle buttons
$(".toolbar a").click(function() {
  var tool = $(this).data("toolbar");
  $("."+tool).slideToggle();
  $("."+tool).focus();
  console.log(document.activeElement);
});

$(document).click(function(event) {
  if(!$(event.target).closest('.toolbar div').length) {
    if($('.toolbar div').is(":visible")) {
      $('.toolbar div').hide();
    }
  }
});
