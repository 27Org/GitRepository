package com.work.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.tohier.weapon2.framework.model.AuditableModel2;

@Entity
@Table(name = "TB_CANMESSAGE")
public class CanMessage extends AuditableModel2{
	/***
	 * eg:
	 * BO_ 61 CDU_4: 8 CDU
	 * BO_ 1067 CDU_NM: 8 CDU
	 * BO_ 1056 BCM_NM: 8 BCM
	 * BO_ 792 BCM_BCAN_1: 8 BCM
	 * 
	 * 说明:
	 *   每个字段间间隔符除注明外，均使用空格作为分隔符，上述样例在数据库中保存的格式为。
	 * BO_开始于新的一行第0列，信息的末尾为”\n”即DOS换行符”0x0d 0x0a”。
	 * */
	/**
	 2148606241	
	 		十进制数值2148606241转换为16进制为0x80112121，
	 		其中msb=bit31=1表示是CAN扩展帧，bit28~bit0是实际的CANID值=0x00112121
	 100	
	 		十进制数值100转换为16进制为0x00000064，
	 		其中msb=bit31=0表示是CAN标准帧，bit10~bit0是实际的CANID值=0x013
	 * */
	private Long Cid;
	
	/**
	 * char[32]
	 * 固定为BO_
	 * */
	public static String CANmessage = "BO_";
	
	/**
	 * char[32]
	 * 字符串，最长32字节
	 * eg:EngMsg1
	 * */
	private String MessageName;
	
	/**
	 * 分割符,固定格式为 :
	 * */
	private String divide;
	
	/**
	 * 类型:unsigned char
	 * eg:8 
	 * 范围:0—8, 表示此CAN信息的DATA的长度为8byte
	 * */
	private String DLC;
	
	/**
	 * char[32]
	 * eg:BODY_ECU
	 * 字符串，最长32字节,发送此信息的Node名。也是ECU名
	 * */
	private String NodeName;

	
	public Long getCid() {
		return Cid;
	}

	public void setCid(Long cid) {
		Cid = cid;
	}

	public String getMessageName() {
		return MessageName;
	}

	public void setMessageName(String messageName) {
		MessageName = messageName;
	}

	public String getDivide() {
		return divide;
	}

	public void setDivide(String divide) {
		this.divide = divide;
	}

	public String getDLC() {
		return DLC;
	}

	public void setDLC(String dLC) {
		DLC = dLC;
	}

	public String getNodeName() {
		return NodeName;
	}

	public void setNodeName(String nodeName) {
		NodeName = nodeName;
	}
	
}
