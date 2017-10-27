package com.work.web;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.COMSettingsManager;
import com.work.manager.CanBoManager;
import com.work.manager.CanSgManager;
import com.work.manager.CanToolMsgManager;
import com.work.manager.RCanBoManager;
import com.work.manager.RCanSgManager;
import com.work.model.COMSettings;
import com.work.model.CanBo;
import com.work.model.CanSg;
import com.work.model.CanToolMsg;
import com.work.model.RCanBo;
import com.work.model.RCanSg;
import com.work.service.CanToolToCanToolAppMsg;
import com.work.service.PortService;
import com.work.service.phytool.TestPhy;
import com.work.util.PageUtil;

import gnu.io.SerialPort;
/***
 * CanTool的COM操作
 * 
 * */
public class CanToolMsgController extends BaseManageController{
	@Autowired
	private COMSettingsManager cOMSettingsManager;
	@Autowired
	private CanToolMsgManager canToolMsgManager;
	@Autowired	
	private  CanBoManager canBoManager;
	@Autowired	
	private  CanSgManager canSgManager;
	@Autowired
	private  RCanBoManager rCanBoManager;
	@Autowired
	private  RCanSgManager rCanSgManager;
	
	public static SerialPort serialPort;
	public static String canToolPortName;

	public ModelAndView pageList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String start = StringUtils.trimToEmpty(request.getParameter("start"));
		String limit = StringUtils.trimToEmpty(request.getParameter("limit"));
		int toStart = NumberUtils.toInt(start, 0);
		int toLimit = NumberUtils.toInt(limit, Constants.VALUE_PAGE_SIZE);
		PageUtil pu = canToolMsgManager.pageList(toStart, toLimit);
		this.renderText(response,ExtUtil.listToJson2(pu.getData(),null,pu.getTotal()));
		return null;
	}
	
	//打开COM
	public ModelAndView openCOM(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String cOMSettingsid = request.getParameter("cOMSettingsid");
		COMSettings cOMSettings = cOMSettingsManager.get(Long.parseLong(cOMSettingsid));
		PortService ps = new PortService();
		String portName = cOMSettings.getPortName();
		
		canToolPortName = portName;

		int bitRate = cOMSettings.getBitRate();
		serialPort = ps.startComPort(portName, bitRate, SerialPort.DATABITS_8, SerialPort.STOPBITS_1, SerialPort.PARITY_NONE);
		return null;
	}
	
	//关闭COM
	public ModelAndView closeCOM(HttpServletRequest request, HttpServletResponse response) throws Exception {
		if(serialPort != null) {
			serialPort.close();
			serialPort = null;
		}
		return null;
	}
	
	//收到CAN信号, 并且将CAN信号以 串口数据传输 方式 发送给CanToolApp
	
	
	/**
	 * 用测试组的数据进行测试:  测试组给的是 "t---"  
	 * 
	 * importToLocal:将excel中的数据导入到mysql
	 * sendCanToolMsg:将数据传输到cantoolapp
	 * */
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
		    
		    CanToolMsg canToolMsg;
		    Sheet sheet = workbook.getSheetAt(0);  
		    Iterator<Row> rows = sheet.rowIterator(); 
		    while (rows.hasNext()) {
		    	canToolMsg = new CanToolMsg();
		    	Row row = rows.next();
		    	if(row.getRowNum()<1){continue;}//跳过第一行(列的名称)
		    	String cid = (row.getCell(0)==null)?(""):getCellValue(row.getCell(0));
		    	String showMsg = (row.getCell(0)==null)?(""):getCellValue(row.getCell(1));
		    	
		    	canToolMsg = new CanToolMsg();
		    	canToolMsg.setCid(cid);
		    	canToolMsg.setCanToolMsg(showMsg);
		    	
		    	canToolMsgManager.save(canToolMsg);
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
	
	//从cantool发送信息到cantoolapp
	public ModelAndView sendCanToolMsg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CanToolMsg> ctmLs = canToolMsgManager.getAll();
		for (CanToolMsg canToolMsg : ctmLs) {
			//获取t/T_中的bid
			int bid = CanToolToCanToolAppMsg.getBid(8,canToolMsg.getCanToolMsg());
			//从字典中找到该Bid的BO_
			List<CanBo> cblist = canBoManager.getAll();//获取字典中所有的BO_
			String[] boinfo = CanToolToCanToolAppMsg.getBoByBid(bid, cblist);
			String boMsg = boinfo[0];//BO_
			String boID = boinfo[1];//BO在mysql数据库中的id
			
			RCanBo rcb = new RCanBo();
			rcb.setBoMsg(boMsg);
			rCanBoManager.save(rcb);
			
			//接收SG,存到mysql数据库中
			//根据BO_的bid,找到该BO_下所有的SG_
			//需要用到CanSg
			List<CanSg> rcsList = canSgManager.findSgByBoID(Long.parseLong(boID));
			
			/*
			//结果测试
			System.out.println("----------++");
			System.out.println(boMsg);
			for (CanSg canSg : rcsList) {
				System.out.println(canSg.getSgMsg());//ok
			}
			System.out.println("----------++");
			*/
			
			/**
			 * 获取物理信号:
			 * 1.先获取一个BO下的所有SG--上面步骤已完成
			 * 2.把SG对象的SGmsg拿出来放到一个String链表中
			 * 3.使用工具类TestPhy.show获取该BO下所有SG的物理信号
			 */
			List<String> sgMsgls = new ArrayList<String>();
			for (CanSg canSg : rcsList) {
				sgMsgls.add(canSg.getSgMsg());
			}
			RCanSg rcs;
			List<Double> sgPhyLs = TestPhy.show(canToolMsg.getCanToolMsg(), sgMsgls);
			
			for (int i = 0; i < rcsList.size(); i++) {
				rcs = new RCanSg();
				rcs.setBoMsg(rcb.getBoMsg());
				rcs.setrCanBo(rcb);
				rcs.setSgMsg(rcsList.get(i).getSgMsg());
				//获取物理信号
				double phy = sgPhyLs.get(i);//一一对应
				if(phy == 0) {//只保存(接收)那些物理信号phy不等于0的SG
					continue;
				}
				if(phy<-41) {
					phy = -40;
				}
				if(phy>368) {
					phy = 368;
				}
				rcs.setPhy((int)phy);
				
				//app从cantool接收到的完整的SG   rcs
				rCanSgManager.save(rcs);
			}
		}
		return null;
	}
}
