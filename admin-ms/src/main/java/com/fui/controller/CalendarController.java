package com.fui.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fui.common.DateUtils;
import com.fui.common.JSON;
import com.fui.common.StringUtils;
import com.fui.service.CalendarService;

@Controller
public class CalendarController {
	@Resource
	private CalendarService calendarService;
	/**
	 * 插入
	 * @param param
	 * @return
	 */
	private boolean insertCalendar(Map<String, Object> param){
		return calendarService.addCalendar(param);
	}
	/**
	 * 更新
	 * @param param
	 * @return
	 */
	private boolean updateCalendar(Map<String, Object> param){
		return calendarService.updateCalendarById(param);
	}
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	private boolean deleteCalendar(String id){
		return calendarService.deleteCalendarById(id);
	}
	@RequestMapping("/eventopt")
	public String event(HttpServletRequest request) {
		String id = request.getParameter("id");
		Map<String, Object> param = calendarService.getCalendarById(id);
		request.setAttribute("param", param);
		return "calendar/event";
	}
	/**
	 * 获取json数据（字段重新设置才会显示）
	 * @return
	 */
	@RequestMapping("/getCalendarJsonData")
	public void getCalendarJsonData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<Map<String, Object>> callist = calendarService.query();
		String json = JSON.encode(callist);
		response.getWriter().write(json);
	}
	
	@RequestMapping("/event")
	public void event(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String msg = "";
		String action = request.getParameter("action");
		if("add".equals(action)){
			String events = request.getParameter("event");

			String isallday = request.getParameter("isallday");
			String isend = request.getParameter("isend");

			String startdate = request.getParameter("startdate");
			String enddate = request.getParameter("enddate");

			String s_time = request.getParameter("s_hour")+":"+request.getParameter("s_minute")+":00";
			String e_time = request.getParameter("e_hour")+":"+request.getParameter("e_minute")+":00";

			String starttime = "";
			String endtime = "";
			if("1".equals(isallday) && "1".equals(isend)){
				starttime = startdate;
				endtime = enddate;
			}else if("1".equals(isallday) && StringUtils.isNullOrEmpty(isend)){
				starttime = startdate;
			}else if(StringUtils.isNullOrEmpty(isallday) && "1".equals(isend)){
				starttime = startdate+" "+s_time;
				endtime = enddate+" "+e_time;
			}else{
				starttime = startdate+" "+s_time;
			}

			String color = request.getParameter("color");

			isallday = "1".equals(isallday)?"1":"0";
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("title", events);
			param.put("starttime", starttime);
			param.put("endtime", endtime);
			param.put("allday", isallday);
			param.put("color", color);
			
			boolean bool = insertCalendar(param);
			if(bool){
				msg = "1";
			}else{
				msg = "写入失败！";
			}
		}else if("edit".equals(action)){
			String id = request.getParameter("id");
		    if("0".equals(id)){ 
		        msg = "事件不存在！"; 
		    }else{
			    String events = request.getParameter("event");
			 
			    String isallday = request.getParameter("isallday");
			    String isend = request.getParameter("isend");
			 
			    String startdate = request.getParameter("startdate");
			    String enddate = request.getParameter("enddate");
			 
			    String s_time = request.getParameter("s_hour")+":"+request.getParameter("s_minute")+":00";
			    String e_time = request.getParameter("e_hour")+":"+request.getParameter("e_minute")+":00";
			    
			    String starttime = "";
			    String endtime = "";
			    if("1".equals(isallday) && "1".equals(isend)){ 
			        starttime = startdate; 
			        endtime = enddate;
			    }else if("1".equals(isallday) && StringUtils.isNullOrEmpty(isend)){
			        starttime = startdate; 
			        endtime = ""; 
			    }else if(StringUtils.isNullOrEmpty(isallday) && "1".equals(isend)){
			        starttime = startdate+" "+s_time; 
			        endtime = enddate+" "+e_time; 
			    }else{ 
			        starttime = startdate+" "+s_time; 
			        endtime = ""; 
			    } 
			    
			    isallday = "1".equals(isallday)?"1":"0";
			    String color = request.getParameter("color");
				
			    Map<String, Object> param = new HashMap<String, Object>();
				param.put("id", id);
				param.put("title", events);
				param.put("starttime", starttime);
				param.put("endtime", endtime);
				param.put("allday", isallday);
				param.put("color", color);
			    
				boolean bool = updateCalendar(param);
			    if(bool){
			        msg = "1"; 
			    }else{ 
			        msg = "更新出错！";     
			    }
		    }
		}else if("del".equals(action)){
			String id = request.getParameter("id");
		    if(StringUtils.isNotEmpty(id)){
		        boolean bool = deleteCalendar(id);
		        if(bool){ 
		            msg = "1"; 
		        }else{ 
		            msg = "删除出错！";     
		        } 
		    }else{ 
		        msg = "事件不存在！"; 
		    } 
		}else if("drag".equals(action)){
			String id = request.getParameter("id");
		    int daydiff = Integer.valueOf(request.getParameter("daydiff"));
		    int minudiff = Integer.valueOf(request.getParameter("minudiff"));
		    String allday = request.getParameter("allday");
		    Map<String, Object> row = calendarService.getCalendarById(id);
		    String dbAllday = (String)row.get("allday");
		    row.put("allday", "true".equals(dbAllday)?1:0);
		    Calendar cal = Calendar.getInstance();
		    String starttime = (String)row.get("start");
		    String endtime = (String)row.get("end");
		    if("true".equals(allday)){
		        if(StringUtils.isNullOrEmpty(endtime)){
		        	cal.setTime(getDate(starttime));
		        	cal.add(Calendar.DATE, daydiff);
		        	row.put("starttime", getDateStr(starttime,cal.getTime()));
		        }else{ 
		        	cal.setTime(getDate(starttime));
		        	cal.add(Calendar.DATE, daydiff);
		        	row.put("starttime", getDateStr(starttime,cal.getTime()));
		        	cal.setTime(DateUtils.getDate10(endtime));
		        	cal.add(Calendar.DATE, daydiff);
		        	row.put("endtime", getDateStr(endtime,cal.getTime()));
		        }
		    }else{
		        if(StringUtils.isNullOrEmpty(endtime)){
		        	cal.setTime(getDate(starttime));
		        	cal.add(Calendar.DATE, daydiff);
		        	cal.add(Calendar.MINUTE, minudiff);
		        	row.put("starttime", getDateStr(starttime,cal.getTime()));
		        }else{
		        	cal.setTime(DateUtils.getDate10(starttime));
		        	cal.add(Calendar.DATE, daydiff);
		        	cal.add(Calendar.MINUTE, minudiff);
		        	row.put("starttime", getDateStr(starttime,cal.getTime()));
		        	cal.setTime(DateUtils.getDate10(endtime));
		        	cal.add(Calendar.DATE, daydiff);
		        	cal.add(Calendar.MINUTE, minudiff);
		        	row.put("endtime", getDateStr(endtime,cal.getTime()));
		        }
		    }
		    boolean bool = updateCalendar(row);
		    if(bool){ 
		        msg = "1"; 
		    }else{ 
		        msg = "更新出错！";     
		    } 
		}else if("resize".equals(action)){
			String id = request.getParameter("id");
		    int daydiff = Integer.valueOf(request.getParameter("daydiff"));
		    int minudiff = Integer.valueOf(request.getParameter("minudiff"));
		    Map<String, Object> row = calendarService.getCalendarById(id);
		    String dbAllday = (String)row.get("allday");
		    row.put("allday", "true".equals(dbAllday)?1:0);
		    Calendar cal = Calendar.getInstance();
		    String starttime = (String)row.get("start");
		    String endtime = (String)row.get("end");
		    if(StringUtils.isNullOrEmpty(endtime)){
	        	cal.setTime(getDate(starttime));
	        	cal.add(Calendar.DATE, daydiff);
	        	cal.add(Calendar.MINUTE, minudiff);
	        	row.put("endtime", getDateStr(starttime,cal.getTime()));
	        }else{
	        	cal.setTime(getDate(endtime));
	        	cal.add(Calendar.DATE, daydiff);
	        	cal.add(Calendar.MINUTE, minudiff);
	        	row.put("endtime", getDateStr(endtime,cal.getTime()));
	        }
		    row.put("starttime", starttime);
		    boolean bool = updateCalendar(row);
		    if(bool){ 
		        msg = "1"; 
		    }else{ 
		        msg = "更新出错！";     
		    } 
		}
		response.getWriter().write(msg);
	}
	
	private Date getDate(String datetime){
		Date date = null;
		if(StringUtils.isNotEmpty(datetime)){
			int length = datetime.length();
			if(length > 10){
				date = DateUtils.getDate19(datetime);
			}else{
				date = DateUtils.getDate10(datetime);
			}
		}
		return date;
	}
	
	private String getDateStr(String datetime,Date date){
		String dateStr = null;
		if(StringUtils.isNotEmpty(datetime)){
			int length = datetime.length();
			if(length > 10){
				dateStr = DateUtils.getDateStr19(date);
			}else{
				dateStr = DateUtils.getDateStr10(date);
			}
		}
		return dateStr;
	}
}
