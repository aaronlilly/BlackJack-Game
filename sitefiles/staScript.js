var playerStatus = {
tnum: 0,
bnum: 0,
stand: "no",
bust: "no",
points: 0,
playz:0,
reset: function () {
    this.tnum = 0;
    this.bnum = 0;
    this.stand = "no";
    this.bust =  "no";
    this.disabl = "no";
    this.playz = 0;
  }
};

var dealerStatus = {
    tnum: 0,
    bnum: 0,
    stand: "no",
    bust: "no",
    points: 0,
    dealz:0,
    reset: function () {
        this.tnum = 0;
        this.bnum = 0;
        this.stand = "no";
        this.bust =  "no";
        this.dealz = 0;
      }
    };

// ------------------- Helpers -------------------

// pick the best score <= 21, fallback to lowest if busted
function getBestScore(tnum, bnum) {
  if (tnum <= 21 && bnum <= 21) {
    return Math.max(tnum, bnum); // highest valid <= 21
  } else if (tnum <= 21) {
    return tnum;
  } else if (bnum <= 21) {
    return bnum;
  } else {
    return Math.min(tnum, bnum); // both busted
  }
}

// update bust flag
function checkBust(statusObj) {
  const score = getBestScore(statusObj.tnum, statusObj.bnum);
  statusObj.bust = score > 21 ? "yes" : "no";
  return score;
}

// ------------------- Evaluators -------------------
function playerHandEvaluate() {
  playerStatus.tnum = 0;
  playerStatus.bnum = 0;
  for (var i = 0; i < playerhand.length; i++) {
    playerStatus.tnum += playerhand[i].eval;
    playerStatus.bnum += playerhand[i].altEval;
  }
  return checkBust(playerStatus);
}

function youShouldntCheat() {
  dealerStatus.tnum = 0;
  dealerStatus.bnum = 0;
  for (var i = 0; i < dealerhand.length; i++) {
    dealerStatus.tnum += dealerhand[i].eval;
    dealerStatus.bnum += dealerhand[i].altEval;
  }
  return checkBust(dealerStatus);
}

// ------------------- UI Helpers -------------------
function playerScoreShow() {
  const score = playerHandEvaluate();
  document.getElementById("pTop").innerHTML = playerStatus.tnum;
  document.getElementById("pBottom").innerHTML = playerStatus.bnum;
  if (document.getElementById("pBest")) {
    document.getElementById("pBest").innerHTML = "Best: " + score;
  }
}

function playerScoreShowOnly() {
  const score = getBestScore(playerStatus.tnum, playerStatus.bnum);
  document.getElementById("pTop").innerHTML = playerStatus.tnum;
  document.getElementById("pBottom").innerHTML = playerStatus.bnum;
  if (document.getElementById("pBest")) {
    document.getElementById("pBest").innerHTML = "Best: " + score;
  }
}

// ------------------- Winner Check -------------------
function checkWinner() {
  const playerScore = getBestScore(playerStatus.tnum, playerStatus.bnum);
  const dealerScore = getBestScore(dealerStatus.tnum, dealerStatus.bnum);

  if (playerStatus.bust === "yes" && dealerStatus.bust === "yes") {
    return "Both busted!";
  } else if (playerStatus.bust === "yes") {
    return "Dealer wins";
  } else if (dealerStatus.bust === "yes") {
    return "Player wins";
  } else if (playerScore > dealerScore) {
    return "Player wins";
  } else if (dealerScore > playerScore) {
    return "Dealer wins";
  } else {
    return "Push (tie)";
  }
}
