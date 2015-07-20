/*
 * @preserve Nodepad: Copyright Lukas Rossi 2015.
*/
var mu = require("mu2");

function start(req, res){

    var connection = require("./db").connection();
    
    connection.connect(function(err){
        var all = [];
        if(err){
            all[0] = {entryID: 0, value: "Great, an error occurred! (Can't connect to database)", date: "Right now:"};
            mu.compileAndRender('html/index.html', {results: all}).on('data', function (data) {
                res.write(data);
            }).on('end', function(){
                res.end();
            });
        }else{
            connection.query("SELECT id, content, DATE_FORMAT(date, '%l:%i%p (%b. %e)') AS date FROM notes ORDER BY id DESC", function(err, result){
                if(err){
                    all[0] = {entryID: 0, value: "Great, an error occurred!", date: "Right now:"};
                }else if(result.length === 0){
                    all[0] = {entryID: 0, value: "It's time to create a new note!", date: "Right now:"};
                }else{
                    for(var i=0; i<result.length; i++){
                        all[i] = {entryID: result[i].id, value: result[i].content, date: result[i].date};
                    }
                }
                mu.compileAndRender('html/index.html', {results: all}).on('data', function (data) {
                   res.write(data);
                }).on('end', function(){
                    res.end();
                });
            });
        }
    });
}

exports.start = start;