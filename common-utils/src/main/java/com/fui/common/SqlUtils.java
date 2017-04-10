package com.fui.common;

public class SqlUtils {
	public static String getCountSql(String sqlName) {
		String sql = "count";
		String suffix = "query";
		if (sqlName.endsWith(suffix)) {
			int start = sqlName.indexOf(suffix);
			sql = sqlName.substring(0, start) + sql;
		} else if (sqlName.indexOf(suffix) != -1) {
			int start = sqlName.indexOf(suffix) + suffix.length();
			sql = sqlName.substring(0, start - suffix.length()) + sql + sqlName.substring(start);
		}
		return sql;
	}
}
