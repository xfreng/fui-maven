package com.fui.dao;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.SqlSessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class FuiDao {
    private static final Logger logger = LoggerFactory.getLogger(FuiDao.class);

    @Autowired
    private SqlSession sqlSession;

    public <T> T singleResult(String sqlName, Object param) {
        return sqlSession.selectOne(sqlName, param);
    }

    public int count(String sqlName, Object param) {
        return singleResult(sqlName, param);
    }

    /**
     * 根据sql语句求总条数
     *
     * @param sqlName
     * @param param
     * @return 总条数
     */
    public int countBySql(String sqlName, Object param) {
        Connection connection = null;
        try {
            SqlSessionTemplate sqlSessionTemplate = ((SqlSessionTemplate) sqlSession);
            String sql = sqlSession.getConfiguration().getMappedStatement(sqlName).getBoundSql(param).getSql();
            connection = SqlSessionUtils.getSqlSession(sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(), sqlSessionTemplate.getPersistenceExceptionTranslator()).getConnection();
            String countSql = String.format("select count(*) from (%s) t", sql);
            PreparedStatement pst = connection.prepareStatement(countSql);
            if (param instanceof Map) {
                Map params = (Map) param;
                int index = 1;
                for (Object key : params.keySet()) {
                    Object value = params.get(key);
                    if (value == null) {
                        continue;
                    }
                    pst.setObject(index++, value);
                }
            }
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        } catch (SQLException e) {
            logger.error("获取sql语句出错{}", e);
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                logger.error(e.getMessage());
            }
        }
        return 0;
    }

    public <E> List<E> query(String sqlName, Object param) {
        return sqlSession.selectList(sqlName, param);
    }

    public <E> List<E> query(String sqlName, Object param, int offset, int limit) {
        return sqlSession.selectList(sqlName, param, new RowBounds(offset, limit));
    }

    public int insert(String sqlName, Object param) {
        return sqlSession.insert(sqlName, param);
    }

    public int delete(String sqlName, Object param) {
        return sqlSession.delete(sqlName, param);
    }

    public int update(String sqlName, Object param) {
        return sqlSession.update(sqlName, param);
    }
}
