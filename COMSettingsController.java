package com.work.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.tohier.weapon2.framework.ext.ExtUtil;
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.COMSettingsManager;
import com.work.model.COMSettings;
import com.work.service.PortService;
import com.work.service.SerialTool;

import gnu.io.SerialPort;
/***
 * CanToolApp的COM操作
 * 
 * 
 * 
 * */
public class COMSettingsController extends BaseManageController{
	@Autowired
	private COMSettingsManager cOMSettingsManager;
	public static SerialPort serialPort;
	public static String canToolAppPortName;
	
	//获取当前所有的COM
	public ModelAndView getAllCOM(HttpServletRequest request, HttpServletResponse response) throws Exception {//密码没有使用加密
		ArrayList<String> COMName = SerialTool.findPort();//获取所有模拟串口的COM 的名字
		List<COMSettings> clist = cOMSettingsManager.getAll();//获取当前数据库中所有COM的名字
		ArrayList<String> cnameList = new ArrayList<String>();//字符串List
		for (int i = 0; i < clist.size(); i++) {
			cnameList.add(clist.get(i).getPortName());//把所有数据库中COM的名字放到一个list中
		}
		if(clist.size()>0){
			for (int i = 0; i < COMName.size(); i++) {
				if(cnameList.contains(COMName.get(i))) {//如果串口中新增了COM,而数据库中没有,则新增COM口到数据库中
					continue;
				}else {
					COMSettings c = new COMSettings();
					c.setPortName(COMName.get(i));
					c.setBitRate(115200);
					c.setDataBits(8);
					c.setStopBits(1);
					c.setParity(0);
					cOMSettingsManager.save(c);
				}
			}
		}
		List<COMSettings> clist2 = cOMSettingsManager.getAll();
//		PortName pn;
//		for (int i = 0; i < clist2.size(); i++) {
//		    pn = new PortName();
//			pn.setId(i);
//			pn.setPortName(clist2.get(i).getPortName());
//		}
		this.renderText(response,ExtUtil.listToJson2(clist2,null,clist.size()));
		return null;
	}
	
	
    //CommPortIdentifier.getPortIdentifier("COM11");
	//获取单个COM信息
	public ModelAndView getCOMSettingsInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String cOMSettingsid = request.getParameter("cOMSettingsid");
		COMSettings cOMSettings = cOMSettingsManager.get(Long.parseLong(cOMSettingsid));
		this.renderText(response,ExtUtil.objectToJson(cOMSettings));
		return null;
	}
	
	//打开COM
	public ModelAndView openCOM(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String cOMSettingsid = request.getParameter("cOMSettingsid");
		COMSettings cOMSettings = cOMSettingsManager.get(Long.parseLong(cOMSettingsid));
		PortService ps = new PortService();
		String portName = cOMSettings.getPortName();
		
		canToolAppPortName = portName;
		
		int bitRate = cOMSettings.getBitRate();
//		serialPort.setSerialPortParams(115200,SerialPort.DATABITS_8, SerialPort.STOPBITS_1,SerialPort.PARITY_NONE);
		serialPort = ps.startComPort(portName, bitRate, SerialPort.DATABITS_8, SerialPort.STOPBITS_1, SerialPort.PARITY_NONE);
		return null;
	}
	
	//关闭COM
	public ModelAndView closeCOM(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		String cOMSettingsid = request.getParameter("cOMSettingsid");
//		COMSettings cOMSettings = cOMSettingsManager.get(Long.parseLong(cOMSettingsid));
//		String portName = cOMSettings.getPortName();
		if(serialPort != null) {
			serialPort.close();
			serialPort = null;
		}
		return null;
	}
	
}
