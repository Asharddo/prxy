/**
 * Created by NodeArt on 2/25/2017.
 */
"use strict";
let http = require("http");
let server = require("./handler.js");
server = new server(process.env.port);