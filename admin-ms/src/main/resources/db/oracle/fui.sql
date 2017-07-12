DROP TABLE FUI_CALENDAR;
CREATE TABLE FUI_CALENDAR (ID NUMBER(20) NOT NULL, TITLE VARCHAR2(100) NOT NULL, STARTTIME VARCHAR2(20) NOT NULL, ENDTIME VARCHAR2(20) DEFAULT '', ALLDAY VARCHAR2(1) NOT NULL, COLOR VARCHAR2(20) DEFAULT '', PRIMARY KEY (ID));
COMMENT ON TABLE FUI_CALENDAR IS '日程安排表';
COMMENT ON COLUMN FUI_CALENDAR.ID IS '主键';
COMMENT ON COLUMN FUI_CALENDAR.TITLE IS '标题';
COMMENT ON COLUMN FUI_CALENDAR.STARTTIME IS '开始时间';
COMMENT ON COLUMN FUI_CALENDAR.ENDTIME IS '结束时间';
COMMENT ON COLUMN FUI_CALENDAR.ALLDAY IS '是否全天';
COMMENT ON COLUMN FUI_CALENDAR.COLOR IS '颜色';
DROP TABLE FUI_DICT_ENTRY;
CREATE TABLE FUI_DICT_ENTRY (ID NUMBER(20) NOT NULL, DICT_CODE VARCHAR2(125) NOT NULL, DICT_ENTRY_CODE VARCHAR2(125) NOT NULL, DICT_ENTRY_DESC VARCHAR2(255), DICT_ENTRY_SORT NUMBER, PRIMARY KEY (ID));
COMMENT ON TABLE FUI_DICT_ENTRY IS '字典详细表';
COMMENT ON COLUMN FUI_DICT_ENTRY.ID IS '主键';
COMMENT ON COLUMN FUI_DICT_ENTRY.DICT_CODE IS '字典类型名称';
COMMENT ON COLUMN FUI_DICT_ENTRY.DICT_ENTRY_CODE IS '字典明细名称';
COMMENT ON COLUMN FUI_DICT_ENTRY.DICT_ENTRY_DESC IS '字典明细描述';
COMMENT ON COLUMN FUI_DICT_ENTRY.DICT_ENTRY_SORT IS '排序标识';
DROP TABLE FUI_DICT_TYPE;
CREATE TABLE FUI_DICT_TYPE (ID NUMBER(20) NOT NULL, DICT_CODE VARCHAR2(125) NOT NULL, DICT_DESC VARCHAR2(255) NOT NULL, PRIMARY KEY (ID));
COMMENT ON TABLE FUI_DICT_TYPE IS '字典主表';
COMMENT ON COLUMN FUI_DICT_TYPE.ID IS '主键';
COMMENT ON COLUMN FUI_DICT_TYPE.DICT_CODE IS '字典类型名称';
COMMENT ON COLUMN FUI_DICT_TYPE.DICT_DESC IS '字典类型描述';
DROP TABLE FUI_MENU;
CREATE TABLE FUI_MENU (REC_CREATOR VARCHAR2(256), REC_CREATE_TIME VARCHAR2(14), REC_REVISOR VARCHAR2(256), REC_REVISE_TIME VARCHAR2(14), ARCHIVE_FLAG VARCHAR2(1), TREE_ENAME VARCHAR2(30) NOT NULL, NODE_ENAME VARCHAR2(30) NOT NULL, NODE_CNAME VARCHAR2(80), NODE_TYPE NUMBER(1), NODE_URL VARCHAR2(200), NODE_SORT_ID VARCHAR2(20), NODE_PARAM VARCHAR2(200), NODE_IMAGE_PATH VARCHAR2(200), PRIMARY KEY (TREE_ENAME, NODE_ENAME));
COMMENT ON TABLE FUI_MENU IS '项目菜单节点信息';
COMMENT ON COLUMN FUI_MENU.REC_CREATOR IS '记录创建责任者';
COMMENT ON COLUMN FUI_MENU.REC_CREATE_TIME IS '记录创建时刻';
COMMENT ON COLUMN FUI_MENU.REC_REVISOR IS '记录修改责任者';
COMMENT ON COLUMN FUI_MENU.REC_REVISE_TIME IS '记录修改时刻';
COMMENT ON COLUMN FUI_MENU.ARCHIVE_FLAG IS '归档标记';
COMMENT ON COLUMN FUI_MENU.TREE_ENAME IS '节点树英文名';
COMMENT ON COLUMN FUI_MENU.NODE_ENAME IS '节点英文名';
COMMENT ON COLUMN FUI_MENU.NODE_CNAME IS '节点中文名';
COMMENT ON COLUMN FUI_MENU.NODE_TYPE IS '节点类型';
COMMENT ON COLUMN FUI_MENU.NODE_URL IS '节点URL';
COMMENT ON COLUMN FUI_MENU.NODE_SORT_ID IS '节点排序标识';
COMMENT ON COLUMN FUI_MENU.NODE_PARAM IS '节点参数配置';
COMMENT ON COLUMN FUI_MENU.NODE_IMAGE_PATH IS '节点图片路径';
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20130422143551', 'admin', '20170617165541', ' ', 'EP', 'ED', '元数据管理', 0, ' ', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20120926091948', ' ', ' ', ' ', 'EDOT', 'EDFB06', '请假流程入口', 1, ' ', ' ', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20110518112122', 'admin', '20170617165439', ' ', 'ED', 'EDPI00', '项目信息管理', 1, '/supervisor/project/index', '4', ' ', 'css:icon-cogs');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20070622161518', 'admin', '20170617165439', ' ', 'ED', 'EDPI', '菜单资源管理', 0, ' ', '2', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20070622161533', 'admin', '20070622161828', ' ', 'EDPI', 'EDPI10', '菜单信息管理', 1, '/supervisor/menu/index', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20161225184150', 'admin', '20170524153632', ' ', 'root', 'EP', '系统平台', 0, ' ', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20090729174958', 'admin', '20170617165439', ' ', 'ED', 'EDCM', '代码管理', 0, ' ', '3', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20090729175218', 'admin', '20170112174611', ' ', 'EDCM', 'EDCM00', '代码分类管理', 1, '/supervisor/dict/index', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES (' ', ' ', 'admin', '20170617165439', ' ', 'ED', 'EDUM', '系统设置', 0, null, '1', ' ', null);
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM01', '用户管理', 1, '/supervisor/user/index', '1', ' ', null);
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM02', '角色管理', 1, '/supervisor/role/index', '2', ' ', null);
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM03', '权限配置', 1, '/supervisor/right/index', '3', ' ', null);
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20160830162252', ' ', ' ', ' ', '$', 'root', '系统菜单树', 0, ' ', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20170105150848', ' ', ' ', ' ', 'root', 'ACT', '流程管理', 0, ' ', '6', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20170105151207', ' ', ' ', ' ', 'ACT', 'RWPE01', '流程执行示例', 1, ' ', '1', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20170105151340', 'admin', '20170503131811', ' ', 'ACT', 'RACT01', '模型工作区', 1, '/supervisor/workflow/model/index', '2', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT02', '流程定义及部署管理', 1, '/supervisor/workflow/process/index', '3', ' ', ' ');
INSERT INTO FUI_MENU (REC_CREATOR, REC_CREATE_TIME, REC_REVISOR, REC_REVISE_TIME, ARCHIVE_FLAG, TREE_ENAME, NODE_ENAME, NODE_CNAME, NODE_TYPE, NODE_URL, NODE_SORT_ID, NODE_PARAM, NODE_IMAGE_PATH) VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT03', '运行中流程', 1, '/supervisor/workflow/processinstance/index', '4', ' ', ' ');
DROP TABLE FUI_PERMISSIONS;
CREATE TABLE FUI_PERMISSIONS (ID NUMBER(20) NOT NULL, PARENT_ID NUMBER(20), CODE VARCHAR2(100), TEXT VARCHAR2(30), URL VARCHAR2(200), PRIMARY KEY (ID));
COMMENT ON TABLE FUI_PERMISSIONS IS '后台用户权限表';
COMMENT ON COLUMN FUI_PERMISSIONS.ID IS '主键';
COMMENT ON COLUMN FUI_PERMISSIONS.PARENT_ID IS '上级权限编码';
COMMENT ON COLUMN FUI_PERMISSIONS.CODE IS 'shiro标签使用的code';
COMMENT ON COLUMN FUI_PERMISSIONS.TEXT IS '权限名称';
COMMENT ON COLUMN FUI_PERMISSIONS.URL IS '权限功能点url';
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001, -1, 'root.EP', '系统平台', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1002, -1, 'root.ACT', '流程管理', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (100101, 1001, 'EP.ED', '元数据管理', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (10010101, 100101, 'ED.EDUM', '系统设置', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001010101, 10010101, 'EDUM.EDUM01', '用户管理', '/supervisor/user/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001010102, 10010101, 'EDUM.EDUM02', '角色管理', '/supervisor/role/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001010103, 10010101, 'EDUM.EDUM03', '权限配置', '/supervisor/right/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (100201, 1002, 'ACT.RWPE01', '流程执行示例', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (100202, 1002, 'ACT.RACT01', '模型工作区', '/supervisor/workflow/model/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (100203, 1002, 'ACT.RACT02', '流程定义及部署管理', '/supervisor/workflow/process/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (100204, 1002, 'ACT.RACT03', '运行中流程', '/supervisor/workflow/processinstance/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (10010102, 100101, 'ED.EDFA', '页面资源管理', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (10010103, 100101, 'ED.EDPI', '菜单资源管理', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (10010104, 100101, 'ED.EDCM', '代码管理', null);
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (10010105, 100101, 'ED.EDPI00', '项目信息管理', '/supervisor/sys/project');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001010301, 10010103, 'EDPI.EDPI10', '菜单信息管理', '/supervisor/menu/index');
INSERT INTO FUI_PERMISSIONS (ID, PARENT_ID, CODE, TEXT, URL) VALUES (1001010401, 10010104, 'EDCM.EDCM00', '代码分类管理', '/supervisor/dict/index');
DROP TABLE FUI_ROLES;
CREATE TABLE FUI_ROLES (ID NUMBER(20) NOT NULL, ROLE_CODE VARCHAR2(20), ROLE_NAME VARCHAR2(50), PERMISSIONS VARCHAR2(4000), PRIMARY KEY (ID));
COMMENT ON TABLE FUI_ROLES IS '后台用户角色表';
COMMENT ON COLUMN FUI_ROLES.ID IS '主键';
COMMENT ON COLUMN FUI_ROLES.ROLE_CODE IS '角色代码';
COMMENT ON COLUMN FUI_ROLES.ROLE_NAME IS '角色名称';
COMMENT ON COLUMN FUI_ROLES.PERMISSIONS IS '权限';
INSERT INTO FUI_ROLES (ID, ROLE_CODE, ROLE_NAME, PERMISSIONS) VALUES (1, 'supervisor', '超级管理员', '1,1001,100101,10010101,1001010101,1001010102,1001010103,10010102,10010103,1001010301,10010104,1001010401,10010105,1002,100201,100202,100203,100204');
INSERT INTO FUI_ROLES (ID, ROLE_CODE, ROLE_NAME, PERMISSIONS) VALUES (3, 'flower', '流程管理员', '1002,100201,100202,100203,100204');
DROP TABLE FUI_SYSTEM;
CREATE TABLE FUI_SYSTEM (ID NUMBER(20) NOT NULL, NAME VARCHAR2(50), NAME_DESC VARCHAR2(125), REMARK VARCHAR2(225), PRIMARY KEY (ID));
COMMENT ON TABLE FUI_SYSTEM IS '项目设置表';
COMMENT ON COLUMN FUI_SYSTEM.ID IS '主键';
COMMENT ON COLUMN FUI_SYSTEM.NAME IS '名称';
COMMENT ON COLUMN FUI_SYSTEM.NAME_DESC IS '名称描述';
COMMENT ON COLUMN FUI_SYSTEM.REMARK IS '备注';
INSERT INTO FUI_SYSTEM (ID, NAME, NAME_DESC, REMARK) VALUES (1, 'projectName', 'fuiPlat4j Demo', '输入项目的中文名');
INSERT INTO FUI_SYSTEM (ID, NAME, NAME_DESC, REMARK) VALUES (2, 'logo', 'logo.png', '输入项目的logo文件名或地址');
INSERT INTO FUI_SYSTEM (ID, NAME, NAME_DESC, REMARK) VALUES (3, 'dev', '测试环境', '测试环境，正式环境');
DROP TABLE FUI_USER;
CREATE TABLE FUI_USER (ID NUMBER(20) NOT NULL, ENAME VARCHAR2(15) NOT NULL, CNAME VARCHAR2(50) NOT NULL, PASSWORD VARCHAR2(50) NOT NULL, STYLE VARCHAR2(10) DEFAULT '', MENU_TYPE VARCHAR2(50), ERASED NUMBER(1) DEFAULT 1, LOGIN_COUNT NUMBER(20) DEFAULT 0, LAST_LOGIN_TIME DATE, CREATE_TIME DATE, PRIMARY KEY (ID));
COMMENT ON TABLE FUI_USER IS '用户表';
COMMENT ON COLUMN FUI_USER.ID IS '主键';
COMMENT ON COLUMN FUI_USER.ENAME IS '用户账号';
COMMENT ON COLUMN FUI_USER.CNAME IS '用户名称';
COMMENT ON COLUMN FUI_USER.PASSWORD IS '密码';
COMMENT ON COLUMN FUI_USER.STYLE IS '菜单风格';
COMMENT ON COLUMN FUI_USER.MENU_TYPE IS '菜单类型';
COMMENT ON COLUMN FUI_USER.ERASED IS '1：正常状态 0：异常状态';
COMMENT ON COLUMN FUI_USER.LOGIN_COUNT IS '登录次数';
COMMENT ON COLUMN FUI_USER.LAST_LOGIN_TIME IS '上次登录时间';
COMMENT ON COLUMN FUI_USER.CREATE_TIME IS '上次登录时间';
INSERT INTO FUI_USER (ID, ENAME, CNAME, PASSWORD, STYLE, MENU_TYPE, ERASED, LOGIN_COUNT, LAST_LOGIN_TIME, CREATE_TIME) VALUES (1, 'admin', '管理员', '5F4DCC3B5AA765D61D8327DEB882CF99', 'bootstrap', 'default', 0, 307, TIMESTAMP '2017-06-23 18:06:57', TIMESTAMP '2017-01-23 18:06:57');
INSERT INTO FUI_USER (ID, ENAME, CNAME, PASSWORD, STYLE, MENU_TYPE, ERASED, LOGIN_COUNT, LAST_LOGIN_TIME, CREATE_TIME) VALUES (6, 'zhangsan', '张三', '01D7F40760960E7BD9443513F22AB9AF', 'default', 'default', 0, 1, TIMESTAMP '2017-06-17 13:08:59', TIMESTAMP '2017-02-03 08:06:37');
INSERT INTO FUI_USER (ID, ENAME, CNAME, PASSWORD, STYLE, MENU_TYPE, ERASED, LOGIN_COUNT, LAST_LOGIN_TIME, CREATE_TIME) VALUES (5, 'xfreng', '熊世凤', '392FFAFA49FDE96C848704EBF013E7E8', 'default', 'default', 0, 2, TIMESTAMP '2017-06-17 13:08:09', TIMESTAMP '2017-04-13 18:46:17');
DROP TABLE FUI_USER_ROLES;
CREATE TABLE FUI_USER_ROLES (ID NUMBER(20) NOT NULL, USER_ID NUMBER(20), ROLE_ID NUMBER(20), PRIMARY KEY (ID));
COMMENT ON TABLE FUI_USER_ROLES IS '后台用户角色关联表';
COMMENT ON COLUMN FUI_USER_ROLES.ID IS '主键';
COMMENT ON COLUMN FUI_USER_ROLES.USER_ID IS '用户id';
COMMENT ON COLUMN FUI_USER_ROLES.ROLE_ID IS '角色id';
INSERT INTO FUI_USER_ROLES (ID, USER_ID, ROLE_ID) VALUES (1, 1, 1);
INSERT INTO FUI_USER_ROLES (ID, USER_ID, ROLE_ID) VALUES (4, 5, 3);
INSERT INTO FUI_USER_ROLES (ID, USER_ID, ROLE_ID) VALUES (5, 6, 3);
