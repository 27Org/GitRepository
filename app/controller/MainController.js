Ext.define('app.controller.MainController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.main',
   
    routes  : {
	    ':xtype': 'handleRoute'//执行路由
	},
	
	handleRoute : function(xtype) {
		var home = null;
		try{
      		home= Ext.create(xtype);
		}catch(e){
			//home= Ext.create(cfg.xtypeLogin);
			home= Ext.create(xtype);
		}
		Ext.FramePanel.removeAll(true);
    	Ext.FramePanel.add(home);
	},

	init:function(){
    	this.initCfg();
    	Ext.Panel = this;
    	Ext.Viewport = this.getView();
    	Ext.FramePanel = Ext.Viewport.items.items[0];  //主窗口面板
    	var islogin = session.get("isLogin") || false;
    	if(CU.getBoolean(islogin) != true){this.redirectTo('login');}
    },
    
    initCfg :function(){
    }
});