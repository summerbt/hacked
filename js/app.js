$(document).ready(function(){
DEBUG_MODE = true;

var user = {
	hackerHandle:"",
	gameLog:[]
}

var prompt = "$ "

var terminalLog = ["Shall we play a game?"];

var question = {
	category:"",
	file:"",
	questionText:"",
	choices:{
		a:"",
		b:"",
		c:"",
		d:""
	},
	answer:['',''],
	checkAnswer:function(input, answer){
		var inputUpperCase = input.toUpperCase();
		var letterAnsUpperCase = answer[0].toUpperCase();
		var textAnsUpperCase = answer[1].toUpperCase();
		var letterTextAnsUpperCase = letterAnsUpperCase + ':' + textAnsUpperCase;

		if (inputUpperCase == letterAnsUpperCase || inputUpperCase == textAnsUpperCase || inputUpperCase == letterTextAnsUpperCase){
			return true;
		}else{
			return false;
		}
	},
};

var fictionQ1 = Object.create(question);

function inputFocus(){
	document.getElementById('terminal').scrollIntoView();
}

function setVolume(){
	mySound=document.getElementById("sound");
	mySound.volume=0.2;
}

function retrieveName(){
	user.hackerHandle = $("#login").val();
	$("#login").val('');
	terminalLog.unshift("Greetings, " + user.hackerHandle);
	console.log(user.hackerHandle);
}

function retrieveTerminalInput(){
	var terminalInput = $('#terminal').val();
	console.log(terminalInput);
	$('#terminal').val('');
	terminalLog.push(prompt+" "+terminalInput);
}

function launchTerminal(){
	$("#gameTerminal").show(1000);
	document.getElementById('terminal').scrollIntoView();
	// if (this.id == fictionBanner){
		$("#terminalInputElement").show();
		for(i in terminalLog){
			printToTerminal();
		};
	// }
	console.log(this.id);
}

function printToTerminal(){
	for(i in terminalLog){
			var temp = terminalLog[i];
			user.gameLog.push(temp);
			$("#terminalInputElement").append('<p>'+temp+'</p>');
			inputFocus();
		}
		terminalLog = [];

}
setVolume();

	$(document).on('keydown',function(key){
		if (key.keyCode == 27){
			location.reload();
		}
	});

	$("#gameTerminal").on('keydown',function(key){
		if (key.keyCode == 13){
			retrieveTerminalInput();
			console.log(terminalLog);
			printToTerminal();
			// $("#gameTerminal").hide(1000);
			inputFocus();
		}
	});

	$("#introBanner").on('keydown',function(key){
		if (key.keyCode == 13){
			retrieveName();
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