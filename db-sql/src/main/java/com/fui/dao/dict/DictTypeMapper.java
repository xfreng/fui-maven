package com.fui.dao.dict;

import com.fui.model.DictType;

import java.util.List;
import java.util.Map;

public interface DictTypeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    int insert(DictType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    int insertSelective(DictType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    DictType selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(DictType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table fui_dict_type
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(DictType record);

    List<DictType> query(Map<String, Object> param);

    List<DictType> queryDictForTree(String dictCode);
}