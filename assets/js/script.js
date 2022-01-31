

// global variables
var currentTime = 100
var questionIndex = -1
var timerInterval;
var finalScore;
if(!localStorage.getItem("Highscores")){
    var highScores = []
}else {
    var highScores = JSON.parse(localStorage.getItem("Highscores"))
}
// Selectors
var timerNumber = document.querySelector("#timer-number")
var startButton = document.querySelector("#start-button")
var startDiv = document.querySelector("#start-div")
var questionSection = document.querySelector("#question-section")
var answerSection = document.querySelector("#answer-section")
var responceSection = document.querySelector("#responce-section")
var scoreSection = document.querySelector("#score-section")
var quizSection = document.querySelector("#quiz-section")
var restartButton = document.querySelector("#restart")
var submissionSection = document.querySelector("#submission-section")
var score = document.querySelector("#score")
var initals = document.querySelector("#initals")
var submitButton = document.querySelector("#submit")
var scoreList = document.querySelector("#score-list")
var quizIntro = document.querySelector("#quiz-intro")
var highLink = document.querySelector("#high-link")

//Questions
var questionArray = [{
    question: "What is an array?",
    answers: ["Set of properties", "Single varrible used to store elements", "A single value"],
    correctAnswer: 1
},
{
    question: "Which is an assignment operator?",
    answers: ["=", "==", "==="],
    correctAnswer: 0
},
{
    question: "What key word allows you to leave a function early?",
    answers: ["stop", "end", "break"],
    correctAnswer: 2
}
];

//move to next question
function renderNextQuestion(event) {
    if(questionIndex !== -1){
        checkAnswer(event.target.id)
    }
    questionIndex++
    if(questionIndex < questionArray.length){
    questionSection.innerHTML = questionArray[questionIndex].question;
    answerSection.innerHTML = ""
    for (var i = 0; i < questionArray[questionIndex].answers.length; i++){
        var button = document.createElement("button")
        button.setAttribute("id", i)
        button.setAttribute("class", "answer-button")
        button.addEventListener("click", function(e){
            event.preventDefault
            renderNextQuestion(e);
        })
        button.innerHTML = questionArray[questionIndex].answers[i]
        answerSection.appendChild(button)
    };
    }else{
        endGame()
    }
}

// Check answer
function checkAnswer(answer) {
    console.log(answer)
    if(answer == questionArray[questionIndex].correctAnswer){
        responceSection.innerHTML = "Last Question Was Correct"
        setTimeout( function(){responceSection.innerHTML = ""}, 2000)
        currentTime = currentTime + 10
    }else{
        responceSection.innerHTML = "Last Question Was Wrong"
        setTimeout( function(){responceSection.innerHTML = ""}, 2000)
        currentTime = currentTime - 10
    }
}

// Start Quiz
function startQuiz(event) {
    event.preventDefault
   startDiv.style.display ="none"
   quizIntro.style.display = "none"
    renderNextQuestion(event)
    timerInterval = setInterval(function () {
        if(currentTime > 0){
            currentTime--
            timerNumber.innerHTML = currentTime
            
        }else{
            endGame()
        }
    }, 1000)
    
}


//end game
function endGame() {
    quizSection.style.display = "none"
    submissionSection.style.display = "initial"
   startDiv.style.display = "none"
    answerSection.innerHTML = ""
    questionSection.innerHTML = ""
    finalScore = currentTime
    score.innerHTML = finalScore
    clearInterval(timerInterval)
    questionIndex = 0
}

//Submitting Highscores
function submit(){
    highScores.push(initals.value + " - " + finalScore)
    localStorage.setItem("Highscores", JSON.stringify(highScores))
    renderHighscores()
}

//render highscores
function renderHighscores(){
    scoreList.innerHTML = ""
    for(var i = 0; i < highScores.length; i++){
        var item = document.createElement("li")
        item.innerHTML = highScores[i]
        scoreList.appendChild(item)
        
    }
    submissionSection.style.display = "none"
    scoreSection.style.display = "initial"
    quizSection.stylr.display ="none"
}

//restart
function restart() {
    scoreSection.style.display = "none"
    quizSection.style.display = "initial"
    currentTime = 100
    timerNumber.innerHTML = currentTime
}
startButton.addEventListener("click", function(event){startQuiz(event)})
restartButton.addEventListener("click", restart)
submitButton.addEventListener("click", submit)
highLink.addEventListener("click", renderHighscores)