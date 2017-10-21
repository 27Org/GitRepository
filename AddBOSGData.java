package com.test;

import java.util.ArrayList;
import java.util.List;

import com.work.manager.CanBoManager;
import com.work.manager.CanSgManager;
import com.work.model.CanBo;
import com.work.model.CanDataBase;
import com.work.model.CanSg;

public class AddBOSGData {
	
	public static void main(String[] args) {
		CanBoManager cbm = new CanBoManager();
		CanSgManager sgm = new CanSgManager();
		
		//1
		CanBo cb1 = new CanBo();
		CanSg c1;
		List<String> sgLs = new ArrayList<String>();
		
		cb1.setBoMsg("BO_ 856 CDU_1: 8 CDU");
		sgLs.add("SG_ CDU_HVACOffButtonSt : 0|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACOffButtonStVD : 1|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACAutoModeButtonSt : 2|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACAutoModeButtonStVD : 3|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACFDefrostButtonSt : 6|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACFDefrostButtonStVD : 7|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACDualButtonSt : 10|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACDualButtonStVD : 11|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACIonButtonSt : 12|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACIonButtonStVD : 13|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACCirculationButtonSt : 18|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACCirculationButtonStVD : 19|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACACButtonSt : 20|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACACButtonStVD : 21|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACACMaxButtonSt : 22|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACACMaxButtonStVD : 23|1@0+ (1,0) [0|1] \"\"  HVAC");
		sgLs.add("SG_ CDU_HVACModeButtonSt : 26|3@0+ (1,0) [0|7] \"\"  HVAC");
		sgLs.add("SG_ HVAC_WindExitSpd : 30|4@0+ (1,0) [0|15] \"\"   Vector__XXX");
		sgLs.add("SG_ CDU_HVAC_DriverTempSelect : 36|5@0+ (0.5,18) [18|32] \"°C\"   Vector__XXX");
		sgLs.add("SG_ HVAC_PsnTempSelect : 44|5@0+ (0.5,18) [18|32] \"\"   Vector__XXX");
		sgLs.add("SG_ CDU_HVACCtrlModeSt : 54|3@0+ (1,0) [0|7] \"\"  HVAC");
		sgLs.add("SG_ CDU_ControlSt : 55|1@0+ (1,0) [0|1] \"\"  HVAC");
		
		cbm.save(cb1);
		for (int i = 0; i < sgLs.size(); i++) {
			c1 = new CanSg();
			c1.setSgMsg(sgLs.get(i));
			c1.setCanBo(cb1);
			
			sgm.save(c1);
		}
		
		
		//2
		CanBo cb2 = new CanBo();
		CanSg c2;
		List<String> sgLs2 = new ArrayList<String>();
		
		cb2.setBoMsg("BO_ 61 CDU_4: 8 CDU");
		sgLs2.add("SG_ CDU_HVACACCfg : 1|2@0+ (1,0) [0|3] \"\"  HVAC");
		sgLs2.add("SG_ CDU_HVACAirCirCfg : 3|2@0+ (1,0) [0|3] \"\"  HVAC");
		sgLs2.add("SG_ CDU_HVACComfortCfg : 5|2@0+ (1,0) [0|3] \"\"  HVAC");
		
		cbm.save(cb2);
		for (int i = 0; i < sgLs2.size(); i++) {
			c2 = new CanSg();
			c2.setSgMsg(sgLs.get(i));
			c2.setCanBo(cb2);
			
			sgm.save(c2);
		}
		
		//3
		CanBo cb3 = new CanBo();
		CanSg c3;
		List<String> sgLs3 = new ArrayList<String>();
		
		cb3.setBoMsg("BO_ 1067 CDU_NM: 8 CDU");
		sgLs3.add("SG_ CDU_NMDestAddress : 7|8@0+ (1,0) [0|255] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMAlive : 8|1@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMRing : 9|1@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMLimpHome : 10|1@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMSleepInd : 12|1@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMSleepAck : 13|1@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMWakeupOrignin : 23|8@0+ (1,0) [0|255] \"\"  BCM,PEPS,ICM,CDU");
		sgLs3.add("SG_ CDU_NMDataField : 31|40@0+ (1,0) [0|1] \"\"  BCM,PEPS,ICM,CDU");
		
		cbm.save(cb3);
		for (int i = 0; i < sgLs3.size(); i++) {
			c3 = new CanSg();
			c3.setSgMsg(sgLs.get(i));
			c3.setCanBo(cb3);
			
			sgm.save(c3);
		}
		
		//4
		
		
		
		addCanDataBase();
	}
	
	public static void addCanDataBase() {
		CanBoManager canBoManager = new CanBoManager();
		CanSgManager canSgManager = new CanSgManager();
		
		CanDataBase cdba;
		List<CanDataBase> cdbaList = new ArrayList<CanDataBase>();
		
		List<CanBo> cbList = canBoManager.getAll();
		List<CanSg> csList;
		
		
		//BO_ SG_显示格式
		for (int i = 0; i < cbList.size(); i++) {
			cdba = new CanDataBase();
			csList = canSgManager.findSgByBoID(cbList.get(i).getId());//添加BO_
			cdba.setShowMsg(cbList.get(i).getBoMsg());
			cdbaList.add(cdba);
			for(int j = 0; j < csList.size(); j++) {//添加该BO_下的所有SG_
				cdba = new CanDataBase();
				cdba.setShowMsg(csList.get(i).getSgMsg());
				cdbaList.add(cdba);
			}
		}
	}
	
}
