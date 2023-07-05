# WatchTime
A simple web-based platform for posting and watching videos.

Thanks for checking out this project!

Essential commands:
cd expresstests
move to correct directory

npm start
runs development server

node server.js
runs server used for video processing

Steps to create databases:
MAMP: 
Download MAMP from https://www.mamp.info/en/downloads/

then:

Create using phpmyadmin:
1 - add new database named watchtime

2 - add new table named users with this layout:
id - bigint(20) - AUTO_INCREMENT
username - varchar(255) 
passwordsalt - varchar(255)
uid - varchar(255)
avatarfilename - varchar(255)

3 - add new table named videos with this layout:
id - bigint(20) - AUTO_INCREMENT
url - varchar(255) 
name- varchar(255)
description - varchar(5000)
uid - varchar(255)
dateposted - varchar(255)

4 - add new table named comments with this layout:
id - bigint(20) - AUTO_INCREMENT
text - varchar(5000) 
user - varchar(255)
videoid - bigint(11)
dateposted - varchar(255)
replytargetid - bigint(20)

Create using mysql: 
1 - CREATE DATABASE [IF NOT EXISTS] watchtime 
[CHARACTER SET utf8mb3]
[COLLATE utf8mb3_general_ci]

2 - create table users(
   id BIGINT(20) NOT NULL AUTO_INCREMENT,
   username VARCHAR(255)  NOT NULL,
   passwordsalt VARCHAR(255) NOT NULL ,
   uid VARCHAR(255) NOT NULL,
   avatarfilename VARCHAR(255) NOT NULL
);

3 - create table videos(
   id BIGINT(20) NOT NULL AUTO_INCREMENT,
   url VARCHAR(255)  NOT NULL,
   name VARCHAR(255) NOT NULL ,
   description VARCHAR(5000) NOT NULL,
   uid VARCHAR(255) NOT NULL,
   dateposted VARCHAR(255) NOT NULL
);

4 - create table comments(
   id BIGINT(20) NOT NULL AUTO_INCREMENT,
   text VARCHAR(5000)  NOT NULL,
   user VARCHAR(255) NOT NULL ,
   videoid BIGINT(11) NOT NULL,
   dateposted VARCHAR(255) NOT NULL,
   replytargetid BIGINT(20) NOT NULL
);

How to set your password for your phpmyadmin account:
1 - Click the user accounts tab
2 - Click the change password button

Start the database api:
xmysql -h yourhost -u yourusername -p yourpassword -d watchtime
