(function($) {
  $(document).ready(function() {
    $(".reading").each(function(){
      $(this).prepend("<link rel='stylesheet' type='text/css' id='reader_css_1'></link><link rel='stylesheet' type='text/css' id='reader_css_2'></link><link rel='stylesheet' type='text/css' id='reader_css_3'></link>");
      var style = $(this).parents(".node").find(".form-item-reading-selector select[name='reading_selector']").val();
      console.log(style);
      show_style($(this), style);
    });

    $(".form-item-reading-selector select[name='reading_selector']").on("change", function(e){
      e.preventDefault();
      var style = $(this).val();
      console.log(style);
      var pane = $(this).parents(".form-item").siblings(".reading");
      show_style(pane, style);
    })

    function show_style(pane, style){
      style_class = "reader_"+style;
      pane.find('[class^="reader_"]').hide();
      pane.find("link[id^='reader_css_']").each(function(){
        $(this).attr('href','');
      });
      pane.find("."+style_class).show();
      if (style == 'teibp'){
        pane.find("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/teibp.css");
        pane.find("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/sleepy.css");
        pane.find("#reader_css_3").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/terminal.css");
      }
      if (style == 'tapas_generic'){
        pane.find("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGnormal.css");
        pane.find("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGdiplo.css");
      }
    }
  });
})(jQuery);

jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
