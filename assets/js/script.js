// global variables
var currentTime = 100
var questionIndex = 0
var timerInterval;
// Selectors
var timerNumber = document.querySelector("#timer-number")
var startButton = document.querySelector("#start-button")
var questionSection = document.querySelector("#question-section")
var answerSection = document.querySelector("#answer-section")
var responceSection = document.querySelector("#responce-section")
var scoreSection = document.querySelector("#score-section")
var quizSection = document.querySelector("#quiz-section")
var restartButton = document.querySelector("#restart")

//Questions
var questionArray = [{
    question: "What is an array?",
    answers: ["Set of properties", "Single varrible used to store elements", "A single value"]
},
{
    question: "Which is an assignment operator?",
    answers: ["=", "==", "==="]
},
{
    question: "What key word allows you to leave a function early?",
    answers: ["stop", "end", "break"]
}
];

function renderNextQuestion() {
    if(questionIndex < questionArray.length){
    questionSection.innerHTML = questionArray[questionIndex].question;
    answerSection.innerHTML = ""
    for (var i = 0; i < questionArray[questionIndex].answers.length; i++){
        var button = document.createElement("button")
        button.addEventListener("click", renderNextQuestion)
        button.innerHTML = questionArray[questionIndex].answers[i]
        answerSection.appendChild(button)
    };
    questionIndex++
    }else{
        endGame()
    }
}
// Start Quiz
function startQuiz() {
    startButton.setAttribute("hidden", "true")
    renderNextQuestion()
    timerInterval = setInterval(function () {
        currentTime--
        timerNumber.innerHTML = currentTime
    }, 1000)
}


//end game
function endGame() {
    quizSection.setAttribute("hidden", "true")
    scoreSection.removeAttribute("hidden")
    startButton.removeAttribute("hidden")
    answerSection.innerHTML = ""
    questionSection.innerHTML = ""
    clearInterval(timerInterval)
    currentTime = 100
    questionIndex = 0
}

//restart
function restart() {
    scoreSection.setAttribute("hidden", "true")
    quizSection.removeAttribute("hidden")
}
startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restart)