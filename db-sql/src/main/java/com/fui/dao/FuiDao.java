package com.fui.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

@Repository
public class FuiDao extends SqlSessionDaoSupport {

	public <T> T singleResult(String sqlName, Object param) {
		return getSqlSession().selectOne(sqlName, param);
	}

	public int count(String sqlName, Object param) {
		return singleResult(sqlName, param);
	}

	public <E> List<E> query(String sqlName, Object param) {
		return getSqlSession().selectList(sqlName, param);
	}

	public <E> List<E> query(String sqlName, Object param, int offset, int limit) {
		return getSqlSession().selectList(sqlName, param, new RowBounds(offset, limit));
	}

	public int insert(String sqlName, Object param) {
		return getSqlSession().insert(sqlName, param);
	}

	public int delete(String sqlName, Object param) {
		return getSqlSession().delete(sqlName, param);
	}

	public int update(String sqlName, Object param) {
		return getSqlSession().update(sqlName, param);
	}
}
