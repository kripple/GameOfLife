import { Cell, LiveCell, DeadCell } from './cell';
import { Board } from './board';
import { Game } from './game';

describe('Game', () => {
    it('should create', () => {
        let game = new Game(3,3);
        expect(game).toBeTruthy();
    });
    describe('get board', () => {
        it('should have a board', () => {
            let game = new Game(3,3);
            let board = game.getBoard();
            expect(board).toBeTruthy();
        });
    });
    describe('toggle cell', () => {
        it('should change dead cell to live cell', () => {
            let game = new Game(3,3);
            let board = game.getBoard();
            let cells = board.getCells();
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
        });
        it('should change live cell to dead cell', () => {
            let game = new Game(3,3);
            let board = game.getBoard();
            let cells = board.getCells();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
            board.toggleCell(0,0);
            expect(cells['0,0'] instanceof DeadCell).toBeTruthy();
        });
    });

    const GameRules = [
        "Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.",
        "Any live cell with more than three live neighbours dies, as if by overpopulation.",
        "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.",
        "Any live cell with two or three live neighbours lives on to the next generation."
    ];

    describe('step', () => {
        describe('underpopulation case', () => {
            it('should die by underpopulation', () => {
                let game = new Game(3,3);
                let board = game.getBoard();
                let cells = board.getCells();
                
                board.toggleCell(0,0);
                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();

                game.step();
                expect(cells['0,0'] instanceof LiveCell).toBeFalsy();
            });
        }); 
        describe('overpopulation case', () => {
            it('should die by overpopulation', () => {
                let game = new Game(3,3);
                let board = game.getBoard();
                let cells = board.getCells();
                
                board.toggleCell(0,0);
                board.toggleCell(0,1);
                board.toggleCell(0,2);
                board.toggleCell(1,0);
                board.toggleCell(1,1);
                board.toggleCell(1,2);
                board.toggleCell(2,0);
                board.toggleCell(2,1);
                board.toggleCell(2,2);
                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,2'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,2'] instanceof LiveCell).toBeTruthy();
                expect(cells['2,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['2,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['2,2'] instanceof LiveCell).toBeTruthy();

                game.step();

                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeFalsy();
                expect(cells['0,2'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeFalsy();
                expect(cells['1,1'] instanceof LiveCell).toBeFalsy();
                expect(cells['1,2'] instanceof LiveCell).toBeFalsy();
                expect(cells['2,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['2,1'] instanceof LiveCell).toBeFalsy();
                expect(cells['2,2'] instanceof LiveCell).toBeTruthy();
            });
        }); 
        describe('reproduction case', () => {
            it('should spawn a new live cell', () => {
                let game = new Game(2,2);
                let board = game.getBoard();
                let cells = board.getCells();
                
                board.toggleCell(0,0);
                board.toggleCell(0,1);
                board.toggleCell(1,0);
                
                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof DeadCell).toBeTruthy();

                game.step();

                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof LiveCell).toBeTruthy();
            });
        }); 
        describe('survival case', () => {
            it('should survive', () => {
                let game = new Game(2,2);
                let board = game.getBoard();
                let cells = board.getCells();
                
                board.toggleCell(0,0);
                board.toggleCell(0,1);
                board.toggleCell(1,0);
                
                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof DeadCell).toBeTruthy();

                game.step();

                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof LiveCell).toBeTruthy();

                game.step();

                expect(cells['0,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['0,1'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,0'] instanceof LiveCell).toBeTruthy();
                expect(cells['1,1'] instanceof LiveCell).toBeTruthy();
            });
        }); 
    }); 
});