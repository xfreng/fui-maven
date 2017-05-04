package org.activiti.web;

import com.fui.common.AbstractSuperController;
import com.fui.common.Constants;
import com.fui.common.GsonUtils;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@Controller("validateController")
@RequestMapping("/supervisor")
public class ValidateController extends AbstractSuperController {

    @Autowired
    private RepositoryService repositoryService;

    @RequestMapping(value = "/checkModelKey", produces = Constants.MediaType_APPLICATION_JSON)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String checkModelByKey() {
        String modelKey = request.getParameter("key");
        Model model = repositoryService.createModelQuery().modelKey(modelKey).singleResult();
        Map<String, Object> data = new HashMap<String, Object>();
        if (model != null) {
            data.put("state", 1);
        } else {
            data.put("state", 0);
        }
        String json = GsonUtils.toJson(data);
        return success(json);
    }
}
