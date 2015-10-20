(function($) {
  $(document).ready(function() {
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
      $("."+style_class).show();
      if (style == 'teibp'){
        console.log("and now we will enqueue the teibp css and js");
        //enqueu correct css/js
      }
      if (style == 'tapas_generic'){
        console.log("and now we will enqueue the tapas_generic css and js");
        //enequeu correct css/js
      }
    }
    // var uuid = $(".node-tapas-record").attr("id").substring(5);
    // get_tab_content('tapas_tei', uuid);
    //
    // $(".tapas-reader .nav-tabs li a").on("click", function(e){
    //   e.preventDefault();
    //   var tab = $(this).attr('href').substring(1);
    //   get_tab_content(tab, uuid);
    //   console.log(tab);
    // });
    //
    // function get_tab_content(tab_id, uuid){
    //   console.log(tab_id);
    //   console.log(uuid);
    //   // $(".tapas-generic").appendTo(".tapas_generic");
    //   // $(".tapas-generic").hide();
    //   // $.ajax({
    //   //  url : "http://rails_api.localhost:8080/"+uuid+"/tapas_generic",
    //   //  headers: {
    //   //       'X-Auth-Token' : "tapas12345"
    //   //  }).success( function(data){
    //   //    console.log(data);
    //   //  });
    // }

  });
})(jQuery);
