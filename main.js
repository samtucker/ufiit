var questions = ["Are your shoulders:", "Do you gain weight easily?", "Do you gain muscle easily?", "Do people call you athletic even if you aren't being very active?", "Do people describe you as strong?", "Do people describe you as slender or skinny?", "How would you describe your metabolism?", "How would you describe your muscle mass?"];
var answers = [
  ["Wider than your hips.", "Same width as your hips.", "Narrower than your hips."],
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"],
  ["Slow", "Fast", "Normal", "I don't know"],
  ["Lean", "Bulky"]
];

var endomorph = 1;
var mesomorph = 10;
var ectomorph = 100;

var answersBodyType = [
  [ectomorph, mesomorph, endomorph],
  [(endomorph + mesomorph), (ectomorph + mesomorph)],
  [(endomorph + mesomorph), ectomorph],
  [mesomorph, endomorph + ectomorph],
  [(endomorph + mesomorph), ectomorph],
  [ectomorph, (mesomorph + endomorph)],
  [endomorph, ectomorph, mesomorph, 0], 
  [(ectomorph + mesomorph), endomorph]
];

var mesoScore = 0;
var endoScore = 0;
var ectoScore = 0;

var questionNumber = -1;

function play() {
  nextQuestion();
}

function answerOptionCalc(calc) {
  if (calc == 1) {
    ectoScore ++;
  }
  if (calc == 10) {
    mesoScore ++;
  }
  if (calc == 100) {
    ectoScore ++;
  }
  if (calc == 11) {
    endoScore ++;
    mesoScore ++;
  }
  if (calc == 101) {
    endoScore ++;
    ectoScore ++;
  }
  if (calc == 110) {
    mesoScore ++;
    ectoScore ++;
  }
}

function countScore1() {
  answerOptionCalc(answersBodyType[questionNumber][0]);
  nextQuestion();
}

function countScore2() {
  answerOptionCalc(answersBodyType[questionNumber][1]);
  nextQuestion();
}

function countScore3() {
  answerOptionCalc(answersBodyType[questionNumber][2]);
  nextQuestion();
}

function nextQuestion() {
  questionNumber++;
  if (questionNumber >= questions.length) {
    document.getElementById('current_question').innerHTML = "End of Quiz";
    document.getElementById('btn1').style.display = "none";
    document.getElementById('btn2').style.display = "none";
    document.getElementById('btn3').style.display = "none";
    calculateBodyType();
  } else {
    document.getElementById('current_question').innerHTML = questions[questionNumber];
    document.getElementById('btn1').innerHTML = answers[questionNumber][0];
    document.getElementById('btn2').innerHTML = answers[questionNumber][1];
    if (answers[questionNumber].length > 2) {
      document.getElementById('btn3').innerHTML = answers[questionNumber][2];
    } else {
      document.getElementById('btn3').style.display = "none";
    }
  }
}

var endoPecentage;
var ectoPecentage;
var mesoPecentage;

function calculateBodyType() {
  var totalPoints = endoScore + ectoScore + mesoScore;
  endoPecentage = calculateBodyPercentage(endoScore, totalPoints);
  ectoPecentage = calculateBodyPercentage(ectoScore, totalPoints);
  mesoPecentage = calculateBodyPercentage(mesoScore, totalPoints);
  document.getElementById('endo_percentage').style.display = "block";
  document.getElementById('ecto_percentage').style.display = "block";
  document.getElementById('meso_percentage').style.display = "block";
  document.getElementById('link').style.display = "block";
  document.getElementById('endo_percentage').innerHTML = "You are " + endoPecentage.toFixed(0) + "% " + "Endomorph";
  document.getElementById('ecto_percentage').innerHTML = "You are " + ectoPecentage.toFixed(0) + "% " + "Ectopmorph";
  document.getElementById('meso_percentage').innerHTML = "You are " + mesoPecentage.toFixed(0) + "% " + "Mesomorph";
}

function calculateBodyPercentage(body, total) {
  return (body/total)*100;
}
