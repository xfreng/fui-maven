<%@ page contentType="text/html; charset=UTF-8"%>
<!-- Just need to instantiate the controller, and it will take care of showing the modal dialog -->
<span ng-controller="callelementController">
	<input type="hidden" name="action" ng-model="action" ng-init="action='<%=request.getContextPath() %>'"/>
</span>