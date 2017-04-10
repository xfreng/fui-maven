package com.fui.dao.user;

import org.apache.ibatis.annotations.Param;

import com.fui.model.User;

public interface UserMapper {
	User findUserByName(@Param("ename") String ename);
}
