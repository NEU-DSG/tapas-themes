// Closes the Responsive Menu on Menu Item Click
jQuery('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

(function($) {
  //for equal height thumbnails
  $(window).resize(checkAdjustThumbnailHeight);
  $(window).resize(checkVerticalTabs);
  $(window).resize(fixSubMenus);
  $(window).resize(fixGridView);

  //for equal height thumbnails
  function checkAdjustThumbnailHeight() {
    if (!$("#mq-detector").length){
      $("body").append('<span id="mq-detector"><span class="visible-xs"></span><span class="visible-sm"></span><span class="visible-md"></span><span class="visible-lg"></span></span>');
    }
    if ($("#mq-detector > span.visible-lg").is(":visible")) {
      adjustThumbnailHeight();
    }
    else if ($("#mq-detector > span.visible-md").is(":visible")) {
      adjustThumbnailHeight();
    }
    else if ($("#mq-detector > span.visible-sm").is(":visible")) {
      inheritThumbailHeight();
    }
    else if ($("#mq-detector > span.visible-xs").is(":visible")) {
      inheritThumbailHeight();
    }
    else { }
  }
  function adjustThumbnailHeight() {
    if (!($(".thumbnail").parents(".list-view").length)){
      var heights = [ ];
      $(".thumbnail").each(function() {
        var gridHeight = 0;
        if (!$(this).find(".grid-hover-parent").length){
          $(this).find(".grid-hover").each(function(){
            gridHeight += $(this).outerHeight();
          });
        }
        heights.push( $(this).height() - gridHeight);
      });
      var max = Math.max.apply(null, heights);
      $(".thumbnail").each(function() {
        $(this).height(max);
      });
    }
  }
  function inheritThumbailHeight() {
    $(".thumbnail").each(function() {
      $(this).css("height", "inherit");
    });
  }

  //makes vertical tabs into horizontal tabs on smaller devices
  function checkVerticalTabs(){
    if ($(window).width() < 767){
      $(".group-tei-record .vertical-tabs .vertical-tabs-list .vertical-tab-button").removeClass('vertical-tab-button');
      $(".group-tei-record .vertical-tabs .vertical-tabs-list").removeClass('vertical-tabs-list');
      $(".group-tei-record .vertical-tabs .vertical-tabs-panes").removeClass('vertical-tabs-panes').removeClass('vertical-tabs-processed').addClass('col-sm-12');
      $(".group-tei-record .vertical-tabs").removeClass('tabs-left').removeClass('vertical-tabs').addClass('horizontal-tabs');
    } else {
      if ($(".group-tei-record .tabbable").hasClass('horizontal-tabs')){
        $(".group-tei-record .horizontal-tabs").addClass('vertical-tabs').addClass('tabs-left').removeClass('horizontal-tabs');
        $(".group-tei-record .vertical-tabs .col-sm-12").addClass('vertical-tabs-panes').addClass('vertical-tabs-processed').removeClass('col-sm-12');
        $(".group-tei-record .vertical-tabs .nav-tabs").addClass('vertical-tabs-list');
        $(".group-tei-record .vertical-tabs .vertical-tabs-list li").addClass('vertical-tab-button');
      }
    }
  }

  //fix for affixed sidebar navs
  function fixSubMenus(){
    if ($("body").hasClass("sidebar-first")){
      if ($(window).width() < 900){
        $(".region-sidebar-first").find(".affix").each(function(){
          $(this).removeClass('affix');
          $(this).insertAfter('h1.page-header');
        });
      } else {
        $(".sidebar-first .page-header").next("section.block").each(function(){
          $(this).addClass('affix');
          $(this).appendTo('.region-sidebar-first');
        });
      }
    }
  }

  /*making some metadata display on hover instead of default display - for all records grid view, attachs to view class grid-view and field class grid-hover*/
  function fixGridView(){
    $(".grid-view").find(".thumbnail").each(function(){
      if (!$(this).find(".grid-hover-parent").length){
        $(this).find(".grid-hover").wrapAll('<a class="grid-hover-parent" />');
        var node_href = $(this).find("h5.text-center a").attr("href");
        $(this).find(".grid-hover-parent").attr("href", node_href);
      }
      $(this).find(".grid-hover-parent").css("height", $(this).outerHeight()).css("width", $(this).outerWidth());
    });
  }

  $(document).ready(function() {
    //adding support file flags in the my view
    $("h4.support-file, h5.support-file").each(function(){
      $(this).append("<button class='btn btn-info btn-xs'>Support File</button>");
    });

    checkAdjustThumbnailHeight;
    checkVerticalTabs;
    fixSubMenus;
    fixGridView;

    $("body.front").find(".main-container").addClass("container-fluid").removeClass("container");
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll, #TOC a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 80
        }, 400);//, 'easeInOutExpo'
        return false;
    });

    //adding filter heading
    $(".view").find(".view-filters form").prepend("<div class='panel-heading'>Filters</div>");

    //making footer menu into three columns
    var $children = $('.footer .menu .leaf');
    for(var i = 0, l = $children.length; i < l; i += 3) {
        $children.slice(i, i+3).wrapAll('<div class="col-sm-4"></div>');
    }
    //closes collapse when you click outside them
    $(document).click(function(e){
      //!$(e.target).is('.collapse') ||
      if($(e.target).parents('.collapse').length == 0) {
         $('.collapse').collapse('hide');
      }
    });

    //making the featured content into a row so it can be styled correctly
    $("body.front").find(".region-content .block.col-md-3").wrapAll('<div class="featured row" />');
    $("body.front").find(".featured.row").wrap("<div class='featured container-fluid' />");

    //for the back to top button
    $('body').prepend('<a href="#" class="back-to-top"><span class="fa fa-chevron-up"></span></a>');
    var amountScrolled = 300;
    $(window).scroll(function() {
    	if ( $(window).scrollTop() > amountScrolled ) {
    		$('a.back-to-top').fadeIn('slow');
    	} else {
    		$('a.back-to-top').fadeOut('slow');
    	}
    });
    $('a.back-to-top').on("click", function() {
    	$('body, html').animate({
    		scrollTop: 0
    	}, 700);
    	return false;
    });

    //autopopulate slugs for projects and collections
    $("#tapas-project-node-form input[name='title'], #tapas-collection-node-form input[name='title']").on("keyup", function(){
      var title = $(this).val();
      title = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').substr(0, 30);
      if (title.substr(title.length-1) == '-'){
        title = title.substring(0, title.length - 1);
      }
      $("#edit-field-tapas-slug-und-0-value").val(title);
    });

  });
})(jQuery);

//toggle star to favorite - not implemented yet
// jQuery(".record-helpers a.favorite").click(function(e){
//   e.preventDefault();
//   jQuery(this).find("i").toggleClass("fa-bookmark-o").toggleClass("fa-bookmark");
// });




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
