/**
 * Created by NodeArt on 2/25/2017.
 */
(function () {
    "use strict";
    const handlersDir = "./handler/";
    let {createServer} = require("http");
    let url = require("url");
    let fs = require("fs");
    let handlers = {};
    fs.readdir(handlersDir, (err, filesList) => {
        filesList.forEach(function (fileName) {
            let t = require(handlersDir + fileName);
            handlers[t.route] = t.handler;
            console.log(t);

        });
    });
    function Crtnlnt(port = 8080) {
        this.server = createServer(this.handler);
        this.server.listen(port);
        console.log(`Server is listening on port ${port}`);
    }

    Crtnlnt.prototype.handler = function (req, res) {
        console.log(req, res);
        console.log("handlers",handlers);
        if (handlers[req.url]) {
            res.writeHead(200);
        }
        else {
            res.writeHead(404)
        }
        res.end();
    };

    module.exports = Crtnlnt;
})();