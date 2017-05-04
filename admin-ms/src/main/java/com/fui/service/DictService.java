package com.fui.service;

import com.fui.common.GsonUtils;
import com.fui.dao.FuiDao;
import com.fui.dao.dict.DictEntryMapper;
import com.fui.dao.dict.DictTypeMapper;
import com.fui.model.DictEntry;
import com.fui.model.DictType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("dictService")
public class DictService {
    private final Logger logger = LoggerFactory.getLogger(DictService.class);

    @Autowired
    private FuiDao fuiDao;
    @Autowired
    private DictTypeMapper dictTypeMapper;
    @Autowired
    private DictEntryMapper dictEntryMapper;

    public List<DictType> queryDictForTree(Map<String, Object> param) {
        String sqlName = "com.fui.dao.dict.DictTypeMapper.queryDictForTree";
        logger.info(sqlName);
        return fuiDao.query(sqlName, param);
    }

    public Map<String, Object> queryDictType(Map<String, Object> param, int offset, int limit) {
        Map<String, Object> jsonData = new HashMap<String, Object>();
        String sqlName = "com.fui.dao.dict.DictTypeMapper.query";
        logger.info(sqlName);
        int count = fuiDao.countBySql(sqlName, param);
        List<DictType> dictTypeList = fuiDao.query(sqlName, param, offset, limit);
        jsonData.put("total", count);
        jsonData.put("data", dictTypeList);
        return jsonData;
    }

    public Map<String, Object> queryLayout(Map<String, Object> param, int offset, int limit) {
        Map<String, Object> jsonData = new HashMap<String, Object>();
        String sqlName = "com.fui.dao.dict.DictEntryMapper.query";
        logger.info(sqlName);
        int count = fuiDao.countBySql(sqlName, param);
        List<DictEntry> dictEntryList = fuiDao.query(sqlName, param, offset, limit);
        jsonData.put("total", count);
        jsonData.put("data", dictEntryList);
        return jsonData;
    }

    public List<DictEntry> loadDictData(Map<String, Object> param) {
        String sqlName = "com.fui.dao.dict.DictEntryMapper.query";
        logger.info(sqlName);
        return fuiDao.query(sqlName, param);
    }

    public boolean saveDictType(Object object) {
        boolean bool = true;
        try {
            String insertSqlName = "com.fui.dao.dict.DictTypeMapper.insert";
            String deleteSqlName = "com.fui.dao.dict.DictTypeMapper.delete";
            String deleteDictEntrySqlName = "com.fui.dao.dict.DictEntryMapper.deleteById";
            String updateSqlName = "com.fui.dao.dict.DictTypeMapper.update";
            if (object instanceof java.util.List) {
                List<Object> columns = (List<Object>) object;
                for (Object column : columns) {
                    DictType dictType;
                    if (column instanceof java.util.Map) {
                        Map<String, Object> param = (Map<String, Object>) column;
                        dictType = GsonUtils.fromJson(GsonUtils.toJson(param), DictType.class);
                    } else {
                        dictType = (DictType) column;
                    }
                    String _state = dictType.get_state();
                    if ("added".equals(_state)) {
                        fuiDao.insert(insertSqlName, dictType);
                    } else if ("removed".equals(_state)) {
                        DictEntry dictEntry = new DictEntry();
                        dictEntry.setId(dictType.getId());
                        fuiDao.delete(deleteDictEntrySqlName, dictEntry);
                        fuiDao.delete(deleteSqlName, dictType);
                    } else if ("modified".equals(_state)) {
                        fuiDao.update(updateSqlName, dictType);
                    }
                }
            } else {
                DictType dictType = GsonUtils.fromJson(GsonUtils.toJson(object), DictType.class);
                String _state = dictType.get_state();
                if ("added".equals(_state)) {
                    fuiDao.insert(insertSqlName, dictType);
                } else if ("removed".equals(_state)) {
                    DictEntry dictEntry = new DictEntry();
                    dictEntry.setId(dictType.getId());
                    fuiDao.delete(deleteDictEntrySqlName, dictEntry);
                    fuiDao.delete(deleteSqlName, dictType);
                } else if ("modified".equals(_state)) {
                    fuiDao.update(updateSqlName, dictType);
                }
            }
        } catch (Exception e) {
            bool = false;
        }
        return bool;
    }

    public boolean saveDictEntry(Object object) {
        boolean bool = true;
        try {
            String insertSqlName = "com.fui.dao.dict.DictEntryMapper.insert";
            String deleteSqlName = "com.fui.dao.dict.DictEntryMapper.delete";
            String updateSqlName = "com.fui.dao.dict.DictEntryMapper.update";
            if (object instanceof java.util.List) {
                List<Object> columns = (List<Object>) object;
                for (Object column : columns) {
                    DictEntry dictEntry;
                    if (column instanceof java.util.Map) {
                        Map<String, Object> param = (Map<String, Object>) column;
                        dictEntry = GsonUtils.fromJson(GsonUtils.toJson(param), DictEntry.class);
                    } else {
                        dictEntry = (DictEntry) column;
                    }
                    String _state = dictEntry.get_state();
                    if ("added".equals(_state)) {
                        fuiDao.insert(insertSqlName, dictEntry);
                    } else if ("removed".equals(_state)) {
                        fuiDao.delete(deleteSqlName, dictEntry);
                    } else if ("modified".equals(_state)) {
                        fuiDao.update(updateSqlName, dictEntry);
                    }
                }
            } else {
                DictEntry dictEntry = GsonUtils.fromJson(GsonUtils.toJson(object), DictEntry.class);
                String _state = dictEntry.get_state();
                if ("added".equals(_state)) {
                    fuiDao.insert(insertSqlName, dictEntry);
                } else if ("removed".equals(_state)) {
                    fuiDao.delete(deleteSqlName, dictEntry);
                } else if ("modified".equals(_state)) {
                    fuiDao.update(updateSqlName, dictEntry);
                }
            }
        } catch (Exception e) {
            bool = false;
        }
        return bool;
    }
}
