package com.work.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.tohier.weapon2.framework.Constants;
import com.tohier.weapon2.framework.ext.ExtUtil;
import com.tohier.weapon2.framework.web.BaseManageController;
import com.work.manager.RCanSgManager;
import com.work.util.PageUtil;

public class RCanSgController extends BaseManageController{
	@Autowired
	private RCanSgManager rCanSgManager;
	
	public ModelAndView pageList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String start = StringUtils.trimToEmpty(request.getParameter("start"));
		String limit = StringUtils.trimToEmpty(request.getParameter("limit"));
		int toStart = NumberUtils.toInt(start, 0);
		int toLimit = NumberUtils.toInt(limit, Constants.VALUE_PAGE_SIZE);
		PageUtil pu = rCanSgManager.pageList(toStart, toLimit);
		this.renderText(response,ExtUtil.listToJson2(pu.getData(),null,pu.getTotal()));
		return null;
	}
	
	public ModelAndView getPhyBySgid(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		
		return null;
	}
	
}
