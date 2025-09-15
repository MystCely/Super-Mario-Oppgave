// model
let marioHp = 200;
let peachHp = 100;
let yoshiHp = 80;
let luigiHp = 140;
let bowserHp = 300;
let activeGame = false;

let chosenCharacterId;
let health;
let damage;

// view
updateView();
function updateView() {
  let html = /* html */ `
  <div class="block-container center">
    <h1>Super Mario Game</h1>
    <img class="block" src="img/mario-block.png" alt="mario block">
  </div>
  <div class="center">
  <div onclick="chosenChar(this)" id="charMario" class="char-container center ${
    chosenCharacterId === "charMario" ? "selected" : ""
  }">
      <div class="char">Mario </div>
      <div class="score">${marioHp}</div>
      <img src="img/mario.png" alt="mario pic">
    </div>

    <div onclick="chosenChar(this)" id="charPeach" class="char-container center ${
      chosenCharacterId === "charPeach" ? "selected" : ""
    }">
      <div class="char">Peach </div>
      <div class="score">${peachHp}</div>
      <img src="img/peach.png" alt="peach pic">
    </div>
      

    <div onclick="chosenChar(this)" id="charYoshi" class="char-container center ${
      chosenCharacterId === "charYoshi" ? "selected" : ""
    }">
      <div class="char">Yoshi </div>
      <div class="score">${yoshiHp}</div>
      <img src="img/yoshi.png" alt="yoshi pic">
    </div>

    <div onclick="chosenChar(this)" id="charLuigi" class="char-container center ${
      chosenCharacterId === "charLuigi" ? "selected" : ""
    }">
      <div class="char">Luigi </div>
      <div class="score">${luigiHp}</div>
      <img src="img/luigi.png" alt="luigi pic">
      <br>
    </div>
  </div>

  <div class="center btn-container">
  <button onclick="chosenCharAttack()">Attack</button>
  </div>

  <div class="center">
    <div onclick="chosenChar(this)" id="charBowser" class="char-container center">
      <div class="char">Bowser:</div>
      <div class="score">${bowserHp}</div>
      <img src="img/bowser.png" alt="luigi pic">
    </div>
  </div>
  <div class="center">
    <button class="btn-bowser" onclick="bowserAttack()">Bowser attack</button>
  </div>
    `;

  document.getElementById("app").innerHTML = html;
}

// controller
function chosenChar(selectedChar) {
  // updates the variable to use with other functions
  chosenCharacterId = selectedChar.id;
  activeGame = true;
  updateView();
}

// function for chosen character to attack bowser
function chosenCharAttack() {
  if (activeGame == true) {
    // attacks bowser with random values from (1-20)
    bowserHp -= Math.floor(Math.random() * 20) + 1;
    // doesn't let bowser hp go below 0
    bowserHp = Math.max(0, bowserHp);
    updateView();

    // check if bowser is dead -> win
    if (bowserHp == 0) {
      gameWin();
    }
  } else {
    alert("Please select a character");
  }
}

// function for bowser to attack chosen character
function bowserAttack() {
  if (activeGame == true) {
    let hp = {
      charMario: marioHp,
      charPeach: peachHp,
      charYoshi: yoshiHp,
      charLuigi: luigiHp,
    };

    // checks which character is selected and attacks chosen character with random values from (1-30)
    for (let charName of Object.keys(hp)) {
      if (chosenCharacterId.includes(charName)) {
        hp[charName] = Math.max(
          0,
          (hp[charName] -= Math.floor(Math.random() * 30)) + 1
        );
      }
    }

    // updates hp after damage
    marioHp = hp.charMario;
    peachHp = hp.charPeach;
    yoshiHp = hp.charYoshi;
    luigiHp = hp.charLuigi;

    updateView();

    // check if the chosen character is dead -> lose
    if (hp[chosenCharacterId] === 0) {
      gameOver();
    }
  } else {
    alert("Please select a character");
  }
}

// function when you won the game
function gameWin() {
  document.getElementById("app").innerHTML = /*html*/ `
    <h1>We won!</h1>
    `;
  activeGame = false;
}

// function when you lose
function gameOver() {
  document.getElementById("app").innerHTML = /*html*/ `
    <h1>Game Over...</h1>
    `;
  activeGame = false;
}
