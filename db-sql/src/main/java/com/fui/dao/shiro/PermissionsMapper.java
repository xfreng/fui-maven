package com.fui.dao.shiro;

import com.fui.model.Permissions;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface PermissionsMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    int insert(Permissions record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    int insertSelective(Permissions record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    Permissions selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Permissions record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_permissions
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Permissions record);

    /**
     * 查询所有权限，用于给角色配置权限
     *
     * @return 所有权限信息
     */
    List<Permissions> selectAllRight();

    /**
     * 查询指定id对应的权限
     *
     * @param id 主键
     * @return 相匹配的权限信息
     */
    List<Permissions> selectByKey(Long id);

    /**
     * 查询根目录权限
     *
     * @return 所有根目录权限信息
     */
    List<Permissions> selectRootRight();

    /**
     * 根据权限编码查询权限信息
     *
     * @param rightCode
     * @return 角色信息
     */
    Permissions findRightsByCode(@Param("rightCode") String rightCode);

    /**
     * 分页查询权限信息
     *
     * @param params
     * @return 权限列表
     */
    List<Permissions> getRightsList(Map<String, Object> params);
}