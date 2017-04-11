package com.fui.dao.user;

import com.fui.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {
	User findUserByName(@Param("ename") String ename);
}
