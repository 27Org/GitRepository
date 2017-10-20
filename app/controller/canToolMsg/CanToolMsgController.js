Ext.define('app.controller.canToolMsg.CanToolMsgController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.canToolMsgController',
    
    rowdblclick: function(gridpanel, record, tr, rowIndex, e, eOpts){
    },
    
    onAdd:function(btn){
		this.openModule("add a CAN message",null,btn);
    },
    
    onUpdate:function(btn) {
    },
    
    onDelete:function(btn){
    },
    
    onRefresh:function(btn){
    	this.gridpanel.getStore().reload();
    },
       
    openModule:function(title,params,btn){
    },
    
    onAfterRender:function(paging){
	    var gridstore = Ext.create('Ext.data.Store', {
		  	pageSize: 20,
	       	autoLoad: {start: 0, limit: 20},
		    proxy: {
		        type: 'ajax',
		        url: '../canToolMsg.do?method=pageList',
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