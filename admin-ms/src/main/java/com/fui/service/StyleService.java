package com.fui.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fui.dao.style.StyleMapper;

@Service
public class StyleService{
	@Resource
	private StyleMapper styleMapper;
	/**
	 * @param beanMap
	 * @return
	 */
	public boolean updateMenuTypeAndStyleByUserId(Map<String, Object> beanMap) {
		return styleMapper.updateMenuTypeAndStyleByUserId(beanMap);
	}
}
