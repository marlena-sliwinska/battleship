import { shipsPosition } from "./ShipsPosition.js";

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
    console.log("countTotalShipsByType");
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
    console.log(shipsTypes);
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

  updateAllStatistics(shipData) {
    this.updateshipsOnBoardData(shipData);
    this.renderStats();
    /*  this.countAllNotDestroyedShips(); */
  }
  updateshipsOnBoardData(shipData) {
    this.shipsOnBoardData.forEach((ship) => {
      if (ship.shipId === shipData.shipId) {
        ship.shipCurrentLifes--;
        if (ship.shipCurrentLifes === 0) {
          ship.isDestroyed = true;
          console.log(this.shipsByTypesStatistic);
          this.currentlyDestroyedShipsOnBoard++;
          this.shipsByTypesStatistic.forEach((element) => {
            element.typeName === ship.shipName
              ? element.destroyedQuantity++
              : null;
          });
          return true;
        }
      }
      return false;
    });
  }
}

export default Stats;
