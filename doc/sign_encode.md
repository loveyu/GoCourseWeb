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
	/**
	 * 创建请求字符串
	 *
	 * @param key 数据对象
	 */
	public static String CreateSignKey(DataSignKey key) {
		String json = Json.toJson(key);
		/**
		 * 当前微妙除以6个零
		 */
		String secretKey = (int) (System.currentTimeMillis() / 1000000) + "GoCoUrSe";
		try {
			return DES.encryptDES(json, secretKey);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 生成Hash验证值
	 *
	 * @param key 数据对象
	 */
	public static String CreateSignKeyHash(DataSignKey key) {
		//取MD5值,当前微妙除以7个零
		return Security.sha(key.time + key.uuid + key.type + (int) (System.currentTimeMillis() / 10000000) + "GoCoUrSe", "md5");
	}

	/**
	 * 创建完成签到的加密对象
	 *
	 * @param key       要加密的对象
	 * @param secretKey 秘钥
	 */
	public static String CreateSignFinishKey(DataSignFinishKey key, String secretKey) {
		String json = Json.toJson(key);
		secretKey = secretKey + "GoCoUrSe";
		try {
			return DES.encryptDES(json, secretKey);
		} catch (Exception e) {
			return null;
		}
	}
}
```

## 有关DES算法和BASE64算法的实现

DES 算法，基于BASE64

```java
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class DES {
	private static byte[] iv = {1, 2, 3, 4, 5, 6, 7, 8};

	public static String encryptDES(String encryptString, String encryptKey) throws Exception {
		//IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
		IvParameterSpec zeroIv = new IvParameterSpec(iv);
		SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
		byte[] encryptedData = cipher.doFinal(encryptString.getBytes());

		return Base64.encode(encryptedData);
	}

	public static String decryptDES(String decryptString, String decryptKey) throws Exception {
		byte[] byteMi = Base64.decode(decryptString);
		IvParameterSpec zeroIv = new IvParameterSpec(iv);
		//IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
		SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
		byte decryptedData[] = cipher.doFinal(byteMi);

		return new String(decryptedData);
	}
}
```

BASE64算法

```java
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class Base64 {
	private static final char[] legalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".toCharArray();

	/**
	 * data[]进行编码
	 *
	 * @param data 要编码的数据
	 */
	public static String encode(byte[] data) {
		int start = 0;
		int len = data.length;
		StringBuffer buf = new StringBuffer(data.length * 3 / 2);

		int end = len - 3;
		int i = start;
		int n = 0;

		while (i <= end) {
			int d = ((((int) data[i]) & 0x0ff) << 16)
				| ((((int) data[i + 1]) & 0x0ff) << 8)
				| (((int) data[i + 2]) & 0x0ff);

			buf.append(legalChars[(d >> 18) & 63]);
			buf.append(legalChars[(d >> 12) & 63]);
			buf.append(legalChars[(d >> 6) & 63]);
			buf.append(legalChars[d & 63]);

			i += 3;

			if (n++ >= 14) {
				n = 0;
				buf.append(" ");
			}
		}

		if (i == start + len - 2) {
			int d = ((((int) data[i]) & 0x0ff) << 16)
				| ((((int) data[i + 1]) & 255) << 8);

			buf.append(legalChars[(d >> 18) & 63]);
			buf.append(legalChars[(d >> 12) & 63]);
			buf.append(legalChars[(d >> 6) & 63]);
			buf.append("=");
		} else if (i == start + len - 1) {
			int d = (((int) data[i]) & 0x0ff) << 16;

			buf.append(legalChars[(d >> 18) & 63]);
			buf.append(legalChars[(d >> 12) & 63]);
			buf.append("==");
		}

		return buf.toString();
	}

	private static int decode(char c) {
		if (c >= 'A' && c <= 'Z')
			return ((int) c) - 65;
		else if (c >= 'a' && c <= 'z')
			return ((int) c) - 97 + 26;
		else if (c >= '0' && c <= '9')
			return ((int) c) - 48 + 26 + 26;
		else
			switch (c) {
				case '+':
					return 62;
				case '/':
					return 63;
				case '=':
					return 0;
				default:
					throw new RuntimeException("unexpected code: " + c);
			}
	}

	/**
	 * Decodes the given Base64 encoded String to a new byte array. The byte
	 * array holding the decoded data is returned.
	 */
	public static byte[] decode(String s) {

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			decode(s, bos);
		} catch (IOException e) {
			throw new RuntimeException();
		}
		byte[] decodedBytes = bos.toByteArray();
		try {
			bos.close();
			bos = null;
		} catch (IOException ex) {
			System.err.println("Error while decoding BASE64: " + ex.toString());
		}
		return decodedBytes;
	}

	private static void decode(String s, OutputStream os) throws IOException {
		int i = 0;

		int len = s.length();

		while (true) {
			while (i < len && s.charAt(i) <= ' ')
				i++;

			if (i == len)
				break;

			int tri = (decode(s.charAt(i)) << 18)
				+ (decode(s.charAt(i + 1)) << 12)
				+ (decode(s.charAt(i + 2)) << 6)
				+ (decode(s.charAt(i + 3)));

			os.write((tri >> 16) & 255);
			if (s.charAt(i + 2) == '=')
				break;
			os.write((tri >> 8) & 255);
			if (s.charAt(i + 3) == '=')
				break;
			os.write(tri & 255);

			i += 4;
		}
	}

}
```