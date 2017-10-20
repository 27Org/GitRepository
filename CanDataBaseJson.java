package com.work.service;

import java.util.ArrayList;
import java.util.List;

import com.work.model.CanDataBase;

public class CanDataBaseJson {
	public static String getCanJson() {
		
		
		return null;
	}
	
	public static void getCanJson(List<CanDataBase> cdbList) {
		System.out.println("getCanJsongetCanJson");
		List<String> boList = new ArrayList<String>();
		for (int i = 0; i < cdbList.size(); i++) {
			if(cdbList.get(i).getShowMsg().startsWith("BO")) {
				boList.add(cdbList.get(i).getShowMsg());
			}
		}
		
		for (String string : boList) {
			System.out.println(string);
		}
		
		
		String[] midStr;
		List<String> ECU = new ArrayList<String>();
		for (int i = 0; i < boList.size(); i++) {
			midStr = boList.get(i).split(" ");
			ECU.add(midStr[midStr.length-1]);
		}
		
		for (String string : ECU) {
			System.out.println(string);
		}
	}
}
