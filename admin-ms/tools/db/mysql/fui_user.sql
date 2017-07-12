create database `fui` default character set utf8 collate utf8_general_ci;
grant all privileges on fui.* to fui@localhost identified by 'admin';
flush privileges;