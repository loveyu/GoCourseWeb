/**
 * Created by loveyu on 2015/4/20.
 */

Page.bind_student_info = (function () {
    var obj = document.getElementById("BindStudentInfo");
    var status = obj != null;
    if (!status) {
        Hook.add('login.finish', function (data) {
            if (data.name === null && data.user_type == "student") {
                FUNC.redirect("bind_student_info.html");
            }
        });
    }
    return function () {
        return new Vue({
            el: "#BindStudentInfo",
            data: {
                universities: [],
                colleges: [],
                departments: [],
                classes: [],
                form_init: {
                    university: "",
                    college: "",
                    department: "",
                    class: ""
                },
                form: {
                    name: "",
                    sid: "",
                    sex: "",
                    university: "",
                    college: "",
                    department: "",
                    class: ""
                },
                error_msg: ""
            },
            methods: {
                onSubmit: function (event) {
                    var filed_map = {
                        name: "姓名",
                        sid: "学号",
                        sex: "性别",
                        university: "学校",
                        college: "学院",
                        department: "专业",
                        class: "班级"
                    };
                    this.error_msg = "";
                    event.preventDefault();
                    for (var i in this.form) {
                        if (this.form[i] === "") {
                            this.error_msg = filed_map[i] + ": 存在空值，请检查";
                            return false;
                        }
                        switch (i) {
                            case "name":
                                if (!/^[\u4e00-\u9fa5]{2,5}$/.test(this.form[i])) {
                                    this.error_msg = "姓名只允许2-5字的中文名";
                                    return false;
                                }
                                break;
                            case "sid":
                                if (!/^[1-9][0-9]{5,15}$/.test(this.form[i])) {
                                    this.error_msg = "请填写正确的学号";
                                    return false;
                                }
                                break;
                            case "sex":
                                if (this.form[i] != "0" && this.form[i] != "1") {
                                    this.error_msg = "请选择你的性别";
                                    return false;
                                }
                                break;
                        }
                    }
                    this.error_msg = "";
                    FUNC.ajax(CONFIG.api.student.bind_info, "POST", this.form, this.submitCall);
                    return false;
                },
                submitCall: function (result) {
                    if (result.status) {
                        FUNC.redirect("home.html#/");
                    } else {
                        this.error_msg = result.msg;
                    }
                },
                getUniversitiesCall: function (result) {
                    if (result.status) {
                        this.universities = FUNC.mapToObjArr(result.data, "id", "name");
                    }
                    if (this.form_init.university != null) {
                        this.form.university = this.form_init.university;
                        this.form_init.university = null;
                        this.universityChange(null);
                    }
                },
                universityChange: function (event) {
                    //清除下级内容
                    this.classes = [];
                    this.departments = [];
                    this.colleges = [];
                    //调用getCollegesCall
                    if (this.form.university != "") {
                        FUNC.ajax(CONFIG.api.college.get_colleges, "get", {uni_id: this.form.university}, this.getCollegesCall);
                    }
                },
                getCollegesCall: function (result) {
                    if (result.status) {
                        this.colleges = FUNC.mapToObjArr(result.data.colleges, "id", "name");
                    }
                    if (this.form_init.college != null) {
                        this.form.college = this.form_init.college;
                        this.form_init.college = null;
                        this.collegeChange(null);
                    }
                },
                collegeChange: function (event) {
                    //清除下级
                    this.classes = [];
                    this.departments = [];
                    if (this.form.college != "") {
                        FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: this.form.college}, this.getDepartmentsCall);
                    }
                },
                getDepartmentsCall: function (result) {
                    if (result.status) {
                        this.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
                    }
                    if (this.form_init.department != null) {
                        this.form.department = this.form_init.department;
                        this.form_init.department = null;
                        this.departmentChange(null);
                    }
                },
                departmentChange: function (event) {
                    //清除下级
                    this.classes = [];
                    if (this.form.department != "") {
                        FUNC.ajax(CONFIG.api.college.get_classes, "get", {dept_id: this.form.department}, this.getClassesCall);
                    }
                },
                getClassesCall: function (result) {
                    if (result.status) {
                        this.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
                    }
                    if (this.form_init.class != null) {
                        this.form.class = this.form_init.class;
                        this.form_init.class = null;
                        this.classChange(null);
                    }
                },
                classChange: function (event) {
                    //TODO noting
                }
            },
            created: function () {
                FUNC.ajax(CONFIG.api.college.get_universities, "get", {}, this.getUniversitiesCall);
            }
        });
    };
})();