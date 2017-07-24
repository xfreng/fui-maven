package com.fui.model;

import com.fui.model.base.BaseModel;

public class Project extends BaseModel {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column fui_project.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column fui_project.name
     *
     * @mbggenerated
     */
    private String name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column fui_project.name_desc
     *
     * @mbggenerated
     */
    private String nameDesc;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column fui_project.remark
     *
     * @mbggenerated
     */
    private String remark;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column fui_project.id
     *
     * @return the value of fui_project.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column fui_project.id
     *
     * @param id the value for fui_project.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column fui_project.name
     *
     * @return the value of fui_project.name
     *
     * @mbggenerated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column fui_project.name
     *
     * @param name the value for fui_project.name
     *
     * @mbggenerated
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column fui_project.name_desc
     *
     * @return the value of fui_project.name_desc
     *
     * @mbggenerated
     */
    public String getNameDesc() {
        return nameDesc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column fui_project.name_desc
     *
     * @param nameDesc the value for fui_project.name_desc
     *
     * @mbggenerated
     */
    public void setNameDesc(String nameDesc) {
        this.nameDesc = nameDesc == null ? null : nameDesc.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column fui_project.remark
     *
     * @return the value of fui_project.remark
     *
     * @mbggenerated
     */
    public String getRemark() {
        return remark;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column fui_project.remark
     *
     * @param remark the value for fui_project.remark
     *
     * @mbggenerated
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}