package com.fui.service;

import com.alibaba.fastjson.JSONArray;
import com.baosight.iplat4j.util.DateUtils;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import com.fui.common.JsonUtils;
import com.fui.common.UserUtils;
import com.fui.dao.menu.MenuMapper;
import com.fui.dao.menu.MenuShortcutMapper;
import com.fui.model.Menu;
import com.fui.model.MenuShortcut;
import com.fui.model.User;
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
    @Autowired
    private MenuShortcutMapper menuShortcutMapper;

    /**
     * @param id
     * @return
     */
    public List<Map<String, Object>> queryMenuNodeById(String id) {
        List<Map<String, Object>> menus = new ArrayList<Map<String, Object>>();
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        List<Menu> menuTrees = menuMapper.queryMenuNodeBySelective(param);
        List menuList = JsonUtils.toJsonArray(menuTrees);
        for (Object menuTree : menuList) {
            JSONObject treeNode = (JSONObject) menuTree;
            param.put("id", treeNode.getString("id"));
            List<Menu> nodes = menuMapper.queryMenuNodeBySelective(param);
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
    public List<Menu> queryMenuNodeBySelective(Map<String, Object> param) {
        return menuMapper.queryMenuNodeBySelective(param);
    }

    /**
     * @param param
     * @return
     */
    public List queryShortcutBySelective(Map<String, Object> param) {
        return menuMapper.queryShortcutBySelective(param);
    }

    /**
     * @param id
     * @return
     */
    public List<Map<String, Object>> query(String id) {
        return menuMapper.query(UserUtils.getCurrent().getId(), id);
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
            id = Constants.TREE_ROOT_ID;
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", id);
        return menuMapper.queryMenuNodeBySelective(param);
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

    public JSONObject saveShortcut(String submitData) {
        JSONObject json = new JSONObject();
        User user = UserUtils.getCurrent();
        List columnsList = GsonUtils.fromJson(submitData, JSONArray.class);
        int size = columnsList.size();
        try {
            Long userId = user.getId();
            for (int i = 0; i < size; i++) {
                Map item = (Map) columnsList.get(i);
                String state = (String) item.get("_state");
                MenuShortcut menuShortcut = GsonUtils.fromJson(GsonUtils.toJson(columnsList.get(i)), MenuShortcut.class);
                menuShortcut.setUserId(userId);
                if ("added".equals(state)) {
                    menuShortcutMapper.insert(menuShortcut);
                } else if ("modified".equals(state)) {
                    menuShortcutMapper.updateByPrimaryKeySelective(menuShortcut);
                }
            }
            json.put("message", "保存成功！");
        } catch (Exception e) {
            json.put("message", "保存出错！");
            logger.error("保存出错：{}", e);
        }
        return json;
    }

    public JSONObject deleteShortcut(String ids) {
        JSONObject json = new JSONObject();
        String[] idArgs = ids.split(",");
        try {
            for (String id : idArgs) {
                menuShortcutMapper.deleteByPrimaryKey(Long.valueOf(id));
            }
            json.put("message", "删除成功！");
        } catch (Exception e) {
            json.put("message", "删除出错！");
            logger.error("删除出错：{}", e);
        }
        return json;
    }
}
