<?php
/**
 * User: loveyu
 * Date: 2015/5/28
 * Time: 21:03
 * 生成数据库结构
 */
$pdo = new PDO("mysql:host=127.0.0.1;port=3306;dbname=gocourse", "root", "123456", [
	PDO::ATTR_CASE => PDO::CASE_NATURAL
]);
$pdo->exec("SET SQL_MODE=ANSI_QUOTES");
$pdo->exec("SET NAMES 'utf8'");

$stmt = $pdo->query("SELECT TABLE_NAME,TABLE_COMMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=" . $pdo->quote("gocourse"));
$list = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt->closeCursor();
echo "# GoCourse数据库结构说明\r\n";

//$link = [];
//foreach ($list as $table) {
//	$link[] = "[{$table['TABLE_NAME']}](#{$table['TABLE_NAME']} \"" . quote_comment($table['TABLE_COMMENT']) . "\")";
//}
//echo "快速跳转：",implode(", ", $link), "\r\n\r\n";
foreach ($list as $table) {
	echo "## ", $table['TABLE_NAME'], "\r\n", $table['TABLE_COMMENT'] ? (quote_comment($table['TABLE_COMMENT']) . "\r\n\r\n") : "\r\n";
	echo "字段名|类型|长度|允许空|主键|说明\r\n";
	echo "---|---|---|---|---|---\r\n";
	$stmt = $pdo->query("show full fields from " . $table['TABLE_NAME']);
	if (!$stmt) {
		print_r($pdo->errorInfo());
		exit;
	}
	$filed_list = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$stmt->closeCursor();
	foreach ($filed_list as $filed) {
		echo $filed['Field'], "|";
		echo parse_type($filed['Type']), "|";
		echo parse_size($filed['Type']), "|";
		echo $filed['Null'] == "NO" ? "不允许" : "允许", "|";
		echo $filed['Key'] == "PRI" ? "是" : " ", "|";
		echo quote_comment($filed['Comment']), "\r\n";
	}
	echo "\r\n\r\n";
}

function parse_type($type)
{
	preg_match("/^([a-zA-Z]+)/", $type, $ma);
	return $ma[1];
}

function parse_size($type)
{
	preg_match("/\\(([0-9]+)\\)$/", $type, $ma);
	return isset($ma[1]) ? $ma[1] : "最大值";
}

function quote_comment($data)
{
	return str_replace("\n", ", ", str_replace("\r", "", $data));
}