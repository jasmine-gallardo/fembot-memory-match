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
  return (Math.trunc((matches / attempts) * 100)) + "%";
}
