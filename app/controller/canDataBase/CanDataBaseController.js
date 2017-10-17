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