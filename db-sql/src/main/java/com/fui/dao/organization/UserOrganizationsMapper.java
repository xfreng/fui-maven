package com.fui.dao.organization;

import com.fui.model.UserOrganizations;

public interface UserOrganizationsMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    int insert(UserOrganizations record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    int insertSelective(UserOrganizations record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    UserOrganizations selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(UserOrganizations record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user_organizations
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(UserOrganizations record);
}