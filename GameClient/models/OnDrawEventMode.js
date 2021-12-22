class OnDrawEventModel {
    constructor(data) {
        this.userId = -1;
        this.isHandVisible = data.isHandVisible;
        this.lineColor = data.lineColor;
        this.indexLoc = data.indexLoc;
        this.brushSize = data.brushSize;
        this.line = 
        {
            lastPoint: data.line.lastPoint,
            currentPoint: data.line.currentPoint
        }
    }
}