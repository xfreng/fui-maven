package org.activiti.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.baosight.iplat4j.logging.Logger;
import com.baosight.iplat4j.logging.LoggerFactory;
import com.fui.common.JSON;

@Controller
public class ValidateController {
	protected static final Logger LOGGER = LoggerFactory.getLogger(ValidateController.class);

	@Autowired
	private RepositoryService repositoryService;

	@RequestMapping(value = "checkModelKey")
	@ResponseStatus(HttpStatus.OK)
	public void checkModelByKey(HttpServletRequest request, PrintWriter out) {
		String modelKey = request.getParameter("key");
		Model model = repositoryService.createModelQuery().modelKey(modelKey).singleResult();
		Map<String, Object> data = new HashMap<String, Object>();
		if (model != null) {
			data.put("state", 1);
		} else {
			data.put("state", 0);
		}
		String json = JSON.encode(data);
		out.write(json);
	}
}
