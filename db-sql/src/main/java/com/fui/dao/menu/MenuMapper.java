package com.fui.dao.menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.fui.model.Menu;

public interface MenuMapper {
	List<Map<String, Object>> query(@Param("node") String node);

	Menu queryMenuNodeById(@Param("node") String node);

	List<Menu> queryMenuNodeById(Map<String, Object> param);

	boolean insertMenuNode(Menu menuTree);

	boolean deleteMenuNodeById(Menu menuTree);

	boolean updateMenuNodeById(Menu menuTree);
}
