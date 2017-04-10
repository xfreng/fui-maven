package com.fui.common;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class MapUtils {
	public static Map<String, Object> toMap(Object obj) {
		Map<String, Object> map = new HashMap<String, Object>();
		BeanWrapper beanWrapper = new BeanWrapperImpl(obj);
		PropertyDescriptor[] descriptor = beanWrapper.getPropertyDescriptors();
		for (int i = 0; i < descriptor.length; i++) {
			String name = descriptor[i].getName();
			map.put(name, beanWrapper.getPropertyValue(name));
		}
		return map;
	}

	public static <T> void toBean(Map<String, Object> map, T obj) {
		BeanWrapper beanWrapper = new BeanWrapperImpl(obj);
		Class<?> clazz = obj.getClass();
		Field[] fields = clazz.getDeclaredFields();
		Field[] superFields = clazz.getSuperclass().getDeclaredFields();
		for (String key : map.keySet()) {
			boolean bool = false;
			for (Field field : fields) {
				String fieldName = field.getName();
				if (key.equals(fieldName)) {
					bool = true;
					break;
				}
			}
			for (Field field : superFields) {
				String fieldName = field.getName();
				if (key.equals(fieldName)) {
					bool = true;
					break;
				}
			}
			if (bool) {
				beanWrapper.setPropertyValue(key, map.get(key));
			}
		}
	}
}
