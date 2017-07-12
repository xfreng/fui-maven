package com.fui.spring;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;

import javax.sql.DataSource;
import java.nio.charset.Charset;

/**
 * @Title 工程配置类
 * @Author sf.xiong on 2017/7/12.
 */
public class FuiEngineConfiguration {

    protected String databaseType;
    protected String databaseSchemaUpdate;
    protected DataSource dataSource;

    protected FuiEngineConfiguration() {

    }

    public void init() throws Exception {
        if (Boolean.parseBoolean(databaseSchemaUpdate)) {
            ScriptRunner runner = new ScriptRunner(dataSource.getConnection());
            Resources.setCharset(Charset.forName("utf-8"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui_user.sql"));
            runner.runScript(Resources.getResourceAsReader("db/" + databaseType + "/fui.sql"));
            runner.closeConnection();
        }
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType;
    }

    public void setDatabaseSchemaUpdate(String databaseSchemaUpdate) {
        this.databaseSchemaUpdate = databaseSchemaUpdate;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}