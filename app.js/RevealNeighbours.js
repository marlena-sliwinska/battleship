import { game__button__pressed__className } from "./Game.js";
import { game_panel_size } from "./ShipsPosition.js";
import { game__border__raised__className } from "./Field.js";
const game_neighbour_button_className = "game__single-field--isNeigbour";
class RevealNeighbours {
  revealShipBoundaries(shipData, gameBoardData) {
    for (let row = 0; row < game_panel_size; row++) {
      for (let column = 0; column < game_panel_size; column++) {
        const field = gameBoardData[row][column];
        if (field.isNeighbour && field.shipId.includes(shipData.shipId)) {
          const btn = document.querySelector(`[data-${row}_${column}]`);
          btn.classList.remove(game__border__raised__className);
          btn.classList.add(game__button__pressed__className);
          btn.classList.add(game_neighbour_button_className);
        }
      }
    }
  }
}

export const revealNeighbours = new RevealNeighbours();
