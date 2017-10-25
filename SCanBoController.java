package com.work.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.tohier.weapon2.framework.Constants;
import com.tohier.weapon2.framework.ext.ExtUtil;
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.CanBoManager;
import com.work.manager.SCanBoManager;
import com.work.model.CanBo;
import com.work.model.SCanBo;
import com.work.service.CanToolAppMsgToCanTool;
import com.work.service.phytool.PhyToSg;
import com.work.util.PageUtil;

public class SCanBoController extends BaseManageController{
	@Autowired
	private SCanBoManager sCanBoManager;
	@Autowired	
	private  CanBoManager canBoManager;
	
	public ModelAndView pageList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String start = StringUtils.trimToEmpty(request.getParameter("start"));
		String limit = StringUtils.trimToEmpty(request.getParameter("limit"));
		int toStart = NumberUtils.toInt(start, 0);
		int toLimit = NumberUtils.toInt(limit, Constants.VALUE_PAGE_SIZE);
		PageUtil pu = sCanBoManager.pageList(toStart, toLimit);
		this.renderText(response,ExtUtil.listToJson2(pu.getData(),null,pu.getTotal()));
		return null;
	}
	
	//getSCanBoInfo
	public ModelAndView getSCanBoInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sCanBoid = request.getParameter("sCanBoid");
		SCanBo scb = sCanBoManager.get(Long.parseLong(sCanBoid));
		this.renderText(response,ExtUtil.objectToJson(scb));
		return null;
	}
	
	public ModelAndView saveSCanBo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sCanBoid = request.getParameter("sCanBoid");
		if(sCanBoid == null) {
			System.out.println("update error!");
			return null;
		}
		SCanBo scb = sCanBoManager.get(Long.parseLong(sCanBoid));
		bindObject(request, scb);
		sCanBoManager.save(scb);
		return null;
	}
	
	
	/**
	 * 如果用户在GUI界面上输入了15℃，
	 * 希望CanToolApp发送给CanTool装置并发送到CAN总线，
	 * 那么就需要把此物理量的数值转换为
	 * CAN信号值x=(phy-B)/A=(15-(-10))/0.1=250=0xFA，
	 * 将16进制0xFA放到相应的CAN信息中，
	 * 组成CAN信息字符串发送给CanTool装置。
	 * */
	public ModelAndView sendCanBoMsg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String[] ids = request.getParameterValues("ids");
		List<String> scantoolMsgls = new ArrayList<String>();
		if(ids != null){
			for (String id : ids) {
				StringBuffer canToolMsg = new StringBuffer();
				SCanBo scb = sCanBoManager.get(Long.parseLong(id));
				//获取Bo中的10进制id,然后转换为16进制
				String Bid = CanToolAppMsgToCanTool.getBoId(scb.getCanBoMsg());
				String cid = Integer.toHexString(Integer.parseInt(Bid));
				
				if(cid.length()>3) {
					canToolMsg.append("T");
				}else {
					canToolMsg.append("t");
				}
				canToolMsg.append(cid);
				
				//DLC写死为8
				canToolMsg.append("8");
				
				//依次拼接8个16进制数...............看着难受
				if(scb.getPhy1() == null || scb.getPhy1().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy1(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					//最大为0xFF,即为255,如果超过该值
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						System.out.println("phy1 : "+d);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy2() == null || scb.getPhy2().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy2(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy3() == null || scb.getPhy3().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy3(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy4() == null || scb.getPhy4().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy4(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy5() == null || scb.getPhy5().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy5(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy6() == null || scb.getPhy6().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy6(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy7() == null || scb.getPhy7().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy7(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				if(scb.getPhy8() == null || scb.getPhy8().equals("")) {
					canToolMsg.append("00");
				}else {
					String a = PhyToSg.getSgData(scb.getPhy8(), scb.getA(), scb.getB());
					double b = Double.parseDouble(a);
					int c = (int)b;
					if(c>255) {
						canToolMsg.append("$$");
					}else {
						String d = Integer.toHexString(c);
						if(d.length()<2) {canToolMsg.append("0");}
						canToolMsg.append(d);
					}
				}
				
				scantoolMsgls.add(canToolMsg.toString());
				System.out.println("测试canToolMsg: "+canToolMsg);
			}
		}
		return null;
	}
	
	public ModelAndView initSBo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CanBo> boLs = canBoManager.getAll();
		SCanBo scb;
		for (CanBo canBo : boLs) {
			scb = new SCanBo();
			scb.setCanBoMsg(canBo.getBoMsg());
			sCanBoManager.save(scb);
		}
		return null;
	}
}
