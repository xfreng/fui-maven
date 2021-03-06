package com.fui.dao.user;

import com.fui.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    int insert(User record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    int insertSelective(User record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    User selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(User record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_user
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(User record);

    /**
     * 根据工号查询用户信息
     *
     * @param userCode
     * @return 用户信息
     */
    User findUserByCode(@Param("userCode") String userCode);

    /**
     * 分页查询用户信息
     *
     * @param params
     * @return 用户列表
     */
    List<User> getUserList(Map<String, Object> params);
}