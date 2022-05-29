export class RLEWriter {
    level;
    constructor(level) {
        this.level = level
    }

    toString() {
        let buf = `x = ${this.level.width}, y = ${this.level.height}\n`
        const rleLines = []
        for (let i = 0; i < this.level.cells.length; i++) {
            const rleLine = this.lineToRLE(this.level.cells[i])
            if (rleLine.length > 0) rleLines.push(rleLine)
        }
        return buf + rleLines.join('$') + '!'
    }

    lineToRLE(line) {
        let buf = ""
        let current = line[0]
        let currentCount = 1
        for (let i = 1; i < line.length; i++) {
            const next = line[i]
            if (current === next) currentCount++
            else {
                if (currentCount > 1) buf = buf.concat(currentCount.toString())
                buf = buf.concat(current ? 'o' : 'b')
                current = next
                currentCount = 1
            }
        }
        if (current) {
            if (currentCount > 1) buf = buf.concat(currentCount.toString())
            buf = buf.concat(current ? 'o' : 'b')
        }
        return buf
    }

}