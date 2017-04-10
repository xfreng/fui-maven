package com.fui.model;

import com.fui.model.base.BaseModel;

/**
 * @author sf.xiong
 * @version 2011-05-04 AM 09:34:40
 */
public class User extends BaseModel {
	private static final long serialVersionUID = 1L;
	private int id;
	private String ename;
	private String cname;
	private String upass;
	private String style;
	private String menuType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public String getUpass() {
		return upass;
	}

	public void setUpass(String upass) {
		this.upass = upass;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getMenuType() {
		return menuType;
	}

	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
}
