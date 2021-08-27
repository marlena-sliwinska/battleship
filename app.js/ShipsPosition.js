export const game_panel_size = 10;
import { shipsTypes } from "./data/shipsTypes.js";
class ShipsPosition {
  constructor() {
    this.shipsOnGame = shipsTypes;
    this.initialGameBoardData = this.createTemplateDataTable();
    this.initialShipsGameData = this.createShipsOnBoardSummary();
    this.generateAllShipsLocation();
  }
  createShipsOnBoardSummary() {
    const data = [];
    shipsTypes.forEach((item) => {
      data.push({
        shipId: item.id,
        shipName: item.name,
        shipSize: item.size,
        shipCurrentLifes: item.size,
        isDestroyed: false,
        occupiedFields: [],
      });
    });
    return data;
  }

  addShipsLocationsToSummary(id, field) {
    this.initialShipsGameData.forEach((data, index) => {
      if (data.shipId === id)
        this.initialShipsGameData[index].occupiedFields.push(field);
    });
  }
  createTemplateDataTable() {
    const data = [];
    for (let row = 0; row < game_panel_size; row++) {
      data[row] = [];
      for (let column = 0; column < game_panel_size; column++) {
        data[row].push({
          isOccupied: false,
          isNeighbour: false,
          shipName: null,
          shipId: null,
          isRevealed: false,
        });
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
    if (this.checkIfItsOccupied(field, ship)) {
      return field;
    } else return this.generateSingleIndex(ship);
  }

  generateSingleShipLocation(ship) {
    //przypisz rozmiar statku
    let fields = ship.size;
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
    this.generateShipBoundaries(ship);
  }

  findRemainShipFieldsLocations(jackpot, ship) {
    let field = null;
    field = jackpot[Math.floor(Math.random() * jackpot.length)];
    if (this.checkIfItsOccupied(field, ship)) return field;
    else return this.findRemainShipFieldsLocations(jackpot, ship);
  }

  generateShipBoundaries() {
    for (let row = 0; row < game_panel_size; row++) {
      for (let column = 0; column < game_panel_size; column++) {
        if (this.initialGameBoardData[row][column].isOccupied) {
          const neighbours = this.findNeighbours(row, column);
          neighbours.forEach((neighbour) => {
            if (
              !this.initialGameBoardData[neighbour.row][neighbour.column]
                .isOccupied
            )
              this.initialGameBoardData[neighbour.row][
                neighbour.column
              ].isNeighbour = true;
          });
        }
      }
    }
  }
  generateAllShipsLocation() {
    const data = this.initialGameBoardData;
    this.shipsOnGame.forEach((ship) => {
      this.generateSingleShipLocation(ship);
    });
    return data;
  }

  checkIfItsOccupied(field, ship) {
    const { row, column } = field;
    const { name, id } = ship;
    if (
      !this.initialGameBoardData[row][column].isOccupied &&
      !this.initialGameBoardData[row][column].isNeighbour
    ) {
      this.initialGameBoardData[row][column].isOccupied = true;
      this.initialGameBoardData[row][column].isNeighbour = false;
      this.initialGameBoardData[row][column].isRevealed = false;
      this.initialGameBoardData[row][column].shipId = id;
      this.initialGameBoardData[row][column].shipName = name;

      this.addShipsLocationsToSummary(id, field);

      return true;
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
  findNeighbours(x, y) {
    let neighbours = [];
    if (x == 0 && y == 0) {
      neighbours = [
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //corner
        { row: x + 1, column: y + 1 },
      ];
    } else if (x == 0 && y == game_panel_size - 1) {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //corner
        { row: x + 1, column: y - 1 },
      ];
    } else if (x == game_panel_size - 1 && y == game_panel_size - 1) {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x - 1, column: y - 1 },
      ];
    } else if (x == game_panel_size - 1 && y == 0) {
      neighbours = [
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x - 1, column: y + 1 },
      ];
    } else if (x == 0) {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //corner
        { row: x + 1, column: y - 1 },
        //corner
        { row: x + 1, column: y + 1 },
      ];
    } else if (y == game_panel_size - 1) {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x + 1, column: y - 1 },
        //corner
        { row: x - 1, column: y - 1 },
      ];
    } else if (x == game_panel_size - 1) {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x - 1, column: y + 1 },
        //corner
        { row: x - 1, column: y - 1 },
      ];
    } else if (y == 0) {
      neighbours = [
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x + 1, column: y + 1 },
        //corner
        { row: x - 1, column: y + 1 },
      ];
    } else {
      neighbours = [
        //up
        { row: x, column: y - 1 },
        //right
        { row: x + 1, column: y },
        //bottom
        { row: x, column: y + 1 },
        //left
        { row: x - 1, column: y },
        //corner
        { row: x - 1, column: y - 1 },
        //corner
        { row: x - 1, column: y + 1 },
        //corner
        { row: x + 1, column: y + 1 },
        //corner
        { row: x + 1, column: y - 1 },
      ];
    }
    return neighbours;
  }
}

export const shipsPosition = new ShipsPosition();
