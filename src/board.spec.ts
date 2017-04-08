import { Cell, LiveCell, DeadCell } from './cell';
import { Board } from './board';
import * as _ from "lodash";

describe('Board', () => {
    it('should create', () => {
        let board = new Board(3,3);
        expect(board).toBeTruthy();
    });
    describe('get cells', () => {
        it('should have dead cells', () => {
            let board = new Board(2,2);
            let cells = board.getCells();
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
            expect(cells['0,1'] instanceof DeadCell).toBeTruthy();
            expect(cells['1,0'] instanceof DeadCell).toBeTruthy();
            expect(cells['1,1'] instanceof DeadCell).toBeTruthy();
        });
        it('should be the right size', () => {
            let board = new Board(2,2);
            let cells = board.getCells();
            expect(cells['0,2']).toBeFalsy();
            expect(cells['-1,0']).toBeFalsy();
            expect(cells['2,0']).toBeFalsy();
            expect(cells['0,-1']).toBeFalsy();
        });
    });
    describe('toggle cell', () => {
        it('should change dead cell to live cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
        });
        it('should change live cell to dead cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
        });
    });
    describe('kill cell', () => {
        it('should change dead cell to dead cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
            board.killCell(0,0);
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
        });
        it('should change live cell to dead cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
            board.killCell(0,0);
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
        });
    });
    describe('spawn cell', () => {
        it('should change dead cell to live cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
            board.spawnCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
        });
        it('should change live cell to live cell', () => {
            let board = new Board(1,1);
            let cells = board.getCells();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
            board.spawnCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
        });
    });
    describe('get live neighbor count', () => {
        function getLiveBoard(): Board {
            let board = new Board(3,3);
            board.toggleCell(0,0);
            board.toggleCell(0,1);
            board.toggleCell(0,2);
            board.toggleCell(1,0);
            board.toggleCell(1,1);
            board.toggleCell(1,2);
            board.toggleCell(2,0);
            board.toggleCell(2,1);
            board.toggleCell(2,2);
            return board;
        }

        it('should have zero live neighbors', () => {
            let board = new Board(3,3);
            let cells = board.getCells();
            let cell = new Cell(1,1);
            let count = board.getLiveNeighborCount(cell);
            expect(count).toEqual(0);
        });
        it('should have eight live neighbors', () => {
            let board = getLiveBoard();
            let cells = board.getCells();
            let cell = new Cell(1,1);
            let count = board.getLiveNeighborCount(cell);
            expect(count).toEqual(8);
        });
        it('should have five live neighbors', () => {
            let board = getLiveBoard();
            let cells = board.getCells();
            let cell = new Cell(1,2);
            let count = board.getLiveNeighborCount(cell);
            expect(count).toEqual(5);
        });
        it('should have three live neighbor', () => {
            let board = getLiveBoard();
            let cells = board.getCells();
            let cell = new Cell(0,2);
            let count = board.getLiveNeighborCount(cell);
            expect(count).toEqual(3);
        });
    }); 
});