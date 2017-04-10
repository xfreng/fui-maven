package com.fui.common;

import org.apache.commons.lang.StringUtils;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

public class JSON {
	public static String encode(Object obj) {
		if ((obj == null) || (obj.toString().equals("null"))) {
			return null;
		}
		if ((obj != null) && (obj.getClass() == String.class)) {
			return obj.toString();
		}
		JSONSerializer serializer = new JSONSerializer();
		return serializer.deepSerialize(obj);
	}

	public static Object decode(String json) {
		if (StringUtils.isEmpty(json)) {
			return "";
		}
		JSONDeserializer<Object> deserializer = new JSONDeserializer<Object>();
		Object obj = deserializer.deserialize(json);
		if ((obj != null) && (obj.getClass() == String.class)) {
			return decode(obj.toString());
		}
		return obj;
	}
}