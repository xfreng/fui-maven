package com.fui.dao.menu;

import com.fui.model.MenuShortcut;

public interface MenuShortcutMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    int insert(MenuShortcut record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    int insertSelective(MenuShortcut record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    MenuShortcut selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(MenuShortcut record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_menu_shortcut
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(MenuShortcut record);
}