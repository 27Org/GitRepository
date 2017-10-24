package com.work.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import com.tohier.weapon2.framework.Constants;
import com.tohier.weapon2.framework.ext.ExtUtil;
import com.tohier.weapon2.framework.utils.DateUtil;
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.CanBoManager;
import com.work.manager.CanDataBaseManager;
import com.work.manager.CanSgManager;
import com.work.model.CanBo;
import com.work.model.CanDataBase;
import com.work.model.CanSg;
import com.work.service.jsontool.CanDataBaseJson;
import com.work.service.jsontool.CreateJsonFile;
import com.work.service.jsontool.JsonFormatTool;
import com.work.util.PageUtil;

public class CanDataBaseController extends BaseManageController{
	@Autowired
	private CanBoManager canBoManager;
	@Autowired
	private CanSgManager canSgManager;
	@Autowired
	private CanDataBaseManager canDataBaseManager;
	
	public ModelAndView pageList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String start = StringUtils.trimToEmpty(request.getParameter("start"));
		String limit = StringUtils.trimToEmpty(request.getParameter("limit"));
		int toStart = NumberUtils.toInt(start, 0);
		int toLimit = NumberUtils.toInt(limit, Constants.VALUE_PAGE_SIZE);
		PageUtil pu = canDataBaseManager.pageList(toStart, toLimit);
		this.renderText(response,ExtUtil.listToJson2(pu.getData(),null,pu.getTotal()));
		return null;
	}
	
	public ModelAndView saveAsJsonFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CanDataBase> cdbList = canDataBaseManager.getAll();
		String cjson = CanDataBaseJson.getCanJson2(cdbList);
		//放到桌面上
        File desktopDir = FileSystemView.getFileSystemView().getHomeDirectory();
		String desktopPath = desktopDir.getAbsolutePath();
		CreateJsonFile.createJsonFile(JsonFormatTool.formatJson(cjson), desktopPath, "CanJson_File");
		return null;
	}
	
	public ModelAndView showJsonTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CanDataBase> cdbList = canDataBaseManager.getAll();
		String cjson = CanDataBaseJson.getCanJson2(cdbList);
		CreateJsonFile.createCommonJsonFile(cjson, "./src/main/webapp/demo/app/data", "CanJson_File");
		return null;
	}
	
	public ModelAndView importToLocal(HttpServletRequest request,HttpServletResponse response) throws IOException {
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
		if (multipartResolver.isMultipart(request)){
	    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;  
		    MultipartFile excelFile = multipartRequest.getFile("excelFile");
		    String fileName = excelFile.getOriginalFilename();
		    String fileType = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
		    InputStream input  = excelFile.getInputStream();
			Workbook workbook  = null; 
			
		    if(fileType.equals(".xls")){
		    	workbook = new HSSFWorkbook(input);
		    }else if(fileType.equals(".xlsx")){
		    	workbook = new XSSFWorkbook(input);
		    }else{
		    	return null;
		    }
		    
		    CanDataBase canDataBase;
		    Sheet sheet = workbook.getSheetAt(0);  
		    Iterator<Row> rows = sheet.rowIterator(); 
		    while (rows.hasNext()) {
		    	canDataBase = new CanDataBase();
		    	Row row = rows.next();
		    	if(row.getRowNum()<1){continue;}//跳过第一行(列的名称)
		    	String cid = (row.getCell(0)==null)?(""):getCellValue(row.getCell(0));
		    	String showMsg = (row.getCell(0)==null)?(""):getCellValue(row.getCell(1));
		    	
		    	canDataBase = new CanDataBase();
//		    	canDataBase.setCid(Long.parseLong(cid));
		    	canDataBase.setShowMsg(showMsg);
		    	
		    	canDataBaseManager.save(canDataBase);
		    }
		}
		this.renderText(response,ExtUtil.simpleToJson(true));
		return null;
	}
	
	public static String getCellValue(Cell cell){
		if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC){
			return String.valueOf(cell.getNumericCellValue());
		}else if(cell.getCellType() == Cell.CELL_TYPE_BOOLEAN){
			return String.valueOf(cell.getBooleanCellValue());
		}else{
			return cell.getStringCellValue();
		}
	} 
	
	public ModelAndView initData(HttpServletRequest request, HttpServletResponse response) throws Exception {
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
		
		canBoManager.save(cb1);
		for (int i = 0; i < sgLs.size(); i++) {
			c1 = new CanSg();
			c1.setSgMsg(sgLs.get(i));
			c1.setCanBo(cb1);
			
			canSgManager.save(c1);
		}
		
		
		//2
		CanBo cb2 = new CanBo();
		CanSg c2;
		List<String> sgLs2 = new ArrayList<String>();
		
		cb2.setBoMsg("BO_ 61 CDU_4: 8 CDU");
		sgLs2.add("SG_ CDU_HVACACCfg : 1|2@0+ (1,0) [0|3] \"\"  HVAC");
		sgLs2.add("SG_ CDU_HVACAirCirCfg : 3|2@0+ (1,0) [0|3] \"\"  HVAC");
		sgLs2.add("SG_ CDU_HVACComfortCfg : 5|2@0+ (1,0) [0|3] \"\"  HVAC");
		
		canBoManager.save(cb2);
		for (int i = 0; i < sgLs2.size(); i++) {
			c2 = new CanSg();
			c2.setSgMsg(sgLs.get(i));
			c2.setCanBo(cb2);
			
			canSgManager.save(c2);
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
		
		canBoManager.save(cb3);
		for (int i = 0; i < sgLs3.size(); i++) {
			c3 = new CanSg();
			c3.setSgMsg(sgLs.get(i));
			c3.setCanBo(cb3);
			
			canSgManager.save(c3);
		}
		
		//4--
		
		
		
		
		//BO_ SG_显示格式设定
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
			canDataBaseManager.save(cdba);
			cdba = null;
			for(int j = 0; j < csList.size(); j++) {//添加该BO_下的所有SG_
				cdba = new CanDataBase();
				cdba.setShowMsg(csList.get(j).getSgMsg());
				cdbaList.add(cdba);
				canDataBaseManager.save(cdba);
				cdba = null;
			}
		}
		return null;
	}
}
