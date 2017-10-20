Ext.define('app.controller.canDataBase.CanDataBaseController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.canDataBaseController',
    
    onAdd:function(btn){
    	var url = '../canDataBase.do?method=initData';
        Ext.Ajax.request({url: url,method: 'post',
	        success: function(resp,opts) {
	    	}
	   	});
    },
    
    openModule:function(title,params,btn){
    },
    
    showJsonTree:function(btn){
    	var url = '../canDataBase.do?method=showJsonTree';
        Ext.Ajax.request({url: url,method: 'post',
	        success: function(resp,opts) {
	        	Ext.Msg.alert("success!");
	    	}
	   	});
   	},
   	
    onImport:function(btn){
   		var me = this;
   		var title = "import...";
		me.openImportWin(title,null,btn);
   	},
   	
//    onExport:function(btn){
//   		var me = this;
//   		var title = "导出操作";
//		me.openExportWin(title,null,btn);
//   	},
    
   	openImportWin:function(title,params,btn){
    	PU.openModule({title:title,xtype:"importWin",width:400,params:params,animateTarget:btn,scope:this,callback:function(result){
    	}});
    },
    
//   	openExportWin:function(title,params,btn){
//    	PU.openModule({title:title,xtype:"exportWin",width:400,params:params,animateTarget:btn,scope:this,callback:function(result){
//    	}});
//    },
    
    saveAsJson:function(btn){
    	var url = '../canDataBase.do?method=saveAsJsonFile';
        Ext.Ajax.request({url: url,method: 'post',
	        success: function(resp,opts) {
	        	Ext.Msg.alert("success!");
	    	}
	   	});
    },
    
    onAfterRender:function(paging){
	    var gridstore = Ext.create('Ext.data.Store', {
		  	pageSize: 20,
	       	autoLoad: {start: 0, limit: 20},
		    proxy: {
		        type: 'ajax',
		        url: '../canDataBase.do?method=pageList',
		        reader: {type: 'json',rootProperty: 'data',totalProperty:'totalProperty'}
		    }
		});
		this.gridpanel.setStore(gridstore);
		paging.setStore(gridstore);
    },
    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});