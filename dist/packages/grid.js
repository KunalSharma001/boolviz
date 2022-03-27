import Coord from './coord.js';
export default class Grid {
    constructor({ ctx, mouse, boxSize = 75 }) {
        this.ctx = ctx;
        this.mouse = mouse;
        this.boxSize = boxSize;
    }
    getCurrentBox() {
        const { boxSize, mouse: { coord } } = this;
        return new Coord(Math.floor(coord.x / boxSize), Math.floor(coord.y / boxSize));
    }
    absBoxCoord(c) {
        const n = c.clone();
        n.mutScale(this.boxSize);
        n.mutAdd(this.boxSize / 2, this.boxSize / 2);
        return n;
    }
    drawUnderCurrentBox(drawer) {
        const cur = this.absBoxCoord(this.getCurrentBox());
        this.ctx.save();
        drawer(this.ctx, cur);
        this.ctx.restore();
    }
    drawGrid(size) {
        const { ctx } = this;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.setLineDash([5, 5]);
        this._drawGridX(size);
        this._drawGridY(size);
        ctx.closePath();
        ctx.restore();
    }
    _drawGridX(size) {
        const { ctx } = this;
        const xlen = ctx.canvas.width;
        const y = ctx.canvas.height;
        const count = Math.floor(xlen / size);
        for (let i = 1; i <= count; i++) {
            const x = i * size;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    _drawGridY(size) {
        const { ctx } = this;
        const ylen = ctx.canvas.height;
        const x = ctx.canvas.width;
        const count = Math.floor(ylen / size);
        for (let i = 1; i <= count; i++) {
            const y = i * size;
            ctx.moveTo(0, y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}