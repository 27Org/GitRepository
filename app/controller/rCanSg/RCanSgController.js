Ext.define('app.controller.rCanSg.RCanSgController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.rCanSgController',
    
    onAdd:function(btn){
		this.openModule("add a CAN message",null,btn);
    },
    
    openModule:function(title,params,btn){
    	
    },
    
    onAfterRender:function(paging){
    },
    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});