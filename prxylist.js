/**
 * Created by Ashar on 06.03.2017.
 */
(function () {
    "use strick";
    let https = require("https");
    let request = require("request");
    let async = require("async");
    let HttpsProxyAgent = require('https-proxy-agent');
    let prxy = [];
    const URLPX = "http://awmproxy.com/socks_proxy.txt?country=1";

    class PrxLst {
        constructor(URLPX, updateTime) {
            //console.log(this.pushedPrxy());
           // setInterval(this.pushedPrxy, updateTime);

        }

        pushedPrxy() {
            request(URLPX, function (err, res, body) {
                if (err) throw err;
                let regex = /(\d*.\d*.\d*.\d*):(\d*);([A-Z]{2}$)/gm;
                let str = regex.exec(body);

                while ((str = regex.exec(body)) !== null) {
                    if (str.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    prxy = str;

                    let ourQueue = async.queue(function (task, callback)  {
                        let ergoPrxy = {
                            hostname: 'google.com',
                            port: 443,
                            path: '/',
                            method: 'GET'
                        };
                        let req = https.request(ergoPrxy, (res) => {
                            console.log('statusCode:', res.statusCode);

                            res.on('data', (d) => {
                                console.log(task.host, ":", task.port );
                            });

                        });
                        req.on('error', (e) => {
                            //console.error(task.host, ":", task.port );
                        });
                        req.end();

                    }, 5);
                    ourQueue.push({host: prxy[1], port: prxy[2]});
                   // console.log(prxy[1] + ":" + prxy[2]);
                }
            });
        }

    }

    example = new PrxLst(URLPX, 10000);
    example.pushedPrxy();

    module.exports = PrxLst;
})();
