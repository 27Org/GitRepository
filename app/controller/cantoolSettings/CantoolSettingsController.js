Ext.define('app.controller.cantoolSettings.CantoolSettingsController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.cantoolSettingsController',
    
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
    },
    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});