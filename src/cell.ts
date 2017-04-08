export class Cell {
    private xPosition: number;
    private yPosition: number;
    
    constructor(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    public getXPosition() {
        return this.xPosition;
    }

    public getYPosition() {
        return this.yPosition;
    }
}

export class LiveCell extends Cell {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition);
    }
}

export class DeadCell extends Cell {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition);
    }
}
