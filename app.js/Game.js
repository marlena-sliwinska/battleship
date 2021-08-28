import { messege } from "./Messege.js";
import { field } from "./Field.js";
import { game_panel_size } from "./ShipsPosition.js";
import { ShipsPosition } from "./ShipsPosition.js";
import Stats from "./Stats.js";
import { game__single__field__className } from "./Field.js";
import { game__border__raised__className } from "./Field.js";
const game__border__pressed__className = "border-pressed";
const game_panel_id = "game__panel";
const reset_button_id = "reset_button";

class Game {
  constructor() {
    this.gameBoard = document.querySelector(`section#${game_panel_id}`);
    this.gameBoardData = [];
    this.shipsData = [];
    this.initializeGame();
    this.resetButton = document.getElementById(reset_button_id);
    console.log(this.resetButton);
    this.resetButton.addEventListener("click", this.startNewGame.bind(this));
  }

  initializeGame() {
    this.drawFieldsOnBoard();
    const shipsPosition = new ShipsPosition();
    this.gameBoardData = shipsPosition.initialGameBoardData;
    this.getButtons();
    this.shipsData = shipsPosition.initialShipsGameData;
    this.statistics = new Stats(this.shipsData);
    this.statistics.initializeStats();
    this.statistics.renderStats();
  }
  startNewGame() {
    this.gameBoard.innerHTML = "";
    this.initializeGame();
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
      messege.singleShipDestroyedMessege(isDestroyed);

      if (this.statistics.checkIfWin()) {
        console.log("wygrałeś gre");
        const finalBoard = messege.winMessege();
        messege.renderMessege(finalBoard);
      }
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
