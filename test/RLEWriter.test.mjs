import {expect} from "chai";
import {Level} from "../src/Level.mjs";
import {RLEWriter} from "../src/RLEWriter.mjs";

describe("RLEWriter", () => {
    it("prints 3x3 glider level correctly", () => {
        const level = new Level(3,3)
        level.setAlive(1,0)
        level.setAlive(2,1)
        level.setAlive(0,2)
        level.setAlive(1,2)
        level.setAlive(2,2)
        const writer = new RLEWriter(level)
        expect(writer.toString()).to.equal('x = 3, y = 3\nbo$2bo$3o!')
    })

    it("prints 8x8 glider level correctly", () => {
        const level = new Level(8,8)
        level.setAlive(1,0)
        level.setAlive(2,1)
        level.setAlive(0,2)
        level.setAlive(1,2)
        level.setAlive(2,2)
        const writer = new RLEWriter(level)
        expect(writer.toString()).to.equal('x = 8, y = 8\nbo$2bo$3o!')
    })
})