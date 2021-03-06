import { Cell, LiveCell, DeadCell } from './cell';

describe('Cell', () => {
    it('should create', () => {
        let cell = new Cell(0,0);
        expect(cell).toBeTruthy();
    });
    describe('get X and Y positions', () => {
        it('should have an X and a Y position', () => {
            let xPosition = 1;
            let yPosition = 2;
            let cell = new Cell(xPosition,yPosition);
            let x = cell.getXPosition();
            let y = cell.getYPosition();
            expect(x).toEqual(xPosition);
            expect(y).toEqual(yPosition);
        });
    });
    describe('LiveCell', () => {
        it('should be a type of Cell', () => {
            let xPosition = 1;
            let yPosition = 2;
            let cell = new LiveCell(xPosition,yPosition);
            expect(cell instanceof Cell).toBeTruthy();
        });
    });
    describe('DeadCell', () => {
        it('should be a type of Cell', () => {
            let xPosition = 1;
            let yPosition = 2;
            let cell = new DeadCell(xPosition,yPosition);
            expect(cell instanceof Cell).toBeTruthy();
        });
    });
});
