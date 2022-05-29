import {expect} from "chai";
import {RLEParser} from "../src/RLEParser.mjs";

describe("RLEParser", () => {

    it("Parses width correctly", () => {
        const rle = 'x = 4, y = 3\nbo$2bo$3o!'
        const parser = new RLEParser(rle)
        expect(parser.width).to.equal(4)
    })

    it("Parses height correctly", () => {
        const rle = 'x = 4, y = 3\nbo$2bo$3o!'
        const parser = new RLEParser(rle)
        expect(parser.height).to.equal(3)
    })

    it("Parses glider correctly", () => {
        const rle = 'x = 3, y = 3\nbo$2bo$3o!'
        const parser = new RLEParser(rle)
        expect(parser.getLevel().toString()).to.equal('.X.\n..X\nXXX\n')
    })

    it("Parses glider correctly with 8x8 level", () => {
        const rle = 'x = 8, y = 8\nbo$2bo$3o!'
        const parser = new RLEParser(rle)
        expect(parser.getLevel().toString()).to.equal('.X......\n..X.....\nXXX.....\n........\n........\n........\n........\n........\n')
    })

    it("Parses glider with line comments correctly", () => {
        const rle = "#C 'Twas brillig and the slithy toves\nx = 3, y = 3\nbo$2bo$3o!"
        const parser = new RLEParser(rle)
        expect(parser.getLevel().toString()).to.equal('.X.\n..X\nXXX\n')
    })

})