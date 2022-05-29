import fs from 'fs'
import {RLEParser} from "./RLEParser.mjs";
import {RLEWriter} from "./RLEWriter.mjs";

const [,,filename, rounds] = process.argv

try {
    const data = fs.readFileSync(filename)
    const parsed = new RLEParser(data.toString())
    let level = parsed.getLevel()
    const intRounds = parseInt(rounds)
    for (let i = 0; i < intRounds; i++) level = level.tick()
    const writer = new RLEWriter(level)
    console.log(writer.toString())
} catch (e) {
    console.log(e)
}
