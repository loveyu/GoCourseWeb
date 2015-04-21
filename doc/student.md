## 学生信息获取
基本访问路径`/student`

### /student/info
Desc: 获取当前登录学生的基本信息
Method: Default
Param: `none`
```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "user": {
            "id": 32,
            "user_type": "student",
            "name": null,
            "avatar": "http://xxx/avatar/default.jpg"
        },
        "college": {
            "classID": 1,
            "className": "计科11101",
            "deptID": 1,
            "deptName": "计算机科学与技术系",
            "deptNickName": "计科系",
            "collegeID": 1,
            "collegeName": "计算机科学学院",
            "uniID": 1,
            "uniName": "长江大学",
            "uniNickname": "长江大学"
        }
    }
}
```