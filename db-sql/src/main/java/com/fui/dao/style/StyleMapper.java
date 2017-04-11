package com.fui.dao.style;

import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface StyleMapper {
	boolean updateMenuTypeAndStyleByUserId(Map<String, Object> beanMap);
}
