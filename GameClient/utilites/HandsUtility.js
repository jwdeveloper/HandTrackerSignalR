class HandsUtility {
    static getFreeHand(event) {
        if (event.isLeftHand) {
            return event.leftHand;
        }
        if (event.isRightHand) {
            return event.rightHand;
        }
        return null;
    }

    static getFingersDistance(f1, f2) {
        return Math.sqrt(Math.pow((f1.x - f2.x), 2) + Math.pow((f1.y - f2.y), 2));
    }

    static isClick(event) {
        var handData = HandsUtility.getFreeHand(event);
        var distance = HandsUtility.getFingersDistance(handData[7], handData[8]);
        var minDistance = 0.045;
        return distance < minDistance;
    }

    static isDrag(event) {
        var handData = HandsUtility.getFreeHand(event);
        var distance = HandsUtility.getFingersDistance(handData[8], handData[4]);
        var minDistance = 0.055;
        return distance < minDistance;
    }

    static getIndexFingerLocation(event,canvas) {
        var handData = HandsUtility.getFreeHand(event);
        var res =
        {
            x:(1-handData[8].x)*canvas.width,
            y:(handData[8].y)*canvas.height,
        };
        return res;
    }

    static getFingerLocation(event,canvas) {
        var handData = HandsUtility.getFreeHand(event);
        var res =
        {

            x:(1-handData[4].x)*canvas.width,
            y:(handData[4].y)*canvas.height,
        };
        return res;
    }
}