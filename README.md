# fui框架maven工程介绍
## 一、安装部署Memcached服务端(工程目录tools下有安装文件)
    ### 1、Windows版
        (1). 首先，去下载Windows版本Memcached服务端，到本地硬盘分区根目录，比如D盘下的Memcached文件夹。
        (2). 假设已经把服务端文件解压在了Memcached目录，运行CMD打开命令行窗口，比如切换到D:\Memcached工作目录。
        (3). 开始安装，输入命令如：memcached -d install，如果需要指定端口和IP，则加上-p和-l参数：memcached -d install  -l 127.0.0.1 -p 11211。
        (4). 启动memcached服务，可以直接去服务列表手动启动，也可以命令行：memcached -d start。
        (5). 卸载memcached步骤：a. 停止服务，memcached -d stop；b.卸载服务，memcached -d uninstall。
        (6). 测试连接：首先用系统盘安装Telnet服务端和客户端组件，在命令行窗口输入：telnet 127.0.0.1 11211，如果进入telnet命令窗口，则表示安装成功。
    ### 2、Linux版
        (1). tar -zxf memcached-1.x.x.tar.gz
        (2). cd memcached-1.x.x
        (3). ./configure --prefix=/usr/local/memcached
        (4). make && make test && sudo make install
## 二、运行数据库脚本文件
    ### 1、mysql数据库
    ### 2、oracle数据库