<?php
require_once("common/common.php");
get_header("用户注册");
?>
    <div id="Register">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3">
                    <h2>用户注册</h2>
                    <div class="alert alert-danger" role="alert" v-if="error_msg">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        {{error_msg}}
                    </div>
                    <form method="post"  v-on="submit: onFormSubmit">
                        <div class="form-group">
                            <label for="InputEmail1">邮箱地址</label>
                            <input type="email" v-model="form.email" class="form-control" id="InputEmail1"
                                   placeholder="请输入你的邮箱，建议QQ邮箱，用于密码找回">
                        </div>
                        <div class="form-group">
                            <label for="InputPassword1">密码</label>
                            <input type="password" v-model="form.password" class="form-control" id="InputPassword" placeholder="输入密码用于登录">
                        </div>
                        <button type="submit" class="btn btn-default">注册</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

<?php get_footer("register") ?>