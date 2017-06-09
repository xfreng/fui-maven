package com.fui.service;

import com.baosight.iplat4j.util.DateUtils;
import com.fui.common.GsonUtils;
import com.fui.common.JsonUtils;
import com.fui.common.UserUtils;
import com.fui.dao.menu.MenuMapper;
import com.fui.model.Menu;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("menuService")
public class MenuService {
    private final Logger logger = LoggerFactory.getLogger(MenuService.class);

    @Autowired
    private MenuMapper menuMapper;

    /**
     * @param id
     * @return
     */
    public List<Map<String, Object>> queryMenuNodeById(String id) {
        List<Map<String, Object>> menus = new ArrayList<Map<String, Object>>();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        List<Menu> menuTrees = menuMapper.queryMenuNodeById(param);
        List menuList = JsonUtils.toJsonArray(menuTrees);
        for (Object menuTree : menuList) {
            JSONObject treeNode = (JSONObject) menuTree;
            param.put("id", treeNode.getString("id"));
            List<Menu> nodes = menuMapper.queryMenuNodeById(param);
            if (nodes.size() > 0) {
                treeNode.put("isLeaf", false);
                treeNode.put("expanded", false);
            }
            menus.add(treeNode);
        }
        return menus;
    }

    /**
     * @param param
     * @return
     */
    public List<Menu> queryMenuNodeById_page(Map<String, Object> param) {
        return menuMapper.queryMenuNodeById_page(param);
    }

    /**
     * @param id
     * @return
     */
    public List<Map<String, Object>> query(String id) {
        return menuMapper.query(id);
    }

    /**
     * @param id
     * @return
     */
    public List<Menu> queryMenu(String id) {
        return getMenuNodeById(id);
    }

    /**
     * @param id
     * @return
     */
    protected List<Menu> getMenuNodeById(String id) {
        List<Menu> menus = new ArrayList<Menu>();
        List<Menu> roots = getChildNodes(id);
        menus.addAll(roots);
        for (Menu menuTree : roots) {
            List<Menu> nodes = getChildNodes(menuTree.getId());
            if (nodes.size() > 0) {
                menus.addAll(nodes);
                for (Menu node : nodes) {
                    menus.addAll(getMenuNodeById(node.getId()));
                }
            }
        }
        logger.info("递归处理完成...");
        return menus;
    }

    /**
     * @param id
     * @return
     */
    protected List<Menu> getChildNodes(String id) {
        if (StringUtils.isEmpty(id)) {
            id = "root";
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        return menuMapper.queryMenuNodeById(param);
    }

    public boolean saveMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof java.util.List) {
                List<Object> columns = (List<Object>) object;
                for (Object column : columns) {
                    Menu menuTree;
                    if (column instanceof Map) {
                        menuTree = GsonUtils.fromJson(GsonUtils.toJson(column), Menu.class);
                        menuTree.setRecCreator(UserUtils.getCurrent().getEname());
                        menuTree.setRecCreateTime(DateUtils.curDateTimeStr14());
                    } else {
                        menuTree = (Menu) column;
                        menuTree.setRecCreator(UserUtils.getCurrent().getEname());
                        menuTree.setRecCreateTime(DateUtils.curDateTimeStr14());
                    }
                    menuMapper.insertMenuNode(menuTree);
                }
            } else {
                Menu menuTree = GsonUtils.fromJson(GsonUtils.toJson(object), Menu.class);
                menuTree.setRecCreator(UserUtils.getCurrent().getEname());
                menuTree.setRecCreateTime(DateUtils.curDateTimeStr14());
                menuMapper.insertMenuNode(menuTree);
            }
        } catch (Exception e) {
            bool = false;
            logger.error("保存菜单出错 {} ", e);
        }
        return bool;
    }

    @SuppressWarnings("unchecked")
    public boolean deleteMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof List) {
                List<Object> objectTrees = (List<Object>) object;
                for (Object objectTree : objectTrees) {
                    Menu menuTree = GsonUtils.fromJson(GsonUtils.toJson(objectTree), Menu.class);
                    int menuChildCount = query(menuTree.getId()).size();
                    if (menuChildCount > 0) {
                        bool = false;
                        break;
                    }
                    menuMapper.deleteMenuNodeById(menuTree);
                }
            } else {
                Menu menuTree = GsonUtils.fromJson(GsonUtils.toJson(object), Menu.class);
                int menuChildCount = query(menuTree.getId()).size();
                if (menuChildCount > 0) {
                    bool = false;
                } else {
                    menuMapper.deleteMenuNodeById(menuTree);
                }
            }
        } catch (Exception e) {
            bool = false;
            logger.error("删除菜单出错 {} ", e);
        }
        return bool;
    }

    public boolean updateMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof List) {
                List<Object> objectTrees = (List<Object>) object;
                for (Object objectTree : objectTrees) {
                    Menu menuTree = GsonUtils.fromJson(GsonUtils.toJson(objectTree), Menu.class);
                    menuTree.setRecRevisor(UserUtils.getCurrent().getEname());
                    menuTree.setRecReviseTime(DateUtils.curDateTimeStr14());
                    menuMapper.updateMenuNodeById(menuTree);
                }
            } else {
                Menu menuTree = (Menu) object;
                menuTree.setRecRevisor(UserUtils.getCurrent().getEname());
                menuTree.setRecReviseTime(DateUtils.curDateTimeStr14());
                menuMapper.updateMenuNodeById(menuTree);
            }
        } catch (Exception e) {
            bool = false;
            logger.error("更新菜单出错 {} ", e);
        }
        return bool;
    }
}
