package com.fui.dao.menu;

import com.fui.model.Menu;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface MenuMapper {
    List<Map<String, Object>> query(@Param("userId") Long userId, @Param("node") String node);

    List<Menu> queryMenuNodeById(Map<String, Object> param);

    boolean insertMenuNode(Menu menuTree);

    boolean deleteMenuNodeById(Menu menuTree);

    boolean updateMenuNodeById(Menu menuTree);
}
