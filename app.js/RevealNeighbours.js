import { field } from "./Field.js";
import { game_panel_size } from "./ShipsPosition.js";
class RevealNeighbours {
  revealShipBoundaries(shipData, gameBoardData) {
    for (let row = 0; row < game_panel_size; row++) {
      for (let column = 0; column < game_panel_size; column++) {
        const field = gameBoardData[row][column];
        if (!field.isRevealed) {
          if (field.isNeighbour && field.shipId === shipData.shipId)
            console.log("teraz to mamy");
        }
      }
    }
  }
}

export const revealNeighbours = new RevealNeighbours();
