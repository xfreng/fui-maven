package com.fui.service;

import com.fui.common.GsonUtils;
import com.fui.dao.dict.DictEntryMapper;
import com.fui.dao.dict.DictTypeMapper;
import com.fui.model.DictEntry;
import com.fui.model.DictType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("dictService")
public class DictService {
    private final Logger logger = LoggerFactory.getLogger(DictService.class);

    @Autowired
    private DictTypeMapper dictTypeMapper;
    @Autowired
    private DictEntryMapper dictEntryMapper;

    public List<DictType> queryDictForTree(String dictCode) {
        return dictTypeMapper.queryDictForTree(dictCode);
    }

    public List<DictType> queryDictType(Map<String, Object> param) {
        return dictTypeMapper.query(param);
    }

    public List<DictEntry> queryLayout(Map<String, Object> param) {
        return dictEntryMapper.query(param);
    }

    public List<DictEntry> loadDictData(Map<String, Object> param) {
        return dictEntryMapper.query(param);
    }

    public boolean saveDictType(Object object) {
        boolean bool = true;
        try {
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
                    doDb(_state, dictType);
                }
            } else {
                DictType dictType = GsonUtils.fromJson(GsonUtils.toJson(object), DictType.class);
                String _state = dictType.get_state();
                doDb(_state, dictType);
            }
        } catch (Exception e) {
            bool = false;
            logger.error("新增异常：{}", e.getMessage());
        }
        return bool;
    }

    private void doDb(String _state, DictType dictType) {
        if ("added".equals(_state)) {
            dictTypeMapper.insert(dictType);
        } else if ("removed".equals(_state)) {
            dictEntryMapper.deleteByPrimaryKey(dictType.getId());
            dictTypeMapper.deleteByPrimaryKey(dictType.getId());
        } else if ("modified".equals(_state)) {
            dictTypeMapper.updateByPrimaryKeySelective(dictType);
        }
    }

    private void doDb(String _state, DictEntry dictEntry) {
        if ("added".equals(_state)) {
            dictEntryMapper.insert(dictEntry);
        } else if ("removed".equals(_state)) {
            dictEntryMapper.deleteByPrimaryKey(dictEntry.getId());
        } else if ("modified".equals(_state)) {
            dictEntryMapper.updateByPrimaryKeySelective(dictEntry);
        }
    }

    public boolean saveDictEntry(String dictCode, Object object) {
        boolean bool = true;
        try {
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
                    dictEntry.setDictCode(dictCode);
                    String _state = dictEntry.get_state();
                    doDb(_state, dictEntry);
                }
            } else {
                DictEntry dictEntry = GsonUtils.fromJson(GsonUtils.toJson(object), DictEntry.class);
                dictEntry.setDictCode(dictCode);
                String _state = dictEntry.get_state();
                doDb(_state, dictEntry);
            }
        } catch (Exception e) {
            bool = false;
            logger.error("新增异常：{}", e.getMessage());
        }
        return bool;
    }
}
