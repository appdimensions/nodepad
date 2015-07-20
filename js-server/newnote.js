/*
 * @preserve Nodepad: Copyright Lukas Rossi 2015.
*/
function start(req, res, POST){
    var connection = require("./db").connection();
    connection.connect(function(err){
        if(err){
            res.end("error");
        }else{
            var newNoteMsg = "This is a new note. You should start writing!";
            connection.query("INSERT INTO notes (content, date) VALUES ('" + newNoteMsg + "', NOW())", function(err, result){
                if(err){
                    res.end("error");
                }else{
                    res.end(String(result.insertId));
                }
            });
        }
    });
}

exports.start = start;