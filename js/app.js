/**
 * 
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ['red', 'green', 'blue', 'yellow'],

  // this var will contain the sequence said by Simon
  sequence: [],
  indice: 0,

  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = color;
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  newGame: function () {
    // start by reseting the sequence 
    app.sequence = [];
    app.indice = 0;
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random() * 4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
    }
    app.showMessage("La partie commence, bonne chance !");

    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      app.stopListenClickEvents();
      app.stopTimeout();
      app.showMessage("Mémorisez la séquence");
      // after 500ms, bump the first cell
      setTimeout(app.bumpCell, 500, sequence[0]);
      // plays the rest of the sequence after a longer pause
      setTimeout(app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("Reproduisez la séquence");
      app.startTimeout();
      app.listenClickEvents();
    }
  },

  init: function () {
    console.log('init');
    app.drawCells();
    app.listenClickEvents()

    // listen click on the "go" button
    document.getElementById('go').addEventListener('click', app.newGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  showMessage: function (message) {
    const messageElement = document.getElementById('message');
    messageElement.style.display = "flex";
    messageElement.innerHTML = message;
    const btnStart = document.getElementById("go")
    btnStart.style.display = "none";
  },

  showBtnStart: function () {
    document.getElementById("message").style.display = "none";
    document.getElementById("go").style.display = "block"
  },

  endGame: function () {
    alert(`Partie terminée. Votre score: ${app.sequence.length}`);
    app.showBtnStart();
    app.sequence = [];
  },

  listenClickEvents: function () {
    const cellTargets = document.querySelectorAll(".cell");
    for (const cellTarget of cellTargets) {
      cellTarget.addEventListener("click", app.onCellClick)
    }
  },

  stopListenClickEvents: function () {
    const cellTargets = document.querySelectorAll(".cell");
    for (const cellTarget of cellTargets) {
      cellTarget.removeEventListener("click", app.onCellClick)
    }
  },

  onCellClick: function (evt) {
    app.stopTimeout();
    app.startTimeout();
    const clickedColor = evt.target.id;
    app.bumpCell(clickedColor);
    if (clickedColor !== app.sequence[app.indice]) {
      app.endGame();
    } else {
      if (app.indice === app.sequence.length - 1) {
        app.nextMove();
      } else {
        app.indice += 1;
      }
    }
  },

  nextMove: function () {
    const colorIndex = Math.floor(Math.random() * 4);
    app.sequence.push(app.colors[colorIndex]);
    app.indice = 0;
    app.simonSays(app.sequence);
  },

  startTimeout: function () {
    app.timeoutRef = setTimeout(app.endGame, 5000);
  },

  stopTimeout: function () {
    clearTimeout(app.timeoutRef);
  }

};


document.addEventListener('DOMContentLoaded', app.init);