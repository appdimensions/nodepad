# Nodepad

A simple notepad that automatically saves every change, written from scratch with Node.js and MySQL.

No framework! Written from scratch.

## Live Demo

Coming Soon!

## Installation

1. Update the IP address and port in `server.js`
2. Create the MySQL table (see below)
3. Set the MySQL credentials in `js-server/db.js`
4. Run `server.js`

## MySQL Table structure

```mysql
CREATE TABLE notes (
id tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
content varchar(2000) NOT NULL,
date datetime NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

## Questions? Comments?

For questions or comments, send me an email: hello [AT] appdimensions.com