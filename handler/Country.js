/**
 * Created by NodeArt on 2/25/2017.
 */
(function () {
    "use strict";
    const route = "/countries";
    let url = require("url");

    function Countries(res) {
        res.writeHead(200);
        res.write('<body>Countries proxy list</body>');
    }

    module.exports = {route: route, handler: Countries};
}) ();