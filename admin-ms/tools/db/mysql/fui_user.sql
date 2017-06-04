insert into mysql.user(Host,User,Password) values("localhost","fui",password("admin"));
grant all privileges on fui.* to fui@localhost identified by 'admin';
flush privileges;