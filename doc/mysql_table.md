# GoCourse数据库结构说明
快速跳转：[tb_classes](#tb_classes "班级信息"), [tb_colleges](#tb_colleges "学院信息"), [tb_course_classes](#tb_course_classes "班级课程对应信息"), [tb_course_location](#tb_course_location "课程的上课地点信息"), [tb_course_select](#tb_course_select "选课信息"), [tb_course_table](#tb_course_table "上课时间对应表"), [tb_courses](#tb_courses "课程信息，相当于一张索引表"), [tb_departments](#tb_departments "专业信息"), [tb_lectures](#tb_lectures ""), [tb_likes](#tb_likes ""), [tb_quiz_course](#tb_quiz_course "课程表对应的测验表"), [tb_quiz_exec](#tb_quiz_exec "测验反馈结果"), [tb_quiz_options](#tb_quiz_options "选项列表"), [tb_quizes](#tb_quizes "测验基本信息表"), [tb_reviews](#tb_reviews ""), [tb_schedules](#tb_schedules "课程的安排表，首先存在该表，然后老师从该表建立课程表"), [tb_signins](#tb_signins "签到信息"), [tb_task](#tb_task ""), [tb_task_sign](#tb_task_sign "签到任务表，用于保存一个签到任务的详细信息"), [tb_universities](#tb_universities "学校信息列表"), [tb_users](#tb_users "用户信息表"), [tb_week](#tb_week "周次信息，用于通过数据库维护WEB端当前的课程周")

## tb_classes
班级信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
classID|int|11|不允许|是|班级ID
className|varchar|20|不允许| |班级名称
deptID|int|11|不允许| |专业ID
enrolYear|int|最大值|不允许| |报名年份


## tb_colleges
学院信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
collegeID|int|11|不允许|是|学院ID
collegeName|varchar|50|不允许| |学院名称
uniID|int|11|不允许| |学校ID


## tb_course_classes
班级课程对应信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
courseTableID|int|最大值|不允许|是|课程表ID
classID|int|11|不允许|是|班级信息


## tb_course_location
课程的上课地点信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
clID|int|最大值|不允许|是|位置ID
courseTableID|int|最大值|不允许| |对应的课程表ID
location|varchar|63|不允许| |上课地点
week|varchar|127|不允许| |上课周次规则
day|tinyint|最大值|不允许| |星期几，1-7
slot|tinyint|最大值|不允许| |上课节次，1-6
notice|varchar|255|允许| |备注信息


## tb_course_select
选课信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
studentID|int|11|不允许|是|学生ID
courseTableID|int|最大值|不允许|是|课程表ID
scheduleID|int|11|不允许| |课程ID
time|int|最大值|不允许| |添加选课时间


## tb_course_table
上课时间对应表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
courseTableID|int|最大值|不允许|是|课程表的ID
scheduleID|int|11|不允许| |对应的课程表ID
teacherID|int|11|不允许| |教师ID
deptID|int|11|不允许| |专业ID
enrolYear|int|最大值|不允许| |入学年份
notice|varchar|255|允许| |附加的描述信息


## tb_courses
课程信息，相当于一张索引表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
courseID|int|11|不允许|是|课程ID
courseName|varchar|30|不允许| |课程名称
pinyin|varchar|120|允许| |拼音的全拼
pinyin_index|varchar|30|允许| |拼音的索引


## tb_departments
专业信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
deptID|int|11|不允许|是|专业ID
deptName|varchar|20|不允许| |专业名称
deptNickName|varchar|20|允许| |专业简称
collegeID|int|11|不允许| |对应的学院ID


## tb_lectures

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
scheduleID|int|11|不允许|是|课程表ID
lectureID|tinyint|4|不允许|是|一般为1-4
weekDay|tinyint|4|不允许| |周一至周日，对应［0，6］
slot|tinyint|4|不允许| |当天课次，以大节为单位，取值范围是［1，6］
location|varchar|30|不允许| |上课地点
gapType|tinyint|4|不允许| |隔周情况：0-单双周，1-单周，2-双周


## tb_likes

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
reviewID|int|11|不允许|是|
userID|int|11|不允许| |用户唯一标记ID
likeType|bit|1|不允许|是|喜欢的类型 0-点赞，1-反对


## tb_quiz_course
课程表对应的测验表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
quizID|int|最大值|不允许|是|测验ID
courseTableID|int|最大值|不允许|是|课表ID
scheduleID|int|11|不允许| |课程安排表ID，用于索引和查询
courseID|int|11|不允许| |课程名称ID，用于查询


## tb_quiz_exec
测验反馈结果

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
execID|int|最大值|不允许|是|测验结果ID
quizID|int|最大值|不允许| |测验ID
userID|int|11|不允许| |用户ID
optionID|int|最大值|允许| |选项ID，只有单选使用该值，非单选类型在optionMap中表示
time|int|最大值|不允许| |测验提交时间
isCorrect|tinyint|最大值|不允许| |答案是否正确,0不正确，1正确
type|tinyint|最大值|不允许| |测验类型：0为自我测验，1为教师发布的测验任务
flag|tinyint|最大值|不允许| |测验标记位，1为正常状态,0表示删除
optionMap|varchar|255|允许| |提交的答案选项列表，如果是多选，该值会设置，否则只在optionID中
taskID|int|最大值|允许| |对应的任务ID，如果和某次任务有关，否则值为NULL


## tb_quiz_options
选项列表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
optionID|int|最大值|不允许|是|选项ID
quizID|int|最大值|不允许| |测验ID
index|tinyint|最大值|不允许| |答案的序号
description|varchar|300|不允许| |选项的描述
feedback|varchar|300|允许| |用户选择此选项为答案后，反馈给用户的信息
isCorrect|bit|1|不允许| |0-错误选项，1-正确选项
reply|int|最大值|不允许| |回复数量


## tb_quizes
测验基本信息表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
quizID|int|最大值|不允许|是|测验ID
courseId|int|11|不允许| |课程的ID
title|varchar|1023|不允许| |测验标题
status|tinyint|最大值|不允许| |状态，0-私有，1-共享，2-删除
time|int|最大值|不允许| |发布时间
reply|int|最大值|不允许| |回复数量
teacherID|int|11|不允许| |教师ID
type|tinyint|最大值|不允许| |测试的类型，0:单选，1:多选，2:判断
desc|varchar|1023|不允许| |测验描述信息，即解析信息
index|varchar|50|不允许| |章节信息
size|tinyint|4|不允许| |正确答案的个数，保证0,-1,-2是一些特殊保留字，比如判断题的选项


## tb_reviews

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
reviewID|int|11|不允许|是|评价ID
scheduleID|int|11|不允许| |课程表ID
userID|int|11|不允许| |用户ID
review|varchar|200|允许| |评价内容
rating|decimal|最大值|不允许| |评分，精度为半颗星，取值范围[1, 5]
date|int|最大值|不允许| |评价时间


## tb_schedules
课程的安排表，首先存在该表，然后老师从该表建立课程表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
scheduleID|int|11|不允许|是|课程表ID
courseID|int|11|不允许| |课程ID
courseName|varchar|80|不允许| |课程名称
requirement|varchar|1000|允许| |需求
content|varchar|1000|允许| |内容
openYear|char|4|不允许| |开课年份
openTerm|tinyint|4|不允许| |开课学期 0-spring term, 1-autumn term
fromWeek|tinyint|4|不允许| |开始周
endWeek|tinyint|4|不允许| |结束周，实际中用处不大
deptID|int|11|不允许| |专业ID
status|tinyint|4|不允许| |课程状态，0-开课中，1-未开课，2-已结束


## tb_signins
签到信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
lectureID|int|11|不允许|是|上课ID
userID|int|11|不允许|是|用户ID
signinTime|int|最大值|不允许| |签到时间
longitude|decimal|最大值|不允许| |签到经度
latitude|decimal|最大值|不允许| |签到纬度


## tb_task

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
taskID|int|最大值|不允许|是|任务ID
name|varchar|255|不允许| |任务名称，用于对任务的描述
detail|varchar|4095|允许| |任务细节描述
time|int|最大值|不允许| |任务发布时间
expireTime|int|最大值|不允许| |任务过期时间
type|tinyint|最大值|不允许| |任务类型：0签到，1课程测验
userID|int|11|不允许| |任务发布者ID
flag|tinyint|最大值|不允许| |任务状态:0正常,1删除


## tb_task_sign
签到任务表，用于保存一个签到任务的详细信息

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
signID|int|最大值|不允许|是|签到的ID
taskID|int|最大值|不允许| |每个签到对应的任务ID
courseTableID|int|最大值|不允许| |签到对应的课程表ID
count|int|最大值|不允许| |签到统计，即签到的人数总计
append|text|最大值|允许| |附加信息，一个JSON格式数组，可多次更新,由{time:xxx,data:'xxx'}组成


## tb_universities
学校信息列表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
uniID|int|11|不允许|是|学校ID
uniName|varchar|50|不允许| |学校全名
uniNickname|varchar|50|允许| |学校简称


## tb_users
用户信息表

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
userSysID|int|11|不允许|是|系统自动增长ID，对应的唯一标示符
userID|varchar|30|不允许| |用户ID，即用户名之类，唯一值
userTrueName|varchar|50|允许| |真实姓名
userEmail|varchar|30|不允许| |用户邮箱
userEmailVerify|tinyint|最大值|允许| |用户邮箱是否经过验证，0：未验证，1：已验证
userSlat|char|32|不允许| |密码加密随机数
userPsw|char|64|不允许| |用户密码
userGender|tinyint|4|允许| |用户性别0: male, 1: female
userIcon|varchar|50|允许| |用户头像，路径存储
userType|tinyint|4|允许| |用户类型，0: student, 1: teacher, 10:超级管理员
userDescription|varchar|300|允许| |用户个人描述信息
userAccessTime|int|最大值|允许| |唯一访问控制符的过期时间
userAccess|varchar|64|允许| |用于访问的唯一标示符
uniID|int|11|允许| |学校ID
collegeID|int|11|允许| |学院ID
deptID|int|11|允许| |专业ID
classID|int|11|允许| |班级ID


## tb_week
周次信息，用于通过数据库维护WEB端当前的课程周

字段名|类型|长度|允许空|主键|说明
---|---|---|---|---|---
year|int|最大值|不允许|是|学期年份
term|tinyint|最大值|不允许|是|季度
beginDate|date|最大值|不允许| |第一天的日期
current|tinyint|最大值|不允许| |是否为当前学期


