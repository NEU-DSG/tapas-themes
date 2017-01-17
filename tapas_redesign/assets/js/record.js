(function($) {
  $(document).ready(function() {
    var editor;
    $(".reading").prepend("<link rel='stylesheet' type='text/css' id='reader_css_1'></link><link rel='stylesheet' type='text/css' id='reader_css_2'></link><link rel='stylesheet' type='text/css' id='reader_css_3'></link>");
    var style = $(".form-item-reading-selector select[name='reading_selector']").val();
    console.log(style);
    show_style(style);

    $(".form-item-reading-selector select[name='reading_selector']").on("change", function(e){
      e.preventDefault();
      var style = $(".form-item-reading-selector select[name='reading_selector']").val()
      console.log(style);
      show_style(style);
    })

    function show_style(style){
      style_class = "reader_"+style;
      console.log(style_class);
      $('[class^="reader_"]').hide();
      $("link[id^='reader_css_']").each(function(){
        $(this).attr('href','');
      });
      $("."+style_class).show();
      if (style == 'teibp'){
        $("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/teibp.css");
        $("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/sleepy.css");
        $("#reader_css_3").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/terminal.css");
      }
      if (style == 'tapas_generic'){
        $("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGnormal.css");
        $("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGdiplo.css");
      }
      if (style == 'tei'){
        $(".reader_tei pre").attr("id", "ace");
        editor = ace.edit("ace");
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/xml");
        editor.setOptions({
          maxLines: Infinity,
          minLines: 20,
          useSoftTabs: true,
          showInvisibles: true,
          readOnly: true,
        });
      }
    }

    $('#toggle_word_wrap').on('change', function(){
      if ($('#toggle_word_wrap').is(':checked')){
        editor.getSession().setUseWrapMode(true);
      } else {
        editor.getSession().setUseWrapMode(false);
      }
    });

    $('#toggle_invisibles').on('change', function(){
      if ($('#toggle_invisibles').is(':checked')){
        editor.setShowInvisibles(false);
      } else {
        editor.setShowInvisibles(true);
      }
    });

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
