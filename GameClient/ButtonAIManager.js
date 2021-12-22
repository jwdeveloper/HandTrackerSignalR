class ButtonAIManager {
    constructor() {
        this.buttons = [];
    }

    addButton(x, y, w, h, text, onClick) {
        const button = new ButtonAI();
        button.x = x;
        button.y = y;
        button.w = w;
        button.h = h;
        button.text = text;
        button.onClick = onClick;
        this.buttons.push(button);
        return button;
    }

    drawButtons(canvas) {
        for (const button of this.buttons) {
            button.draw(canvas);
        }
    }

    removeButton(removeButton) {
        const id = this.buttons.indexOf(removeButton);
        this.buttons.splice(id, 1);
    }

    checkClick(x, y) {
        for (const btn of this.buttons) {
            if (btn.isClicked(x, y)) {
                btn.doClick();
            }
        }
    }

    doMouseOver(x, y) {
        for (const btn of this.buttons) {
            btn.doMouseOver(x, y)
        }
    }

}