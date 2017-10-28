
import java.math.BigInteger;
import java.util.*;

public class TestCan {
	
	// public static String bString="";

	


	public static void main(String[] args) {
		// TODO Auto-generated method stub
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
		sgLs.add("SG_ HVAC_WindExitSpd : 30|40@0+ (1,0) [0|15] \"\"   Vector__XXX");
		sgLs.add("SG_ CDU_HVAC_DriverTempSelect : 36|5@0+ (0.5,18) [18|32] \"°„C\"   Vector__XXX");
		sgLs.add("SG_ HVAC_PsnTempSelect : 44|4@1+ (0.5,18) [18|32] \"\"   Vector__XXX");
		sgLs.add("SG_ CDU_HVACCtrlModeSt : 54|3@1+ (1,0) [0|7] \"\"  HVAC");
		sgLs.add("SG_ CDU_ControlSt : 55|1@0+ (1,0) [0|1] \"\"  HVAC");

		// canBoManager.save(cb1);
		for (int i = 0; i < sgLs.size(); i++) {
			c1 = new CanSg();
			c1.setSgMsg(sgLs.get(i));
			c1.setCanBo(cb1);

			// canSgManager.save(c1);
		
		Scanner scanner = new Scanner(System.in);
		System.out.println(" ‰»ÎCAN–≈œ¢£∫");

		String str = scanner.nextLine();
		TestPhy.show(str, sgLs);
	}
	}
}
