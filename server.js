/*
 * @preserve Nodepad: Copyright Lukas Rossi 2015.
 * 
 * 1. Update the IP address and port below
 * 2. Set the MySQL credentials in js-server/db.js
 */
var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var mime = require("mime");

http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname.substr(1);
    console.log(path);
    // Load specific server-side Javascript files //
    if(path === ""){
        res.writeHead(200, {"Content-Type": "text/html"});
        var page = require("./js-server/index");
        page.start(req, res);
    }else if(path == "update" || path == "delete" || path == "newnote"){
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
                if (body.length > 1e6) {//Prevent a brute-force attack
                    body = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });
            req.on('end', function () {     
                var POST = querystring.parse(body);
                res.writeHead(200, {"Content-Type": "text/html"});
                var page = require("./js-server/" + path);
                page.start(req, res, POST);
            });
        }
    }else if(path != "server.js" && path.indexOf("js-server") === -1 && path.substr(0, 1) !== '.'){//Load static files (don't serve server JS files or hidden files)
        fs.readFile(path, "utf-8", function(err, data) {
            if(!err){
                //display static html page
                res.writeHead(200, {"Content-Type": mime.lookup(path)});
                res.end(data);
            }else if(err.errno == 34){
                //file not found
                fs.readFile("html/404.html", "utf-8", function(err, data) {
                    if(!err){
                        //write error page
                        res.writeHead(404, {"Content-Type": "text/html"});
                        res.end(data);
                    }else{
                        //if error page can't load
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        res.end("500 Internal Server Error.");
                    }
                });
            }else{
                //error loading file
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.end("500 Internal Server Error");
            }
        });
    }else{
        //no read access to server javascript files or hidden files
        res.writeHead(403, {"Content-Type": "text/plain"});
        res.end("403 Access denied.");
    }
}).listen(process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", process.env.OPENSHIFT_NODEJS_PORT || 8080);