<%@ page contentType="text/html; charset=UTF-8"%>
<span ng-if="!property.noValue">{{property.value|limitTo:20}}</span>
<span ng-if="!property.noValue && property.value != null && property.value.length > 20">...</span>
<span ng-if="property.noValue" translate>PROPERTY.EMPTY</span>