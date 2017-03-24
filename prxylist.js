/**
 * Created by Ashar on 06.03.2017.
 */
(function () {
    "use strick";
    let http = require("http");
    let request = require("request");
    let async = require("async");
    let HttpsProxyAgent = require('https-proxy-agent');
    let prxy = [];
    const URLPX = "http://awmproxy.com/socks_proxy.txt?country=1";

    class PrxLst {
        constructor(URPLX, updateTime) {
            //console.log(this.pushedPrxy());
            //setInterval(this.pushedPrxy, updateTime);

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

                    let ourQueue = async.queue(function (task, callback) {
                        //та самая конкурентная очередь
                        //В таск пойдет прокси запрос
                        //В колбэк пойдет запись прокси жив = тру
                    }, 20);
                    //тут будет находится пуш, который будет подгружать в фунцию наши
                    //поля объекта масива
                        let agent = new HttpsProxyAgent({
                            proxyHost: prxy[1],
                            proxyPort: prxy[2]
                        });
                        let test1 = http.request({
                            host: 'rozklad.kpi.ua', //Сюда впихнуть адекватный урл
                            port: 80,
                            method: 'GET',
                            agent: agent
                        });
                        if (test1 == true) {
                            console.log(prxy[1] + ":" + prxy[2]);
                        }


                   // console.log(prxy[1] + ":" + prxy[2]);
                }
            });
        }

    }

    example = new PrxLst(URLPX, 10000);
    example.pushedPrxy();

    module.exports = PrxLst;
})();
