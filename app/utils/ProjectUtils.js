
/**
* 辅组方法
*/
Ext.define('app.utils.ProjectUtils', {
	 alternateClassName: 'PU',
	 requires: [
        'app.view.systemattach.FileBatchUpload',
        'app.view.systemattach.FileBatchPreview',
        'app.view.systemattach.UploadGrid'
     ],
	 statics: {
	 	wins:{},
	 	
	 	operateLimits:{},
        
        getHeight:function(){
        	return Ext.FramePanel.getEl().getHeight()
        },
        
        getWidth:function(){
        	return Ext.FramePanel.getEl().getWidth()
        },
        
        openTabModule:function(config,tabcfg){
    		if(Ext.isEmpty(config.type) || config.type =='00')return;
        	var tabcfg = tabcfg || {}
        	var contentPanel = Ext.SystemTabPanel;
        	if(Ext.isEmpty(contentPanel) || !(contentPanel instanceof Ext.tab.Panel)){
        		EU.toastErrorInfo("TabPanel为空，请与管理员联系。");
        		return;
        	}
     		var id = config.id;
        	var tabPanel = contentPanel.getComponent("TAB_"+id);
        	if(Ext.isEmpty(tabPanel)){
	     	 	if(config.type=='02'){
		     	 	var html = '<iframe src ="'+config.url+'" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>';
		     	 	tabPanel = {id:"TAB_"+id,title:config.text,border:false,closable: true,html:html};
	     	 	}else {
	     	 		tabPanel = Ext.create(config.url,{id:"TAB_"+id,title:config.text,closable:true,margin: '1 0 0 0'});
	     	 	}
	     	 	tabPanel.menuid = id;
	     	 	if(!Ext.isEmpty(config.glyph))tabPanel.glyph = config.glyph;
	     	 	if(!Ext.isEmpty(config.iconCls))tabPanel.iconCls = config.iconCls;
		     	tabPanel = contentPanel.add(tabPanel);
		     	tabPanel.tab.setClosable(!(tabcfg.checked === false));
		     	this.systemLimits(tabPanel);
	     	}
	     	return contentPanel.setActiveTab(tabPanel);
        },
	 	
	 	openModule:function(config){
	 		var me = this;
	 		if(Ext.isEmpty(config)){EU.toastErrorInfo("错误请求!");return;}
	 		if(Ext.isEmpty(config.url)&&Ext.isEmpty(config.xtype)){EU.toastWarn("url和xtype不能同时为null!");return;}
			config.modal = Ext.isEmpty(config.modal)?true:config.modal;//modal默认为true
			config.layout = Ext.isEmpty(config.layout)?"fit":config.layout;//layout默认为fit填充
			var xtype = config.xtype; delete config.xtype;//delete config.xtype;执行后再访问config.xtype会是undefined
			var url = config.url; delete config.url;
			Ext.apply(config,{maximizable: true});//true表示显示最大化按钮，默认值为false。 
			var item = null;
			var pscope = config.scope;
			config.resizable = Ext.isEmpty(config.resizable)?false:config.resizable;
			config.closable = false;
			config.height = config.height>me.getHeight()?me.getHeight():config.height;
			config.width = config.width>me.getWidth()?me.getWidth():config.width;
			var dialog = Ext.create('Ext.window.Window',config);//创建对话框,并将处理好的config作为参数应用给这个对话框
			if(!Ext.isEmpty(url)){//*
	     	 	item = Ext.create("Ext.ux.IFrame",{src:url});//IFrame是什么...
				//item.iframeEl.dom.contentWindow = iframe对象
     	 	}else {
     	 		item = Ext.create(xtype,{params:config.params,pscope:pscope,callback:config.callback,fn:config.fn});
     	 	}
     	 	dialog.add(item);
     	 	dialog.show();
     	 	dialog.on("close",function(panel, eOpts ){delete me.wins[dialog.id];}, this);
     	 	dialog.addTool({xtype:'tool',type:'close',tooltip:'关闭窗口',scope:this,handler:function(){
				if(Ext.isFunction(item.closeWindowVerify)){
					item.closeWindowVerify();
				}else{
					dialog.close();
				}
			}});
			me.wins[dialog.id] = dialog;
			return dialog;
	 	},
	 	
	 	/**
		 * 附件上传/下载组件
		 * @param {} config
		 * @param disabeld 是否不可上传 缺省false
		 *
		 */
	 	openAttachWindow : function(config){
			config.disabeld = Ext.isEmpty(config.disabeld)?false:config.disabeld;
			config.scope = config.scope || this;
			config.title = config.title || (config.disabeld?"附件预览":"附件上传");
			config.modal = Ext.isEmpty(config.modal) ? true : config.modal;
			if(Ext.isEmpty(config.tablename)){
				EU.toastErrorInfo("参数:tablename不能为空!");return;
			}else if(Ext.isEmpty(config.fieldname)){
				EU.toastErrorInfo("参数:fieldname不能为空!");return;
			}else if(Ext.isEmpty(config.fieldvalue)){
				EU.toastErrorInfo("参数:fieldvalue不能为空!");return;
			}
			var xtype='FileBatchUpload',width=1000,height=600;
			if(config.disabeld){width = 800;xtype = 'FileBatchPreview';}
			this.openModule({xtype:xtype,title:config.title,width:width,height:height,params:config,modal:config.modal,scope:config.scope,callback:config.callback});
		},
		
		download : function(cfg,timeout){ 
			var me = this;
			var params = Ext.isEmpty(cfg.params)?{}:cfg.params;
			var url = Ext.isEmpty(cfg.url)?"platform/fileattach/downloadfile.do":cfg.url;
			for (var key in params){var data=params[key];if(Ext.isArray(data))params[key] = CU.toString(data);}//转换为spring @RequestList接受的转码格式
            params = CU.toParams(params);//转换为spring mvc参数接受方式
            url+= (url.indexOf("?")>0?"&":"?")+CU.parseParams(params);
			var width = Ext.isEmpty(cfg.width)?650:cfg.width; //350
            var height = Ext.isEmpty(cfg.height)?500:cfg.height; //300
			var bodyWidth =Ext.getBody().getWidth()
            var bodyHeight = Ext.getBody().getHeight();
            var iLeft = bodyWidth/2-(width/2);
            var iTop = bodyHeight/2-(height/2);
            window.open(url,'fullscreen=0,menubar=0,toolbar=0,location=0,scrollbars=0,resizable=0,status=1,left='+iLeft+',top='+iTop+',width='+width+',height='+height);
            if(Ext.isFunction(cfg.callback))cfg.callback();
        },
		
		/**
		 * 系统刷新
		 * @param {} xtype
		 */
        onAppUpdate:function(xtype){
        	Ext.Msg.confirm('应用更新', '应用程序有一个更新，是否重新加载界面？',
	            function (choice) {
	                if (choice === 'yes') {
	                    if(xtype){
	                    	EU.redirectTo(xtype);
	                    }else{
	                   		window.location.reload();
	                    }
	                }
	            }
	        );
        },
        
        /**
         * 退出系统
         * @param {} btn
         */
        onLogout:function(btn){
	    	EU.showMsg({title:"退出系统",message:"您确定要退出吗？",animateTarget:btn,option:1,callback:function(result){
	    		if(result != 'yes')return;
	        	EU.RS({url:"login/logout.do",callback:function(result){
	        		if(CU.getBoolean(result)){
	        			session.remove("isLogin");
	        			EU.redirectTo(cfg.xtypeLogin);
	        		}
	        	}});
	    	}});
	    },
	    
	    /**
	     * 获取系统全部的url连接
	     * @param {} callback
	     * @param {} scope
	     */
	    createUrlFunction:function(systemurls){
	    	if(Ext.isEmpty(systemurls))return;
	    	for(key in systemurls){
        		var rec = systemurls[key];
        		if(EU[rec.beanname] == null)EU[rec.beanname] = {};
        		EU[rec.beanname][rec.methodname] = new Function("cfg","cfg.url='"+rec.url+"';return EU.RS(cfg);");
        	}
	    },
	    
	    /**
	     * 系统按钮权限控制
	     * @param {} panel 获取reference的容器
	     * @param {} xtype 权限获取的父容器
	     */
	    systemLimits:function(panel,modulurl,callback){
	    	if(!Ext.isFunction(panel.lookupReference))return;
	    	modulurl  = modulurl || panel.$className;
	    	var url = "platform/systemframe/getsystemlimits.do";
	    	var operateLimits = cfg.sub.systemlimits[modulurl];
	    	if(!Ext.isArray(operateLimits))return;
     		Ext.each(operateLimits,function(rec){
     			if(rec.islimit > 0)return;
     			var object = panel.lookupReference(rec.operatecode);
     			if(Ext.isEmpty(object))return;
     			object.hide();
     		});
     		if(Ext.isFunction(callback))Ext.callback(callback)
	    }
	 }
});