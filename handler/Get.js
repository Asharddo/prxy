/**
 * Created by NodeArt on 2/25/2017.
 */
(function() {
    "use strict";
    const route = "/gets";

    function Geters(res){
        res.writeHead(200);
        res.write('<body>Get list</body>');
    }

    module.exports = {route:route, handler: Geters};

})();