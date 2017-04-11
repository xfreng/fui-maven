package com.fui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JspController {

	@RequestMapping("/timeout")
	public String timeout() {
		return "error/timeout";
	}
	
	@RequestMapping("/calendar")
	public String calendar() {
		return "calendar/calopt";
	}

	@RequestMapping("/default")
	public String index() {
		return "default/index";
	}

	@RequestMapping("/pact")
	public String pact() {
		return "pact/index";
	}

	@RequestMapping("/menubar")
	public String menubar() {
		return "menubar/index";
	}

	@RequestMapping("/treegrid")
	public String treegrid() {
		return "treegrid/treegrid-demo";
	}

	@RequestMapping("/menustate")
	public String menustate() {
		return "menu/menu-state";
	}

	@RequestMapping("/menutree")
	public String menutree() {
		return "menu/menu-list";
	}
	
	@RequestMapping("/pageinfo")
	public String pageinfo() {
		return "page/page-list";
	}
	
	@RequestMapping("/dictinfo")
	public String dictinfo() {
		return "dict/dict_manager_mainframe";
	}
	
	@RequestMapping("/dictmanager")
	public String dictmanager() {
		return "dict/dict_manager";
	}
	
	@RequestMapping("/dictimportmanager")
	public String dictimportmanager() {
		return "dict/dict_import_manager";
	}
	
	@RequestMapping("/model-list")
	public String modellist() {
		return "workflow/model-list";
	}
}
