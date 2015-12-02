$(document).ready(function(){
DEBUG_MODE = true;
function launchTerminal(){
	$("#gameTerminal").show(1000);
}
	$(document).on('keydown',function(key){
		if (key.keyCode == 27){
			location.reload();
		}
	});

	$("#gameTerminal").on('keydown',function(key){
		if (key.keyCode == 13){
			$("#gameTerminal").hide(1000);
		}
	});

	$("#introBanner").on('keydown',function(key){
		if (key.keyCode == 13){
			$("#introBanner").hide(1000);
		}
	});

	$("#menu").mouseup(function(e){
		var game = $("#gameTerminal");
		if(e.target.id != game.attr('id') && ! game.has(e.target).length)
        {
            game.hide(1000);
        }
	});

	
	$("#fictionBanner").on('click',launchTerminal);
	// $(document).on('keypress',function(key){
	// 	if (key.keyCode ==13){
	// 		numGuess();
	// 	}
	// });

	$("#newsBanner").on('click',launchTerminal);
	// $(document).on('keypress',function(key){
	// 	if (key.keyCode ==13){
	// 		numGuess();
	// 	}
	// });

	$("#tacticsBanner").on('click',launchTerminal);
	// $(document).on('keypress',function(key){
	// 	if (key.keyCode ==13){
	// 		numGuess();
	// 	}
	// });



	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});