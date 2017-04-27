/**
 * Created by Ashar on 06.03.2017.
 */
(function () {
    "use strick";
    let https = require("https");
    let request = require("request");
    let async = require("async");
    //let prxy = [];
    const URLPX = "http://awmproxy.com/socks_proxy.txt?country=1";

    class PrxLst {
        constructor(URLPX, updateTime) {
            //console.log(this.pushedPrxy());
            setInterval(this.pushedPrxy, updateTime);
        }

        pushedPrxy() {
            request(URLPX, function (err, res, body) {
                if (err) throw err;
                let regex = /(\d*.\d*.\d*.\d*):(\d*);([A-Z]{2}$)/gm;
                let str = regex.exec(body);

                let ourQueue = async.queue(function (task, callback)  {
                    let ergoPrxy = {
                        hostname: 'google.com',
                        port: 443,
                        path: '/',
                        method: 'GET'
                    };
                    let req = https.request(ergoPrxy, (res) => {
                       // console.log('statusCode:', res.statusCode,"||", str[1], ":", str[2]);
                    });
                    req.end();
                    //
                    // let prxy = $.map(str, function(value, index) {
                    //     return [value];
                    // });
                    // console.log(prxy);

                }, 20);
                str.forEach(() => {
                    if (regex.exec(body) !== null) {
                        ourQueue.push({host: str[1], port: str[2]});
                    }
                });
            });
        }
    }
//
    example = new PrxLst(URLPX, 20000);
    example.pushedPrxy();

    module.exports = PrxLst;
})();
