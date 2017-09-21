package com.fui.dao.shiro;

import com.fui.model.Roles;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RolesMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    int insert(Roles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    int insertSelective(Roles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    Roles selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Roles record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_roles
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Roles record);

    /**
     * 根据角色编码查询角色信息
     *
     * @param roleCode
     * @return 角色信息
     */
    Roles findRolesByCode(@Param("roleCode") String roleCode);

    /**
     * 分页查询角色信息
     *
     * @param params
     * @return 角色列表
     */
    List<Roles> getRolesList(Map<String, Object> params);

    /**
     * 获取用户权限
     *
     * @param userId
     * @return 用户权限
     */
    List<String> getUserRights(Long userId);

    /**
     * 获取用户所有角色
     *
     * @param userId
     * @return 角色列表
     */
    List<String> getRolesByUserId(Long userId);
}