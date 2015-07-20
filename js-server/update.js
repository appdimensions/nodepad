/*
 * @preserve Nodepad: Copyright Lukas Rossi 2015.
*/
function start(req, res, POST){
    var connection = require("./db").connection();
    connection.connect(function(err){
        if(err){
            res.end("error");
        }else{
            connection.query("UPDATE notes SET content = ?, date = NOW() WHERE id = ?", [String(POST.content), parseInt(POST.id)], function(err, result){
                if(err){
                    res.end("error");
                }else{
                    res.end("good");
                }
            });
        }
    });
}

exports.start = start;