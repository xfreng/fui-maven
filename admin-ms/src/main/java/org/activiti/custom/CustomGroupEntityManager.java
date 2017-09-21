package org.activiti.custom;

import com.fui.dao.shiro.RolesMapper;
import com.fui.dao.shiro.UserRolesMapper;
import com.fui.model.Roles;
import org.activiti.engine.identity.Group;
import org.activiti.engine.impl.persistence.entity.GroupEntity;
import org.activiti.engine.impl.persistence.entity.GroupEntityManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author sf.xiong on 2017-09-19.
 */
public class CustomGroupEntityManager extends GroupEntityManager {
    @Autowired
    private RolesMapper rolesMapper;
    @Autowired
    private UserRolesMapper userRolesMapper;

    @Override
    public List<Group> findGroupsByUser(final String userCode) {
        List<Group> groupList = new ArrayList<Group>();
        List<Long> roleIdList = userRolesMapper.selectRolesByUserId(Long.valueOf(userCode));
        for (Long roleId : roleIdList) {
            Roles roles = rolesMapper.selectByPrimaryKey(roleId);
            GroupEntity groupEntity = new GroupEntity();
            groupEntity.setId(roles.getRoleCode());
            groupEntity.setRevision(1);
            groupEntity.setType("assignment");
            groupEntity.setName(roles.getRoleName());
        }
        return groupList;
    }
}