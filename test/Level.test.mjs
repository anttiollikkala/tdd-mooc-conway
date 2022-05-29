import {expect} from "chai";
import {Level} from '../src/Level.mjs'

describe("Level", () => {

    it("Prints out correctly with no cells and is square", () => {
        const level = new Level(5,5)
        expect(level.toString()).to.equal('.....\n.....\n.....\n.....\n.....\n')
    })

    it("Prints out correctly with no cells and is rectangle", () => {
        const level = new Level(3,5)
        expect(level.toString()).to.equal('...\n...\n...\n...\n...\n')
    })

    it("Prints out correctly with no cells and is rectangle 2", () => {
        const level = new Level(5,3)
        expect(level.toString()).to.equal('.....\n.....\n.....\n')
    })

    it("Prints out correctly with 3x3 level and center is alive", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.toString()).to.equal('...\n.X.\n...\n')
    })

    it("Prints out correctly with 3x3 level and left middle edge is alive", () => {
        const level = new Level(3,3)
        level.setAlive(0,1)
        expect(level.toString()).to.equal('...\nX..\n...\n')
    })

    it("Prints out correctly with 3x3 level and right middle edge is alive", () => {
        const level = new Level(3,3)
        level.setAlive(2,1)
        expect(level.toString()).to.equal('...\n..X\n...\n')
    })

    it("Prints out correctly with 3x3 level and bottom middle edge is alive", () => {
        const level = new Level(3,3)
        level.setAlive(1,2)
        expect(level.toString()).to.equal('...\n...\n.X.\n')
    })

    it("Prints out correctly with 3x3 level and top middle edge is alive", () => {
        const level = new Level(3,3)
        level.setAlive(1,0)
        expect(level.toString()).to.equal('.X.\n...\n...\n')
    })

    it("Prints out correctly with 3x3 level and bottom right edge is alive", () => {
        const level = new Level(3,3)
        level.setAlive(2,2)
        expect(level.toString()).to.equal('...\n...\n..X\n')
    })

    it("AliveNeighbours returns correct value when no alive neighbours", () => {
        const level = new Level(3,3)
        expect(level.aliveNeighbours(level, 1,1)).to.equal(0)
    })

    it("AliveNeighbours returns correct value when 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,0)
        expect(level.aliveNeighbours(level, 1,1)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking left edge and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 0,1)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking right edge and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 2,1)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking top edge and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 1,0)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking bottom edge and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 1,2)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking top right corner and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 2,0)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking top left corner and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 0,0)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking bottom left corner and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 0,2)).to.equal(1)
    })

    it("AliveNeighbours returns correct value when checking bottom right corner and 1 alive neighbour", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        expect(level.aliveNeighbours(level, 2,2)).to.equal(1)
    })

    it("Single alive cell dies in the next round", () => {
        const level = new Level(5,5)
        level.setAlive(2,2)
        const nextStep = level.tick()
        expect(nextStep.countAlive()).to.equal(0)
    })

    it("Alive cell with two neighbours is alive next round", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        level.setAlive(0,1)
        level.setAlive(2,1)
        const nextStep = level.tick()
        expect(nextStep.cells[1][1]).to.equal(true)
    })

    it("Alive cell with three neighbours is alive next round", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        level.setAlive(0,1)
        level.setAlive(1,0)
        level.setAlive(2,1)
        const nextStep = level.tick()
        expect(nextStep.cells[1][1]).to.equal(true)
    })

    it("Alive cell with four neighbours is not alive next round", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        level.setAlive(0,1)
        level.setAlive(1,0)
        level.setAlive(2,1)
        level.setAlive(2,2)
        const nextStep = level.tick()
        expect(nextStep.cells[1][1]).to.equal(false)
    })

    it("Alive cell with five neighbours is not alive next round", () => {
        const level = new Level(3,3)
        level.setAlive(1,1)
        level.setAlive(0,1)
        level.setAlive(1,0)
        level.setAlive(2,1)
        level.setAlive(2,2)
        level.setAlive(1,2)
        const nextStep = level.tick()
        expect(nextStep.cells[1][1]).to.equal(false)
    })

    it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction", () => {
        const level = new Level(3,3)
        level.setAlive(0,1)
        level.setAlive(2,1)
        level.setAlive(1,0)
        const nextStep = level.tick()
        expect(nextStep.cells[1][1]).to.equal(true)
    })

})