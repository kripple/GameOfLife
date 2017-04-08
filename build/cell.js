"use strict";
class Cell {
    constructor(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    getXPosition() {
        return this.xPosition;
    }
    getYPosition() {
        return this.yPosition;
    }
}
exports.Cell = Cell;
class LiveCell extends Cell {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition);
    }
}
exports.LiveCell = LiveCell;
class DeadCell extends Cell {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition);
    }
}
exports.DeadCell = DeadCell;
