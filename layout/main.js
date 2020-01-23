var mainElement = document.getElementById("gameCards");
mainElement.addEventListener("click", handleClick);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.className += " hidden";
  console.log("event parameter:", event);

  if (!firstCardClicked) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    console.log("firstCardClicked:", firstCardClicked);
    console.log("firstCardClasses:", firstCardClasses);
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    mainElement.removeEventListener("click", handleClick);
    console.log("secondCardClicked:", secondCardClicked);
    console.log("secondCardClasses:", secondCardClasses);

    if (firstCardClasses === secondCardClasses) {
      mainElement.addEventListener("click", handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainElement.addEventListener("click", handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
}
