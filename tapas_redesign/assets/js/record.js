(function($) {
  $(document).ready(function() {
    var uuid = $(".node-tapas-record").attr("id").substring(5);
    get_tab_content('tapas_tei', uuid);

    $(".tapas-reader .nav-tabs li a").on("click", function(e){
      e.preventDefault();
      var tab = $(this).attr('href').substring(1);
      get_tab_content(tab, uuid);
      console.log(tab);
    });

    function get_tab_content(tab_id, uuid){
      console.log(tab_id);
      console.log(uuid);
      // $(".tapas-generic").appendTo(".tapas_generic");
      // $(".tapas-generic").hide();
      // $.ajax({
      //  url : "http://rails_api.localhost:8080/"+uuid+"/tapas_generic",
      //  headers: {
      //       'X-Auth-Token' : "tapas12345"
      //  }).success( function(data){
      //    console.log(data);
      //  });
    }

  });
})(jQuery);
