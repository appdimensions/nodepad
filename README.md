# Nodepad

A simple notepad that automatically saves every change, written from scratch with Node.js and MySQL

No framework! Written from scratch.

## Live Demo

Coming Soon!

## Installation

1. Update the IP address and port in `server.js`
2. Create the MySQL table:

`CREATE TABLE `notes` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;`

3. Set the MySQL credentials in `js-server/db.js`
4. Run `server.js`