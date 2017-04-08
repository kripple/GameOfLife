"use strict";
const _ = require("lodash");
const board_1 = require("./board");
class Game {
    constructor(height, width) {
        this.board = new board_1.Board(height, width);
    }
    getBoard() {
        return this.board;
    }
    toggleCell(xPosition, yPosition) {
        this.board.toggleCell(xPosition, yPosition);
    }
    step() {
        let cells = this.applyGameLogic();
        cells.toKill.forEach((cell) => {
            this.board.killCell(cell.getXPosition(), cell.getYPosition());
        });
        cells.toSpawn.forEach((cell) => {
            this.board.spawnCell(cell.getXPosition(), cell.getYPosition());
        });
    }
    applyGameLogic() {
        let toKill = new Set();
        let toSpawn = new Set();
        _.forEach(this.board.getCells(), (cell) => {
            let liveCount = this.board.getLiveNeighborCount(cell);
            if (liveCount === 3) {
                toSpawn.add(cell);
            }
            if ((liveCount < 2) || (liveCount > 3)) {
                toKill.add(cell);
            }
        });
        return { toKill, toSpawn };
    }
}
exports.Game = Game;
