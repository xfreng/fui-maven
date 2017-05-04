package com.fui.service;

import com.fui.dao.page.PageInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("pageService")
public class PageService {
	private final Logger logger = LoggerFactory.getLogger(PageService.class);

	@Autowired
	private PageInfoMapper pageInfoMapper;

}
