/* import { shipsPosition } from "./ShipsPosition.js"; */

const box_on_game_board_withs_tats_id = "statistic board";

class Stats {
  constructor(shipData) {
    this.statBoard = document.getElementById(box_on_game_board_withs_tats_id);
    this.shipsOnBoardData = shipData;
    this.totalShipsOnBoard = null;
    /*  this.currentlyDestroyedShipsOnBoard = null; */
    this.shipsByTypesStatistic = [];
  }
  initializeStats() {
    this.currentlyDestroyedShipsOnBoard = 0;
    this.totalShipsOnBoard = this.shipsOnBoardData.length;
    this.shipsByTypesStatistic = this.countTotalShipsByType();
  }
  renderStats() {
    this.statBoard.innerHTML = `<h3>You have destroyed ${this.currentlyDestroyedShipsOnBoard} from ${this.totalShipsOnBoard} ships.</h3>
    <h4>In details:</h4>`;
    this.shipsByTypesStatistic.forEach((shipType) => {
      const stat = document.createElement("h4");
      stat.innerHTML = `${shipType.typeName} - destroyed ${shipType.destroyedQuantity} from ${shipType.totalQuantity}.`;
      this.statBoard.appendChild(stat);
    });
  }

  /* countAllNotDestroyedShips() {
    this.shipsOnBoardData.forEach((ship) => {
      if (ship.isDestroyed) this.currentlyDestroyedShipsOnBoard++;
    });
  } */

  summarizeShipsTypes() {
    const ships = this.shipsOnBoardData;
    const data = [];
    ships.forEach((ship) => {
      !data.includes(ship.shipName) ? data.push(ship.shipName) : null;
    });
    return data;
  }

  countTotalShipsByType() {
    const shipsTypes = this.summarizeShipsTypes();
    const ships = this.shipsOnBoardData;
    const data = [];
    for (let i = 0; i < shipsTypes.length; i++) {
      let quantity = 0;
      ships.forEach((ship) => {
        ship.shipName === shipsTypes[i] ? quantity++ : null;
      });
      data[i] = {
        typeName: shipsTypes[i],
        totalQuantity: quantity,
        destroyedQuantity: 0,
      };
    }
    return data;
  }

  updateStatistics(shipData) {
    let isDestroyed = null;
    this.shipsOnBoardData.forEach((ship) => {
      if (ship.shipId === shipData.shipId) {
        ship.shipCurrentLifes--;
        if (ship.shipCurrentLifes === 0) {
          isDestroyed = ship.shipName;
          ship.isDestroyed = true;
          this.currentlyDestroyedShipsOnBoard++;
          this.shipsByTypesStatistic.forEach((element) => {
            if (element.typeName === ship.shipName) {
              element.destroyedQuantity++;
            }
          });
        } else isDestroyed = false;
      }
    });
    return isDestroyed;
  }
  checkIfWin() {
    return this.currentlyDestroyedShipsOnBoard === this.totalShipsOnBoard
      ? true
      : false;
  }
}

export default Stats;
