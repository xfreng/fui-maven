package com.fui.dao.shiro;

import com.fui.model.UserRoles;

import java.util.List;

public interface UserRolesMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    int insert(UserRoles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    int insertSelective(UserRoles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    UserRoles selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(UserRoles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_roles
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(UserRoles record);

    /**
     * 根据用户id查询对应角色
     *
     * @param userId 用户id
     * @return 角色列表
     */
    List<Long> selectRolesByAgentId(Long userId);
}