<?php
/**
 * User: loveyu
 * Date: 2015/4/20
 * Time: 12:54
 */
require_once("common/common.php");
get_header("绑定学生个人信息");
?>

<div id="BindStudentInfo">
    <div class="container">
        <div style="max-width: 500px;margin: 0 auto">
            <h2>绑定学生个人信息</h2>

            <form action="" method="post" v-on="submit:onSubmit">
                <div class="alert alert-danger" role="alert" v-if="error_msg">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Error:</span>
                    {{error_msg}}
                </div>
                <div class="form-group">
                    <label class="control-label">真实姓名</label>
                    <input type="text" v-model="form.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label class="control-label">学号</label>
                    <input type="text" v-model="form.sid" class="form-control"/>
                </div>
                <div class="form-group form-horizontal">
                    <label class="control-label">性别 : </label>
                    <label>
                        <input type="radio" name="sex" v-model="form.sex" value="0">男&nbsp;&nbsp;
                    </label>
                    <label>
                        <input type="radio" name="sex" v-model="form.sex" value="1">女
                    </label>
                </div>
                <div class="form-group">
                    <label class="control-label">学校</label>
                    <select class="form-control" name="uin" v-model="form.university" v-on="change:universityChange">
                        <option value="">--请选择--</option>
                        <option v-repeat="universities" value="{{id}}">{{name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">学院</label>
                    <select class="form-control" name="college" v-model="form.college" v-on="change:collegeChange">
                        <option value="">--请选择--</option>
                        <option v-repeat="colleges" value="{{id}}">{{name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">专业</label>
                    <select class="form-control" name="dept" v-model="form.department" v-on="change:departmentChange">
                        <option value="">--请选择--</option>
                        <option v-repeat="departments" value="{{id}}">{{name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">班级</label>
                    <select class="form-control" name="class" v-model="form.class" v-on="change:classChange">
                        <option value="">--请选择--</option>
                        <option v-repeat="classes" value="{{id}}">{{name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default">更新个人信息</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php get_footer("bind_student_info") ?>
