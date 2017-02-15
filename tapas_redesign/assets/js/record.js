(function($) {
  $(document).ready(function() {
    var editor;

    $(".reading").each(function(){
      $(this).prepend("<link rel='stylesheet' type='text/css' id='reader_css_1'></link><link rel='stylesheet' type='text/css' id='reader_css_2'></link><link rel='stylesheet' type='text/css' id='reader_css_3'></link>");
      var style = $(this).parents(".node").find(".form-item-reading-selector select[name='reading_selector']").val();
      console.log(style);
      show_style(style);
    });

    $(".form-item-reading-selector select[name='reading_selector']").on("change", function(e){
      e.preventDefault();
      var style = $(this).val()
      console.log(style);
      var pane = $(this).parents(".form-item").siblings(".reading");
      show_style(pane, style);
    });

    make_clickable($("body"));

    function make_clickable(body){
      body.find(".views-row .form-item-reading-selector select[name='reading_selector']").on("change", function(e){
        e.preventDefault();
        var style = $(this).val();
        console.log(style);
        var pane = $(this).parents(".form-item").siblings(".reading");
        show_style(pane, style);
      });
    }

    function show_style(pane, style){
      console.log(style);
      console.log(pane);
      style_class = "reader_"+style;
      pane.find('[class^="reader_"]').hide();
      pane.find("link[id^='reader_css_']").each(function(){
        $(this).attr('href','');
      });
      pane.find("."+style_class).show();
      if (style == 'teibp'){
        console.log("going to teibp");
        pane.find("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/teibp.css");
        pane.find("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/sleepy.css");
        pane.find("#reader_css_3").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/teibp/css/terminal.css");
      }
      if (style == 'tapas_generic'){
        console.log("going to tapas G");
        pane.find("#reader_css_1").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGnormal.css");
        pane.find("#reader_css_2").attr("href", "/profiles/buildtapas/themes/tapas-themes/tapas_redesign/lib/tapas-generic/css/tapasGdiplo.css");
      }
      if (style == 'tei'){
        $(".reader_tei pre").attr("id", "ace");
        editor = ace.edit("ace");
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/xml");
        editor.getSession().setUseWrapMode(true);
        editor.setOptions({
          maxLines: Infinity,
          minLines: 20,
          useSoftTabs: true,
          showInvisibles: true,
          readOnly: true,
        });
      }
    }

    if ($(".view-two-pane-reader").length){
      console.log("we're on the two pane viewer so lets fix it up");
      $(".ctools-jump-menu-select").on("change", function(){
        var nid = $(this).val();
        nid = nid.split("::/");
        nid = nid[nid.length -1];
        console.log("nid we're getting is"+nid);
        node_div = $(this).parents(".view-test-reader-pane").find(".view-content .views-row-1");
        ajax_get_node(node_div, nid, true);
      });
    }

    function processAjaxData(response, urlPath, side, style){
      // console.log(response);
      // document.getElementById("content").innerHTML = response.html;
      // document.title = response.pageTitle;
      // urlPath = "compare/3/6/4";
      window.history.pushState({"html":response, "side":side, "title":"Two-Pane Reader", "t_style":style},"", urlPath);
      console.log(window.history);
    }

    window.onpopstate = function(e){
      console.log("State has been popped");
      // if(e.state){
        // console.log(e.state);
        // console.log(e.state.side);
        // $("."+e.state.side+" .view-content .views-row-1").html(e.state.html);
        // show_style($("."+e.state.side+" .view-content .views-row-1").find(".reading"), e.state.t_style);
        // document.getElementById("content").innerHTML = e.state.html;
        // document.title = e.state.pageTitle;
      // } else {
        // console.log("this is back to the original so we need to revert but how?");
        var pathname = $(location).attr("href");
        console.log(pathname);
        pathname = pathname.split("/");
        left_node = pathname[pathname.length - 2];
        right_node = pathname[pathname.length -1];
        console.log("left is " + left_node);
        console.log("right is " + right_node);
        ajax_get_node($(".view-dislpay-id-reader_left .view-content .views-row-1"), left_node, false);
        ajax_get_node($(".view-display-id-reader_right .view-content .views-row-1"), right_node, false);
      // }
    };

    function ajax_get_node(node_div, nid, history){
      var url = "/node/get/ajax/"+nid;
      node_div.load(url, function(response, status, xhr){
        var style = $(this).parents(".view-test-reader-pane").find(".form-item-reading-selector select[name='reading_selector']").val();
        console.log(style);
        pane = $(this).parents(".view-test-reader-pane").find(".reading");
        classes = $(this).parents(".view-test-reader-pane").attr("class");
        classes = classes.split(" ");
        side = classes[3];
        pane.prepend("<link rel='stylesheet' type='text/css' id='reader_css_1'></link><link rel='stylesheet' type='text/css' id='reader_css_2'></link><link rel='stylesheet' type='text/css' id='reader_css_3'></link>");
        show_style(pane, style);
        if (history == true){
          processAjaxData(response, nid, side, style);
        }
        make_clickable($("body"));
      });
    }

    $('#toggle_word_wrap').on('change', function(){
      if ($('#toggle_word_wrap').is(':checked')){
        editor.getSession().setUseWrapMode(false);
      } else {
        editor.getSession().setUseWrapMode(true);
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
