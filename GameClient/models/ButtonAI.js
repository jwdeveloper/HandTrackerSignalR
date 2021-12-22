class ButtonAI {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.color = "red";
        this.defultColor = "red";
        this.onClickColor = "green";
        this.onOverColor = "yellow";
        this.text = "";
        this.model;
        this.isMouseOver = false;
        this.onDraw = function (a, b) { };
        this.onClick = function (a) { };
        this.onMouseOver = function (a) { };
        this.fill = false;
        this.isClick = false;
    }

    draw(canvasCtx) {

        if (this.onDraw != null)
            this.onDraw(this, canvas);

        canvasCtx.beginPath();
        canvasCtx.fillStyle = this.color;
        canvasCtx.font = "30px Arial";
        canvasCtx.lineWidth = "2";
        canvasCtx.strokeStyle = this.color;
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        canvasCtx.stroke();
        canvasCtx.fillStyle = 'white';
        canvasCtx.textAlign = 'center';
        if (this.text.length != 0)
            canvasCtx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 1.7);
        canvasCtx.restore();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    doMouseOver(x, y, canvas) {
        if (!this.isClicked(x, y))
            return;
        if (this.onMouseOver == null)
            return;

        this.color = this.onOverColor;
        this.onMouseOver(canvas);
    }

    doClick(args) {
        if (this.onClick == null)
            return;
        if (this.isClick == true)
            return;
        this.isClick = true;
        this.color = this.onClickColor;
        this.onClick.apply(this, args);
        setInterval(() => {
            this.color = this.defultColor;
        }, 500)
    }

    isClicked(x, y) {

        var res = true;
        if (x == null || y == null)
            res = false;
        if (x < this.x || x > this.x + this.w)
            res = false;
        if (y < this.y || y > this.y + this.h)
            res = false;

        if (!res) {
            this.isClick = false;
        }

        return res;
    }
}