function clearPageBreaks(){
	jQuery(".teibp pb").css("display","none");
	jQuery(".teibp .-teibp-pb").css("display","none");
}

function addPageBreaks(){
	jQuery(".teibp pb").css("display","block");
	jQuery(".teibp .-teibp-pb").css("display","block");
}

function init(){
	jQuery(".teibp").addClass('default');
	jQuery('#pbToggle').onclick = function(){
		if(jQuery('#pbToggle').checked){
			clearPageBreaks();
		}else{
			addPageBreaks();
		}
	};
	addPageBreaks();
	jQuery('#pbToggle').checked = false;
}

jQuery(document).ready(function(){
	init();
	jQuery("#themeBox").on('change', function(e){
		switchThemes(e);
	});
});

function switchThemes(theme){
	// console.log(theme);
	console.log(jQuery(theme).parents("#teibpToolbox").siblings("#tei_wrapper").find(".teibp"));
	console.log(jQuery(theme).val());
	jQuery(theme).parents("#teibpToolbox").siblings("#tei_wrapper").find(".teibp").removeClass('sleepytime').removeClass('terminal').removeClass('default').addClass(jQuery(theme).val());
	jQuery(theme).parents("#teibpToolbox").parents(".teibp").removeClass('sleepytime').removeClass('terminal').removeClass('default').addClass(jQuery(theme).val());
}
