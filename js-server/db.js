/*
 *  @preserve Nodepad: Copyright Lukas Rossi 2015.
 *
 *  For security reasons, this file must not be accessible by the client.
 *  In this example, the server does not permit access to this file since
 *  access to files within the "js-server" folder is denied.
 */
module.exports.connection = function connection(){
    return require("mysql").createConnection({
        host: 'localhost',
        user: 'username',
        password: 'password',
        database: 'dbname'
    });
};
