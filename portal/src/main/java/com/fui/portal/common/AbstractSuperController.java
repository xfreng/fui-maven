/**
 * ClassName: AbstractSuperController
 * CopyRight: Totoro
 * Date: 2015/3/16
 * Version: 1.0
 */
package com.fui.portal.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author sf.xiong on 2017/11/21.
 */
public abstract class AbstractSuperController {
    protected static Logger logger = LoggerFactory.getLogger(AbstractSuperController.class);
    @Autowired
    protected HttpServletRequest request;
}