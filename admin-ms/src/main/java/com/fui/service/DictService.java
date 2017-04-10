package com.fui.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fui.common.MapUtils;
import com.fui.dao.FuiDao;
import com.fui.dao.dict.DictEntryMapper;
import com.fui.dao.dict.DictTypeMapper;
import com.fui.model.DictEntry;
import com.fui.model.DictType;

@Service
public class DictService {
	private final Logger log = LoggerFactory.getLogger(DictService.class);
	@Autowired
	private FuiDao fuiDao;
	@Resource
	private DictTypeMapper dictTypeMapper;
	@Resource
	private DictEntryMapper dictEntryMapper;

	public List<DictType> queryDictForTree(Map<String, Object> param) {
		String sqlName = "com.fui.dao.dict.DictTypeMapper.queryDictForTree";
		log.info(sqlName);
		return fuiDao.query(sqlName, param);
	}

	public List<DictType> queryDictType(Map<String, Object> param, int offset, int limit) {
		String sqlName = "com.fui.dao.dict.DictTypeMapper.query";
		log.info(sqlName);
		return fuiDao.query(sqlName, param, offset, limit);
	}

	public List<DictEntry> queryLayout(Map<String, Object> param, int offset, int limit) {
		String sqlName = "com.fui.dao.dict.DictEntryMapper.query";
		log.info(sqlName);
		return fuiDao.query(sqlName, param, offset, limit);
	}
	
	public List<DictEntry> loadDictData(Map<String, Object> param){
		String sqlName = "com.fui.dao.dict.DictEntryMapper.query";
		log.info(sqlName);
		return fuiDao.query(sqlName, param);
	}

	@SuppressWarnings("unchecked")
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
					DictType dictType = new DictType();
					if (column instanceof java.util.Map) {
						Map<String, Object> param = (Map<String, Object>) column;
						MapUtils.toBean(param, dictType);
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
				DictType dictType = new DictType();
				MapUtils.toBean((Map<String, Object>) object, dictType);
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

	@SuppressWarnings("unchecked")
	public boolean saveDictEntry(Object object) {
		boolean bool = true;
		try {
			String insertSqlName = "com.fui.dao.dict.DictEntryMapper.insert";
			String deleteSqlName = "com.fui.dao.dict.DictEntryMapper.delete";
			String updateSqlName = "com.fui.dao.dict.DictEntryMapper.update";
			if (object instanceof java.util.List) {
				List<Object> columns = (List<Object>) object;
				for (Object column : columns) {
					DictEntry dictEntry = new DictEntry();
					if (column instanceof java.util.Map) {
						Map<String, Object> param = (Map<String, Object>) column;
						MapUtils.toBean(param, dictEntry);
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
				DictEntry dictEntry = new DictEntry();
				MapUtils.toBean((Map<String, Object>) object, dictEntry);
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
