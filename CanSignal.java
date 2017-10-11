package com.work.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tohier.weapon2.framework.model.AuditableModel2;

@Entity
@Table(name = "TB_CANSIGNAL")
public class CanSignal extends AuditableModel2{
	/***
	 *   SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACIonButtonSt : 12|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACIonButtonStVD : 13|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACCirculationButtonSt : 18|1@0+ (1,0) [0|1] ""  HVAC
		 SG_ CDU_HVACCirculationButtonStVD : 19|1@0+ (1,0) [0|1] ""  HVAC
		 
		 注：每个字段间间隔符除注明外，均使用空格作为分隔符，上述样例在数据库中保存的格式为。S
		 G_开始于新的一行第1列，信息的末尾为”\n”即DOS换行符”0x0d 0x0a”。
		 
		 每个CAN的Message后都跟着该Message要发送的Can信号Signal及其参数。
	 * */
	/**
	 * 固定为SG_
	 * */
	public static String CANsignal = "SG_";

	/**
	 * char[32] 字符串，最长32字节
	 * eg:EngMsg1 
	 * */
	private String SignalName;
	
	/**
	 * 分割符,固定格式为 :
	 * */
	private String divide;
	
	/**
	 * 起始位| bit长度 @ bit格式
	 * unsigned char[10]
	 * eg:23|12@0+
	 * 说明:
	 *  23表示起始位编号
		12 表示此CAN信息的DATA的长度为12bit
		格式:startPosition + "|" + bitLength + "@" + tag
	 * */
	private Long startPosition;
	
//	public static String sign1 = "|";
			
	private Long bitLength;
	
//	public static String sign2 = "@"; 
	/**
	 * 1+  或者   0+
	 * */
	private String tag;
	
	/**
	 * (A,B)
	 * eg:(0.1, -10)
	 * 
	 * A:分辨率，1LSB的物理值精度，B：物理值的偏移量offset
	 * Phy=A*x+B, x为CAN信号的数值，phy为CAN信号对应的物理值
	 * */
	private double Phy;
	
	private double x;
	
	private double A;
	
	private double B;
	
	/**
	 * 物理值的范围：Min=C到MAX=D
	 * */
	private double C;
	
	private double D;
	
	/**
	 * 物理单位 
	 * Char[32]
	 * eg:"℃"
	 * 说明:带有双引号的字符串，可以为空:""
	 * */
	private String  physicalUnit;
	
	/**
	 * char[255]
	 * eg:BODY_ECU
	 * 说明:接收该信号的节点Node名列表（也是ECU名）字符串，最长32字节。
	 * 如果多个ECU接收此信号，则用逗号将多了节点名隔开
	 * 例如：BCM,PEPS,ICM,CDU
	 * */
	private String NodeName;
	
	private CanMessage canMessage;

	public static String getCANsignal() {
		return CANsignal;
	}

	public static void setCANsignal(String cANsignal) {
		CANsignal = cANsignal;
	}

	public String getSignalName() {
		return SignalName;
	}

	public void setSignalName(String signalName) {
		SignalName = signalName;
	}

	public String getDivide() {
		return divide;
	}

	public void setDivide(String divide) {
		this.divide = divide;
	}

	public Long getStartPosition() {
		return startPosition;
	}

	public void setStartPosition(Long startPosition) {
		this.startPosition = startPosition;
	}

	public Long getBitLength() {
		return bitLength;
	}

	public void setBitLength(Long bitLength) {
		this.bitLength = bitLength;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public double getPhy() {
		return Phy;
	}

	public void setPhy(double phy) {
		Phy = phy;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getA() {
		return A;
	}

	public void setA(double a) {
		A = a;
	}

	public double getB() {
		return B;
	}

	public void setB(double b) {
		B = b;
	}

	public double getC() {
		return C;
	}

	public void setC(double c) {
		C = c;
	}

	public double getD() {
		return D;
	}

	public void setD(double d) {
		D = d;
	}

	public String getPhysicalUnit() {
		return physicalUnit;
	}

	public void setPhysicalUnit(String physicalUnit) {
		this.physicalUnit = physicalUnit;
	}

	public String getNodeName() {
		return NodeName;
	}

	public void setNodeName(String nodeName) {
		NodeName = nodeName;
	}

	@ManyToOne
	@JoinColumn(name="canMessage_id")
	public CanMessage getCanMessage() {
		return canMessage;
	}

	public void setCanMessage(CanMessage canMessage) {
		this.canMessage = canMessage;
	}
	
}
