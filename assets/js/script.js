


// Global Variables
var timerEl = document.querySelector("#timer"); 
var startButton = document.querySelector("#start-button");
var questionEl = document.querySelector(".questions");
var currentQuestionEl = document.querySelector(".current-question");
var feedbackMessageEl = document.querySelector("#feedback-message");
var welcomeEl = document.querySelector(".welcome");
var answerBlockEl = document.querySelector("#answers");
var submitScoreEl = document.querySelector("#submitscore");
var mainSectionEl = document.querySelector(".mainsection")
var viewScoresButton = document.querySelector("#viewscore");
var containerEl = document.querySelector(".container");
var scoreHistoryEl = document.querySelector("#score-history");
var submitScoreButton = document.querySelector("#submitbutton");
var scoreDisplay = document.querySelector("#score-display");
var clearScoresButton = document.querySelector("#clearscores");
var goBackButton = document.querySelector("#goback");
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var currentScore = 0;
var timerInterval;
var secondsLeft;
var currentQuestion = [];
var questionIndex = 0;
var questionsArray = [ //questions used are from https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm
    { 
        question: "Which of the following type of variable is visible only within a function where it is defined?",

        answers: [ 
            {text: "a. Global variable", correct: false},
            {text: "b. Local variable", correct: true},
            {text: "c. Both a and b", correct: false},
            {text: "d. None", correct: false},
        ]
    },
    { 
        question: "Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?",

        answers: [ 
            {text: "a. concat()", correct: false},
            {text: "b. match()", correct: false},
            {text: "c. replace()", correct: true},
            {text: "d. search()", correct: false},
        ]
    },
    { 
        question: "Which of the following functions of Array object adds one or more elements to the end of an array and returns the new length of the array?",

        answers: [ 
            {text: "a. pop()", correct: false},
            {text: "b. push()", correct: true},
            {text: "c. join()", correct: false},
            {text: "d. map()", correct: false},
        ]
    },
    { 
        question: "Which built-in method returns the character at the specified index?",

        answers: [ 
            {text: "a. characterAt()", correct: false},
            {text: "b. getCharAt()", correct: false},
            {text: "c. charAt()", correct: true},
            {text: "d. None", correct: false},
        ]
    },
    { 
        question: "Which built-in method returns the calling string value converted to lower case?",

        answers: [ 
            {text: "a. toLowerCase()", correct: true},
            {text: "b. toLower()", correct: false},
            {text: "c. changeCase(case)", correct: false},
            {text: "d. None", correct: false},
        ]
    },
    { 
        question: "Which of the following function of Number object defines how many total digits to display of a number?",

        answers: [ 
            {text: "a. toExponential()", correct: false},
            {text: "b. toFixed()", correct: false},
            {text: "c. toLocalString()", correct: false},
            {text: "d. toPrecision()", correct: true},
        ]
    },
    { 
        question: "Which of the following function of String object creates an HTML hypertext link that requests another URL?",

        answers: [ 
            {text: "a. link()", correct: true},
            {text: "b. sub()", correct: false},
            {text: "c. sup()", correct: false},
            {text: "d. small()", correct: false},
        ]
    },
    { 
        question: "Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?",

        answers: [ 
            {text: "a. concat()", correct: false},
            {text: "b. every()", correct: true},
            {text: "c. push()", correct: false},
            {text: "d. some()", correct: false},
        ]
    }
]
var numberQuestions = questionsArray.length;



// Events
startButton.addEventListener("click", startQuiz);
viewScoresButton.addEventListener("click", viewHighScores);
submitScoreButton.addEventListener("click", submitScore);
clearScoresButton.addEventListener("click", clearScores);
goBackButton.addEventListener("click", restart);




// Functions
    
function startQuiz(){
    secondsLeft = 60; 
    questionIndex = 0
    currentScore = 0
    startButton.disabled = true;
    viewScoresButton.disabled = true;
    startTimer();
    pickQuestion();
};

function restart(){
    secondsLeft = 60;
    timerEl.textContent = secondsLeft;
    questionIndex = 0
    scoreHistoryEl.classList.add("hide");
    welcomeEl.classList.remove("hide");
    questionEl.classList.add("hide");
    mainSectionEl.classList.add("hide");
};


function pickQuestion(){
    scoreHistoryEl.classList.add("hide");
    welcomeEl.classList.add("hide");
    questionEl.classList.remove("hide");
    mainSectionEl.classList.remove("hide");

    currentQuestion = questionsArray[questionIndex];
    currentQuestionEl.textContent = currentQuestion.question;
    
    currentQuestion.answers.forEach(answers => {
        var button = document.createElement('button');
        button.textContent = answers.text;

    if(answers.correct) {
        button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer)

    answerBlockEl.appendChild(button);
    });
};

function selectAnswer(event){
    var answerInput = event.target;
    var correctAnswer = answerInput.dataset.correct;

    if(correctAnswer){
        correctAnswerMessage();
    }else {
        incorrectAnswerMessage();
    }

};

function resetQuestion (){

    while(answerBlockEl.firstChild){
        answerBlockEl.removeChild(answerBlockEl.firstChild);
    }

    if(numberQuestions > questionIndex + 1){
        questionIndex++;
        pickQuestion(questionIndex);
    } else {
        endGame()
    };
};


function startTimer(){

    timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        };
    }, 1000);

};

function correctAnswerMessage(){
    feedbackMessageEl.classList.remove("hide");
    feedbackMessageEl.textContent = "That was correct."
    currentScore = currentScore + 10;
    resetQuestion()
};

function incorrectAnswerMessage(){
    feedbackMessageEl.classList.remove("hide");
    feedbackMessageEl.textContent = "That was incorect. Your remaining time has decreased by 10 seconds."

    secondsLeft = secondsLeft - 10;
    resetQuestion()

};

function timeUpMessage(){
    feedbackMessageEl.classList.remove("hide");
    feedbackMessageEl.textContent = "Time is Up. Click the Submit Scores button to save your score."
};

function endGame(){
    startButton.disabled = false;
    viewScoresButton.disabled = false;

    if(currentScore > 0){
        currentScore = currentScore + (currentScore * secondsLeft / 10);
    } else if(currentScore = 0){
        currentScore = 0;
    };

    clearInterval(timerInterval);
    
    feedbackMessageEl.classList.add("hide");
    questionEl.classList.add("hide");
    submitScoreEl.classList.remove("hide");
    mainSectionEl.classList.add("hide");


    var finalScoreEl = document.querySelector("#finalscore");
    finalScoreEl.textContent = currentScore;
};

function submitScore (event) {

    event.preventDefault();
    submitScoreEl.classList.add("hide");
    scoreHistoryEl.classList.remove("hide");

    var initials = document.querySelector("#initials");
    
    var score = {
        score: currentScore,
        name: initials.value
    }

    highScores.push(score);
    highScores.sort ((a,b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    scoreDisplay.textContent = "";

    highScores.forEach(entry => {
        var li = document.createElement('li');
        li.textContent = entry.name + " "+ entry.score;
        scoreDisplay.appendChild(li);
    })
}

function viewHighScores() {
    welcomeEl.classList.add("hide");
    mainSectionEl.classList.add("hide");
    submitScoreEl.classList.add("hide");
    scoreHistoryEl.classList.remove("hide");
    scoreDisplay.textContent = "";

    highScores.forEach(entry => {
        var li = document.createElement('li');
        li.textContent = entry.name + " "+ entry.score;
        scoreDisplay.appendChild(li);
})}

function clearScores() {
    highScores = [];
    scoreDisplay.textContent = "";
    localStorage.removeItem('highScores');
};