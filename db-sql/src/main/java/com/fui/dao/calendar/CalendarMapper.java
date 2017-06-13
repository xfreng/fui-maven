package com.fui.dao.calendar;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface CalendarMapper {
	List<Map<String, Object>> query();
	Map<String, Object> getCalendarById(@Param("id") String id);
	boolean addCalendar(Map<String, Object> beanMap);
	boolean deleteCalendarById(@Param("id") String id);
	boolean updateCalendarById(Map<String, Object> beanMap);
}
