const button = document.querySelector(".startBtn");
const startNewGameBtn = document.querySelector("#startNewGameBtn");

const categoryABtn = document.querySelector("#catoryABtn");
const categoryBBtn = document.querySelector("#catoryBBtn");

const questionTitle = document.querySelector(".questionTitle");

const questionADiv = document.querySelector(".textA");
const questionBDiv = document.querySelector(".textB");
const questionCDiv = document.querySelector(".textC");
const questionDDiv = document.querySelector(".textD");

const answerA = document.querySelector("#A");
const answerB = document.querySelector("#B");
const answerC = document.querySelector("#C");
const answerD = document.querySelector("#D");

const questionCounter = document.querySelector(".questionCount");
const scoreDiv = document.querySelector(".score");
const finishScore = document.getElementById("finishScore");

const pickCategoryDiv = document.querySelector("#pickCategory");
const gameDiv = document.querySelector("#game");
const finishDiv = document.querySelector("#finishDiv");

//Enter settings of game
const gameQuestionsA = [
  {
    questionText: "What year was the very first model of the iPhone released?",
    correctAnswer: "A",
    answers: ["2007", "2009", "2005", "2010"],
  },
  {
    questionText:
      "What’s the shortcut for the “copy” function on most computers?",
    correctAnswer: "C",
    answers: ["ctrl+v", "ctrl+d", "ctrl+c", "shift+c"],
  },
  {
    questionText: "What does “HTTP” stand for?",
    correctAnswer: "D",
    answers: [
      "Hyper Transfer Protocol",
      "HyperText Transfer Port",
      "Hyper Transfer Portal",
      "HyperText Transfer Protocol",
    ],
  },
];

const gameQuestionsB = [
  {
    questionText:
      "B What year was the very first model of the iPhone released?",
    correctAnswer: "A",
    answers: ["2007", "2009", "2005", "2010"],
  },
  {
    questionText:
      "B What’s the shortcut for the “copy” function on most computers?",
    correctAnswer: "C",
    answers: ["ctrl+v", "ctrl+d", "ctrl+c", "shift+c"],
  },
  {
    questionText: "B What does “HTTP” stand for?",
    correctAnswer: "D",
    answers: [
      "Hyper Transfer Protocol",
      "HyperText Transfer Port",
      "Hyper Transfer Portal",
      "HyperText Transfer Protocol",
    ],
  },
];

const gamePickCategory = "pick_category";
const gameFinished = "finished";
const gameInProgress = "in_progres";

const game = {
  score: 0,
  questionCounter: 1,
  maxQuestions: 10,
  currentQuestion: undefined,
  status: gamePickCategory, // or "finished"
  currentCategory: undefined,
};
//___________________________________________

function updateScreen() {
  questionTitle.innerText = game.currentQuestion.questionText;
  questionADiv.innerText = game.currentQuestion.answers[0];
  questionBDiv.innerText = game.currentQuestion.answers[1];
  questionCDiv.innerText = game.currentQuestion.answers[2];
  questionDDiv.innerText = game.currentQuestion.answers[3];

  questionCounter.innerText = game.questionCounter;
  scoreDiv.innerText = game.score;
  finishScore.innerText = game.score;

  console.log(game.status);

  if (game.status === gameInProgress) {
    gameDiv.classList.remove("hidden");
    finishDiv.classList.add("hidden");
    pickCategoryDiv.classList.add("hidden");
  } else if (game.status === gameFinished) {
    gameDiv.classList.add("hidden");
    finishDiv.classList.remove("hidden");
    pickCategoryDiv.classList.add("hidden");
  } else if (game.status === gamePickCategory) {
    gameDiv.classList.add("hidden");
    finishDiv.classList.add("hidden");
    pickCategoryDiv.classList.remove("hidden");
  } else {
    gameDiv.classList.remove("hidden");
    finishDiv.classList.remove("hidden");
    pickCategoryDiv.classList.remove("hidden");
  }
}

//Start game

function randomQuestion(questions) {
  const index = Math.floor(Math.random() * questions.length);
  console.log(questions[index]);
  return questions[index];
}

function startGameBtnEventListener(event) {
  game.score = 0;
  game.questionCounter = 1;
  game.maxQuestions = 3;
  game.currentQuestion = randomQuestion(game.currentCategory);
  game.status = gameInProgress;
  updateScreen();
}

function startGameABtnEventListener(event) {
  game.currentCategory = gameQuestionsA;
  startGameBtnEventListener(event);
}

function startGameBBtnEventListener(event) {
  game.currentCategory = gameQuestionsB;
  startGameBtnEventListener(event);
}

function restartGameBtnEventListener(event) {
  game.status = gamePickCategory;
  game.score = 0;
  game.questionCounter = 0;
  game.maxQuestions = 3;
  updateScreen();
}

button.addEventListener("click", restartGameBtnEventListener);
startNewGameBtn.addEventListener("click", restartGameBtnEventListener);

categoryABtn.addEventListener("click", startGameABtnEventListener);
categoryBBtn.addEventListener("click", startGameBBtnEventListener);

//clickOnAnswer
function clickOnAnswer(event) {
  console.log("clickOnAnswer");
  var targetElement = event.srcElement || event.target;

  console.log(targetElement.id);
  if (game.questionCounter === game.maxQuestions) {
    game.status = gameFinished;
  }
  if (game.currentQuestion.correctAnswer === targetElement.id) {
    game.score += 5;
    game.questionCounter += 1;
    game.currentQuestion = randomQuestion(game.currentCategory);
  }

  updateScreen();
}

answerA.addEventListener("click", clickOnAnswer);
answerB.addEventListener("click", clickOnAnswer);
answerC.addEventListener("click", clickOnAnswer);
answerD.addEventListener("click", clickOnAnswer);
