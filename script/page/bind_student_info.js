/**
 * Created by loveyu on 2015/4/20.
 */

Page.bind_student_info = (function () {
    var obj = document.getElementById("BindStudentInfo");
    var status = obj != null;
    if (!status) {
        Hook.add('login.finish', function (data) {
            if (data.name === null && data.type == "student") {
                FUNC.redirect("bind_student_info.html");
            }
        });
    }
    return function () {
        return new Vue({
            el: "#BindStudentInfo",
            data: {
                universities: [],
                form_init: {
                    university: "3"
                },
                form: {
                    university: ""
                }
            },
            methods: {
                onSubmit: function (event) {
                    event.preventDefault();
                    console.log(this.form);
                    return false;
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
                universityChange: function(event){
                    console.log(this.form);
                }
            },
            created: function () {
                FUNC.ajax(CONFIG.api.college.get_universities, "get", {}, this.getUniversitiesCall);
            }
        });
    };
})();