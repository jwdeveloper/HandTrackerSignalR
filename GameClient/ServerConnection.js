class ServerConnection {
    constructor() {
        this.url = settings.serverUrl;
        this.onDrawEvent = (event) => { };
        this.onClearEvent = (event) => { };
        this.onConnectEvent = (event) => { };
        this.onDisconnectEvent = (event) => { };
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.url + "/lobby")
            .build();
        this.connection.onclose(async () => {
            console.log("Disconnected");
            this.onDisconnectEvent(null);
        });

        this.connection.on("OnDrawEvent", (data) => {
            try {
                console.log('data receieved')
                var object = JSON.parse(data);
                var model = new OnDrawEventModel(object);
                this.onDrawEvent(model);
            }
            catch (err) {
                console.error(err);
            }
        });

        this.connection.on("OnClearEvent", () => {
            try {

                this.onClearEvent(null);
            }
            catch (err) {
                console.error(err);
            }
        });
    }

    async sendDrawData(data) {
        if (!this.isConnected())
            return;

        try {
            var model = new OnDrawEventModel(data);
            var json = JSON.stringify(model);
            await this.connection.invoke("OnDraw", json);
        } catch (err) {
            console.error(err);
        }
    }

    async sendClear() {

        if (!this.isConnected())
            return;
        new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    await this.connection.invoke("OnClear");
                } catch (err) {
                    console.error(err);
                }
            }, 1);
        });
    }

    async start() {
        new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    if (this.isConnected()) {
                        console.log("Already connected");
                        return;
                    }
                    await this.connection.start();
                    this.onConnectEvent(null);
                    console.log("SignalR Connected");
                } catch (err) {
                    console.log(err);
                    setTimeout(() => { console.log("Trying to reconnect..."); this.start() }, 5000);
                }
            }, 1);
        });
    }
    isConnected() {
        return this.connection.state === signalR.HubConnectionState.Connected;
    }
}

