<?php

/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:53
 */
class api{
	private $result = [ 'code' => - 1, 'msg' => null, 'status' => false, 'data' => null ];

	/**
	 * 设置全部数据
	 *
	 * @param array $result
	 */
	public function _set( $result ) {
		$this->result = array_merge( $this->result, $result );
	}

	/**
	 * 设置状态
	 *
	 * @param bool $status
	 * @param int $code
	 * @param string $msg
	 */
	public function _set_status( $status, $code, $msg = null ) {
		$this->result['status'] = $status ? true : false;
		$this->result['code'] = intval( $code );
		if ( $msg !== null ) {
			$this->result['msg'] = trim( $msg );
		}
	}

	/**
	 * 设置要返回的数据
	 *
	 * @param string $msg
	 * @param mixed $data
	 */
	public function _set_msg( $msg, $data ) {
		$this->result['msg'] = trim( $msg );
		$this->result['data'] = $data;
	}

	/**
	 * 设置要返回的数据
	 *
	 * @param mixed $data
	 */
	public function _set_data( $data ) {
		$this->result['data'] = $data;
	}

	/**
	 * 对象销毁并输出数据
	 */
	function __destruct() {
		header( "Content-Type: application/json; charset=utf-8" );
		echo json_encode( $this->result, JSON_UNESCAPED_UNICODE );
	}
}

require_once(__DIR__."/obj.php");