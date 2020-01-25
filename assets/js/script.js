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
  document.getElementsByClassName("modal-overlay")[0].classList.add("hidden");
}

function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");

  for (var listItem = 0; listItem < hiddenCards.length; listItem++) {
    // listItem.classList.remove("hidden"); - why didnt work?
    hiddenCards[listItem].classList.remove("hidden");
  }
}

document.getElementById("modalButton").addEventListener("click", resetGame);
