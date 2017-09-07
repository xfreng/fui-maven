package com.fui.controller;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import com.fui.common.StringUtils;
import com.fui.model.DictEntry;
import com.fui.model.DictType;
import com.fui.service.DictService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sf.xiong on 2017-01-11.
 */
@Controller
@RequestMapping(value = "/supervisor/dict")
public class DictController extends AbstractSuperController {
    @Autowired
    private DictService dictService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("dict/dict_manager_mainframe");
        return init(mv);
    }

    @RequestMapping("/dictManager")
    public String dictManager() {
        return "dict/dict_manager";
    }

    @RequestMapping("/dictImportManager")
    public String dictImportManager() {
        return "dict/dict_import_manager";
    }

    @RequestMapping(value = "/queryDictForTree", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String queryDictForTree() throws Exception {
        String dictCode = request.getParameter("dictCode");
        List<DictType> dictTreeList = dictService.queryDictForTree(dictCode);
        return success(dictTreeList, "data");
    }

    @RequestMapping(value = "/queryDictType", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String queryDictType(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                                @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) throws Exception {
        String dictTypeId = request.getParameter("dictTypeId");
        String dictTypeName = request.getParameter("dictTypeName");
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", dictTypeId);
        param.put("dictTypeName", dictTypeName);
        PageHelper.startPage(currPage, pageSize);
        List<DictType> dictTypeList = dictService.queryDictType(param);
        PageInfo<DictType> pageInfo = createPagination(dictTypeList);
        return success(dictTypeList, pageInfo.getTotal());
    }

    @RequestMapping(value = "/saveDictType", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String saveDictType() throws Exception {
        String saveJSON = request.getParameter("data");
        Object object = GsonUtils.fromJson(saveJSON, Object.class);
        boolean bool = dictService.saveDictType(object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        return success(param);
    }

    @RequestMapping(value = "/saveDictEntry", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String saveDictEntry(String dictCode) throws Exception {
        String saveJSON = request.getParameter("data");
        Object object = GsonUtils.fromJson(saveJSON, Object.class);
        boolean bool = dictService.saveDictEntry(dictCode, object);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("count", bool ? 0 : 1);
        return success(param);
    }

    @RequestMapping(value = "/getLayout", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getLayout(@RequestParam(value = "pageIndex", defaultValue = "1") int currPage,
                            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) throws Exception {
        String dictCode = request.getParameter("dictCode");
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("dictCode", dictCode);
        param.put("orderBy", "dict_entry_sort");
        PageHelper.startPage(currPage, pageSize);
        List<DictEntry> dictEntryList = dictService.queryLayout(param);
        PageInfo<DictEntry> pageInfo = createPagination(dictEntryList);
        return success(dictEntryList, pageInfo.getTotal());
    }

    @RequestMapping(value = "/getDictData", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseBody
    public String getDictData() throws Exception {
        String dictCode = request.getParameter("dictCode");
        String dictEntryCodeArgs = request.getParameter("dictEntryCodeArgs");
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("dictCode", dictCode);
        if (StringUtils.isNotEmpty(dictEntryCodeArgs)) {
            param.put("dictEntryCodeArgs", dictEntryCodeArgs);
        }
        param.put("orderBy", "dict_entry_sort");
        List<DictEntry> dictList = dictService.loadDictData(param);
        return success(dictList, "dictList");
    }
}
