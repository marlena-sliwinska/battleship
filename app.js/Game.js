import { field } from "./Field.js";
import { shipsPosition } from "./ShipsPosition.js";

export const game_panel_size = 10;
const game_panel_id = "game__panel";

class Game {
  constructor() {
    this.gameBoard = document.getElementById(game_panel_id);
    this.gameBoardData = [];
    this.initializeGame();
  }
  initializeGame() {
    this.drawFieldsOnBoard();
    /* this.gameBoardData = shipsPosition.generateAllShipsLocation(); */
    this.gameBoardData = shipsPosition.createTemplateDataTable();
    console.log(this.gameBoardData);
  }

  drawFieldsOnBoard() {
    for (let row = 0; row < game_panel_size; row++) {
      for (let column = 0; column < game_panel_size; column++) {
        const element = field.createSingleField(row, column);
        this.gameBoard.appendChild(element);
      }
    }
  }
}

export const game = new Game();
