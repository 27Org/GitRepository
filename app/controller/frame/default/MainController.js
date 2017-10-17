Ext.define('app.controller.frame.default.MainController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.defaultThemeController',
    
    init: function(){
    	
    },
    
   	/***
   	 * 皮肤切换功能
   	 * 以下做法虽实现了功能,但是缺陷很多:
   	 * 	  1.刷新会还原到最初皮肤 2.切换过程样式会变(tab和表格grid重合等)
   	 * 解决方式:
   	 * 	  把切换后的皮肤时效改成永久的,除非用户主动切换
   	 * */
    onSwapStyle: function(item){
    	switch(item.text){
    		case 'aria':
    			Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-aria/resources/theme-aria-all.css');
		        　	break;
		    case 'neptune':
		   	    Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-neptune/resources/theme-neptune-all.css');
		        　	break;
		    case 'crisp':
		    	Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-crisp/resources/theme-crisp-all.css');
		        　      break;
            case 'classic':
           	    Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-classic/resources/theme-classic-all.css');
		        　      break;
            case 'gray':
           	    Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-gray/resources/theme-gray-all.css');
		        　      break;
		    default :
		   	    Ext.util.CSS.swapStyleSheet('theme','ext/build/classic/theme-triton/resources/theme-triton-all.css');
    	}
    },
    
    onMenuTreeItemClick:  function(tree, record, item, index, e, eOpts) {
    	var contentPanel = Ext.SystemTabPanel;
		if(Ext.isEmpty(contentPanel) || !(contentPanel instanceof Ext.tab.Panel)){
			EU.toastWarn("menuTreeitem错误!");return;
    	}
    	var id = record.data.id;
    	var dataUrl = record.data.dataUrl;
    	var tabPanel = contentPanel.getComponent("TAB_"+id);
    	if(Ext.isEmpty(tabPanel)){
     	 	tabPanel = Ext.create(dataUrl,{id:"TAB_"+id,title:record.data.text,closable:true,margin: '1 0 0 0'});
     	 	tabPanel.menuid = id;
	     	tabPanel = contentPanel.add(tabPanel);
     	}
     	return contentPanel.setActiveTab(tabPanel);
     	//PU.openTabModule(record.data);
    },
    
    //颜色显示
    treeNavNodeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return view.rendererRegExp ? value.replace(view.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },
    
    onUserclick:function(btn){
    	//var person = cfg.sub;
    	var person = local.get("personinfo");
    	if(person == null || person == ""){
    		EU.toastWarn("登录状态异常!");
    		EU.redirectTo('login');
    		return;
    	}
    	var params = {personid:person.id};
    	PU.openModule({title:"用户信息维护",xtype:"userEdit",width:730,height:430,params:params,scope:this,animateTarget:btn});
    },
    
    onLogout:function(btn){
		EU.showMsg({title:"退出系统",message:"您确定要退出吗？",animateTarget:btn,option:1,callback:function(result){
    		if(result != 'yes')return;
    		session.remove("isLogin");
    		EU.redirectTo('login');
    	}});
    }
});