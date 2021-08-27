import { field } from "./Field.js";

import { game_panel_size } from "./ShipsPosition.js";

import { shipsPosition } from "./ShipsPosition.js";

import { stats } from "./Stats.js";

import { game__single__field__className } from "./Field.js";

const game_panel_id = "game__panel";

class Game {
  constructor() {
    this.gameBoard = document.getElementById(game_panel_id);
    this.gameBoardData = [];
    this.initializeGame();
    /*   console.log(this.gameBoardData); */
    this.stats = stats;
  }
  initializeGame() {
    this.drawFieldsOnBoard();
    /* this.gameBoardData = shipsPosition.generateAllShipsLocation(); */
    this.gameBoardData = shipsPosition.initialGameBoardData;
    /*  console.log(this.gameBoardData); */
    this.getButtons();
  }

  drawFieldsOnBoard() {
    for (let row = 0; row < game_panel_size; row++) {
      for (let column = 0; column < game_panel_size; column++) {
        const element = field.createSingleField(row, column);
        this.gameBoard.appendChild(element);
      }
    }
  }

  getButtons() {
    const buttons = document.getElementsByClassName(
      game__single__field__className
    );
    for (let button of buttons) {
      button.addEventListener("click", this.checkThisField);
    }
  }
  checkThisField() {
    console.log("test");
  }
}

export const game = new Game();
