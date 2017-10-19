package com.work.service.jsontool;

import java.util.ArrayList;
import java.util.List;

import com.work.model.CanDataBase;

import net.sf.json.JSONArray;

public class CanDataBaseJson {
	public static String getCanJson() {
		
		
		return null;
	}
	
	public static String getCanJson2(List<CanDataBase> cdbList) {
		List<Bojson> bjlist = new ArrayList<Bojson>();
		for (int i = 0; i < cdbList.size(); i++) {
			if(cdbList.get(i).getShowMsg().startsWith("BO")) {//获取每个Bo,并加到bjlist中
				Bojson bj = new Bojson();
				bj.setId(""+i);
				bj.setText(cdbList.get(i).getShowMsg());
				bj.setExpanded(true);
				bjlist.add(bj);
			}else {//把bo下的sg加到这个bo的list中去
				Sgjson sj = new Sgjson();
				sj.setId(""+i);
				sj.setText(cdbList.get(i).getShowMsg());
				sj.setLeaf(true);
				for (int j = 0; j < bjlist.size(); j++) {
					bjlist.get(j).getChildren().add(sj);
				}
			}
		}
		
//		String str = ExtUtil.listToJson3(bjlist,null,bjlist.size());
		String str =JSONArray.fromObject(bjlist).toString();
		System.out.println(str);
		return str;
		
		//{"success":true,"totalProperty":4,"data":[{"children":[{"id":"1","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"2","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"3","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"4","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"5","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"6","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"7","leaf":true,"text":"SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"8","leaf":true,"text":"SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"9","leaf":true,"text":"SG_ CDU_HVACIonButtonSt : 12|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"10","leaf":true,"text":"SG_ CDU_HVACIonButtonStVD : 13|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"11","leaf":true,"text":"SG_ CDU_HVACCirculationButtonSt : 18|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"12","leaf":true,"text":"SG_ CDU_HVACCirculationButtonStVD : 19|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"13","leaf":true,"text":"SG_ CDU_HVACACButtonSt : 20|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"14","leaf":true,"text":"SG_ CDU_HVACACButtonStVD : 21|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"15","leaf":true,"text":"SG_ CDU_HVACACMaxButtonSt : 22|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"16","leaf":true,"text":"SG_ CDU_HVACACMaxButtonStVD : 23|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"17","leaf":true,"text":"SG_ CDU_HVACModeButtonSt : 26|3@0+ (1,0) [0|7] \"\"  HVAC"},{"id":"18","leaf":true,"text":"SG_ HVAC_WindExitSpd : 30|4@0+ (1,0) [0|15] \"\"   Vector__XXX"},{"id":"19","leaf":true,"text":"SG_ CDU_HVAC_DriverTempSelect : 36|5@0+ (0.5,18) [18|32] \"°C\"   Vector__XXX"},{"id":"20","leaf":true,"text":"SG_ HVAC_PsnTempSelect : 44|5@0+ (0.5,18) [18|32] \"\"   Vector__XXX"},{"id":"21","leaf":true,"text":"SG_ CDU_HVACCtrlModeSt : 54|3@0+ (1,0) [0|7] \"\"  HVAC"},{"id":"22","leaf":true,"text":"SG_ CDU_ControlSt : 55|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"24","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"25","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"26","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"28","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"29","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"30","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"31","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"32","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"33","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"34","leaf":true,"text":"SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"35","leaf":true,"text":"SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] \"\"  HVAC"}],"expanded":true,"id":"0","text":"BO_ 856 CDU_1: 8 CDU"},{"children":[{"id":"24","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"25","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"26","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"28","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"29","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"30","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"31","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"32","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"33","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"34","leaf":true,"text":"SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"35","leaf":true,"text":"SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] \"\"  HVAC"}],"expanded":true,"id":"23","text":"BO_ 61 CDU_4: 8 CDU"},{"children":[{"id":"28","leaf":true,"text":"SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"29","leaf":true,"text":"SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"30","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"31","leaf":true,"text":"SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"32","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"33","leaf":true,"text":"SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"34","leaf":true,"text":"SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] \"\"  HVAC"},{"id":"35","leaf":true,"text":"SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] \"\"  HVAC"}],"expanded":true,"id":"27","text":"BO_ 1067 CDU_NM: 8 CDU"},{"children":[],"expanded":true,"id":"36","text":"BO_ 61 CDU_4: 8 CDU"}]}

	}
	
	public static void getCanJson(List<CanDataBase> cdbList) {
		
		System.out.println("getCanJsongetCanJson");
		List<String> boList = new ArrayList<String>();
		for (int i = 0; i < cdbList.size(); i++) {
			if(cdbList.get(i).getShowMsg().startsWith("BO")) {
				boList.add(cdbList.get(i).getShowMsg());//获取所有BO
			}
		}
		
		for (String string : boList) {
			System.out.println(string);
		}
		
		String[] midStr;
		List<String> ECU = new ArrayList<String>();
		for (int i = 0; i < boList.size(); i++) {//BO_ 856 CDU_1: 8 CDU 取到CDU
			midStr = boList.get(i).split(" ");
			ECU.add(midStr[midStr.length-1]);
		}
		
		for (String string : ECU) {
			System.out.println(string);
		}

		StringBuffer canJson = new StringBuffer();
		canJson.append("{\"CAN\":[");
				canJson.append("{\"message\":[");
				
				
					canJson.append("{\"firstName\": \"Bill\",\r\n" + 
							"\"lastName\": \"Gates\"},");
					
					
					for (int i = 0; i < cdbList.size(); i++) {
						
						if(cdbList.get(i).getShowMsg().startsWith("BO")) {
							canJson.append("{\"bo\":");
							
							
						}
						
					}
					
				canJson.append("]},");
				
				
				canJson.append("{\"ecu\":[");
					canJson.append("{\"firstName\": \"Bill\",\r\n" + 
							"\"lastName\": \"Gates\"},");
				canJson.append("]}");
		canJson.append("]}");
		
		/***
			{
			  "employees": [
			    {
			      "firstName": "Bill",
			      "lastName": "Gates"
			    },
			    {
			      "firstName": "George",
			      "lastName": "Bush"
			    },
			    {
			      "firstName": "Thomas",
			      "lastName": "Carter"
			    }
			  ]
			}
		*/
	}
	
	public static void main(String[] args) {
		StringBuffer canJson = new StringBuffer();
		canJson.append("{\"CAN\":[");
				canJson.append("{\"message\":[");
				
					canJson.append("{\"firstName\": \"Bill\",\r\n" + 
							"\"lastName\": \"Gates\"},");
					
					
				canJson.append("]},");
				
				canJson.append("{\"ecu\":[");
				canJson.append("]}");
		canJson.append("]}");
		
		System.out.println(canJson);
	}
	
}
