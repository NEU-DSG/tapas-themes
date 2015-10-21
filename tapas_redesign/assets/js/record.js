(function($) {
  $(document).ready(function() {
    $(".reading").prepend("<script id='reader_js' src='http://rails_api.tapasdev.neu.edu/reading_interface/teibp/js/teibp.js'></script><link rel='stylesheet' type='text/css' id='reader_css_1'></link><link rel='stylesheet' type='text/css' id='reader_css_2'></link><link rel='stylesheet' type='text/css' id='reader_css_3'></link>");
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
      $("#reader_js").attr('src','');
      $("."+style_class).show();
      if (style == 'teibp'){
        $("#reader_js").attr('src','http://rails_api.tapasdev.neu.edu/reading_interface/teibp/js/teibp.js');
        $("#reader_css_1").attr("href", "http://rails_api.tapasdev.neu.edu/reading_interface/teibp/css/teibp.css");
        $("#reader_css_2").attr("href", "http://rails_api.tapasdev.neu.edu/reading_interface/teibp/css/sleepy.css");
        $("#reader_css_3").attr("href", "http://rails_api.tapasdev.neu.edu/reading_interface/teibp/css/terminal.css");
      }
      if (style == 'tapas_generic'){
        $("#reader_js").attr('src','http://rails_api.tapasdev.neu.edu/reading_interface/tapas-generic/js/tapas-generic.js');
        $("#reader_css_1").attr("href", "http://rails_api.tapasdev.neu.edu/reading_interface/tapas-generic/css/tapasGnormal.css");
        $("#reader_css_2").attr("href", "http://rails_api.tapasdev.neu.edu/reading_interface/tapas-generic/css/tapasGdiplo.css");
      }
    }
  });
})(jQuery);
