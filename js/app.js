$(document).ready(function(){

DEBUG_MODE = true;

var temp = "";

var gameLocation = "category selected"

var selectedCategory = "";

var fictionQuestionCount = 0;
var newsQuestionCount = 0;
var tacticsQuestionCount = 0;

var fictionAnsCheckArray = [];
var newsAnsCheckArray = [];
var tacticsAnsCheckArray = [];

var completedTests = [];

var user = {
	hackerHandle:"",
	gameLog:[]
};

var prompt = "$ ";

var terminalInput = ""

var terminalLog = ["Shall we play a game?"];

var question = {
	questionId:"",
	category:"",
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
	fictionQ1.category = "fiction";
	fictionQ1.questionText = "What year was the cult classic hacker movie 'Hackers' released?";
	fictionQ1.choices = {
		a:"1979",
		b:"1988",
		c:"1995",
		d:"2000"
	}
	fictionQ1.answer = ['C','1995'];

var fictionQ2 = Object.create(question);
	fictionQ2.category = "fiction";
	fictionQ2.questionText = "In the television show 'Mr.Robot' the organization 'fsociety' most closely resembles which real-life hacktivist group?";
	fictionQ2.choices = {
		a:"Equation Group",
		b:"Chaos Computer Club",
		c:"Anonymous",
		d:"RedHack"
	}
	fictionQ2.answer = ['C','ANONYMOUS'];

var fictionQ3 = Object.create(question);
	fictionQ3.category = "fiction";
	fictionQ3.questionText = "In the 1983 hacker film WarGames what does the name 'Joshua' refer to?";
	fictionQ3.choices = {
		a:"Matthew Broderick's character",
		b:"IMSAI 8080 microcomputer",
		c:"character Jennifer Mack's hacker handle",
		d:"backdoor password for WOPR"
	}
	fictionQ3.answer = ['D','BACKDOOR PASSWORD FOR WOPR'];

var fictionArray = [fictionQ1, fictionQ2, fictionQ3];

var newsQ1 = Object.create(question);
	newsQ1.category = "news";
	newsQ1.questionText = "Between 2005 and 2007, [--?--] and his/her crew used SQL injections to steal a staggering 170 million ATM and credit card numbers from major retailers like TJ Maxx, DSW and Dave & Buster’s.";
	newsQ1.choices = {
		a:"Jonathan James aka 'c0mrade'",
		b:"Kevin Mitnick aka 'The Condor'",
		c:"Carmin Karasic aka 'carminka'",
		d:"Albert Gonzalez aka 'CumbaJohny'"
	}
	newsQ1.answer = ['D',newsQ1.choices.d.toUpperCase()];

var newsQ2 = Object.create(question);
	newsQ2.category = "news";
	newsQ2.questionText = "The following quote can be found in the essay titled 'The Conscience of a Hacker' aka 'The Hacker Manifesto' written by 'The Mentor' on January 8, 1986";
	newsQ2.choices = {
		a:"The ties that bind collective-minded parties together take dedication to build, and our egotistical concerns do not help.",
		b:"This is our world now... the world of the electron and the switch, the beauty of the baud.  We make use of a service already existing without paying for what could be dirt-cheap if it wasn't run by profiteering gluttons, and you call us criminals.",
		c:"In the pursuit of clear, readable code, whitespace is your friend.",
		d:"The key to social engineering is influencing a person to do something that allows the hacker to gain access to information or your network."
	}
	newsQ2.answer = ['B', newsQ2.choices.b.toUpperCase()];

var newsQ3 = Object.create(question);
	newsQ3.category = "news";
	newsQ3.questionText = "The following term refers to a protest movement against the practices of the Church of Scientology by members of Anonymous.";
	newsQ3.choices = {
		a:"Project Chanology",
		b:"Operation Payback",
		c:"Phreaking",
		d:"Operation Leakspin"
	}
	newsQ3.answer = ['A','PROJECT CHANOLOGY'];

var newsArray = [newsQ1, newsQ2, newsQ3];


var tacticsQ1 = Object.create(question);
	tacticsQ1.category = "tactics";
	tacticsQ1.questionText = "What term was coined to describe the activity of people who study, experiment with, or explore, telecommunication systems";
	tacticsQ1.choices = {
		a:"Phreaking",
		b:"VimL",
		c:"Distributed Denial of Service attacks",
		d:"Blue Boxing"
	}
	tacticsQ1.answer = ['A','PREAKING'];

var tacticsQ2 = Object.create(question);
	tacticsQ2.category = "tactics";
	tacticsQ2.questionText = "The following term refers to psychological manipulation of people into performing actions or divulging confidential information.";
	tacticsQ2.choices = {
		a:"Blacklisting",
		b:"Leakspin",
		c:"Social Engineering",
		d:"Phishing"
	}
	tacticsQ2.answer = ['C', newsQ2.choices.c.toUpperCase()];

var tacticsQ3 = Object.create(question);
	tacticsQ3.category = "tactics";
	tacticsQ3.questionText = "'Onion routing' is implemented by encryption in which of the following layers of the communication protocol stack.";
	tacticsQ3.choices = {
		a:"network layer",
		b:"transport layer",
		c:"application layer",
		d:"session layer"
	}
	tacticsQ3.answer = ['C','APPLICATION LAYER'];

var tacticsArray = [tacticsQ1, tacticsQ2, tacticsQ3];

/* 1.0 input functionality */
	function retrieveName(){
		user.hackerHandle = $("#login").val();
		$("#login").val('');
		terminalLog.unshift("Greetings, " + user.hackerHandle);
		console.log(user.hackerHandle);
	}

	function retrieveTerminalInput(){
		terminalInput = $('#terminal').val();
		console.log(terminalInput);
		$('#terminal').val('');
		terminalLog.push(prompt+" "+terminalInput);
	}

    /* ---> 1.1 read from the console */
    /* ---> 1.2 store the input in a variable */
    /* ---> 1.3 push that variable to the terminal log array */

/* 2.0 processing functionality */
	function startGameResponse(input){
		var inputUpperCase = input.toUpperCase();
		if (inputUpperCase == 'YES'){
			if (selectedCategory == "fiction"){
			terminalLog.push(user.hackerHandle + ', it is time for you to prove your hacker culture prowess by answering a series of questions related to cult hacker fiction. Type "next" to begin.');
			}
			if (selectedCategory == "news"){
			terminalLog.push(user.hackerHandle + ', it is time for you to prove your hacker culture prowess by answering a series of questions related to hackers/hacking in the news. Type "next" to begin.');
			}
			if (selectedCategory == "tactics"){
			terminalLog.push(user.hackerHandle + ', it is time for you to prove your hacker culture prowess by answering a series of questions related to hacker/hacking tactics. Type "next" to begin.');
			}
			gameLocation = "next";
		}else{
			terminalLog.push(input+': command not found');
		}
	}

	function gameIteration(input){
		var inputUpperCase = input.toUpperCase();
		if(inputUpperCase == "NEXT"){
			if(fictionQuestionCount == fictionArray.length && newsQuestionCount == newsArray.length && tacticsQuestionCount == tacticsArray.length){
			 calculateScore();
			 printToTerminal();
			} else {
				if ( selectedCategory == "fiction"){
					if ( fictionQuestionCount == fictionArray.length ){
						completedTests.push(fictionArray);
						terminalLog.push("***");
						terminalLog.push("You have completed the hacker fiction portion of this test, it now time for you to prove your knowledge of real-life hacking appearances.");
						terminalLog.push("***");
						selectedCategory = "news";
						printToTerminal();
					}else{ 
						questionDisplay();
						gameLocation = "check answer";
					}
				}

				if ( selectedCategory == "news"){
					if(newsQuestionCount == newsArray.length){
						completedTests.push(newsArray);
						terminalLog.push("***");
						terminalLog.push("You have completed the hacker news portion of this test, it now time for you to prove your knowledge of real-life hacking tactics.");
						terminalLog.push("***");
						printToTerminal();
						selectedCategory = "tactics";
					}else{
						questionDisplay();
						gameLocation = "check answer";
					}
				}

				if ( selectedCategory == "tactics"){
					if(tacticsQuestionCount == tacticsArray.length){
						completedTests.push(tacticsArray);
						terminalLog.push("***");
						terminalLog.push("You have completed the hacker news portion of this test, it now time for you to prove your knowledge of real-life hacking tactics. Type 'next' to continue.");
						terminalLog.push("***");
						printToTerminal();
						selectedCategory = "fiction";

					}else{
						questionDisplay();
						gameLocation = "check answer";
					}
				}
			}
		}else{
			terminalLog.push(input+": command not found");
			printToTerminal();
		}
	}


	function questionDisplay() {
        //displays the current question
        if (selectedCategory == "fiction"){
	        console.log("fictionQuestionCount: " + fictionQuestionCount);
	        var questionObject = fictionArray[fictionQuestionCount];
	    } else if (selectedCategory == "news"){
	        console.log("newsQuestionCount: " + newsQuestionCount);
	        var questionObject = newsArray[newsQuestionCount];
	    } else if (selectedCategory == "tactics"){
			console.log("tacticsQuestionCount: " + tacticsQuestionCount);
	        var questionObject = tacticsArray[tacticsQuestionCount];
	    }
	    terminalLog.push("***");
        terminalLog.push(questionObject.questionText);
        // $('#question').text(questions[questionNum].question);
        // $('#choices').empty();
        var choices = questionObject.choices;
        for (var prop in choices) {
            terminalLog.push(prop + ": " + choices[prop]);
        }
        terminalLog.push("***");
        printToTerminal();
    }

    function answerCheck(){
		retrieveTerminalInput();
		if (selectedCategory == "fiction"){
			var questionObject = fictionArray[fictionQuestionCount];
			var ansCheckBool = questionObject.checkAnswer(terminalInput, questionObject.answer);
			fictionAnsCheckArray.push(ansCheckBool);
			terminalLog.push(ansCheckBool);
			terminalLog.push("Type 'next' to access next question");
			printToTerminal();
			gameLocation = "next";
			fictionQuestionCount++;
		}else if (selectedCategory == "news"){
			var questionObject = newsArray[newsQuestionCount];
			var ansCheckBool = questionObject.checkAnswer(terminalInput, questionObject.answer);
			newsAnsCheckArray.push(ansCheckBool);
			terminalLog.push(ansCheckBool);
			terminalLog.push("Type 'next' to access next question");
			printToTerminal();
			gameLocation = "next";
			newsQuestionCount++;
		}else if (selectedCategory == "tactics"){
			var questionObject = tacticsArray[tacticsQuestionCount];
			var ansCheckBool = questionObject.checkAnswer(terminalInput, questionObject.answer);
			tacticsAnsCheckArray.push(ansCheckBool);
			terminalLog.push(ansCheckBool);
			terminalLog.push("Type 'next' to access next question");
			printToTerminal();
			gameLocation = "next";
			tacticsQuestionCount++;
		}
    }

    function calculateScore(){
    	terminalLog.push("Congratulations, you have finished proving your knowledge of hacker culture!");
    	var fictionScore = 0;
    	var newsScore = 0;
    	var tacticsScore = 0;

console.log(fictionAnsCheckArray);

    	for( i in fictionAnsCheckArray){
    		if (fictionAnsCheckArray[i] == true)
    			{
    				fictionScore++;
    			}
    			console.log(fictionScore);
    		}
		if (fictionScore == 3){
			terminalLog.push("Hacker Fiction Score: Elite Status")
		}
		if (fictionScore == 2){
			terminalLog.push("Hacker Fiction Score: Hacktivist Status")
		}
		if (fictionScore == 1){
			terminalLog.push("Hacker Fiction Score: Neophyte Status")
		}
		if (fictionScore == 0){
			terminalLog.push("Hacker Fiction Score: Failure")
		}

console.log(newsAnsCheckArray);

    	for(i in newsAnsCheckArray){
    		if (newsAnsCheckArray[i] == true)
    			{
    				newsScore++;
    			}
    			console.log(newsScore);
    		}
		if (newsScore == 3){
			terminalLog.push("Hacker News Score: Elite Status")
		}
		if (newsScore == 2){
			terminalLog.push("Hacker News Score: Hacktivist Status")
		}
		if (newsScore == 1){
			terminalLog.push("Hacker News Score: Neophyte Status")
		}
		if (newsScore == 0){
			terminalLog.push("Hacker News Score: Failure")
		}

console.log(tacticsAnsCheckArray);

    	for(i in tacticsAnsCheckArray){
    		if (tacticsAnsCheckArray[i] == true)
    			{
    				tacticsScore++;
    			}
    			console.log(tacticsScore);
    		}
		if (tacticsScore == 3){
			terminalLog.push("Hacker Tactics Score: Elite Status")
		}
		if (tacticsScore == 2){
			terminalLog.push("Hacker Tactics Score: Hacktivist Status")
		}
		if (tacticsScore == 1){
			terminalLog.push("Hacker Tactics Score: Neophyte Status")
		}
		if (tacticsScore == 0){
			terminalLog.push("Hacker Tactics Score: Failure")
		}
    }

	/* ---> 2.1 use variable as input for the Game Response function */
    /* ---> 2.2 collect the response in the terminal log*/

/* 3.0 output functionality */
	function inputFocus(){
		document.getElementById('terminal').scrollIntoView();
	}

	function setVolume(){
		mySound=document.getElementById("sound");
		mySound.volume=0.2;
	}

	function launchTerminal(){
		$("#gameTerminal").show(1000);
		document.getElementById('terminal').scrollIntoView();
			$("#terminalInputElement").show();
			for(i in terminalLog){
				printToTerminal();
			};

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

    /* ---> 3.1 on ENTER key press print USER message and the response in the same time */


setVolume();

	$(document).on('keydown',function(key){
		if (key.keyCode == 27){
			location.reload();
		}
	});

	$("#gameTerminal").on('keydown',function(key){
		if (key.keyCode == 13){
			if (gameLocation == "category selected"){
			retrieveTerminalInput();
			startGameResponse(terminalInput);
			console.log(terminalLog);
			printToTerminal();
			inputFocus(); 
			} else if (gameLocation == "next") {
			retrieveTerminalInput();
			printToTerminal();
			gameIteration(terminalInput);
			} else if (gameLocation == "check answer") {
				answerCheck();
			}
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
	
	$("#fictionBanner").on('click',function(){
		launchTerminal();
		selectedCategory="fiction";
	});

	$("#newsBanner").on('click',function(){
		launchTerminal();
		selectedCategory = "news";
	});

	$("#tacticsBanner").on('click',function(){
		launchTerminal();
		selectedCategory = "tactics";
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});