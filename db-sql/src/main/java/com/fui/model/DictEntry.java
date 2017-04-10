/**
 * Generate time : 2017-01-12 16:31:34
 * Version : 1.0.5.V201701121455
 */
package com.fui.model;

import com.fui.model.base.BaseModel;

/**
 * DictEntry
 * 
 */
public class DictEntry extends BaseModel {
	private static final long serialVersionUID = 1L;

	private String id = " ";
	private String dictid = " ";
	private String dictname = " ";
	private String dictsort = " ";

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
	 * get the dictid
	 * 
	 * @return the dictid
	 */
	public String getDictid() {
		return this.dictid;
	}

	/**
	 * set the dictid
	 */
	public void setDictid(String dictid) {
		this.dictid = dictid;
	}

	/**
	 * get the dictname
	 * 
	 * @return the dictname
	 */
	public String getDictname() {
		return this.dictname;
	}

	/**
	 * set the dictname
	 */
	public void setDictname(String dictname) {
		this.dictname = dictname;
	}

	/**
	 * get the dictsort
	 * 
	 * @return the dictsort
	 */
	public String getDictsort() {
		return this.dictsort;
	}

	/**
	 * set the dictsort
	 */
	public void setDictsort(String dictsort) {
		this.dictsort = dictsort;
	}

}