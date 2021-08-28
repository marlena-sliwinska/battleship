import { field } from "./Field.js";

import { game_panel_size } from "./ShipsPosition.js";

import { shipsPosition } from "./ShipsPosition.js";

import Stats from "./Stats.js";

import { game__single__field__className } from "./Field.js";
import { game__border__raised__className } from "./Field.js";

const game__border__pressed__className = "border-pressed";
const game_panel_id = "game__panel";

class Game {
  constructor() {
    this.gameBoard = document.getElementById(game_panel_id);
    this.gameBoardData = [];
    this.shipsData = [];
    this.initializeGame();
  }
  initializeGame() {
    this.drawFieldsOnBoard();
    this.gameBoardData = shipsPosition.initialGameBoardData;
    this.getButtons();
    this.shipsData = shipsPosition.initialShipsGameData;
    this.statistics = new Stats(this.shipsData);
    this.statistics.initializeStats();
    this.statistics.renderStats();
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
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-column");
    const alreadyRevealed = this.checkIfRevealed(row, column, e.target);
    if (alreadyRevealed) return;
    const isOccupied = this.checkIfElementIsOccupied(row, column, e.target);
    if (!isOccupied) return;
    const shipData = {
      shipId: this.gameBoardData[row][column].shipId,
      row: row,
      column: column,
    };
    const isDestroyed = this.statistics.updateStatistics(shipData);
    if (isDestroyed) {
      this.statistics.renderStats();
    }
  }
  checkIfRevealed(row, column, btn) {
    if (this.gameBoardData[row][column].isRevealed) return true;
    else {
      btn.classList.remove(game__border__raised__className);
      btn.classList.add(game__border__pressed__className);
      this.gameBoardData[row][column].isRevealed = true;
      return false;
    }
  }

  checkIfElementIsOccupied(row, column, btn) {
    if (!this.gameBoardData[row][column].isOccupied) return false;
    else {
      btn.textContent = "X";
      return true;
    }
  }
}

export const game = new Game();
