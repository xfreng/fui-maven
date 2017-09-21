<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/views/include/iplat-common.jsp"%>
    <%@include file="/WEB-INF/views/include/fui-iplat-common.jsp"%>
    <style type="text/css">
        html, body{
            margin:0;padding:0;border:0;width:100%;height:100%;overflow:hidden;
        }
        .info {
            background:#d5edf8;color:#205791;border-color:#92cae4;
        }
    </style>
</head>
<body>
<jsp:include flush="false" page="/WEB-INF/views/include/iplat.ef.head.jsp"></jsp:include>
<div id="layout" class="fui-layout" style="width:100%;">
    <div region="center" bodyStyle="overflow:hidden;" style="border:0;">
        <div class="fui-panel" title="任务列表" style="width:100%;height:96%;" bodyStyle="overflow:hidden;" showCollapseButton="true">
            <div id="taskManagerGrid" class="fui-datagrid" style="width:100%;height:100%;" multiSelect="true"
                 url="${path}/supervisor/oa/leave/list/task" idField="id" pageSize="20"
                 dataField="taskList" showFilterRow="false" allowCellSelect="true"
                 allowCellEdit="true">
                <div property="columns">
                    <div type="checkcolumn" ></div>
                    <div field="leaveType" width="100" headerAlign="center" align="center">假种</div>
                    <div field="userId" width="100" headerAlign="center" align="center">申请人</div>
                    <div field="applyTime" width="100" headerAlign="center" align="center" dateFormat="yyyy-MM-dd HH:mm:ss">申请时间</div>
                    <div field="startTime" width="100" headerAlign="center" align="center" dateFormat="yyyy-MM-dd HH:mm:ss">开始时间</div>
                    <div field="endTime" width="100" headerAlign="center" align="center" dateFormat="yyyy-MM-dd HH:mm:ss">结束时间</div>
                    <div field="taskName" width="130" headerAlign="center" align="center" renderer="taskNameRender">当前节点</div>
                    <div field="createTime" width="150" headerAlign="center" align="center" dateFormat="yyyy-MM-dd HH:mm:ss">任务创建时间</div>
                    <div field="status" width="150" headerAlign="center" align="center" renderer="statusRender">流程状态</div>
                    <div field="operate" width="100" headerAlign="center" align="center" renderer="operateRender">操作</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="deptLeaderAudit" class="fui-window" title="流程办理[部门领导审批]" style="width:355px;"
     showModal="true" allowDrag="true">
    <div class="fui-fit">
        <%@include file="view-form.jsp" %>
    </div>
    <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
         borderStyle="border-left:0;border-bottom:0;border-right:0;">
        <a class="fui-button" iconCls="icon-ok" onclick="complete('Y')">同意</a>
        <a class="fui-button" iconCls="icon-redo" onclick="reject('deptLeaderRejectWindow')">驳回</a>
        <a class="fui-button" iconCls="icon-remove" onclick="cancel('deptLeaderAudit')">取消</a>
    </div>
    <div id="deptLeaderRejectWindow" class="fui-window" title="填写驳回理由" style="width:335px;"
         showModal="true" allowDrag="true">
        <div class="fui-fit">
            <input class="fui-textarea" id="leaderBackReason" name="leaderBackReason" style="width:100%;height:60px;"/>
        </div>
        <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
             borderStyle="border-left:0;border-bottom:0;border-right:0;">
            <a class="fui-button" iconCls="icon-redo" onclick="complete('N')">驳回</a>
            <a class="fui-button" iconCls="icon-remove" onclick="cancel('rejectWindow')">取消</a>
        </div>
    </div>
</div>
<div id="hrAudit" class="fui-window" title="流程办理[人事审批]" style="width:355px;"
     showModal="true" allowDrag="true">
    <div class="fui-fit">
        <%@include file="view-form.jsp" %>
    </div>
    <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
         borderStyle="border-left:0;border-bottom:0;border-right:0;">
        <a class="fui-button" iconCls="icon-ok" onclick="complete('Y')">同意</a>
        <a class="fui-button" iconCls="icon-redo" onclick="reject('hrRejectWindow')">驳回</a>
        <a class="fui-button" iconCls="icon-remove" onclick="cancel('deptLeaderAudit')">取消</a>
    </div>
    <div id="hrRejectWindow" class="fui-window" title="填写驳回理由" style="width:335px;"
         showModal="true" allowDrag="true">
        <div class="fui-fit">
            <input class="fui-textarea" id="hrBackReason" name="hrBackReason" style="width:100%;height:60px;"/>
        </div>
        <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
             borderStyle="border-left:0;border-bottom:0;border-right:0;">
            <a class="fui-button" iconCls="icon-redo" onclick="complete('N')">驳回</a>
            <a class="fui-button" iconCls="icon-remove" onclick="cancel('rejectWindow')">取消</a>
        </div>
    </div>
</div>
<div id="modifyApply" class="fui-window" title="流程办理[调整申请]" style="width:355px;height:385px;" bodyStyle="overflow:hidden;"
     showModal="true" allowDrag="true">
    <div class="fui-fit" bodyStyle="overflow:hidden;">
        <div class="info" style="display:none"></div>
        <div id="radio">
            <input id="reApply" class="fui-radiobuttonlist" repeatItems="2" repeatLayout="table" repeatDirection="horizontal"
                   textField="text" valueField="id" data="[{id:true,text:'调整申请'},{id:false,text:'取消申请'}]" value="false"
                   style="text-align:center" onvaluechanged="changed"/>
        </div>
        <hr />
        <div class="fui-panel" showHeader="false" style="width:100%;" bodyStyle="overflow:hidden;" borderStyle="border:0;">
            <form id="leaveModifyForm" method="post" class="fui-form">
                <table id="modifyApplyContent" width="100%" style="padding:.5em 1em;display:none;">
                    <caption style="padding:.5em 1em;text-align:left;"><h3>调整请假内容</h3></caption>
                    <tr>
                        <td>请假类型：</td>
                        <td>
                            <select id="leaveType" name="leaveType" class="fui-combobox" style="width:165px;">
                                <option>公休</option>
                                <option>病假</option>
                                <option>调休</option>
                                <option>事假</option>
                                <option>婚假</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>开始时间：</td>
                        <td><input class="fui-datepicker" id="startTime" name="startTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/></td>
                    </tr>
                    <tr>
                        <td>结束时间：</td>
                        <td><input class="fui-datepicker" id="endTime" name="endTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/></td>
                    </tr>
                    <tr>
                        <td>请假原因：</td>
                        <td>
                            <input class="fui-textarea" id="reason" name="reason" style="width:100%;height:50px;"/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
         borderStyle="border-left:0;border-bottom:0;border-right:0;">
        <a class="fui-button" iconCls="icon-ok" onclick="complete('Y')">提交</a>
        <a class="fui-button" iconCls="icon-remove" onclick="cancel('modifyApply')">取消</a>
    </div>
</div>
<div id="reportBack" class="fui-window" title="流程办理[销假]" style="width:355px;"
     showModal="true" allowDrag="true">
    <div class="fui-fit">
        <%@include file="view-form.jsp" %>
        <div class="fui-panel" showHeader="false" style="width:100%;" bodyStyle="overflow:hidden;">
            <table width="100%" style="padding:.5em 1em;">
                <tr>
                    <td align="right">实际请假开始时间：</td>
                    <td>
                        <input class="fui-datepicker" id="realityStartTime" name="realityStartTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/>
                    </td>
                </tr>
                <tr>
                    <td align="right">实际请假开始时间：</td>
                    <td>
                        <input class="fui-datepicker" id="realityEndTime" name="realityEndTime" showTime="true" format="yyyy-MM-dd HH:mm:ss" style="width:165px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div class="fui-toolbar" style="text-align:right;padding-top:8px;padding-bottom:8px;"
         borderStyle="border-left:0;border-bottom:0;border-right:0;">
        <a class="fui-button" iconCls="icon-ok" onclick="complete('Y')">提交</a>
        <a class="fui-button" iconCls="icon-remove" onclick="cancel('reportBack')">取消</a>
    </div>
</div>
</body>
<link href="${path}/public/bpm/module/qtip/jquery.qtip.min.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="${path}/public/js/supervisor/leaveTaskList.js?v=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="${path}/public/bpm/module/qtip/jquery.qtip.pack.js"></script>
<script type="text/javascript" src="${path}/public/bpm/module/activiti/workflow.js"></script>
</html>