<?php
require_once("common/common.php");
get_header("找回密码");
?>
<div id="ForgetPassword">
    <div class="container">
        <div class="row">
            <div class="col-sm-offset-2 col-sm-8">
                <div class="page-header">
                    <h2>找回密码</h2>
                </div>
                <div class="alert alert-danger" role="alert" v-if="error_msg">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Error:</span>
                    {{error_msg}}
                </div>

                <form v-if="setup=='send_mail'" method="get" v-on="submit: onSendMail">
                    <fieldset>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon">用户邮箱</span>
                                <input type="text" v-model="email" name="email" class="form-control"
                                       placeholder="你绑定的邮箱账号">
                            </div>
                        </div>
                        <div class="form-group form-inline">
                            <div class="input-group">
                                <span class="input-group-addon">验证字符</span>
                                <input type="text" v-model="captcha" name="captcha" class="form-control"
                                       placeholder="不区分大小写">
                            </div>
                            <span class="captcha"><img style="height: 30px" id="CaptchaImg" v-attr="src:captcha_url"
                                                       v-on="click: onClickCaptcha"></span>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary form-control" id="SendMailButton" type="submit">发送密码重置邮件
                            </button>
                        </div>
                    </fieldset>
                </form>
                <form v-if="setup=='input_code'" method="get" v-on="submit: onCheckCode">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">邮箱验证码</span>
                            <input type="text" v-model="code" name="code" class="form-control"
                                   placeholder="32位验证码">
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary form-control" type="submit">确认验证码</button>
                    </div>
                </form>
                <form v-if="setup=='reset'" method="get" v-on="submit: onReset">
                    <h3>重置你的密码</h3>

                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">新的密码</span>
                            <input type="password" v-model="pwd_1" name="pwd_1" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">确认密码</span>
                            <input type="password" v-model="pwd_2" name="pwd_2" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-danger form-control" type="submit">重置密码</button>
                    </div>
                </form>
                <div v-if="setup=='finish'" class="alert alert-success">
                    <h3>已完成密码修改，请前去重新登录</h3>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer("forget") ?>
