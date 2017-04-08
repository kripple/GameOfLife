"use strict";
const _ = require("lodash");
const cell_1 = require("./cell");
class Board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.cells = new Map();
        this.initBoardWithDeadCells();
    }
    getCells() {
        return this.cells;
    }
    toggleCell(xPosition, yPosition) {
        let key = this.getCompositeKey(xPosition, yPosition);
        let cell = this.cells[key];
        if (cell instanceof cell_1.LiveCell) {
            this.cells[key] = new cell_1.DeadCell(xPosition, yPosition);
        }
        else {
            this.cells[key] = new cell_1.LiveCell(xPosition, yPosition);
        }
    }
    killCell(xPosition, yPosition) {
        let key = this.getCompositeKey(xPosition, yPosition);
        this.cells[key] = new cell_1.DeadCell(xPosition, yPosition);
    }
    spawnCell(xPosition, yPosition) {
        let key = this.getCompositeKey(xPosition, yPosition);
        this.cells[key] = new cell_1.LiveCell(xPosition, yPosition);
    }
    getLiveNeighborCount(cell) {
        let neighbors = this.getNeighbors(cell);
        return _.reduce([...neighbors.values()], (count, cell) => {
            return cell instanceof cell_1.LiveCell ? ++count : count;
        }, 0);
    }
    getNeighbors(cell) {
        let neighborPositions = this.getNeighborPositions(cell);
        return _.reduce(neighborPositions, (neighbors, position) => {
            if (this.isOnBoard(position[0], position[1])) {
                let key = this.getCompositeKey(position[0], position[1]);
                neighbors.add(this.cells[key]);
            }
            return neighbors;
        }, new Set());
    }
    getNeighborPositions(cell) {
        let x = cell.getXPosition();
        let y = cell.getYPosition();
        return [[x - 1, y - 1], [x + 1, y + 1], [x - 1, y + 1], [x + 1, y - 1], [x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1]];
    }
    initBoardWithDeadCells() {
        _.times(this.height, (yPosition) => {
            _.times(this.width, (xPosition) => {
                let key = this.getCompositeKey(xPosition, yPosition);
                this.cells[key] = new cell_1.DeadCell(xPosition, yPosition);
            });
        });
    }
    isOnBoard(xPosition, yPosition) {
        return this.isInRange(xPosition, this.width) && this.isInRange(yPosition, this.height);
    }
    isInRange(value, maxValue) {
        return (value >= 0) && (value < maxValue);
    }
    getCompositeKey(xPosition, yPosition) {
        return `${xPosition},${yPosition}`;
    }
}
exports.Board = Board;
