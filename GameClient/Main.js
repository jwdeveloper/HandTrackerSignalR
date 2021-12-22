const handsTracker = new HandsTracker();
const buttonManager = new ButtonAIManager();
const serverConnection = new ServerConnection();
const canvas = document.getElementsByClassName('graphic_canvas')[0];
const ctx = canvas.getContext('2d');
const menuCanvas = document.getElementsByClassName('menu_canvas')[0];
const menuCtx = menuCanvas.getContext('2d');



serverConnection.onDrawEvent = (event) => {
    console.log(event);
    draw(event);
}

serverConnection.onClearEvent = (event)=>
{
    clear();
};

handsTracker.onHand = (event) => {
    handModel.isHandVisible = true;
    handModel.isDrag = HandsUtility.isDrag(event);
    handModel.isClick = HandsUtility.isClick(event);
    handModel.loc = HandsUtility.getFingerLocation(event, canvas);
    handModel.indexLoc = HandsUtility.getIndexFingerLocation(event, canvas);
}

function gameloop() {
    buttonManager.checkClick(handModel.indexLoc.x, handModel.indexLoc.y);
    buttonManager.drawButtons(menuCtx);
    if (!handModel.isHandVisible) {
        return;
    }
    var line = handModel.line;
    if (!handModel.isDrag) {

        line.lastPoint = null;
        line.currentPoint = null;
        return;
    }

    line.lastPoint = line.currentPoint;
    line.currentPoint = handModel.loc;
    draw(handModel);
    handModel.isHandVisible = false;

    serverConnection.sendDrawData(handModel);
}

function draw(data) {

   
    if (data.line == null || data.line.lastPoint == null || data.line.currentPoint == null)
        return;
    var p1 = data.line.lastPoint;
    var p2 = data.line.currentPoint;
    if (data.lineColor == "transparent") {
        var size = data.brushSize * 10;
        var x1 = p1.x - 35;
        var y1 = p1.y;
        var x2 = size;
        var y2 = size;
        ctx.clearRect(x1, y1, x2, y2);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y + 70);
    ctx.lineTo(p2.x, p2.y + 70);
    ctx.lineWidth = data.brushSize;
    ctx.strokeStyle = data.lineColor;
    ctx.stroke();
}

function clear()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createButtons() {

    const joinButton = buttonManager.addButton(20, 20, 200, 100, "Join to party", () => {
         serverConnection.start();
    });

    joinButton.onDraw = (a, b) => {
        if(!serverConnection.isConnected())
        {
            a.text = "Join to party";
            a.color = "red";
            a.defultColor = "red";
        }
        else
        {
            a.text = "Connected";
            a.color = "green";
            a.defultColor = "green";
        }
    }

    buttonManager.addButton(250, 20, 200, 100, "Clear", () => {
        clear();
        if(!serverConnection.isConnected())
        return;
        serverConnection.sendClear();
    });

    const colors = ["green", "white", "red", "black", "yellow", "blue", "pink", "orange", "brown"]
    for (var i = 0; i < colors.length; i++) {
        const color = colors[i];
        var btn = buttonManager.addButton(600 + 100 * i, 20, 70, 70, "", () => {
            handModel.lineColor = color;
        });
        btn.color = colors[i];
        btn.defultColor = colors[i];
        btn.onClickColor = "white";
        btn.onOverColor = colors[i];
    }

    buttonManager.addButton(480, 20, 100, 70, "Rubber", () => {
        handModel.lineColor = "transparent";
    });

    var sizeDisplay = buttonManager.addButton(1600, 20, 170, 80, "Size: 3");
    sizeDisplay.onDraw = (a, b) => {
        a.text = "Size: " + handModel.brushSize;
    }

    sizeDisplay.color = "red";
    sizeDisplay.defultColor = sizeDisplay.color;
    sizeDisplay.onClickColor = sizeDisplay.color;
    sizeDisplay.onOverColor = sizeDisplay.color;


    buttonManager.addButton(1600, 120, 50, 50, "+", () => {
        handModel.brushSize += 1;
        if (handModel.brushSize >= handModel.maxBrush) {
            handModel.brushSize = handModel.maxBrush;
        }
    });

    buttonManager.addButton(1720, 120, 50, 50, "-", () => {
        handModel.brushSize -= 1;
        if (handModel.brushSize <= handModel.minBrush) {
            handModel.brushSize = handModel.minBrush;
        }
    });


}
handsTracker.start();
createButtons();
setInterval(gameloop, 1)

