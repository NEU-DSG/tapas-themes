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
    $("body.front").find(".main-container").addClass("container-fluid").removeClass("container");
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    //adding filter heading
    $(".view").find(".view-filters form").prepend("<div class='panel-heading'>Filters</div>");

    //making footer menu into three columns
    var $children = $('.footer .menu .leaf');
    for(var i = 0, l = $children.length; i < l; i += 3) {
        $children.slice(i, i+3).wrapAll('<div class="col-sm-4"></div>');
    }
  });

})(jQuery);

//toggle star to favorite
jQuery(".record-helpers a.favorite").click(function(e){
  e.preventDefault();
  jQuery(this).find("i").toggleClass("fa-bookmark-o").toggleClass("fa-bookmark");
});




/*this overrides the js from homebox - all i'm doing is replacing .tipsy with .tooltip but i can't think of a better way to do this*/
(function($) {
  Drupal.behaviors.homeboxPortlet = {
  attach: function (context) {
    $('.homebox-portlet:not(.homebox-processed)', context).addClass('homebox-processed').each(function () {
      var $portlet = $(this),
        $portletHeader = $portlet.find('.portlet-header'),
        $portletSettings = $portlet.find('.portlet-settings'),
        $portletConfig = $portlet.find('.portlet-config');

      // Restore classes saved before AHAH, they back some page-wide
      // settings.
      if (Drupal.homebox.config[$portlet.attr('id')] !== undefined) {
        $portlet.attr('class', Drupal.homebox.config[$portlet.attr('id')]);
      }

      // Prevent double-clicks from causing a selection
      $portletHeader.disableSelection();

      // Attach click event to maximize icon
      $portletHeader.find('.portlet-maximize').click(function () {
        $(this).toggleClass('portlet-maximize').toggleClass('portlet-minimize');
        Drupal.homebox.maximizeBox(this);
        Drupal.homebox.equalizeColumnsHeights();
      });

      // Attach click event on minus
      $portletHeader.find('.portlet-minus').click(function () {
        $(this).toggleClass('portlet-minus').toggleClass('portlet-plus');
        $portlet.find('.portlet-content').toggle();
        Drupal.homebox.equalizeColumnsHeights();
        Drupal.homebox.pageChanged();
      })
      .each(function () {
        if (!$portlet.find('.portlet-content').is(':visible')) {
          $(this).toggleClass('portlet-minus').toggleClass('portlet-plus');
          Drupal.homebox.equalizeColumnsHeights();
        }
      });

      // Attach double click event on portlet header
      $portlet.find('.portlet-title').dblclick(function () {
        if ($portlet.find('.portlet-content').is(':visible')) {
          $portletHeader.find('.portlet-minus').toggleClass('portlet-plus').toggleClass('portlet-minus');
        }
        else {
          $portletHeader.find('.portlet-plus').toggleClass('portlet-minus').toggleClass('portlet-plus');
        }
        $portlet.find('.portlet-content').toggle();

        Drupal.homebox.equalizeColumnsHeights();
        Drupal.homebox.pageChanged();
      });

      // Attach click event on settings icon
      $portletSettings.click(function () {
        $portletConfig.toggle();
        Drupal.homebox.equalizeColumnsHeights();
      });
      // Show settings if there are error messages
      if ($portletConfig.find('>.messages').length) {
        $portletSettings.trigger('click');
      }
      // Save classes on submit
      $portletConfig.find('.form-submit').click(function () {
        Drupal.homebox.config[$portlet.attr('id')] = $portlet.attr('class');
      });

      // Attach click event on close
      $portletHeader.find('.portlet-close').click(function () {
        $portlet.hide();
        Drupal.homebox.equalizeColumnsHeights();
        Drupal.homebox.pageChanged();
      });

      $.each($portlet.attr('class').split(' '), function (key, a) {
        if (a.substr(0, 14) === 'homebox-color-') {
          $portletHeader.attr('style', 'background: #' + a.substr(14));
          $portlet.find('.homebox-portlet-inner').attr('style', 'border: 1px solid #' + a.substr(14));
        }
      });

      // Add click behaviour to color buttons
      $portlet.find('.homebox-color-selector').click(function () {
        var color = $(this).css('background-color');
        color = Drupal.homebox.hexColor(color);

        $.each($portlet.attr('class').split(' '), function (key, value) {
          if (value.indexOf('homebox-color-') === 0) {
            $portlet.removeClass(value);
          }
        });

        // Add color classes to blocks
        // This is used when we save so we know what color it is
        $portlet.addClass('homebox-color-' + color.replace('#', ''));

        // Apply the colors via style attributes
        // This avoid dynamic CSS
        $portletHeader.attr('style', 'background: ' + color);
        $portlet.find('.homebox-portlet-inner').attr('style', 'border: 1px solid ' + color);
        Drupal.homebox.pageChanged();
      });

      // Add tooltips to icons
      //changed .tipsy to .tooltip and commented out gravity
      $portlet.find('.portlet-icon').tooltip({
        //gravity: 's',
        title: function () {
          switch ($(this).attr('class').replace('portlet-icon portlet-', '')) {
          case 'close':
            return Drupal.t('Close');
          case 'maximize':
            return Drupal.t('Maximize');
          case 'minimize':
            return Drupal.t('Minimize');
          case 'minus':
            return Drupal.t('Collapse');
          case 'plus':
            return Drupal.t('Expand');
          case 'settings':
            return Drupal.t('Settings');
          }
        }
      });

      // Remove tooltips on header clicks
      $portletHeader.click(function () {
        $('.tipsy').remove();
      });
    });
  }
};
})(jQuery);
