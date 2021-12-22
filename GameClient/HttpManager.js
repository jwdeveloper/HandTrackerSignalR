class HttpManager
{
 
    constructor()
    {
          this.url = "";
    }

    
    httpGetAsync(url, callback) {
        url = this.url + url;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }
}