import {Level} from "./Level.mjs";

export class RLEParser {
    rle
    width
    height
    rule
    body
    constructor(rle) {
        const lines = rle.split('\n')
        const stripped = this.stripComments(lines)
        const [firstLine, ...rest] = stripped
        this.body = rest.join('')
        const firstLineParts = firstLine.split(',').map(part => part.trim())
        const firstLineComponents = firstLineParts.map(part => part.split("=").map(component => component.trim()))
        firstLineComponents.forEach( ([identifier, value]) => {
            switch (identifier) {
                case 'x':
                    this.width = parseInt(value)
                    break
                case 'y':
                    this.height = parseInt(value)
                    break
                case 'rule':
                    this.rule = value
            }
        })
    }

    getLevel() {
        const level = new Level(this.width, this.height)
        const lines = this.body.split('$')
        level.cells = lines.map( line => this.parseLine(line) )
        for (let i = level.cells.length; i < this.height; i++) {
            level.cells.push(new Array(this.width).fill(false))
        }
        return level
    }

    parseLine(lineStr) {
        const line = new Array(this.width).fill(false)
        const lineParts = this.splitLine(lineStr)
        let pos = 0
        lineParts.forEach(({count, alive}) => {
            for (let i = pos; i < count+pos; i++)  {
                line[i] = alive
            }
            pos += count
        })
        return line
    }

    stripComments(lines) {
        return lines.filter(line => line[0] !== '#')
    }

    splitLine(lineStr) {
        const result = []
        let buf = ""
        for (let i = 0; i < lineStr.length; i++) {
            const nextChar = lineStr[i]
            if (nextChar === '!') continue
            const intVal = parseInt(nextChar)
            if (!isNaN(intVal)) {
                buf = buf + nextChar
            } else {
                const bufInt = parseInt(buf)
                result.push({count: !isNaN(bufInt) ? bufInt : 1, alive: nextChar === 'o'})
                buf = ""
            }
        }
        return result
    }

}