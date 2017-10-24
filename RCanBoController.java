package com.work.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.filechooser.FileSystemView;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.tohier.weapon2.framework.Constants;
import com.tohier.weapon2.framework.ext.ExtUtil;
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.RCanBoManager;
import com.work.model.RCanBo;
import com.work.util.PageUtil;

public class RCanBoController extends BaseManageController{
	@Autowired
	private RCanBoManager rCanBoManager;
	
	public ModelAndView pageList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String start = StringUtils.trimToEmpty(request.getParameter("start"));
		String limit = StringUtils.trimToEmpty(request.getParameter("limit"));
		int toStart = NumberUtils.toInt(start, 0);
		int toLimit = NumberUtils.toInt(limit, Constants.VALUE_PAGE_SIZE);
		PageUtil pu = rCanBoManager.pageList(toStart, toLimit);
		this.renderText(response,ExtUtil.listToJson2(pu.getData(),null,pu.getTotal()));
		return null;
	}
	
	public ModelAndView exportBoToExcel(HttpServletRequest request,HttpServletResponse response) throws IOException{
		 //记录excel文件生成日期
		SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
        Date date=new Date();
        //前台给excel表起一个 表名
        String xlsName = "CAN Message Table";
        
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet(); 
		HSSFCellStyle style = wb.createCellStyle();
		
		sheet.setColumnWidth((short)3, 20* 256);//单元格宽度
	    style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直  
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平  
        style.setLocked(false);
        
        HSSFCellStyle style1 = wb.createCellStyle();
        Font font = wb.createFont();      //设置字体样式   
        font.setFontHeightInPoints((short)12);   //--->设置字体大小  
        font.setItalic(true);     //--->设置是否是加粗  
        style1.setFont(font);
        HSSFRow row1 = sheet.createRow(0);
		HSSFCell cell1 = row1.createCell(0);
		cell1.setCellStyle(style1);
		cell1.setCellValue(xlsName);  
		
        HSSFRow row2 = sheet.createRow(1);  
        HSSFCell cell2_1 = row2.createCell(0);  
        HSSFCell cell2_2 = row2.createCell(1); 
        cell2_1.setCellStyle(style1);
        cell2_2.setCellStyle(style1);
        cell2_1.setCellValue("create date:"+dateFormater.format(date));  
        
        HSSFRow row3 = sheet.createRow(2);  
        HSSFCell cell3_1 = row3.createCell(0);  
        HSSFCell cell3_2 = row3.createCell(1);
 
        cell3_1.setCellValue("ID");  
        cell3_2.setCellValue("CAN Message");

        
        //将具体信息加入到excel表中去
        List<RCanBo> slist = rCanBoManager.getAll();
        for (int i = 0; i < slist.size(); i++) {
        	HSSFRow rowi = sheet.createRow((i+3)); 
        	rowi.createCell(0).setCellValue(slist.get(i).getId());
        	rowi.createCell(1).setCellValue(slist.get(i).getBoMsg());
       
		}
        //放到桌面上
        File desktopDir = FileSystemView.getFileSystemView().getHomeDirectory();
        String desktopPath = desktopDir.getAbsolutePath();
        FileOutputStream fileOut = null;  
        fileOut = new FileOutputStream(desktopPath+"\\"+xlsName+".xls");  
        wb.write(fileOut);  
        this.renderText(response,ExtUtil.simpleToJson(true));
		return null;
	}
}
