var questionsArray = [];var indexQuestion = 0;var urlHelper = [];var type = null;var difficulty = null;var category = 'defult';var ready = true;var indexC;var innerHTML_of_StartGame;var bodyGame_T_F = '';var bodyGame_4_c = '';var amountLife = 3;var TrueOrFalseAnswer;var All_Answers_for_question = [];var Correct_Answers_for_question = [];var FourOptionsAnswer;var indAns = 0;var score = 10;var There_is_answer_choice = false;
$(document).ready(function () {
	getCategories($("#categories"));
});
async function start() {	GetCategoriGmae();	infoSatrtGame();	if (type != null && category != 'defult' && difficulty != null && ready) {		questionsArray = await getQuestion(5, category, difficulty, type);		var startBut = document.getElementById("labCat");		startBut.innerHTML += '<button onclick="deldiv()" class="btn btn-success" >To Start clilc here!</button>';		var cat = document.getElementById("categories");		cat.selectedIndex = indexC;		ready = false;	}	else if (type != null && category != 'defult' && difficulty != null && !ready) {		window.alert("You are ready");	}	else {		window.alert("Enter all the details needed to start a game");	}}
function nextQuestion() {	var t = questionsArray[0].type;	if (t == 'boolean') { t = 't-f'; } else { t = '4-c'; }	if (indAns < 4 && There_is_answer_choice && amountLife > 0) {		checkQuestion(t);		There_is_answer_choice = false;		indAns++;		indexQuestion++;		if (amountLife != 0) {			ShowAnswersByType(All_Answers_for_question, Correct_Answers_for_question, t);		} else {			endgame(t);		}	}	else if (indAns == 4) {		endgame(t);	}}function endgame(t) {	checkQuestion(t);	end_game_bod_show();	setTimeout(() => {		indAns = 0;		indexQuestion = 0;		All_Answers_for_question = [];		Correct_Answers_for_question = [];		amountLife = 5;		score = 10;	}, 555);}function checkQuestion(t) {	if (t == '4-c') {		if (All_Answers_for_question[indexQuestion][FourOptionsAnswer - 1] == Correct_Answers_for_question[indexQuestion]) {			score += 10;		}		else {			amountLife--;		}	}	else if (t == 't-f') {		if (TrueOrFalseAnswer == Correct_Answers_for_question[indexQuestion]) {			score += 10;		}		else {			amountLife--;		}	}}function ShowLife() {	var life = document.getElementById("life");	for (let i = 0; i < amountLife; i++)		life.innerHTML += '<span class="glyphicon glyphicon-heart" style="color: red;"></span>';}function ShowQuestion() {	var question = document.getElementById("question");	question.innerHTML = questionsArray[indexQuestion].question;}function TrueFalseButtonSelect(TF) {	There_is_answer_choice = true;	var sT = TF == 'true' ? 'yellow' : null;	var sF = TF == 'true' ? null : 'yellow';	buttonT = document.getElementById("TB");	buttonT.style.backgroundColor = sT;	buttonF = document.getElementById("FB");	buttonF.style.backgroundColor = sF;	var TrueOrFalseAnswer = TF == "true" ? "True" : "False";}function FourOptionsButtonSelect(TF) {	There_is_answer_choice = true;	for (let i = 1; i < 5; i++) {		if (TF == i) {			button1 = document.getElementById(i);			button1.style.backgroundColor = 'yellow';			FourOptionsAnswer = i;		}
		else {
			button1 = document.getElementById(i);
			button1.style.backgroundColor = null;
		}
	}
}
function bodyGame_T_F_func() {	var mainDiv = document.getElementById("body");	mainDiv.innerHTML += `<div  class="btn btn-primary btn-sm btn-block" id="div_body_game_t-f">					    	  <br> <br>							  <span>question:</span>  								  <span id = "question"></span>  						      <br> <br> <br>							  <button class="btn btn-default" onclick = "TrueFalseButtonSelect('true')" id="TB">True</button> 							  <button class="btn btn-default" onclick = "TrueFalseButtonSelect('false')" id="FB">False</button> 							  <br> 							  <span>Life left:</span>							  <div id="life"></div>							  <span>score:${score}</span>							  <br> <br> 							  <button onclick="nextQuestion()" class="btn btn-success">Check And Next</button>							  <br> <br> <br> <br> 						 	 <button onclick="startnewgame()" class="btn btn-success">new game</button>						 </div>`;	ShowQuestion();	ShowLife();}function bodyGame_4_C_func() {	var mainDiv = document.getElementById("body");	mainDiv.innerHTML += `<div  class="btn btn-primary btn-sm btn-block" id="div_body_game_t-f">					    	<br> <br>							  <span>question:</span>  								  <span id = "question"></span>  						      <br> <br> <br>							  <button class="btn btn-default" onclick = "FourOptionsButtonSelect('1')" id="1"></button> 							  <button class="btn btn-default" onclick = "FourOptionsButtonSelect('2')" id="2"></button> 							  <br><br>							  <button class="btn btn-default" onclick = "FourOptionsButtonSelect('3')" id="3"></button> 							  <button class="btn btn-default" onclick = "FourOptionsButtonSelect('4')" id="4"></button>							  <br>    							  <span>Life left:</span>							  <div id="life"></div>							  <span>score:${score}</span>							  <br> <br> 							  <button onclick="nextQuestion()" class="btn btn-success">Check And Next</button>							  <br> <br> <br> <br> 						 	 <button onclick="startnewgame()" class="btn btn-success">new game</button>						 </div>`;	ShowQuestion();	ShowLife();}
function end_game_bod_show() {	console.log("as");	var mainDiv = document.getElementById("body");	mainDiv.innerHTML = `<div  class="btn btn-primary btn-sm btn-block" id="div_body_game_t-f">					    	<br> <br><br> <br><br> <br>							  <p>Good Game<p>							  <span>score:${score}</span>							  <br><br> 							  <br> <br> <br> <br> 						 	 <button onclick="startnewgame()" class="btn btn-success">new game</button>						 </div>`;	ShowLife();}
function ShowAnswersByType(All, CorrectAns, type) {
	document.getElementById('body').innerHTML = '';
	if (type == "4-c") {
		bodyGame_4_C_func();
		for (var i = 0; i < 4; i++) {
			var Answers1 = document.getElementById(i + 1);
			Answers1.innerHTML = All[indAns][i];
		}
	}
	else if (type == "t-f") {
		bodyGame_T_F_func();
	}
}
function bildGame(questionsArray) {
	if (questionsArray[0] == null) {
		window.alert("No questions in the selected category and style of play!!")
		startnewgame();
	}
	else if (questionsArray[0].type == 'boolean') {
		for (var i in questionsArray) {
			var ans = [];
			for (var j in questionsArray[i].incorrect_answers) {
				ans.push(questionsArray[i].incorrect_answers[j])
			}
			ans.push(questionsArray[i].correct_answer);
			All_Answers_for_question.push(ans);
			Correct_Answers_for_question.push(questionsArray[i].correct_answer);
		}
		ShowAnswersByType(All_Answers_for_question, Correct_Answers_for_question, "t-f");
	}
	else if (questionsArray[0].type == 'multiple') {
		for (var i in questionsArray) {
			var ans = [];
			for (var j in questionsArray[i].incorrect_answers) {
				ans.push(questionsArray[i].incorrect_answers[j])
			}
			ans.push(questionsArray[i].correct_answer);
			All_Answers_for_question.push(ans);
			Correct_Answers_for_question.push(questionsArray[i].correct_answer);
		}
		ShowAnswersByType(All_Answers_for_question, Correct_Answers_for_question, "4-c");
	}
}
function startnewgame() {	var mainDiv = document.getElementById("body");	mainDiv.innerHTML = '';	All_Answers_for_question = [];	Correct_Answers_for_question = [];	mainDiv.innerHTML += innerHTML_of_StartGame;	amountLife = 3;	score = 10;	indexQuestion = 0;	indAns = 0;}function deldiv() {	ready = true;	var mainDiv = document.getElementById("body");	mainDiv.innerHTML = '';	bildGame(questionsArray);}function infoSatrtGame() {	var mainDiv = document.getElementById("body");	innerHTML_of_StartGame = mainDiv.innerHTML;}function GetCategoriGmae() {	var cat = document.getElementById("categories");	indexC = cat.selectedIndex;	var val = cat.options[indexC].value;	category = val;}function GetTypeGame(v) {	var tf = v == 'bt-tf' ? 'green' : null;	var c4 = v == 'bt-4' ? 'green' : null;	type = v == 'bt-tf' ? 'boolean' : 'multiple';	var typegameTF = document.getElementById('bt-tf');	typegameTF.style.backgroundColor = tf;	var typegame4 = document.getElementById('bt-4');	typegame4.style.backgroundColor = c4;}
function Getdifficulty(d) {	difficulty = d;	if (difficulty == 'easy') {		var easy = document.getElementById('easy');		easy.style.backgroundColor = 'green';		var medium = document.getElementById('medium');		medium.style.backgroundColor = null;		var hard = document.getElementById('hard');		hard.style.backgroundColor = null;	}	else if (difficulty == 'medium') {		var easy = document.getElementById('easy');		easy.style.backgroundColor = null;		var medium = document.getElementById('medium');		medium.style.backgroundColor = 'green';		var hard = document.getElementById('hard');		hard.style.backgroundColor = null;	}	else if (difficulty == 'hard') {		var easy = document.getElementById('easy');		easy.style.backgroundColor = null;		var medium = document.getElementById('medium');		medium.style.backgroundColor = null;		var hard = document.getElementById('hard');		hard.style.backgroundColor = 'green';	}}
function getCategories(select) {
	$.ajax({
		url: "https://opentdb.com/api_category.php",
		context: document.body
	}).done(function (data) {
		categories = data.trivia_categories;
		for (i in categories) {
			let cat = categories[i];
			let option = "<option value=" + cat.id + ">" + cat.name + "</option>"
			select.append(option);
		}
	});
}
function editUrl(amount, category, difficulty, type) {
	urlHelper["amount"] = 'amount=' + amount;
	urlHelper["category"] = 'category=' + category;
	urlHelper["difficulty"] = 'difficulty=' + difficulty;
	urlHelper["type"] = 'type=' + type;
}
async function getQuestion(amount, category, difficulty, type) {
	editUrl(amount, category, difficulty, type);
	var arr = [];
	var url = 'https://opentdb.com/api.php?' + urlHelper.amount
		+ '&' + urlHelper.category
		+ '&' + urlHelper.difficulty
		+ '&' + urlHelper.type
	var res = await fetch(url);
	var data = await res.json();
	return data.results;
}
//=====================================================================================