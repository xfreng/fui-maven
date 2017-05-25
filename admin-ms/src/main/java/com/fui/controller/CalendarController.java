package com.fui.controller;

import com.fui.common.*;
import com.fui.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping(value = "/supervisor")
public class CalendarController extends AbstractSuperController {
    @Autowired
    private CalendarService calendarService;

    @RequestMapping("/calendar")
    public String calendar() {
        return "calendar/calopt";
    }

    @RequestMapping("/eventopt")
    public String eventopt() {
        String id = request.getParameter("id");
        Map<String, Object> param = calendarService.getCalendarById(id);
        request.setAttribute("param", param);
        return "calendar/event";
    }

    /**
     * 获取json数据（字段重新设置才会显示）
     *
     * @return
     */
    @RequestMapping(value = "/getCalendarJsonData", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getCalendarJsonData() throws Exception {
        List<Map<String, Object>> calList = calendarService.query();
        String json = GsonUtils.toJson(calList);
        return success(json);
    }

    @RequestMapping(value = "/event", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String event() throws Exception {
        String message = "";
        String action = request.getParameter("action");
        if ("add".equals(action)) {
            String events = request.getParameter("event");

            String isallday = request.getParameter("isallday");
            String isend = request.getParameter("isend");

            String startdate = request.getParameter("startdate");
            String enddate = request.getParameter("enddate");

            String s_time = request.getParameter("s_hour") + ":" + request.getParameter("s_minute") + ":00";
            String e_time = request.getParameter("e_hour") + ":" + request.getParameter("e_minute") + ":00";

            String starttime = "";
            String endtime = "";
            if ("1".equals(isallday) && "1".equals(isend)) {
                starttime = startdate;
                endtime = enddate;
            } else if ("1".equals(isallday) && StringUtils.isNullOrEmpty(isend)) {
                starttime = startdate;
            } else if (StringUtils.isNullOrEmpty(isallday) && "1".equals(isend)) {
                starttime = startdate + " " + s_time;
                endtime = enddate + " " + e_time;
            } else {
                starttime = startdate + " " + s_time;
            }

            String color = request.getParameter("color");

            isallday = "1".equals(isallday) ? "1" : "0";

            Map<String, Object> param = new HashMap<String, Object>();
            param.put("title", events);
            param.put("starttime", starttime);
            param.put("endtime", endtime);
            param.put("allday", isallday);
            param.put("color", color);

            boolean bool = calendarService.addCalendar(param);
            if (bool) {
                message = "1";
            } else {
                message = "写入失败！";
            }
        } else if ("edit".equals(action)) {
            String id = request.getParameter("id");
            if ("0".equals(id)) {
                message = "事件不存在！";
            } else {
                String events = request.getParameter("event");

                String isallday = request.getParameter("isallday");
                String isend = request.getParameter("isend");

                String startdate = request.getParameter("startdate");
                String enddate = request.getParameter("enddate");

                String s_time = request.getParameter("s_hour") + ":" + request.getParameter("s_minute") + ":00";
                String e_time = request.getParameter("e_hour") + ":" + request.getParameter("e_minute") + ":00";

                String starttime = "";
                String endtime = "";
                if ("1".equals(isallday) && "1".equals(isend)) {
                    starttime = startdate;
                    endtime = enddate;
                } else if ("1".equals(isallday) && StringUtils.isNullOrEmpty(isend)) {
                    starttime = startdate;
                    endtime = "";
                } else if (StringUtils.isNullOrEmpty(isallday) && "1".equals(isend)) {
                    starttime = startdate + " " + s_time;
                    endtime = enddate + " " + e_time;
                } else {
                    starttime = startdate + " " + s_time;
                    endtime = "";
                }

                isallday = "1".equals(isallday) ? "1" : "0";
                String color = request.getParameter("color");

                Map<String, Object> param = new HashMap<String, Object>();
                param.put("id", id);
                param.put("title", events);
                param.put("starttime", starttime);
                param.put("endtime", endtime);
                param.put("allday", isallday);
                param.put("color", color);

                boolean bool = calendarService.updateCalendarById(param);
                if (bool) {
                    message = "1";
                } else {
                    message = "更新出错！";
                }
            }
        } else if ("del".equals(action)) {
            String id = request.getParameter("id");
            if (StringUtils.isNotEmpty(id)) {
                boolean bool = calendarService.deleteCalendarById(id);
                if (bool) {
                    message = "1";
                } else {
                    message = "删除出错！";
                }
            } else {
                message = "事件不存在！";
            }
        } else if ("drag".equals(action)) {
            String id = request.getParameter("id");
            int daydiff = Integer.valueOf(request.getParameter("daydiff"));
            int minudiff = Integer.valueOf(request.getParameter("minudiff"));
            String allday = request.getParameter("allday");
            Map<String, Object> row = calendarService.getCalendarById(id);
            String dbAllday = (String) row.get("allday");
            row.put("allday", "true".equals(dbAllday) ? 1 : 0);
            Calendar cal = Calendar.getInstance();
            String starttime = (String) row.get("start");
            String endtime = (String) row.get("end");
            if ("true".equals(allday)) {
                if (StringUtils.isNullOrEmpty(endtime)) {
                    cal.setTime(getDate(starttime));
                    cal.add(Calendar.DATE, daydiff);
                    row.put("starttime", getDateStr(starttime, cal.getTime()));
                } else {
                    cal.setTime(getDate(starttime));
                    cal.add(Calendar.DATE, daydiff);
                    row.put("starttime", getDateStr(starttime, cal.getTime()));
                    cal.setTime(DateUtils.getDate10(endtime));
                    cal.add(Calendar.DATE, daydiff);
                    row.put("endtime", getDateStr(endtime, cal.getTime()));
                }
            } else {
                if (StringUtils.isNullOrEmpty(endtime)) {
                    cal.setTime(getDate(starttime));
                    cal.add(Calendar.DATE, daydiff);
                    cal.add(Calendar.MINUTE, minudiff);
                    row.put("starttime", getDateStr(starttime, cal.getTime()));
                } else {
                    cal.setTime(DateUtils.getDate10(starttime));
                    cal.add(Calendar.DATE, daydiff);
                    cal.add(Calendar.MINUTE, minudiff);
                    row.put("starttime", getDateStr(starttime, cal.getTime()));
                    cal.setTime(DateUtils.getDate10(endtime));
                    cal.add(Calendar.DATE, daydiff);
                    cal.add(Calendar.MINUTE, minudiff);
                    row.put("endtime", getDateStr(endtime, cal.getTime()));
                }
            }
            boolean bool = calendarService.updateCalendarById(row);
            if (bool) {
                message = "1";
            } else {
                message = "更新出错！";
            }
        } else if ("resize".equals(action)) {
            String id = request.getParameter("id");
            int daydiff = Integer.valueOf(request.getParameter("daydiff"));
            int minudiff = Integer.valueOf(request.getParameter("minudiff"));
            Map<String, Object> row = calendarService.getCalendarById(id);
            String dbAllday = (String) row.get("allday");
            row.put("allday", "true".equals(dbAllday) ? 1 : 0);
            Calendar cal = Calendar.getInstance();
            String starttime = (String) row.get("start");
            String endtime = (String) row.get("end");
            if (StringUtils.isNullOrEmpty(endtime)) {
                cal.setTime(getDate(starttime));
                cal.add(Calendar.DATE, daydiff);
                cal.add(Calendar.MINUTE, minudiff);
                row.put("endtime", getDateStr(starttime, cal.getTime()));
            } else {
                cal.setTime(getDate(endtime));
                cal.add(Calendar.DATE, daydiff);
                cal.add(Calendar.MINUTE, minudiff);
                row.put("endtime", getDateStr(endtime, cal.getTime()));
            }
            row.put("starttime", starttime);
            boolean bool = calendarService.updateCalendarById(row);
            if (bool) {
                message = "1";
            } else {
                message = "更新出错！";
            }
        }
        return success(message);
    }

    private Date getDate(String datetime) {
        Date date = null;
        if (StringUtils.isNotEmpty(datetime)) {
            int length = datetime.length();
            if (length > 10) {
                date = DateUtils.getDate19(datetime);
            } else {
                date = DateUtils.getDate10(datetime);
            }
        }
        return date;
    }

    private String getDateStr(String datetime, Date date) {
        String dateStr = null;
        if (StringUtils.isNotEmpty(datetime)) {
            int length = datetime.length();
            if (length > 10) {
                dateStr = DateUtils.getDateStr19(date);
            } else {
                dateStr = DateUtils.getDateStr10(date);
            }
        }
        return dateStr;
    }
}
