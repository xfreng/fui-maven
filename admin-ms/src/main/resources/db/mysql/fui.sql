/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : fui

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-06-17 16:58:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fui_calendar
-- ----------------------------
DROP TABLE IF EXISTS `fui_calendar`;
CREATE TABLE `fui_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `starttime` varchar(20) NOT NULL DEFAULT '' COMMENT '开始时间',
  `endtime` varchar(20) DEFAULT '' COMMENT '结束时间',
  `allday` varchar(1) NOT NULL DEFAULT '0' COMMENT '是否全天',
  `color` varchar(20) DEFAULT '' COMMENT '颜色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='日程安排表';

-- ----------------------------
-- Records of fui_calendar
-- ----------------------------

-- ----------------------------
-- Table structure for fui_dict_entry
-- ----------------------------
DROP TABLE IF EXISTS `fui_dict_entry`;
CREATE TABLE `fui_dict_entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dict_code` varchar(125) DEFAULT '' COMMENT '字典类型名称',
  `dict_entry_code` varchar(125) DEFAULT '' COMMENT '字典明细名称',
  `dict_entry_desc` varchar(255) DEFAULT NULL COMMENT '字典明细描述',
  `dict_entry_sort` bigint(4) DEFAULT NULL COMMENT '排序标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='字典详细表';

-- ----------------------------
-- Records of fui_dict_entry
-- ----------------------------

-- ----------------------------
-- Table structure for fui_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `fui_dict_type`;
CREATE TABLE `fui_dict_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dict_code` varchar(125) DEFAULT '' COMMENT '字典类型名称',
  `dict_desc` varchar(255) DEFAULT NULL COMMENT '字典类型描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='字典主表';

-- ----------------------------
-- Records of fui_dict_type
-- ----------------------------

-- ----------------------------
-- Table structure for fui_menu
-- ----------------------------
DROP TABLE IF EXISTS `fui_menu`;
CREATE TABLE `fui_menu` (
  `REC_CREATOR` varchar(256) NOT NULL COMMENT '记录创建责任者',
  `REC_CREATE_TIME` varchar(14) NOT NULL COMMENT '记录创建时刻',
  `REC_REVISOR` varchar(256) NOT NULL COMMENT '记录修改责任者',
  `REC_REVISE_TIME` varchar(14) NOT NULL COMMENT '记录修改时刻',
  `ARCHIVE_FLAG` varchar(1) NOT NULL COMMENT '归档标记',
  `TREE_ENAME` varchar(30) NOT NULL COMMENT '节点树英文名',
  `NODE_ENAME` varchar(30) NOT NULL COMMENT '节点英文名',
  `NODE_CNAME` varchar(80) NOT NULL COMMENT '节点中文名',
  `NODE_TYPE` int(1) NOT NULL COMMENT '节点类型',
  `NODE_URL` varchar(200) NOT NULL COMMENT '节点URL',
  `NODE_SORT_ID` varchar(20) NOT NULL COMMENT '节点排序标识',
  `NODE_PARAM` varchar(200) NOT NULL COMMENT '节点参数配置',
  `NODE_IMAGE_PATH` varchar(200) NOT NULL COMMENT '节点图片路径',
  PRIMARY KEY (`TREE_ENAME`,`NODE_ENAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目菜单节点信息';

-- ----------------------------
-- Records of fui_menu
-- ----------------------------
INSERT INTO `fui_menu` VALUES ('admin', '20130422143551', 'admin', '20170617165541', ' ', 'EP', 'ED', '元数据管理', '0', ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20120926091948', ' ', ' ', ' ', 'EDOT', 'EDFB06', '请假流程入口', '1', ' ', ' ', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20110518112122', 'admin', '20170617165439', ' ', 'ED', 'EDPI00', '项目信息管理', '1', '/supervisor/project/index', '4', ' ', 'css:icon-cogs');
INSERT INTO `fui_menu` VALUES ('admin', '20070622161518', 'admin', '20170617165439', ' ', 'ED', 'EDPI', '菜单资源管理', '0', ' ', '2', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20070622161533', 'admin', '20070622161828', ' ', 'EDPI', 'EDPI10', '菜单信息管理', '1', '/supervisor/menu/index', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20161225184150', 'admin', '20170524153632', ' ', 'root', 'EP', '系统平台', '0', ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20090729174958', 'admin', '20170617165439', ' ', 'ED', 'EDCM', '代码管理', '0', ' ', '3', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20090729175218', 'admin', '20170112174611', ' ', 'EDCM', 'EDCM00', '代码分类管理', '1', '/supervisor/dict/index', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165439', ' ', 'ED', 'EDUM', '系统设置', '0', '', '1', ' ', '');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM01', '用户管理', '1', '/supervisor/user/index', '1', ' ', '');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM02', '角色管理', '1', '/supervisor/role/index', '2', ' ', '');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM03', '权限配置', '1', '/supervisor/right/index', '3', ' ', '');
INSERT INTO `fui_menu` VALUES ('admin', '20160830162252', ' ', ' ', ' ', '$', 'root', '系统菜单树', '0', ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105150848', ' ', ' ', ' ', 'root', 'ACT', '流程管理', '0', ' ', '6', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151207', ' ', ' ', ' ', 'ACT', 'RWPE01', '流程执行示例', '1', ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170503131811', ' ', 'ACT', 'RACT01', '模型工作区', '1', '/supervisor/workflow/model/index', '2', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT02', '流程定义及部署管理', '1', '/supervisor/workflow/process/index', '3', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT03', '运行中流程', '1', '/supervisor/workflow/processinstance/index', '4', ' ', ' ');

-- ----------------------------
-- Table structure for fui_menu_shortcut
-- ----------------------------
DROP TABLE IF EXISTS `fui_menu_shortcut`;
CREATE TABLE `fui_menu_shortcut` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `menu_id` varchar(30) DEFAULT NULL COMMENT '菜单编号',
  `order_no` int(4) DEFAULT NULL COMMENT '菜单排序',
  `menu_image_path` varchar(50) DEFAULT '' COMMENT '自定义菜单图标路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='自定义菜单表';

-- ----------------------------
-- Records of fui_menu_shortcut
-- ----------------------------

-- ----------------------------
-- Table structure for fui_permissions
-- ----------------------------
DROP TABLE IF EXISTS `fui_permissions`;
CREATE TABLE `fui_permissions` (
  `id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL COMMENT 'shiro标签使用的code',
  `text` varchar(30) DEFAULT NULL COMMENT '权限名称',
  `url` varchar(200) DEFAULT NULL COMMENT '权限功能点url',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台用户权限表';

-- ----------------------------
-- Records of fui_permissions
-- ----------------------------
INSERT INTO `fui_permissions` VALUES ('1001', '-1', 'root.EP', '系统平台', '');
INSERT INTO `fui_permissions` VALUES ('1002', '-1', 'root.ACT', '流程管理', '');
INSERT INTO `fui_permissions` VALUES ('100101', '1001', 'EP.ED', '元数据管理', '');
INSERT INTO `fui_permissions` VALUES ('10010101', '100101', 'ED.EDUM', '系统设置', '');
INSERT INTO `fui_permissions` VALUES ('1001010101', '10010101', 'EDUM.EDUM01', '用户管理', '/supervisor/user/index');
INSERT INTO `fui_permissions` VALUES ('1001010102', '10010101', 'EDUM.EDUM02', '角色管理', '/supervisor/role/index');
INSERT INTO `fui_permissions` VALUES ('1001010103', '10010101', 'EDUM.EDUM03', '权限配置', '/supervisor/right/index');
INSERT INTO `fui_permissions` VALUES ('100201', '1002', 'ACT.RWPE01', '流程执行示例', '');
INSERT INTO `fui_permissions` VALUES ('100202', '1002', 'ACT.RACT01', '模型工作区', '/supervisor/workflow/model/index');
INSERT INTO `fui_permissions` VALUES ('100203', '1002', 'ACT.RACT02', '流程定义及部署管理', '/supervisor/workflow/process/index');
INSERT INTO `fui_permissions` VALUES ('100204', '1002', 'ACT.RACT03', '运行中流程', '/supervisor/workflow/processinstance/index');
INSERT INTO `fui_permissions` VALUES ('10010102', '100101', 'ED.EDFA', '页面资源管理', '');
INSERT INTO `fui_permissions` VALUES ('10010103', '100101', 'ED.EDPI', '菜单资源管理', '');
INSERT INTO `fui_permissions` VALUES ('10010104', '100101', 'ED.EDCM', '代码管理', '');
INSERT INTO `fui_permissions` VALUES ('10010105', '100101', 'ED.EDPI00', '项目信息管理', '/supervisor/sys/project');
INSERT INTO `fui_permissions` VALUES ('1001010301', '10010103', 'EDPI.EDPI10', '菜单信息管理', '/supervisor/menu/index');
INSERT INTO `fui_permissions` VALUES ('1001010401', '10010104', 'EDCM.EDCM00', '代码分类管理', '/supervisor/dict/index');

-- ----------------------------
-- Table structure for fui_roles
-- ----------------------------
DROP TABLE IF EXISTS `fui_roles`;
CREATE TABLE `fui_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(20) DEFAULT NULL COMMENT '角色代码',
  `role_name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `permissions` varchar(5000) DEFAULT NULL COMMENT '权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='后台用户角色表';

-- ----------------------------
-- Records of fui_roles
-- ----------------------------
INSERT INTO `fui_roles` VALUES ('1', 'supervisor', '超级管理员', '1,1001,100101,10010101,1001010101,1001010102,1001010103,10010102,10010103,1001010301,10010104,1001010401,10010105,1002,100201,100202,100203,100204');
INSERT INTO `fui_roles` VALUES ('3', 'flower', '流程管理员', '1002,100201,100202,100203,100204');

-- ----------------------------
-- Table structure for fui_system
-- ----------------------------
DROP TABLE IF EXISTS `fui_system`;
CREATE TABLE `fui_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `name_desc` varchar(125) DEFAULT NULL,
  `remark` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fui_system
-- ----------------------------
INSERT INTO `fui_system` VALUES ('1', 'fuiPlat4j Demo', 'projectName', '输入项目的中文名');
INSERT INTO `fui_system` VALUES ('2', 'logo.png', 'logo', '输入项目的logo文件名或地址');
INSERT INTO `fui_system` VALUES ('3', '测试环境', 'dev', '测试环境，正式环境');

-- ----------------------------
-- Table structure for fui_user
-- ----------------------------
DROP TABLE IF EXISTS `fui_user`;
CREATE TABLE `fui_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ename` varchar(15) NOT NULL,
  `cname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `style` varchar(10) DEFAULT '' COMMENT '菜单风格',
  `menu_type` varchar(50) DEFAULT NULL COMMENT '菜单风格',
  `erased` bit(1) DEFAULT b'1' COMMENT '1：正常状态\r\n0：异常状态',
  `login_count` bigint(20) DEFAULT '0',
  `last_login_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of fui_user
-- ----------------------------
INSERT INTO `fui_user` VALUES ('1', 'admin', '管理员', '5F4DCC3B5AA765D61D8327DEB882CF99', 'black', 'pact', '\0', '272', '2017-06-17 16:52:53', '2017-05-17 11:22:33');
INSERT INTO `fui_user` VALUES ('5', 'xfreng', '熊世凤', '392FFAFA49FDE96C848704EBF013E7E8', 'default', 'default', '\0', '2', '2017-06-17 13:08:09', '2017-05-12 16:52:13');
INSERT INTO `fui_user` VALUES ('6', 'zhangsan', '张三', '01D7F40760960E7BD9443513F22AB9AF', 'default', 'default', '\0', '1', '2017-06-17 13:08:59', '2017-05-12 11:52:33');

-- ----------------------------
-- Table structure for fui_user_money
-- ----------------------------
DROP TABLE IF EXISTS `fui_user_money`;
CREATE TABLE `fui_user_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) NOT NULL,
  `day_money` float NOT NULL,
  `state` char(1) NOT NULL,
  `create_datetime` varchar(25) NOT NULL,
  `end_datetime` varchar(25) DEFAULT '',
  `user_type` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='账单表';

-- ----------------------------
-- Records of fui_user_money
-- ----------------------------

-- ----------------------------
-- Table structure for fui_user_roles
-- ----------------------------
DROP TABLE IF EXISTS `fui_user_roles`;
CREATE TABLE `fui_user_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='后台用户角色关联表';

-- ----------------------------
-- Records of fui_user_roles
-- ----------------------------
INSERT INTO `fui_user_roles` VALUES ('1', '1', '1');
INSERT INTO `fui_user_roles` VALUES ('4', '5', '3');
INSERT INTO `fui_user_roles` VALUES ('5', '6', '3');

-- ----------------------------
-- Table structure for fui_user_type
-- ----------------------------
DROP TABLE IF EXISTS `fui_user_type`;
CREATE TABLE `fui_user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(15) DEFAULT NULL,
  `type_desc` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='计算类型表';

-- ----------------------------
-- Records of fui_user_type
-- ----------------------------
