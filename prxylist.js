/**
 * Created by Ashar on 06.03.2017.
 */
(function () {
    "use strick";
    const URLPX = "http://awmproxy.com/socks_proxy.txt?country=1";
    let http = require("http");
    let needle = require("needle");

    class Prxlst {
       refreshPrx (){
            //location.reload(); ??

        }
        setPrx(){
           needle.get(URLPX, function (err, res, body) {
               if (err) throw err;
               //const someRegExp = /\d*.\d*.\d*.\d*:\d*;/g;
               let ipArr = body.split(';');
               console.log(ipArr);
               console.log(ipArr.length + 1);
           });
        }
    }
    let prxyexmpl = new Prxlst();
    prxyexmpl.setPrx();
})();
