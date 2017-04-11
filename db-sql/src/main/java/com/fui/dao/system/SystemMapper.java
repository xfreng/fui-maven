package com.fui.dao.system;

import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface SystemMapper {
	boolean updateById(Map<String, Object> beanMap);
}
