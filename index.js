let players = [];
let turn = 0;
let gameOver = false;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    player1 = "Player 1";
    player2 = "Player 2";
  }
  players.push(player1);
  players.push(player2);
  input1.setAttribute("disabled", "true");
  input2.setAttribute("disabled", "true");
  let el = document.getElementById("game-container");
  el.classList.remove("hide");
  let tu = document.getElementById("turn");
  tu.innerHTML = `${players[0]}`;
};

const winner = () => {
  if (turn < 4) {
    return false;
  }
  const comb = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"]
  ];
  for (let i = 0; i < comb.length; i++) {
    let val1 = comb[i][0];
    let val2 = comb[i][1];
    let val3 = comb[i][2];
    //let val1 ,val2,val3 = comb[i];
    if (
      board[val1[0]][val1[1]] !== "" &&
      board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
      board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
    ) {
      return true;
    }
  }
  return false;
};

const isEmpty = (value) => !value || !value.trim();

const handleClick = (el) => {
  if (el.innerHTML === "" && !gameOver) {
    let a = el.id;
    board[a[0]][a[1]] = turn % 2 === 0 ? "X" : "O";
    if (board[a[0]][a[1]] === "X") {
      el.classList.add("neon");
      el.classList.add("size");
    } else {
      el.classList.add("flux");
      el.classList.add("size");
    }
    el.innerHTML = board[a[0]][a[1]];
  }
  if (winner()) {
    let el1 = document.getElementById("game-container");
    //el1.classList.add("hide");
    el1.classList.add("winning");
    el1.innerHTML = `<div class="containernew">
        <div class="neon">${players[turn % 2]} </div>
        <div class="flux">Winner </div>
        <br/>
        <div>
            <a class="btn btn-primary" href="index.html" role="button">Restart</a>  
        </div>
      </div>`;

    //alert(`${players[turn % 2]} won the game`);
    gameOver = true;
    return;
  }
  turn++;
  if (turn === 9) {
    let el1 = document.getElementById("game-container");
    //el1.classList.add("hide");
    el1.classList.add("winning");
    el1.innerHTML = `<div class="containernew">
        <div class="neon">Game</div>
        <div class="flux">Drawn </div>
        <br/>
        <div>
            <a class="btn btn-primary" href="index.html" role="button">Restart</a>  
        </div>
      </div>
      `;
    //alert("Game Over - It's a Tie :(");
    gameOver = true;
    return;
  }
  let tu = document.getElementById("turn");
  tu.innerHTML = `${players[turn % 2]}`;
};
{
  const target = window.document.getElementsByTagName("h1")[0];

  const flickerLetter = (letter) =>
    `<span style="animation: text-flicker-in-glow ${
      Math.random() * 4
    }s linear both ">${letter}</span>`;
  const colorLetter = (letter) =>
    `<span style="color: hsla(${
      Math.random() * 360
    }, 100%, 80%, 1);">${letter}</span>`;
  const flickerAndColorText = (text) =>
    text.split("").map(flickerLetter).map(colorLetter).join("");
  const neonGlory = (target) =>
    (target.innerHTML = flickerAndColorText(target.textContent));

  neonGlory(target);
  target.onclick = ({ target }) => neonGlory(target);
}
