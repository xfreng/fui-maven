package com.fui.service;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fui.dao.page.PageInfoMapper;

@Service
public class PageService {
	private final Logger log = LoggerFactory.getLogger(PageService.class);
	@Resource
	private PageInfoMapper pageInfoMapper;

}
