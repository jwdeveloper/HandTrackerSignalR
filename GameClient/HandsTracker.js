
class HandsTracker {
    constructor() {
        this.onLeftHand = function (a) { };
        this.onRightHand = function (a) { };
        this.onHand = function (a) { };
        this.handsfree = new Handsfree({
            hands: {
                enabled: true,
                // The maximum number of hands to detect [0 - 4]
                maxNumHands: 2,

                // Minimum confidence [0 - 1] for a hand to be considered detected
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.7
            },
            showDebug: true
        });
        this.handsfree.use('hand-api', ({ hands }) => {
            if (!hands.multiHandLandmarks) {
                return;
            }

            var leftContent;
            var rightContent;

            if (hands.landmarksVisible[0]) {
                leftContent = hands.multiHandLandmarks[0];
                this.onLeftHand(leftContent);
            }

            if (hands.landmarksVisible[1]) {
                rightContent = hands.multiHandLandmarks[0];
                this.onRightHand(rightContent);
            }


            if (hands.landmarksVisible[0] && hands.landmarksVisible[1]) {
                leftContent = hands.multiHandLandmarks[0];
                rightContent = hands.multiHandLandmarks[1];
            }

            var event =
            {
                isRightHand: hands.landmarksVisible[1],
                isLeftHand: hands.landmarksVisible[0],
                rightHand: rightContent,
                leftHand: leftContent,
                Hands:  hands.multiHandLandmarks
            };
            this.onHand(event);
        });
    }

    start() 
    {
        this.handsfree.start();
    }

    stop() {
        this.handsfree.disablePlugins()
    }
}



