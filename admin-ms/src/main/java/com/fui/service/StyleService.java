package com.fui.service;

import com.fui.dao.style.StyleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("styleService")
public class StyleService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private StyleMapper styleMapper;
	/**
	 * @param beanMap
	 * @return
	 */
	public boolean updateMenuTypeAndStyleByUserId(Map<String, Object> beanMap) {
		return styleMapper.updateMenuTypeAndStyleByUserId(beanMap);
	}
}
