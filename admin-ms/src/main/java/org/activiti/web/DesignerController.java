package org.activiti.web;

import com.fui.common.AbstractSuperController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @Title web设计器所需jsp配置类
 * @Author 熊世凤 on 2017/5/31.
 * @Copyright © 蜂投网 2015 ~ 2017
 */
@Controller("DesignerController")
@RequestMapping("/supervisor/designer")
public class DesignerController extends AbstractSuperController {

    /**
     * 树型流程编辑器
     *
     * @return ModelAndView
     */
    @RequestMapping("/tree-modeler")
    public ModelAndView treeModel() {
        ModelAndView mv = new ModelAndView("workflow/tree-modeler");
        mv.addObject("modelId", request.getParameter("modelId"));
        return mv;
    }
}
