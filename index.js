/**
 * Created by NodeArt on 2/25/2017.
 */
"use strict";
let http = require("http");
let server = require("./handler.js");
let prxyList = require("./prxylist.js");
const URLPX = "http://awmproxy.com/socks_proxy.txt?country=1";

server = new server(process.env.port);