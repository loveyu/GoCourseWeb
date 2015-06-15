# 签到加密说明

## Algorithm
签名算法，用于测试的算法为`table`，该算法未经过加密，正式使用的算法为`GeV1`

* table 实现简单
* GeV1 使用`DES`进行加密和解密

## CreateSignKey
利用`DataSignKey`对象加密得到一个加密的字符串


**数据对象引用：** [*DataSignKey*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignKey.html)

```java
public class DataSignKey {
	/**
	 * 初次请求加密时间
	 */
	public int time;
	/**
	 * 唯一的识别ID，可使用第三方库返回的ID
	 */
	public String uuid;
	/**
	 * 签到识别类型,可添加上设备类型
	 */
	public String type;
}
```

## CreateSignKeyHash
通过`DataSignKey`对象生成一个Hash签名数据用于数据验证


**数据对象引用：** [*DataSignKey*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignKey.html)



## CreateSignFinishKey
通过`DataSignFinishKey`对象和服务器返回的加密秘钥`key`生成要传递的加密数据


**数据对象引用：** [*DataSignFinishKey*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignFinishKey.html)

```java
public class DataSignFinishKey {
	/**
	 * 状态,1为成功,2为失败，3为异常
	 */
	public int status;
	/**
	 * 唯一对应ID，和之前的要匹配
	 */
	public String uuid;
	/**
	 * 经度
	 */
	public double longitude;
	/**
	 * 纬度
	 */
	public double latitude;
}
```


## TableAlgorithm
未加密的测试算法


**数据对象引用：** [*Table*](../javadoc/index.html?com/katoa/gocourse/utils/encrypt/Table.html)

```java
class Table {
	/**
	 * 创建请求字符串
	 * @param key 数据对象
	 */
	public static String CreateSignKey(DataSignKey key) {
		return key.time + "\t" + key.uuid + "\t" + key.type;
	}

	/**
	 * 生成Hash验证值
	 * @param key 数据对象
	 */
	public static String CreateSignKeyHash(DataSignKey key) {
		return key.time + key.uuid + key.type;
	}

	/**
	 * 创建完成签到的加密对象
	 * @param key       要加密的对象
	 * @param secretKey 秘钥
	 */
	public static String CreateSignFinishKey(DataSignFinishKey key, String secretKey) {
		return key.status + "\t" + key.uuid + "\t" + key.longitude + "\t" + key.latitude;
	}
}
```

## GeV1Algorithm
GeV1 算法实现


**数据对象引用：** [*GeV1*](../javadoc/index.html?com/katoa/gocourse/utils/encrypt/GeV1.html)

```java
class GeV1 {

}
```