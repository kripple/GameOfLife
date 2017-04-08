import * as _ from "lodash";
import { Cell, LiveCell, DeadCell } from './cell';

export class Board {
    private cells: Map<number,Cell>;
    private height: number;
    private width: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.cells = new Map<number,Cell>();
        this.initBoardWithDeadCells();
    }

    public getCells(): Map<number,Cell> {
        return this.cells;
    }

    public toggleCell(xPosition, yPosition): void {
        let key = this.getCompositeKey(xPosition, yPosition);
        let cell = this.cells[key];

        if(cell instanceof LiveCell) {
            this.cells[key] = new DeadCell(xPosition, yPosition);
        } else {
            this.cells[key] = new LiveCell(xPosition, yPosition);
        }
    }

    public killCell(xPosition, yPosition): void {
        let key = this.getCompositeKey(xPosition, yPosition);
        this.cells[key] = new DeadCell(xPosition, yPosition);
    }

    public spawnCell(xPosition, yPosition): void {
        let key = this.getCompositeKey(xPosition, yPosition);
        this.cells[key] = new LiveCell(xPosition, yPosition);
    }

    public getLiveNeighborCount(cell): number {
        let neighbors = this.getNeighbors(cell);

        return _.reduce([...neighbors.values()], (count, cell) => {
            return cell instanceof LiveCell ? ++count : count;
        }, 0);
    }

    private getNeighbors(cell: Cell): Set<Cell> {
        let neighborPositions = this.getNeighborPositions(cell);
        
        return _.reduce(neighborPositions, (neighbors, position): Set<Cell> => {
            if(this.isOnBoard(position[0],position[1])) {
                let key = this.getCompositeKey(position[0],position[1]);
                neighbors.add(this.cells[key]);
            }
            return neighbors;
        }, new Set<Cell>());
    }

    private getNeighborPositions(cell: Cell): Array<Array<number>> {
        let x = cell.getXPosition();
        let y = cell.getYPosition();
        return [[x-1,y-1],[x+1,y+1],[x-1,y+1],[x+1,y-1],[x-1,y],[x+1,y],[x,y+1],[x,y-1]];
    }
    private initBoardWithDeadCells(): void {
        _.times(this.height, (yPosition) => {
            _.times(this.width, (xPosition) => {
                let key = this.getCompositeKey(xPosition, yPosition);
                this.cells[key] = new DeadCell(xPosition,yPosition);
            });
        });
    }

    private isOnBoard(xPosition: number, yPosition: number): boolean {
        return this.isInRange(xPosition, this.width) && this.isInRange(yPosition, this.height);
    }

    private isInRange(value: number, maxValue: number): boolean {
        return (value >= 0) && (value < maxValue);
    }

    private getCompositeKey(xPosition: number, yPosition: number): string {
        return `${xPosition},${yPosition}`;
    }
}