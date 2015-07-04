# 测验任务的处理
基本访问路径: `/quiz_test`

## /quiz_test/create_task
Desc: 创建一个测验任务

Method: POST

Param:
* name (require) 测验任务名称
* course_table_id (require) 课程表的ID
* detail (可选) 测验任务的细节

#### 错误状态，错误标记`250`
* `25000` 非教师用户
* `25001` 非法课程ID
* `25002` 必须为这次测验添加一个名称
* `25003` 还有一个测验任务未发布，请先发布后再完成测验
* `25004` 您无权限在此课程上创建测验任务
* `25005` 存在相似测验任务
* `25006` 无法创建测验任务
* `25007` 附加信息创建失败
* `25008` 无法获取新的测验任务信息
* `25009` 创建测验任务异常

**数据对象引用：** [*TbTaskQuiz*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbTaskQuiz.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "taskID": 25,
    "courseID": 1,
    "courseTableID": 5,
    "count": 0,
    "createTime": 1435997174,
    "append": null,
    "quizNum": 0
  }
}
```

## /quiz_test/publish_task
Desc: 发布一个测验任务

Method: POST

Param:
* task_id (require) 测验任务ID
* end_time (require) 测验的结束时间，单位分钟

#### 错误状态，错误标记`251`
* `25100` 非教师用户
* `25101` 非法任务ID
* `25102` 任务必须过期时间必须在1分钟到1000小时之间，默认单位为分钟
* `25103` 未找到该任务
* `25104` 任务已发布，无法重复发布
* `25105` 任务异常，服务器数据错误
* `25106` 测验列表不能为空
* `25107` 发布测验失败，无法更新信息

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_test/add_quiz
Desc: 添加一个或多个题目到测验任务中

Method: POST

Param:
* task_id (require) 测验任务ID
* quiz_ids (require) 测验题目ID列表，多个用`,`分隔，英文逗号

#### 错误状态，错误标记`252`
* `25200` 非教师用户
* `25201` 非法任务ID
* `25202` 要添加的测验数量为空或值传入异常
* `25203` 测验列表有重复值
* `25204` 未找到你的测验任务
* `25205` 已发布的任务无法添加测验
* `25206` 没找到测验ID，或该测验无法添加到此测验
* `25207` 获取的测验数据与提交数据不相符，请检查测验ID正确性
* `25208` 对部分测验无权限:quiz.quizID
* `25209` 部分测验记录已存在，无法重复添加
* `25210` 插入数据和实际数据不相符,请重试
* `25211` 无法更新测验任务的信息
* `25212` 添加数据出现异常

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_test/delete_quiz
Desc: 从测验任务中删除一个或多个题目，仅限未发布的测验

Method: POST

Param:
* task_id (require) 测验任务ID
* quiz_id (require) 测验题目ID，单个

#### 错误状态，错误标记`253`
* `25300` 非教师无权限
* `25301` 非法任务ID
* `25302` 非法测验ID
* `25303` 未找到你的测验任务
* `25304` 已发布的任务无法进行删除操作
* `25305` 该测验未添加到测验任务中
* `25306` 删除测验关联失败
* `25307` 更新测验的题目数量异常
* `25308` 移除异常

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_test/add_append
Desc: 对测验添加附加信息

Method: POST

Param:
* task_id (require) 测验ID
* content (require) 附加的内容

#### 错误状态，错误标记`254`
* `25400` 非教师用户
* `25401` 非法任务ID
* `25402` 附加信息不能为空
* `25404` 未找到你的测验任务
* `25405` 附加信息达到最大条数10
* `25406` 无法更新附加信息

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_test/quiz_task_info
Desc: 获取某一个任务的测验的详细信息

Method: Default

Param:
* task_id (require) 测验ID

#### 错误状态，错误标记`255`
* `25500` 非法测验ID
* `25501` 测验未找到
* `25502` 你无权限查询该测验任务
* `25503` 教师只允许查询自己的测验任务
* `25504` 此类用户无法查询

**数据对象引用：** [*TbQuizTestInfo*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbQuizTestInfo.html)

**数据对象引用：** [*TbTask*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbTask.html)

**数据对象引用：** [*TbTaskQuiz*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbTaskQuiz.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "task": {       //返回的数据是一个复合型数据，包含任务信息
      "taskID": 27,
      "name": "最开始的测验222",
      "detail": "",
      "time": 0,
      "expireTime": 0,
      "type": 1,
      "userID": 1,
      "flag": 0
    },
    "quiz": {       //测验信息
      "taskID": 27,
      "courseID": 1,
      "courseTableID": 5,
      "count": 0,
      "createTime": 1435997620,
      "append": null,
      "quizNum": 0
    }
  }
}
```

## /quiz_test/quiz_list
Desc: 获取某一个任务的测验题目列表

Method: Default

Param:
* task_id (require) 测验ID

#### 错误状态，错误标记`256`
* `25600` 非法测验ID
* `25601` 测验未找到
* `25602` 你无权限查询该测验任务
* `25603` 测验任务未发布，学生用户无权限
* `25604` 教师只允许查询自己的测验任务
* `25605` 此类用户无法查询

**数据对象引用：** [*TbQuizTestInfo*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbQuizTestInfo.html)

**数据对象引用：** [*DataTestEntity*](../javadoc/index.html?com/katoa/gocourse/model/data/DataTestEntity.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "list": [
      {
        "quiz": {
          "quizID": 26,
          "courseId": 1,
          "title": "人工智能的概念(___)，(___),(___)",
          "teacherID": 1,
          "index": "1.2",
          "type": 1
        },
        "options": [
          {
            "optionID": 69,
            "quizID": 26,
            "index": 0,
            "description": "简单的答案而已"
          },
          {
            "optionID": 70,
            "quizID": 26,
            "index": 1,
            "description": "简单的答案而已"
          },
          {
            "optionID": 71,
            "quizID": 26,
            "index": 2,
            "description": "简单的答案而已"
          },
          {
            "optionID": 72,
            "quizID": 26,
            "index": 3,
            "description": "简单的答案而已"
          }
        ]
      },
      {
        "quiz": {
          "quizID": 28,
          "courseId": 1,
          "title": "新的单选测验",
          "teacherID": 1,
          "index": "1.1",
          "type": 0
        },
        "options": [
          {
            "optionID": 77,
            "quizID": 28,
            "index": 0,
            "description": "答案啊啊啊啊啊啊"
          },
          {
            "optionID": 78,
            "quizID": 28,
            "index": 1,
            "description": "不知道顶顶顶顶"
          },
          {
            "optionID": 79,
            "quizID": 28,
            "index": 2,
            "description": "法第三方和第三方和第三方看来都说了"
          },
          {
            "optionID": 80,
            "quizID": 28,
            "index": 3,
            "description": "你说谁水水水水谁谁谁水水水水"
          }
        ]
      }
    ],
    "info": {
      "task": {
        "taskID": 23,
        "name": "最开始的测验",
        "detail": "",
        "time": 1435654917,
        "expireTime": 1435946588,
        "type": 1,
        "userID": 1,
        "flag": 0
      },
      "quiz": {
        "taskID": 23,
        "courseID": 1,
        "courseTableID": 4,
        "count": 1,
        "createTime": 1434853609,
        "append": [
          {
            "time": 1434960239,
            "content": "附加信息"
          }
        ],
        "quizNum": 2
      }
    }
  }
}
```

## /quiz_test/student_task_list
Desc: 获取学生的测验列表,已经开始的测验

Method: Default

Param:
* course_table_id (可选) 课程表ID
* course_id (可选) 课程ID
* status (可选) 状态：0,不确定,1已完成,2未完成

#### 错误状态，错误标记`257`
* `25700` 未知状态
* `25701` 非学生用户

**数据对象引用：** [*DataPager*](../javadoc/index.html?com/katoa/gocourse/model/data/DataPager.html)

**数据对象引用：** [*TbQuizStudentSubmitList*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbQuizStudentSubmitList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "list": [
      {
        "submit": {
          "submitID": 2,
          "taskID": 23,
          "userID": 32,
          "time": 1435718563,
          "finishNum": 2,
          "rightNum": 0,
          "wrongNum": 2,
          "finishTime": 1435937133,
          "flag": 0
        },
        "taskName": "最开始的测验",
        "taskDetail": "",
        "startTime": 1435654917,
        "expireTime": 1435946588,
        "teacherId": 1,
        "courseTableId": 4,
        "courseId": 1,
        "quizNum": 2
      }
    ]
  }
}
```

## /quiz_test/teacher_task_list
Desc: 获取教师的测验列表

Method: Default

Param:
* course_table_id (可选) 课程表ID
* course_id (可选) 课程ID
* is_publish (可选) 是否已经发布的测验任务，默认`1`已发布，值为`0`时未发布

#### 错误状态，错误标记`258`
* `25800` 非教师用户，无法查询

**数据对象引用：** [*DataPager*](../javadoc/index.html?com/katoa/gocourse/model/data/DataPager.html)

**数据对象引用：** [*TbQuizTestInfo*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbQuizTestInfo.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "list": [
      {
        "task": {
          "taskID": 23,
          "name": "最开始的测验",
          "detail": "",
          "time": 1435654917,
          "expireTime": 1435946588,
          "type": 1,
          "userID": 1,
          "flag": 0
        },
        "quiz": {
          "taskID": 23,
          "courseID": 1,
          "courseTableID": 4,
          "count": 1,
          "createTime": 1434853609,
          "append": [
            {
              "time": 1434960239,
              "content": "附加信息"
            }
          ],
          "quizNum": 2
        }
      }
      //....MORE........
    ]
  }
}
```

## /quiz_test/student_new_task
Desc: 获取学生的新任务列表

Method: Default

Param: `none`

#### 错误状态，错误标记`259`
* `25900` 非学生用户

**数据对象引用：** [*DataPager*](../javadoc/index.html?com/katoa/gocourse/model/data/DataPager.html)

**数据对象引用：** [*TbQuizTestInfo*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbQuizTestInfo.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "list": [
      {
        "task": {
          "taskID": 27,
          "name": "最开始的测验222",
          "detail": "",
          "time": 1435998588,
          "expireTime": 1436005788,
          "type": 1,
          "userID": 1,
          "flag": 0
        },
        "quiz": {
          "taskID": 27,
          "courseID": 1,
          "courseTableID": 5,
          "count": 0,
          "createTime": 1435997620,
          "append": null,
          "quizNum": 1
        }
      }
      //...MORE...
    ]
  }
}

```

## /quiz_test/student_task_report
Desc: 获取学生的某一次测验的结果信息

Method: Default

Param:
* submit_id (require) 测验结果的反馈ID
* show_answer (可选) 是否显示自己的答题信息，1显示，默认不显示
* show_quiz (可选) 是否显示答题的测验题目，1显示，默认不显示
* show_option (可选) 是否显示答题的测验的选项，1显示，默认不显示，只有在showQuiz的前提下有效

#### 错误状态，错误标记`260`
* `26000` 非学生用户
* `26001` 测验ID异常
* `26002` 测验结果未找到

**数据对象引用：** [*DataStudentQuizTaskReport*](../javadoc/index.html?com/katoa/gocourse/model/data/DataStudentQuizTaskReport.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "submitInfo": {
      "submit": {
        "submitID": 2,
        "taskID": 23,
        "userID": 32,
        "time": 1435718563,
        "finishNum": 2,
        "rightNum": 0,
        "wrongNum": 2,
        "finishTime": 1435937133,
        "flag": 0
      },
      "taskName": "最开始的测验",
      "taskDetail": "",
      "startTime": 1435654917,
      "expireTime": 1435946588,
      "teacherId": 1,
      "courseTableId": 4,
      "courseId": 1,
      "quizNum": 2
    },
    "answer": [
      {
        "execID": 27,
        "quizID": 28,
        "userID": 32,
        "optionID": 70,
        "time": 1435721031,
        "isCorrect": 0,
        "type": 0,
        "flag": 1,
        "optionMap": null,
        "taskID": 23,
        "submitID": 2
      },
      {
        "execID": 26,
        "quizID": 26,
        "userID": 32,
        "optionID": 70,
        "time": 1435719278,
        "isCorrect": 0,
        "type": 0,
        "flag": 1,
        "optionMap": null,
        "taskID": 23,
        "submitID": 2
      }
    ],
    "quiz": {
      "list": [
        {
          "quiz": {
            "quizID": 26,
            "courseId": 1,
            "title": "人工智能的概念(___)，(___),(___)",
            "teacherID": 1,
            "index": "1.2",
            "type": 1
          },
          "options": [
            {
              "optionID": 69,
              "quizID": 26,
              "index": 0,
              "description": "简单的答案而已"
            },
            {
              "optionID": 70,
              "quizID": 26,
              "index": 1,
              "description": "简单的答案而已"
            },
            {
              "optionID": 71,
              "quizID": 26,
              "index": 2,
              "description": "简单的答案而已"
            },
            {
              "optionID": 72,
              "quizID": 26,
              "index": 3,
              "description": "简单的答案而已"
            }
          ]
        },
        {
          "quiz": {
            "quizID": 28,
            "courseId": 1,
            "title": "新的单选测验",
            "teacherID": 1,
            "index": "1.1",
            "type": 0
          },
          "options": [
            {
              "optionID": 77,
              "quizID": 28,
              "index": 0,
              "description": "答案啊啊啊啊啊啊"
            },
            {
              "optionID": 78,
              "quizID": 28,
              "index": 1,
              "description": "不知道顶顶顶顶"
            },
            {
              "optionID": 79,
              "quizID": 28,
              "index": 2,
              "description": "法第三方和第三方和第三方看来都说了"
            },
            {
              "optionID": 80,
              "quizID": 28,
              "index": 3,
              "description": "你说谁水水水水谁谁谁水水水水"
            }
          ]
        }
      ]
    }
  }
}
```

## /quiz_test/student_task_begin
Desc: 学生开始进行一个测验任务的确认，执行该操作后才会有`submit_id` 用于测试提交

Method: POST

Param:
* task_id (require) 测验任务ID

#### 错误状态，错误标记`261`
* `26100` 非学生用户
* `26101` 非法测验任务ID
* `26102` 无法进行测验,无权限或已添加
* `26103` 数据提交失败

**数据对象引用：** [*TbTaskQuizSubmit*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbTaskQuizSubmit.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
    "submitID": 3,
    "taskID": 27,
    "userID": 32,
    "time": 1435998646,
    "finishNum": 0,
    "rightNum": 0,
    "wrongNum": 0,
    "finishTime": 0,
    "flag": 0
  }
}
```

## /quiz_test/student_task_finish
Desc: 学生完成一个测验,并结束提交最后的答案

Method: POST

Param:
* submit_id (require) 测验的提交ID
* enforce (可选) 强制提交参数，默认`0`，`1`时强制提交，如果测验题目未做完。

#### 错误状态，错误标记`262`
* `26200` 非学生用户无法操作
* `26201` 请求的测验任务ID为空
* `26202` 未找到该测验任务
* `26203` 该测验已完成
* `26204` 测验数据异常
* `26205` 测验任务已过期
* `26206` 测验题目未完成，无强制提交参数
* `26207` 更新测验状态失败
* `26208` 无法更新测验完成信息
* `26209` 更新数据异常

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

