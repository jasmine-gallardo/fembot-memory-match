var mainElement = document.getElementById("gameCards");
mainElement.addEventListener("click", handleClick);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

// var cardFrontClassNodeList = document.querySelectorAll(".card-front");
// var cardArray = Array.prototype.slice.call(cardFrontClassNodeList);

var cardArray = ["dolores", "dot-matrix", "eve", "ava", "caprica-six", "galatea", "fembot", "maeve", "rachael", "dolores", "dot-matrix", "eve", "ava", "caprica-six", "galatea", "fembot", "maeve", "rachael"];

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.className += " hidden";

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    mainElement.removeEventListener("click", handleClick);


    if (firstCardClasses === secondCardClasses) {
      matches++;

      if (maxMatches === matches) {
        var modalElement = document.getElementsByClassName("modal-overlay")[0];
        modalElement.classList.remove("hidden");
      }
      mainElement.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;

      attempts++;
      displayStats();

    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainElement.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);

      attempts++;
      displayStats();
    }
  }
}

function displayStats() {
  document.getElementById("gamesPlayedId").textContent = gamesPlayed;
  document.getElementById("attemptsId").textContent = attempts;
  document.getElementById("accuracyId").textContent = calculateAccuracy(matches, attempts);
}

function calculateAccuracy(matches, attempts) {
  if (!attempts) {
    return "0%";
  }
  return (Math.trunc((matches / attempts) * 100)) + "%";
}

function resetGame() {
  matches = 0;
  attempts = 0;
  gamesPlayed++;

  resetCards();
  displayStats();
  destroyChildren();
  shuffleCards();
  newCards();
  document.getElementsByClassName("modal-overlay")[0].classList.add("hidden");
}

function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");

  for (var listItem = 0; listItem < hiddenCards.length; listItem++) {
    hiddenCards[listItem].classList.remove("hidden");
  }
}

function shuffleCards() {
  for (var i = 0; i < cardArray.length; i++) {
    var randomPosition = Math.floor(Math.random() * cardArray.length);
    var placeHolder = cardArray[i];
    cardArray[i] = cardArray[randomPosition];
    cardArray[randomPosition] = placeHolder;
  }
}

function newCards() {
  for (var i = 0; i < cardArray.length; i++) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("col-2", "card");
    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front")
    cardFront.classList.add(cardArray[i]);
    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);
    mainElement.appendChild(cardDiv);
  }
}

function destroyChildren() {
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }
}

document.getElementById("modalButton").addEventListener("click", resetGame);
