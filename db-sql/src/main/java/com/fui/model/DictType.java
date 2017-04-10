/**
 * Generate time : 2017-01-12 16:31:34
 * Version : 1.0.5.V201701121455
 */
package com.fui.model;

import com.fui.model.base.BaseModel;

/**
 * DictType
 * 
 */
public class DictType extends BaseModel {
	private static final long serialVersionUID = 1L;

	private String id = " ";
	private String dicttypename = " ";

	/**
	 * get the id
	 * 
	 * @return the id
	 */
	public String getId() {
		return this.id;
	}

	/**
	 * set the id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * get the dicttypename
	 * 
	 * @return the dicttypename
	 */
	public String getDicttypename() {
		return this.dicttypename;
	}

	/**
	 * set the dicttypename
	 */
	public void setDicttypename(String dicttypename) {
		this.dicttypename = dicttypename;
	}

}