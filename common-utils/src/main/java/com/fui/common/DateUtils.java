package com.fui.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author  sf.xiong
 * @version 创建时间：2011-4-7 下午01:46:10
 */
public class DateUtils {
	private static String PATTERNYMDHMS="yyyyMMddHHmmss";
	private static String PATTERN_YMDHMS="yyyy-MM-dd HH:mm:ss";
	private static String PATTERN_YMD="yyyy-MM-dd";
	/**
	 * 返回默认格式的当前时间
	 * @return String
	 */
	public static String curDate19(){
		return new SimpleDateFormat(DateUtils.PATTERN_YMDHMS).format(new Date(System.currentTimeMillis()));
	}
	/**
	 * 返回默认格式的当前时间
	 * @return String
	 */
	public static String curDate10(){
		return new SimpleDateFormat(DateUtils.PATTERN_YMD).format(new Date(System.currentTimeMillis()));
	}
	/**
	 * 返回默认格式的当前时间
	 * @return String
	 */
	public static String curDate14(){
		return new SimpleDateFormat(DateUtils.PATTERNYMDHMS).format(new Date(System.currentTimeMillis()));
	}
	/**
	 * 返回默认格式的时间
	 * @return Date
	 */
	public static String getDateStr10(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat(DateUtils.PATTERN_YMD);
		return sdf.format(date);
	}
	/**
	 * 返回默认格式的时间
	 * @return Date
	 */
	public static String getDateStr19(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat(DateUtils.PATTERN_YMDHMS);
		return sdf.format(date);
	}
	/**
	 * 返回默认格式的时间
	 * @return Date
	 */
	public static Date getDate10(String date){
		SimpleDateFormat sdf = new SimpleDateFormat(DateUtils.PATTERN_YMD);
		try {
			return sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 返回默认格式的时间
	 * @return Date
	 */
	public static Date getDate19(String date){
		SimpleDateFormat sdf = new SimpleDateFormat(DateUtils.PATTERN_YMDHMS);
		try {
			return sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
}
