import * as _ from "lodash";
import { Cell, LiveCell, DeadCell } from './cell';
import { Board } from './board';

export class Game {
    private board:  Board;

    constructor(height: number, width: number) {
        this.board = new Board(height, width);
    }

    public getBoard(): Board {
        return this.board;
    }

    public toggleCell(xPosition, yPosition): void {
        this.board.toggleCell(xPosition, yPosition);
    }

    public step(): void {
        let cells = this.applyGameLogic();

        cells.toKill.forEach((cell) => {
            this.board.killCell(cell.getXPosition(), cell.getYPosition());
        });

        cells.toSpawn.forEach((cell) => {
            this.board.spawnCell(cell.getXPosition(), cell.getYPosition());
        });
    }

    private applyGameLogic(): any {
        let toKill = new Set<Cell>();
        let toSpawn = new Set<Cell>();

        _.forEach(this.board.getCells(), (cell) => {
            let liveCount = this.board.getLiveNeighborCount(cell);
            if(liveCount === 3) { toSpawn.add(cell); }
            if((liveCount < 2) || (liveCount > 3)) { toKill.add(cell); }
        });

        return { toKill, toSpawn };
    }
}
