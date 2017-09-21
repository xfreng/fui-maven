package org.activiti.custom;

import com.fui.dao.shiro.RolesMapper;
import com.fui.dao.shiro.UserRolesMapper;
import com.fui.dao.user.UserMapper;
import com.fui.model.Roles;
import com.fui.model.User;
import org.activiti.engine.identity.Group;
import org.activiti.engine.impl.persistence.entity.GroupEntity;
import org.activiti.engine.impl.persistence.entity.UserEntity;
import org.activiti.engine.impl.persistence.entity.UserEntityManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author sf.xiong on 2017-09-19.
 */
public class CustomUserEntityManager extends UserEntityManager {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RolesMapper rolesMapper;
    @Autowired
    private UserRolesMapper userRolesMapper;

    @Override
    public UserEntity findUserById(String userId) {
        UserEntity userEntity = new UserEntity();
        User cue = userMapper.selectByPrimaryKey(Long.valueOf(userId));
        userEntity.setId(userId);
        userEntity.setRevision(1);
        userEntity.setFirstName(cue.getEname());
        userEntity.setLastName(cue.getCname());
        return userEntity;
    }

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