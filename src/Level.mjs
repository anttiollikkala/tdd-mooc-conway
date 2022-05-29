export class Level {
    width;
    height;
    cells;

    constructor(width, height) {
        this.width = width
        this.height = height
        this.cells = [...Array(height)].map(() => Array(width).fill(false))
    }

    toString() {
        return this.cells.map(row => row.map(col => col ? 'X' : '.').join('')).join('\n') + '\n'
    }

    setAlive(x, y) {
        this.cells[y][x] = true
    }

    countAlive() {
        let count = 0
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.cells[y][x]) count++
            }
        }
        return count
    }

    tick() {
        const newLevel = new Level(this.width, this.height)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.cells[y][x]) {
                    if (this.aliveNeighbours(this, x, y) === 2) newLevel.setAlive(x,y)
                    if (this.aliveNeighbours(this, x, y) === 3) newLevel.setAlive(x,y)
                } else {
                    if (this.aliveNeighbours(this, x, y) === 3) newLevel.setAlive(x,y)
                }

            }
        }
        return newLevel
    }

    aliveNeighbours(level, x, y) {
        let result = 0
        for (let yy = -1; yy <= 1; yy++) {
            for (let xx = -1; xx <= 1; xx++) {
                if (yy === 0 && xx === 0) continue
                if (y + yy < 0) continue
                if (y + yy > level.height - 1) continue
                if (level.cells[y + yy][x + xx]) result++
            }
        }
        return result
    }

}