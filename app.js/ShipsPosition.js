import { game_panel_size } from "./Game.js";
class ShipsPosition {
  constructor() {}

  createTemplateDataTable() {
    const data = [];
    const singleDataCell = {
      isOccupied: false,
      isNeighbour: false,
      shipName: null,
      shipId: null,
      isRevealed: false,
    };

    for (let row = 0; row < game_panel_size; row++) {
      data[row] = [];
      for (let column = 0; column < game_panel_size; column++) {
        data[row].push(singleDataCell);
      }
    }
    return data;
  }
}

export const shipsPosition = new ShipsPosition();
