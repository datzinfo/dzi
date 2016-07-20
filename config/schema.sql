SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS dziws_db CHARACTER SET = 'utf8';

USE dziws_db;

CREATE TABLE users
(
   `userId`     int(10) UNSIGNED AUTO_INCREMENT,
   username     varchar(100),
   password		varchar(50),
   email        varchar(50),
   `joinedOn`   datetime DEFAULT CURRENT_TIMESTAMP,
   active       tinyint(1) DEFAULT 1,
   PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 ;

CREATE TABLE categories
{
   type     varchar(20),
   desc		varchar(100),
}

CREATE TABLE blogs
(
    `blogId`     int(10) UNSIGNED AUTO_INCREMENT,
    title        varchar(100),
    type     	 varchar(20),
    `createdOn`  datetime DEFAULT CURRENT_TIMESTAMP,
    `userId`     int(10) UNSIGNED,
    state        ENUM('draft','published','deleted') DEFAULT 'draft',
	PRIMARY KEY (`blogId`)
) ENGINE=InnoDB AUTO_INCREMENT=2001 ;

CREATE TABLE blogdetails
(
   `detailId`   int(10) UNSIGNED AUTO_INCREMENT,
   content       text,
   `blogId`      int(10) UNSIGNED,
	PRIMARY KEY (`detailId`)
) ENGINE=InnoDB AUTO_INCREMENT=2001 ;

CREATE TABLE blogcomments
(
   `commentId`   int(10) UNSIGNED AUTO_INCREMENT,
   `blogId`      int(10) UNSIGNED,
   `userId`      int(10) UNSIGNED,
   `createdOn`  datetime DEFAULT CURRENT_TIMESTAMP,
   comment       text,
   deleted       tinyint(1),
	PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=3001 ;

ALTER TABLE blogs
   ADD CONSTRAINT `fk_blogs_1` FOREIGN KEY(`userid`)
       REFERENCES users(`userid`);

ALTER TABLE blogdetails
   ADD CONSTRAINT fk_blogdetails_1 FOREIGN KEY(`blogid`)
       REFERENCES blogs(`blogid`);

ALTER TABLE blogcomments
   ADD CONSTRAINT `fk_comments_1` FOREIGN KEY(`blogid`)
       REFERENCES blogs(`blogid`);
	   
ALTER TABLE blogcomments
   ADD CONSTRAINT `fk_comments_2` FOREIGN KEY(`userid`)
       REFERENCES users(`userid`);