/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

init();

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  //In order to select an id we use #
  //To be able to update value after selecting the id we use .textContent property.
  //To set HTML content we can use .innerHtml property.

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //For reference
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // Generate Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //Update the round score if the rolled no. was not a 1.
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    //Checking if the player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //When you have to select a class, you have to access it using . operator.
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-new").addEventListener("click", init);
