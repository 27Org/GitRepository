package com.work.service;

import com.work.model.CAN;

public class CanToCanToolMsg {
	//CAN解析为cantool信息
	public static String canToCanToolMsg(CAN can) {
		StringBuffer canToolMsg = new StringBuffer();
		String CID = Integer.toHexString(can.getCID())+"";
		String DLC = can.getDATA().length+"";
		int[] data = can.getDATA();
		canToolMsg.append("T")
				.append(CID)
				.append(DLC)
				;
		for (int i : data) {
			if(i == 0) {//0的格式 CanTool格式数据中应该显示00,而不是0
				canToolMsg.append("00");
				continue;
			}
			canToolMsg.append(Integer.toHexString(i)+"");
		}
		return canToolMsg.toString();
	}
	
	public static void main(String[] args) {
		CAN can1 = new CAN();
		can1.setCID(0x3d);
		can1.setDLC(0x08);
		int[] DATA = {0x00,0x11,0x12,0x13,0x14,0x15,0x16,0x17};
		can1.setDATA(DATA);
		
		StringBuffer canToolMsg = new StringBuffer();
		String CID = Integer.toHexString(can1.getCID())+"";
		String DLC = can1.getDATA().length+"";
		int[] data = can1.getDATA();
		canToolMsg.append("T")
				.append(CID)
				.append(DLC)
				;
		for (int i : data) {
			if(i == 0) {//0的格式 CanTool格式数据中应该显示00,而不是0
				canToolMsg.append("00");
				continue;
			}else {
				canToolMsg.append(Integer.toHexString(i)+"");
			}
		}
		System.out.println(canToolMsg.toString());
	}
}
