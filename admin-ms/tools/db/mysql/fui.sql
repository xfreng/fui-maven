/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50617
 Source Host           : localhost:3306
 Source Schema         : fui

 Target Server Type    : MySQL
 Target Server Version : 50617
 File Encoding         : 65001

 Date: 05/09/2017 11:28:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fui_calendar
-- ----------------------------
DROP TABLE IF EXISTS `fui_calendar`;
CREATE TABLE `fui_calendar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '标题',
  `starttime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '开始时间',
  `endtime` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '结束时间',
  `allday` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否全天',
  `color` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '颜色',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '日程安排表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fui_dict_entry
-- ----------------------------
DROP TABLE IF EXISTS `fui_dict_entry`;
CREATE TABLE `fui_dict_entry`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dict_code` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '字典类型名称',
  `dict_entry_code` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '字典明细名称',
  `dict_entry_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典明细描述',
  `dict_entry_sort` bigint(4) DEFAULT NULL COMMENT '排序标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典详细表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fui_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `fui_dict_type`;
CREATE TABLE `fui_dict_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dict_code` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '字典类型名称',
  `dict_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典类型描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典主表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fui_menu
-- ----------------------------
DROP TABLE IF EXISTS `fui_menu`;
CREATE TABLE `fui_menu`  (
  `REC_CREATOR` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '记录创建责任者',
  `REC_CREATE_TIME` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '记录创建时刻',
  `REC_REVISOR` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '记录修改责任者',
  `REC_REVISE_TIME` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '记录修改时刻',
  `ARCHIVE_FLAG` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '归档标记',
  `TREE_ENAME` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点树英文名',
  `NODE_ENAME` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点英文名',
  `NODE_CNAME` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点中文名',
  `NODE_TYPE` int(1) NOT NULL COMMENT '节点类型',
  `NODE_URL` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点URL',
  `NODE_SORT_ID` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点排序标识',
  `NODE_PARAM` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点参数配置',
  `NODE_IMAGE_PATH` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '节点图片路径',
  PRIMARY KEY (`TREE_ENAME`, `NODE_ENAME`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '项目菜单节点信息' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_menu
-- ----------------------------
INSERT INTO `fui_menu` VALUES ('admin', '20160830162252', ' ', ' ', ' ', '$', 'root', '系统菜单树', 0, ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170503131811', ' ', 'ACT', 'RACT01', '模型工作区', 1, '/supervisor/workflow/model/index', '2', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT02', '流程定义及部署管理', 1, '/supervisor/workflow/process/index', '3', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151340', 'admin', '20170605161921', ' ', 'ACT', 'RACT03', '运行中流程', 1, '/supervisor/workflow/processinstance/index', '4', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105151207', ' ', ' ', ' ', 'ACT', 'RWPE01', '流程执行示例', 1, ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20090729174958', 'admin', '20170617165439', ' ', 'ED', 'EDCM', '代码管理', 0, ' ', '3', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20070622161518', 'admin', '20170617165439', ' ', 'ED', 'EDPI', '菜单资源管理', 0, ' ', '2', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20110518112122', 'admin', '20170617165439', ' ', 'ED', 'EDPI00', '项目信息管理', 1, '/supervisor/project/index', '4', ' ', 'css:icon-cogs');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165439', ' ', 'ED', 'EDUM', '系统设置', 0, '', '1', ' ', '');
INSERT INTO `fui_menu` VALUES ('admin', '20090729175218', 'admin', '20170904160239', ' ', 'EDCM', 'EDCM00', '字典管理', 1, '/supervisor/dict/index', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20120926091948', ' ', ' ', ' ', 'EDOT', 'EDFB06', '请假流程入口', 1, ' ', ' ', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20070622161533', 'admin', '20070622161828', ' ', 'EDPI', 'EDPI10', '菜单信息管理', 1, '/supervisor/menu/index', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM01', '用户管理', 1, '/supervisor/user/index', '1', ' ', '');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170617165525', ' ', 'EDUM', 'EDUM02', '角色管理', 1, '/supervisor/role/index', '2', ' ', '');
INSERT INTO `fui_menu` VALUES (' ', ' ', 'admin', '20170904160127', ' ', 'EDUM', 'EDUM03', '权限管理', 1, '/supervisor/right/index', '3', ' ', '');
INSERT INTO `fui_menu` VALUES ('admin', '20170904160213', ' ', ' ', ' ', 'EDUM', 'EDUM04', '机构管理', 1, '/supervisor/organization/index', '4', ' ', '');
INSERT INTO `fui_menu` VALUES ('admin', '20130422143551', 'admin', '20170617165541', ' ', 'EP', 'ED', '元数据管理', 0, ' ', '1', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20170105150848', ' ', ' ', ' ', 'root', 'ACT', '流程管理', 0, ' ', '6', ' ', ' ');
INSERT INTO `fui_menu` VALUES ('admin', '20161225184150', 'admin', '20170524153632', ' ', 'root', 'EP', '系统平台', 0, ' ', '1', ' ', ' ');

-- ----------------------------
-- Table structure for fui_menu_shortcut
-- ----------------------------
DROP TABLE IF EXISTS `fui_menu_shortcut`;
CREATE TABLE `fui_menu_shortcut`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(10) DEFAULT NULL COMMENT '用户id',
  `menu_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单编号',
  `order_no` int(4) DEFAULT NULL COMMENT '菜单排序',
  `menu_image_path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '自定义菜单图标路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '自定义菜单表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fui_organization
-- ----------------------------
DROP TABLE IF EXISTS `fui_organization`;
CREATE TABLE `fui_organization`  (
  `id` bigint(20) NOT NULL COMMENT '主键（组织机构编码）',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级组织机构编码',
  `code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '组织机构编码',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `users` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '机构用户',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_organization
-- ----------------------------
INSERT INTO `fui_organization` VALUES (1, -1, 'root', '组织结构树', '1');
INSERT INTO `fui_organization` VALUES (1001, 1, 'mintech', '技术部', '5');
INSERT INTO `fui_organization` VALUES (1002, 1, 'test', '测试部', '6,7');
INSERT INTO `fui_organization` VALUES (1003, NULL, 'test', 'test', NULL);
INSERT INTO `fui_organization` VALUES (1004, NULL, 'test1', 'test1', NULL);
INSERT INTO `fui_organization` VALUES (1005, NULL, 'test2', 'test2', NULL);

-- ----------------------------
-- Table structure for fui_permissions
-- ----------------------------
DROP TABLE IF EXISTS `fui_permissions`;
CREATE TABLE `fui_permissions`  (
  `id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'shiro标签使用的code',
  `text` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '权限名称',
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '权限功能点url',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户权限表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_permissions
-- ----------------------------
INSERT INTO `fui_permissions` VALUES (1001, -1, 'root.EP', '系统平台', '');
INSERT INTO `fui_permissions` VALUES (1002, -1, 'root.ACT', '流程管理', '');
INSERT INTO `fui_permissions` VALUES (100101, 1001, 'EP.ED', '元数据管理', '');
INSERT INTO `fui_permissions` VALUES (100201, 1002, 'ACT.RWPE01', '流程执行示例', '');
INSERT INTO `fui_permissions` VALUES (100202, 1002, 'ACT.RACT01', '模型工作区', '/supervisor/workflow/model/index');
INSERT INTO `fui_permissions` VALUES (100203, 1002, 'ACT.RACT02', '流程定义及部署管理', '/supervisor/workflow/process/index');
INSERT INTO `fui_permissions` VALUES (100204, 1002, 'ACT.RACT03', '运行中流程', '/supervisor/workflow/processinstance/index');
INSERT INTO `fui_permissions` VALUES (10010101, 100101, 'ED.EDUM', '系统设置', '');
INSERT INTO `fui_permissions` VALUES (10010103, 100101, 'ED.EDPI', '菜单资源管理', '');
INSERT INTO `fui_permissions` VALUES (10010104, 100101, 'ED.EDCM', '代码管理', '');
INSERT INTO `fui_permissions` VALUES (10010105, 100101, 'ED.EDPI00', '项目信息管理', '/supervisor/sys/project');
INSERT INTO `fui_permissions` VALUES (10020201, 100202, 'RACT01.01', '首页', '/supervisor/workflow/model/index');
INSERT INTO `fui_permissions` VALUES (10020202, 100202, 'RACT01.02', '查询流程模型列表', '/supervisor/workflow/model/list');
INSERT INTO `fui_permissions` VALUES (10020203, 100202, 'RACT01.03', '创建模型', '/supervisor/workflow/model/create');
INSERT INTO `fui_permissions` VALUES (10020204, 100202, 'RACT01.04', '另存模型', '/supervisor/workflow/model/**/saveas');
INSERT INTO `fui_permissions` VALUES (10020205, 100202, 'RACT01.05', '删除模型（批量）', '/supervisor/workflow/model/deleteModel');
INSERT INTO `fui_permissions` VALUES (10020206, 100202, 'RACT01.06', '复制模型', '/supervisor/workflow/model/copyModel');
INSERT INTO `fui_permissions` VALUES (10020207, 100202, 'RACT01.07', '复制到模型模板', '/supervisor/workflow/model/copyModel2Template');
INSERT INTO `fui_permissions` VALUES (10020208, 100202, 'RACT01.08', '部署流程', '/supervisor/workflow/model/deploy/**');
INSERT INTO `fui_permissions` VALUES (10020209, 100202, 'RACT01.09', '导出模型', '/supervisor/workflow/model/export/**/**');
INSERT INTO `fui_permissions` VALUES (10020210, 100202, 'RACT01.10', '删除模型（单个）', '/supervisor/workflow/model/delete/**');
INSERT INTO `fui_permissions` VALUES (10020211, 100202, 'RACT01.11', '检查模型key值', '/supervisor/checkModelKey');
INSERT INTO `fui_permissions` VALUES (10020212, 100202, 'RACT01.12', '获取模型', '/supervisor/treeModel/getModel');
INSERT INTO `fui_permissions` VALUES (10020213, 100202, 'RACT01.13', '检查模型', '/supervisor/treeModel/checkModelByModelId');
INSERT INTO `fui_permissions` VALUES (10020214, 100202, 'RACT01.14', '设计器首页', '/supervisor/designer/tree-modeler');
INSERT INTO `fui_permissions` VALUES (10020301, 100203, 'RACT02.01', '首页', '/supervisor/workflow/process/index');
INSERT INTO `fui_permissions` VALUES (10020302, 100203, 'RACT02.02', '查询流程定义列表', '/supervisor/workflow/process/list');
INSERT INTO `fui_permissions` VALUES (10020303, 100203, 'RACT02.03', '读取资源（部署ID）', '/supervisor/workflow/process/resource/read');
INSERT INTO `fui_permissions` VALUES (10020304, 100203, 'RACT02.04', '读取资源（流程ID）', '/supervisor/workflow/process/resource/process-instance');
INSERT INTO `fui_permissions` VALUES (10020305, 100203, 'RACT02.05', '删除已部署流程', '/supervisor/workflow/process/delete');
INSERT INTO `fui_permissions` VALUES (10020306, 100203, 'RACT02.06', '输出跟踪流程信息', '/supervisor/workflow/process/trace');
INSERT INTO `fui_permissions` VALUES (10020307, 100203, 'RACT02.07', '读取带跟踪的图片', '/supervisor/workflow/process/trace/auto/**');
INSERT INTO `fui_permissions` VALUES (10020308, 100203, 'RACT02.08', '部署流程', '/supervisor/workflow/process/deploy');
INSERT INTO `fui_permissions` VALUES (10020309, 100203, 'RACT02.09', '启动流程', '/supervisor/workflow/process/start-running/**');
INSERT INTO `fui_permissions` VALUES (10020310, 100203, 'RACT02.10', '转换为模型', '/supervisor/workflow/process/convert-to-model/**');
INSERT INTO `fui_permissions` VALUES (10020311, 100203, 'RACT02.11', '流程状态更改', '/supervisor/workflow/process/processdefinition/update/**/**');
INSERT INTO `fui_permissions` VALUES (10020312, 100203, 'RACT02.12', '导出流程图', '/supervisor/workflow/process/export/diagrams');
INSERT INTO `fui_permissions` VALUES (10020313, 100203, 'RACT02.13', '获取流程定义', '/supervisor/workflow/process/bpmn/model/**');
INSERT INTO `fui_permissions` VALUES (10020401, 100204, 'RACT03.01', '首页', '/supervisor/workflow/processinstance/index');
INSERT INTO `fui_permissions` VALUES (10020402, 100204, 'RACT03.02', '查询运行中的流程', '/supervisor/workflow/processinstance/list');
INSERT INTO `fui_permissions` VALUES (10020403, 100204, 'RACT03.03', '更改运行中流程状态', '/supervisor/workflow/processinstance/update/**/**');
INSERT INTO `fui_permissions` VALUES (100101051, 10010105, 'EDPI00.01', '首页', '/supervisor/project/index');
INSERT INTO `fui_permissions` VALUES (100101052, 10010105, 'EDPI00.02', '查询项目列表', '/supervisor/project/list');
INSERT INTO `fui_permissions` VALUES (100101053, 10010105, 'EDPI00.03', '保存', '/supervisor/project/save');
INSERT INTO `fui_permissions` VALUES (1001010101, 10010101, 'EDUM.EDUM01', '用户管理', '/supervisor/user/index');
INSERT INTO `fui_permissions` VALUES (1001010102, 10010101, 'EDUM.EDUM02', '角色管理', '/supervisor/role/index');
INSERT INTO `fui_permissions` VALUES (1001010103, 10010101, 'EDUM.EDUM03', '权限管理', '/supervisor/right/index');
INSERT INTO `fui_permissions` VALUES (1001010104, 10010101, 'EDUM.EDUM04', '机构管理', '/supervisor/organization/index');
INSERT INTO `fui_permissions` VALUES (1001010105, 10010101, 'EDUM.EDUM05', '日程管理', '');
INSERT INTO `fui_permissions` VALUES (1001010106, 10010101, 'EDUM.EDUM06', '皮肤设置', '');
INSERT INTO `fui_permissions` VALUES (1001010301, 10010103, 'EDPI.EDPI10', '菜单信息管理', '/supervisor/menu/index');
INSERT INTO `fui_permissions` VALUES (1001010401, 10010104, 'EDCM.EDCM00', '字典管理', '/supervisor/dict/index');
INSERT INTO `fui_permissions` VALUES (10010101011, 1001010101, 'EDUM01.01', '首页', '/supervisor/user/index,/supervisor/user/state');
INSERT INTO `fui_permissions` VALUES (10010101012, 1001010101, 'EDUM01.02', '查询用户列表', '/supervisor/user/list');
INSERT INTO `fui_permissions` VALUES (10010101013, 1001010101, 'EDUM01.03', '新增', '/supervisor/right/add');
INSERT INTO `fui_permissions` VALUES (10010101014, 1001010101, 'EDUM01.04', '修改', '/supervisor/right/update');
INSERT INTO `fui_permissions` VALUES (10010101015, 1001010101, 'EDUM01.05', '获取角色列表', '/supervisor/right/roleList');
INSERT INTO `fui_permissions` VALUES (10010101016, 1001010101, 'EDUM01.06', '重置密码', '/supervisor/right/resetPwd');
INSERT INTO `fui_permissions` VALUES (10010101017, 1001010101, 'EDUM01.07', '修改状态', '/supervisor/right/status');
INSERT INTO `fui_permissions` VALUES (10010101018, 1001010101, 'EDUM01.08', '修改密码', '/supervisor/right/updatePwd');
INSERT INTO `fui_permissions` VALUES (10010101021, 1001010102, 'EDUM02.01', '首页', '/supervisor/role/index,/supervisor/role/state');
INSERT INTO `fui_permissions` VALUES (10010101022, 1001010102, 'EDUM02.02', '查询角色列表', '/supervisor/role/list');
INSERT INTO `fui_permissions` VALUES (10010101023, 1001010102, 'EDUM02.03', '展示角色树型结构', '/supervisor/right/showRights');
INSERT INTO `fui_permissions` VALUES (10010101024, 1001010102, 'EDUM02.04', '新增', '/supervisor/right/add');
INSERT INTO `fui_permissions` VALUES (10010101025, 1001010102, 'EDUM02.05', '修改', '/supervisor/right/update');
INSERT INTO `fui_permissions` VALUES (10010101031, 1001010103, 'EDUM03.01', '首页', '/supervisor/right/index,/supervisor/right/state');
INSERT INTO `fui_permissions` VALUES (10010101032, 1001010103, 'EDUM03.02', '查询权限列表', '/supervisor/right/list');
INSERT INTO `fui_permissions` VALUES (10010101033, 1001010103, 'EDUM03.03', '选择权限', '/supervisor/right/selectTreeWindow');
INSERT INTO `fui_permissions` VALUES (10010101034, 1001010103, 'EDUM03.04', '展示权限树型结构', '/supervisor/right/selectByKey');
INSERT INTO `fui_permissions` VALUES (10010101035, 1001010103, 'EDUM03.05', '新增', '/supervisor/right/add');
INSERT INTO `fui_permissions` VALUES (10010101036, 1001010103, 'EDUM03.06', '修改', '/supervisor/right/update');
INSERT INTO `fui_permissions` VALUES (10010101041, 1001010104, 'EDUM04.01', '首页', '/supervisor/organization/index,/supervisor/organization/state');
INSERT INTO `fui_permissions` VALUES (10010101042, 1001010104, 'EDUM04.02', '选择人员', '/supervisor/organization/selectUserWindow');
INSERT INTO `fui_permissions` VALUES (10010101043, 1001010104, 'EDUM04.03', '查询机构信息', '/supervisor/organization/selectByPrimaryKey');
INSERT INTO `fui_permissions` VALUES (10010101044, 1001010104, 'EDUM04.04', '展示机构树型结构', '/supervisor/organization/selectByKey');
INSERT INTO `fui_permissions` VALUES (10010101045, 1001010104, 'EDUM04.05', '新增', '/supervisor/organization/add');
INSERT INTO `fui_permissions` VALUES (10010101046, 1001010104, 'EDUM04.06', '修改', '/supervisor/organization/update');
INSERT INTO `fui_permissions` VALUES (10010101047, 1001010104, 'EDUM04.07', '删除', '/supervisor/organization/delete');
INSERT INTO `fui_permissions` VALUES (10010101051, 1001010105, 'EDUM05.01', '首页', '/supervisor/calendar');
INSERT INTO `fui_permissions` VALUES (10010101052, 1001010105, 'EDUM05.02', '事件监听', '/supervisor/eventopt');
INSERT INTO `fui_permissions` VALUES (10010101053, 1001010105, 'EDUM05.03', '获取日历数据', '/supervisor/getCalendarJsonData');
INSERT INTO `fui_permissions` VALUES (10010101054, 1001010105, 'EDUM05.04', '事件操作', '/supervisor/event');
INSERT INTO `fui_permissions` VALUES (10010101061, 1001010106, 'EDUM06.01', '改变皮肤', '/supervisor/style/updateMenuTypeAndStyle');
INSERT INTO `fui_permissions` VALUES (10010103011, 1001010301, 'EDPI10.01', '首页', '/supervisor/menu/index,/supervisor/menu/state');
INSERT INTO `fui_permissions` VALUES (10010103012, 1001010301, 'EDPI10.02', '展示菜单树型结构', '/supervisor/menu/loadMenuNodes');
INSERT INTO `fui_permissions` VALUES (10010103013, 1001010301, 'EDPI10.03', '查询菜单列表', '/supervisor/menu/loadMenuNodePage');
INSERT INTO `fui_permissions` VALUES (10010103014, 1001010301, 'EDPI10.04', '展示Outlook菜单', '/supervisor/menu/loadOutlookTreeNodes');
INSERT INTO `fui_permissions` VALUES (10010103015, 1001010301, 'EDPI10.05', '保存', '/supervisor/menu/saveMenu');
INSERT INTO `fui_permissions` VALUES (10010103016, 1001010301, 'EDPI10.06', '删除', '/supervisor/menu/deleteMenu');
INSERT INTO `fui_permissions` VALUES (10010103017, 1001010301, 'EDPI10.07', '修改', '/supervisor/menu/updateMenu');
INSERT INTO `fui_permissions` VALUES (10010104011, 1001010401, 'EDCM00.01', '首页', '/supervisor/dict/index,/supervisor/dict/dictManager,/supervisor/dict/dictImportManager');
INSERT INTO `fui_permissions` VALUES (10010104012, 1001010401, 'EDCM00.02', '展示字典树型结构', '/supervisor/dict/queryDictForTree');
INSERT INTO `fui_permissions` VALUES (10010104013, 1001010401, 'EDCM00.03', '查询字典类型', '/supervisor/dict/queryDictType');
INSERT INTO `fui_permissions` VALUES (10010104014, 1001010401, 'EDCM00.04', '保存字典类型', '/supervisor/dict/saveDictType');
INSERT INTO `fui_permissions` VALUES (10010104015, 1001010401, 'EDCM00.05', '保存字典详细', '/supervisor/dict/saveDictEntry');
INSERT INTO `fui_permissions` VALUES (10010104016, 1001010401, 'EDCM00.06', '获取字典详细列表', '/supervisor/dict/getLayout');
INSERT INTO `fui_permissions` VALUES (10010104017, 1001010401, 'EDCM00.07', '获取字典', '/supervisor/dict/getDictData');

-- ----------------------------
-- Table structure for fui_project
-- ----------------------------
DROP TABLE IF EXISTS `fui_project`;
CREATE TABLE `fui_project`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name_desc` varchar(125) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `remark` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_project
-- ----------------------------
INSERT INTO `fui_project` VALUES (1, 'project.name', 'jcoffee Demo', '说明：输入项目的中文名');
INSERT INTO `fui_project` VALUES (2, 'logo', 'logo.png', '说明：输入项目的logo文件名或地址');
INSERT INTO `fui_project` VALUES (3, 'dev', '框架研发', '说明：如测试环境，正式环境');
INSERT INTO `fui_project` VALUES (4, 'infogen.dir', 'c:/infogen', '说明：信息输出目录');
INSERT INTO `fui_project` VALUES (5, 'login.background', 'background', '说明：登录页背景图片');

-- ----------------------------
-- Table structure for fui_roles
-- ----------------------------
DROP TABLE IF EXISTS `fui_roles`;
CREATE TABLE `fui_roles`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色代码',
  `role_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色名称',
  `permissions` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '权限',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户角色表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_roles
-- ----------------------------
INSERT INTO `fui_roles` VALUES (1, 'supervisor', '超级管理员', '1001,100101,10010101,1001010101,10010101011,10010101012,10010101013,10010101014,10010101015,10010101016,10010101017,10010101018,1001010102,10010101021,10010101022,10010101023,10010101024,10010101025,1001010103,10010101031,10010101032,10010101033,10010101034,10010101035,10010101036,10010103,1001010301,10010103011,10010103012,10010103013,10010103014,10010103015,10010103016,10010103017,10010104,1001010401,10010104011,10010104012,10010104013,10010104014,10010104015,10010104016,10010104017,10010105,100101051,100101052,100101053,1002,100201,100202,100203,100204');
INSERT INTO `fui_roles` VALUES (3, 'flower', '流程管理员', '100201,100202,10020201,10020202,10020203,10020204,10020205,10020206,10020207,10020208,10020209,10020210,10020211,10020212,10020213,10020214');

-- ----------------------------
-- Table structure for fui_user
-- ----------------------------
DROP TABLE IF EXISTS `fui_user`;
CREATE TABLE `fui_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ename` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `style` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '菜单风格',
  `menu_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单风格',
  `erased` bit(1) DEFAULT b'1' COMMENT '1：正常状态\r\n0：异常状态',
  `login_count` bigint(20) DEFAULT 0,
  `last_login_time` datetime(0) DEFAULT NULL,
  `create_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_user
-- ----------------------------
INSERT INTO `fui_user` VALUES (1, 'admin', '管理员', '5F4DCC3B5AA765D61D8327DEB882CF99', 'black', 'pact', b'0', 284, '2017-09-05 09:50:00', NULL);
INSERT INTO `fui_user` VALUES (5, 'ls', '李四', '392FFAFA49FDE96C848704EBF013E7E8', 'default', 'default', b'0', 2, '2017-06-17 13:08:09', NULL);
INSERT INTO `fui_user` VALUES (6, 'zhangsan', '张三', '01D7F40760960E7BD9443513F22AB9AF', 'default', 'default', b'0', 15, '2017-09-04 18:04:58', NULL);

-- ----------------------------
-- Table structure for fui_user_organizations
-- ----------------------------
DROP TABLE IF EXISTS `fui_user_organizations`;
CREATE TABLE `fui_user_organizations`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `organization_id` bigint(20) DEFAULT NULL COMMENT '组织机构id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户角色关联表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_user_organizations
-- ----------------------------
INSERT INTO `fui_user_organizations` VALUES (7, 1, 1);
INSERT INTO `fui_user_organizations` VALUES (8, 5, 1001);
INSERT INTO `fui_user_organizations` VALUES (9, 6, 1002);
INSERT INTO `fui_user_organizations` VALUES (10, 7, 1002);

-- ----------------------------
-- Table structure for fui_user_roles
-- ----------------------------
DROP TABLE IF EXISTS `fui_user_roles`;
CREATE TABLE `fui_user_roles`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台用户角色关联表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fui_user_roles
-- ----------------------------
INSERT INTO `fui_user_roles` VALUES (1, 1, 1);
INSERT INTO `fui_user_roles` VALUES (4, 5, 3);
INSERT INTO `fui_user_roles` VALUES (5, 6, 3);

SET FOREIGN_KEY_CHECKS = 1;
