// model
let marioHp = 200;
let peachHp = 100;
let yoshiHp = 80;
let luigiHp = 140;
let bowserHp = 300;

let chosenCharacterId;
let health;
let damage;

// view
updateView();
function updateView() {
  let html = /* html */ `
  <div onclick="chosenChar(this)" id="charMario" class="char ${
    chosenCharacterId === "charMario" ? "selected" : ""
  }">Mario </div>
  <div>${marioHp}</div>
  <img src="img/mario (1).png" alt="mario pic">

  <div onclick="chosenChar(this)" id="charPeach" class="char ${
    chosenCharacterId === "charPeach" ? "selected" : ""
  }">Peach </div>
  <div>${peachHp}</div>
  <img src="img/peach (1).png" alt="peach pic">

  <div onclick="chosenChar(this)" id="charYoshi" class="char ${
    chosenCharacterId === "charYoshi" ? "selected" : ""
  }">Yoshi </div>
  <div>${yoshiHp}</div>
  <img src="img/yoshi (1).png" alt="yoshi pic">

  <div onclick="chosenChar(this)" id="charLuigi" class="char ${
    chosenCharacterId === "charLuigi" ? "selected" : ""
  }">Luigi </div>
  <div>${luigiHp}</div>
  <img src="img/luigi (1).png" alt="luigi pic">

  <button onclick="chosenCharAttack()">Attack</button>
  <br>

  <div onclick="chosenChar(this)" id="charBowser" class="char ${
    chosenCharacterId === "charBowser" ? "selected" : ""
  }">Bowser:</div>
  <div>${bowserHp}</div>
  <button onclick="bowserAttack()">Bowser attack</button>
    `;

  document.getElementById("app").innerHTML = html;
}

// controller
function chosenChar(selectedChar) {
  // updates the variable to use with other functions
  chosenCharacterId = selectedChar.id;
  updateView();
}

// function for chosen character to attack bowser
function chosenCharAttack() {
  // attacks bowser with random values from (1-20)
  bowserHp -= Math.floor(Math.random() * 20) + 1;
  // doesn't let bowser hp go below 0
  bowserHp = Math.max(0, bowserHp);
  updateView();

  // check if bowser is dead -> win
  if (bowserHp == 0) {
    gameWin();
  }
}

// function for bowser to attack chosen character
function bowserAttack() {
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
}

// function when you won the game
function gameWin() {
  document.getElementById("app").innerHTML = /*html*/ `
    <h1>We won!</h1>
    `;
}

// function when you lose
function gameOver() {
  document.getElementById("app").innerHTML = /*html*/ `
    <h1>Game Over...</h1>
    `;
}
