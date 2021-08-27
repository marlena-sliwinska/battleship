import { field } from "./Field.js";

import { game_panel_size } from "./ShipsPosition.js";

import { shipsPosition } from "./ShipsPosition.js";

import { stats } from "./Stats.js";

import { game__single__field__className } from "./Field.js";
import { game__border__raised__className } from "./Field.js";

const game__border__pressed__className = "border-pressed";
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
      button.addEventListener("click", (e) => this.checkThisField(e));
    }
  }
  checkThisField(e) {
    const button = e.target;
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    console.log(row, column, e.target);
    this.checkIfButtonIsRevealed(row, column, e.target);
  }
  checkIfButtonIsRevealed(row, column, btn) {
    if (this.gameBoardData[row][column].isRevealed) return;
    else {
      btn.classList.remove(game__border__raised__className);
      btn.classList.add(game__border__pressed__className);
      this.gameBoardData[row][column].isRevealed = true;
      console.log(this.gameBoardData);
      this.checkIfElementIsOccupied(row, column, btn);
    }
  }
  checkIfElementIsOccupied(row, column, btn) {
    if (!this.gameBoardData[row][column].isOccupied) return;
    else {
      btn.textContent = "X";
    }
  }
}

export const game = new Game();
