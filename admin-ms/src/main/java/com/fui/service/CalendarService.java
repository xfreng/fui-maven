package com.fui.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fui.dao.calendar.CalendarMapper;

@Service
public class CalendarService {
	@Resource
	private CalendarMapper calendarMapper;

	public List<Map<String, Object>> query() {
		return calendarMapper.query();
	}

	/**
	 * @param id
	 * @return
	 */
	public Map<String, Object> getCalendarById(String id) {
		return calendarMapper.getCalendarById(id);
	}

	public boolean addCalendar(Map<String, Object> beanMap) {
		return calendarMapper.addCalendar(beanMap);
	}

	public boolean deleteCalendarById(String id) {
		return calendarMapper.deleteCalendarById(id);
	}

	public boolean updateCalendarById(Map<String, Object> beanMap) {
		return calendarMapper.updateCalendarById(beanMap);
	}
}
