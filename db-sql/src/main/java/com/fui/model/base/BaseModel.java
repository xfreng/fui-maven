package com.fui.model.base;

import java.io.Serializable;

public class BaseModel implements Serializable {
	private static final long serialVersionUID = 1L;

	private String platSchema;
	private String _state;

	public String getPlatSchema() {
		return platSchema;
	}

	public void setPlatSchema(String platSchema) {
		this.platSchema = platSchema;
	}

	public String get_state() {
		return _state;
	}

	public void set_state(String _state) {
		this._state = _state;
	}

}
