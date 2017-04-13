package com.fui.service;

import com.baosight.iplat4j.util.DateUtils;
import com.fui.common.MapUtils;
import com.fui.common.UserUtils;
import com.fui.dao.menu.MenuMapper;
import com.fui.model.Menu;
import org.apache.commons.lang.StringUtils;
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
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

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
        for (Menu menuTree : menuTrees) {
            Map<String, Object> treeNode = MapUtils.toMap(menuTree);
            param.put("id", menuTree.getId());
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

    @SuppressWarnings("unchecked")
    public boolean saveMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof java.util.List) {
                List<Object> columns = (List<Object>) object;
                for (Object column : columns) {
                    Menu menuTree = new Menu();
                    if (column instanceof java.util.Map) {
                        MapUtils.toBean((Map<String, Object>) column, menuTree);
                        menuTree.setRecCreator(UserUtils.getLoginId());
                        menuTree.setRecCreateTime(DateUtils.curDateTimeStr14());
                    } else {
                        menuTree = (Menu) column;
                        menuTree.setRecCreator(UserUtils.getLoginId());
                        menuTree.setRecCreateTime(DateUtils.curDateTimeStr14());
                    }
                    menuMapper.insertMenuNode(menuTree);
                }
            } else {
                Menu menuTree = new Menu();
                MapUtils.toBean((Map<String, Object>) object, menuTree);
                menuMapper.insertMenuNode(menuTree);
            }
        } catch (Exception e) {
            bool = false;
        }
        return bool;
    }

    @SuppressWarnings("unchecked")
    public boolean deleteMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof java.util.List) {
                List<Menu> menuTrees = (List<Menu>) object;
                for (Menu menuTree : menuTrees) {
                    int menuChildCount = query(menuTree.getId()).size();
                    if (menuChildCount > 0) {
                        bool = false;
                        break;
                    }
                    menuMapper.deleteMenuNodeById(menuTree);
                }
            } else {
                Menu menuTree = new Menu();
                MapUtils.toBean((Map<String, Object>) object, menuTree);
                int menuChildCount = query(menuTree.getId()).size();
                if (menuChildCount > 0) {
                    bool = false;
                } else {
                    menuMapper.deleteMenuNodeById(menuTree);
                }
            }
        } catch (Exception e) {
            bool = false;
        }
        return bool;
    }

    @SuppressWarnings("unchecked")
    public boolean updateMenu(Object object) {
        boolean bool = true;
        try {
            if (object instanceof java.util.List) {
                List<Menu> menuTrees = (List<Menu>) object;
                for (Menu menuTree : menuTrees) {
                    menuTree.setRecRevisor(UserUtils.getLoginId());
                    menuTree.setRecReviseTime(DateUtils.curDateTimeStr14());
                    menuMapper.updateMenuNodeById(menuTree);
                }
            } else {
                menuMapper.updateMenuNodeById((Menu) object);
            }
        } catch (Exception e) {
            bool = false;
        }
        return bool;
    }
}
