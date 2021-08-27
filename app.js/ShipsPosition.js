export const game_panel_size = 10;
import { shipsTypes } from "./data/shipsTypes.js";
class ShipsPosition {
  constructor() {
    this.shipsOnGame = shipsTypes;
    this.initialGameBoardData = this.createTemplateDataTable();
  }

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

  generateSingleIndex(ship) {
    let field = {};
    field = {
      row: Math.floor(Math.random() * game_panel_size),
      column: Math.floor(Math.random() * game_panel_size),
    };
    if (this.checkIfItsOccupied(field, ship)) return field;
    else return this.generateSingleIndex(ship);
  }

  generateSingleShipLocation(ship) {
    //przypisz rozmiar statku
    let fields = 3;
    let field = null;
    //znajdź pierwsze pole
    field = this.generateSingleIndex(ship);
    fields--;
    //znajdz pozostałe pola
    while (fields > 0) {
      // utwórz zbiór w którym powinienes szukać kolejnego pola
      const jackpot = this.possibleNextIndex(field.row, field.column);
      // wylosuj kolejne pole
      field = this.findRemainShipFieldsLocations(jackpot, ship);
      fields--;
    }

    //zbuduj granice statku
  }

  findRemainShipFieldsLocations(jackpot, ship) {
    let field = null;
    field = jackpot[Math.floor(Math.random() * jackpot.length)];
    if (this.checkIfItsOccupied(field, ship)) return field;
    else return this.findRemainShipFieldsLocations(jackpot, ship);
  }

  generateAllShipsLocation() {
    const data = this.initialGameBoardData;
    this.shipsOnGame.forEach((ship) => {
      this.generateSingleShipLocation(ship);
    });
    return data;
  }
  checkIfItsOccupied(field, ship) {
    console.log(this.initialGameBoardData);
    console.log(field, ship);
    if (!this.initialGameBoardData[field.row][field.column].isOccupied) {
      this.initialGameBoardData[field.row][field.column].isOccupied = true;
      this.initialGameBoardData[field.row][field.column].isNeighbour = false;
      this.initialGameBoardData[field.row][field.column].shipName = ship.name;
      this.initialGameBoardData[field.row][field.column].shipId = ship.id;
      this.initialGameBoardData[field.row][field.column].isRevealed = false;
    }
  }

  possibleNextIndex(x, y) {
    let jakpot = [];
    if (x == 0 && y == 0) {
      jakpot = [
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
      ];
    } else if (x == 0 && y == game_panel_size - 1) {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
      ];
    } else if (x == game_panel_size - 1 && y == game_panel_size - 1) {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //left
        { row: x - 1, column: y },
      ];
    } else if (x == game_panel_size - 1 && y == 0) {
      jakpot = [
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
      ];
    } else if (x == 0) {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
      ];
    } else if (y == game_panel_size - 1) {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //left
        { row: x - 1, column: y },
      ];
    } else if (x == game_panel_size - 1) {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
      ];
    } else if (y == 0) {
      jakpot = [
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
      ];
    } else {
      jakpot = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
      ];
    }
    return jakpot;
  }
}

export const shipsPosition = new ShipsPosition();
