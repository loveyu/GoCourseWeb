# GoCourse数据库结构说明
## tb_classes
班级信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
classID|int 无符号|11|不允许|主键|班级ID
className|varchar|20|不允许|索引|班级名称
deptID|int 无符号|11|不允许|索引|专业ID
enrolYear|int 无符号|11|不允许| |报名年份


## tb_colleges
学院信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
collegeID|int 无符号|11|不允许|主键|学院ID
collegeName|varchar|50|不允许|索引|学院名称
uniID|int 无符号|11|不允许|索引|学校ID


## tb_course_classes
班级课程对应信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
courseTableID|int 无符号|11|不允许|主键|课程表ID
classID|int 无符号|11|不允许|主键|班级信息


## tb_course_location
课程的上课地点信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
clID|int 无符号|11|不允许|主键|位置ID
courseTableID|int 无符号|11|不允许|索引|对应的课程表ID
location|varchar|63|不允许| |上课地点
week|varchar|127|不允许| |上课周次规则
day|tinyint 无符号|1|不允许| |星期几，1-7
slot|tinyint 无符号|2|不允许| |上课节次，1-6
notice|varchar|255|允许| |备注信息


## tb_course_select
选课信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
studentID|int 无符号|11|不允许|主键|学生ID
courseTableID|int 无符号|11|不允许|主键|课程表ID
scheduleID|int 无符号|11|不允许|索引|课程ID
time|int 无符号|11|不允许| |添加选课时间


## tb_course_table
上课时间对应表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
courseTableID|int 无符号|11|不允许|主键|课程表的ID
scheduleID|int 无符号|11|不允许|索引|对应的课程表ID
teacherID|int 无符号|11|不允许|索引|教师ID
deptID|int 无符号|11|不允许|索引|专业ID
enrolYear|int 无符号|11|不允许| |入学年份
notice|varchar|255|允许| |附加的描述信息
reviewCount|int 无符号|11|不允许| |评价的人数
reviewStatus|tinyint 无符号|1|不允许| |评价状态，0允许评价，1禁止评价


## tb_courses
课程信息，相当于一张索引表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
courseID|int 无符号|11|不允许|主键|课程ID
courseName|varchar|30|不允许|唯一|课程名称
pinyin|varchar|120|允许| |拼音的全拼
pinyin_index|varchar|30|允许| |拼音的索引


## tb_departments
专业信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
deptID|int 无符号|11|不允许|主键|专业ID
deptName|varchar|20|不允许| |专业名称
deptNickName|varchar|20|允许| |专业简称
collegeID|int 无符号|11|不允许|索引|对应的学院ID


## tb_quiz_course
课程表对应的测验表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
quizID|int 无符号|11|不允许|主键|测验ID
courseTableID|int 无符号|11|不允许|主键|课表ID
scheduleID|int 无符号|11|不允许|索引|课程安排表ID，用于索引和查询
courseID|int 无符号|11|不允许|索引|课程名称ID，用于查询


## tb_quiz_exec
测验反馈结果

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
execID|int 无符号|11|不允许|主键|测验结果ID
quizID|int 无符号|11|不允许|索引|测验ID
userID|int 无符号|11|不允许|索引|用户ID
optionID|int 无符号|11|允许|索引|选项ID，只有单选使用该值，非单选类型在optionMap中表示
time|int 无符号|11|不允许| |测验提交时间
isCorrect|tinyint 无符号|4|不允许| |答案是否正确,0不正确，1正确
type|tinyint 无符号|4|不允许| |测验类型：0为自我测验，1为教师发布的测验任务
flag|tinyint 无符号|4|不允许| |测验标记位，1为正常状态,0表示删除
optionMap|varchar|255|允许| |提交的答案选项列表，如果是多选，该值会设置，否则只在optionID中
taskID|int 无符号|11|允许|索引|对应的任务ID，如果和某次任务有关，否则值为NULL


## tb_quiz_options
选项列表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
optionID|int 无符号|11|不允许|主键|选项ID
quizID|int 无符号|11|不允许|索引|测验ID
index|tinyint 无符号|3|不允许| |答案的序号
description|varchar|300|不允许| |选项的描述
feedback|varchar|300|允许| |用户选择此选项为答案后，反馈给用户的信息
isCorrect|bit|1|不允许| |0-错误选项，1-正确选项
reply|int 无符号|11|不允许| |回复数量


## tb_quizes
测验基本信息表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
quizID|int 无符号|11|不允许|主键|测验ID
courseId|int 无符号|11|不允许|索引|课程的ID
title|varchar|1023|不允许| |测验标题
status|tinyint 无符号|4|不允许| |状态，0-私有，1-共享，2-删除
time|int 无符号|11|不允许| |发布时间
reply|int 无符号|11|不允许| |回复数量
teacherID|int 无符号|11|不允许|索引|教师ID
type|tinyint 无符号|3|不允许| |测试的类型，0:单选，1:多选，2:判断
desc|varchar|1023|不允许| |测验描述信息，即解析信息
index|varchar|50|不允许| |章节信息
size|tinyint|4|不允许| |正确答案的个数，保证0,-1,-2是一些特殊保留字，比如判断题的选项


## tb_review_likes
用户对于评价的投票表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
reviewID|int 无符号|11|不允许|主键|用户评价ID
userID|int 无符号|11|不允许|主键|用户唯一标记ID
likeType|tinyint 无符号|1|不允许| |喜欢的类型 0-点赞，1-反对
time|int 无符号|11|不允许| |添加时间


## tb_review_reply
教师对评价的回复表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
reviewReplyID|int 无符号|11|不允许|主键|老师对学生评价的回复ID
reviewID|int 无符号|11|不允许|索引|评价ID
userID|int 无符号|11|不允许|索引|教师ID
content|varchar|1023|不允许| |评价内容
time|int 无符号|11|不允许| |回复评价时间


## tb_reviews
对于课程的评价信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
reviewID|int 无符号|11|不允许|主键|评价ID
courseTableID|int 无符号|11|不允许|索引|课程表ID
userID|int 无符号|11|不允许|索引|用户ID
content|varchar|200|不允许| |评价内容
rating|decimal|最大值|不允许| |评分，精度为半颗星，取值范围[1, 5]
time|int 无符号|11|不允许| |评价时间
upNum|int 无符号|11|不允许| |顶的人数
downNum|int 无符号|11|不允许| |踩的人数


## tb_schedules
课程的安排表，首先存在该表，然后老师从该表建立课程表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
scheduleID|int 无符号|11|不允许|主键|课程表ID
courseID|int 无符号|11|不允许|索引|课程ID
courseName|varchar|80|不允许| |课程名称
requirement|varchar|1000|允许| |需求
content|varchar|1000|允许| |内容
openYear|char|4|不允许| |开课年份
openTerm|tinyint|4|不允许| |开课学期 0-spring term, 1-autumn term
fromWeek|tinyint|4|不允许| |开始周
endWeek|tinyint|4|不允许| |结束周，实际中用处不大
deptID|int 无符号|11|不允许|索引|专业ID
status|tinyint|4|不允许| |课程状态，0-开课中，1-未开课，2-已结束


## tb_sign_log
签到信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
signLogID|int 无符号|11|不允许|主键|签到事件ID,描述一次签到状态
userID|int 无符号|11|不允许|索引|用户ID
beginTime|int 无符号|11|不允许| |签到开始准备时间
endTime|int 无符号|11|不允许| |签到完成时间，未完成时为0
signID|int 无符号|11|不允许|索引|签到ID，对应教师创建的签到任务
courseTableID|int 无符号|11|不允许|索引|签到的课程表ID
longitude|decimal|最大值|不允许| |签到经度
latitude|decimal|最大值|不允许| |签到纬度
status|tinyint 无符号|255|不允许| |签到状态：0表示签到准备中,1签到成功,2签到失败,3签到异常
auth|text|最大值|允许| |签到验证信息，JSON对象，描述复杂的签到情形


## tb_task
各种任务的基本数据

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
taskID|int 无符号|11|不允许|主键|任务ID
name|varchar|255|不允许| |任务名称，用于对任务的描述
detail|varchar|4095|允许| |任务细节描述
time|int 无符号|11|不允许| |任务发布时间
expireTime|int 无符号|11|不允许| |任务过期时间
type|tinyint 无符号|255|不允许| |任务类型：0签到，1课程测验
userID|int 无符号|11|不允许| |任务发布者ID
flag|tinyint 无符号|4|不允许| |任务状态:0正常,1删除


## tb_task_quiz
测验任务附加描述信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
taskID|int 无符号|11|不允许|主键|任务ID
courseID|int 无符号|11|不允许|索引|课程ID
courseTableID|int 无符号|11|不允许|索引|课程表ID
count|int 无符号|11|不允许| |测验的提交的总人数
append|text|最大值|允许| |测验附加信息，一个JSON格式数组，可多次更新,由{time:xxx,content:'xxx'}组成
createTime|int 无符号|11|不允许| |测验任务的最初创建时间，非发布时间。测验开始与结束为Task表中数据
quizNum|int 无符号|10|不允许| |测验题目的数量


## tb_task_quiz_map
测验任务与测验的关系表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
taskID|int 无符号|11|不允许|主键|任务ID
quizID|int 无符号|11|不允许|主键|测验ID
time|int 无符号|11|不允许| |添加时间


## tb_task_quiz_submit
学生对于测验的提交数据

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
submitID|int 无符号|10|不允许|主键|测验提交ID
taskID|int 无符号|11|不允许|索引|测验任务的ID
userID|int 无符号|11|不允许|索引|提交测验的学生ID
time|int 无符号|11|不允许| |提交测验的时间
finishNum|int 无符号|11|不允许| |完成的题目数量
rightNum|int 无符号|11|不允许| |正确的数量
wrongNum|int 无符号|11|不允许| |错误的数量
finishTime|int 无符号|11|不允许| |测验完成时间，非0标志已完成
flag|tinyint 无符号|1|不允许| |标志对象,0为有效,1为无效,2为删除


## tb_task_sign
签到任务表，用于保存一个签到任务的详细信息

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
signID|int 无符号|11|不允许|主键|签到的ID
taskID|int 无符号|11|不允许|索引|每个签到对应的任务ID
courseID|int 无符号|11|不允许|索引|课程的ID，便于进行查询和归类
courseTableID|int 无符号|11|不允许|索引|签到对应的课程表ID
count|int 无符号|11|不允许| |签到统计，即签到的人数总计
append|text|最大值|允许| |附加信息，一个JSON格式数组，可多次更新,由{time:xxx,content:'xxx'}组成


## tb_universities
学校信息列表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
uniID|int 无符号|11|不允许|主键|学校ID
uniName|varchar|50|不允许| |学校全名
uniNickname|varchar|50|允许| |学校简称


## tb_users
用户信息表

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
userSysID|int 无符号|11|不允许|主键|系统自动增长ID，对应的唯一标示符
userID|varchar|30|不允许|唯一|用户ID，即用户名之类，唯一值
userTrueName|varchar|50|允许| |真实姓名
userEmail|varchar|30|不允许|索引|用户邮箱
userEmailVerify|tinyint 无符号|1|允许| |用户邮箱是否经过验证，0：未验证，1：已验证
userSlat|char|32|不允许| |密码加密随机数
userPsw|char|64|不允许| |用户密码
userGender|tinyint|4|允许| |用户性别0: male, 1: female
userIcon|varchar|50|允许| |用户头像，路径存储
userType|tinyint|4|允许| |用户类型，0: student, 1: teacher, 10:超级管理员
userDescription|varchar|300|允许| |用户个人描述信息
userAccessTime|int 无符号|11|允许| |唯一访问控制符的过期时间
userAccess|varchar|64|允许| |用于访问的唯一标示符
uniID|int 无符号|11|允许|索引|学校ID
collegeID|int 无符号|11|允许|索引|学院ID
deptID|int 无符号|11|允许|索引|专业ID
classID|int 无符号|11|允许|索引|班级ID


## tb_week
周次信息，用于通过数据库维护WEB端当前的课程周

字段名|类型|长度|允许空|键|说明
---|---|---|---|---|---
year|int 无符号|4|不允许|主键|学期年份
term|tinyint 无符号|1|不允许|主键|季度
beginDate|date|最大值|不允许| |第一天的日期
current|tinyint 无符号|1|不允许| |是否为当前学期


