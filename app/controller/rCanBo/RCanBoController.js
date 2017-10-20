Ext.define('app.controller.rCanBo.RCanBoController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.rCanBoController',
    
    onAdd:function(btn){
		this.openModule("add a CAN message",null,btn);
    },
    
    openModule:function(title,params,btn){
    	
    },
    
    onAfterRender:function(paging){
	    var gridstore = Ext.create('Ext.data.Store', {
		  	pageSize: 20,
	       	autoLoad: {start: 0, limit: 20},
		    proxy: {
		        type: 'ajax',
		        url: '../rCanBo.do?method=pageList',
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