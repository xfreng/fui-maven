# j-coffee开源框架介绍(maven工程)
## 1）、安装部署
### 1.1、安装部署Memcached服务端(admin-ms工程目录tools下有安装文件)
    1.1.1、Windows版
        (1). 首先，去下载Windows版本Memcached服务端，到本地硬盘分区
            根目录，比如D盘下的Memcached文件夹。
        (2). 假设已经把服务端文件解压在了Memcached目录，运行CMD打开命
            令行窗口，比如切换到D:\Memcached工作目录。
        (3). 开始安装，输入命令如：memcached -d install，如果需要指
            定端口和IP，则加上-p和-l参数：memcached -d install  -l 127.0.0.1 -p 11211。
        (4). 启动memcached服务，可以直接去服务列表手动启动，也可以命令
            行：memcached -d start。
        (5). 卸载memcached步骤：
            a. 停止服务，memcached -d stop；
            b. 卸载服务，memcached -d uninstall。
        (6). 测试连接：首先用系统盘安装Telnet服务端和客户端组件，在命令
            行窗口输入：telnet 127.0.0.1 11211，如果进入telnet命令窗口，则表示安装成功。
    1.1.2、Linux版
        (1). tar -zxf memcached-1.x.x.tar.gz
        (2). cd memcached-1.x.x
        (3). ./configure --prefix=/usr/local/memcached
        (4). make && make test && sudo make install
### 1.2、运行数据库脚本文件(初始数据库)
    1.2.1、mysql数据库
    1.2.2、oracle数据库
    方法一、代码执行(要求数据库实例先创建)
        在spring-dao.xml中找到此配置修改databaseType为对应数据库类型,mybatis.dbType在jdbc.properties中
        databaseSchemaUpdate为true则会初始数据库实例
```xml
<bean id="fuiEngineConfiguration" class="com.fui.spring.FuiEngineConfiguration" init-method="init">
    <property name="dataSource" ref="dataSource"/>
    <property name="databaseType" value="${mybatis.dbType}"/>
    <property name="databaseSchemaUpdate" value="true"/>
</bean>
```
    方法二、sql脚本编辑器中执行
        先执行fui_user.sql再执行fui.sql
## 2）、功能介绍
    j-coffee是基于spring+spring-mvc开发的一套web框架，其目的是为了集开发、授权等于一体的快速开发平台。
### j-coffee有如下主要特点
- 组织机构、用户灵活配置
- fui.js快速开发web页面(包括jsp、html等)
- 集成activiti工作流引擎，轻松开发工作流系统
