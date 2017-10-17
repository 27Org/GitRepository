Ext.define('app.controller.cAN.CANController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.cANController',
    
    onAdd:function(btn){
		this.openModule("add a CAN message",null,btn);
    },
    
    onSend:function(btn){
    	var url = '../cAN.do?method=sendData';
        Ext.Ajax.request({url: url,method: 'post',
	        success: function(resp,opts) {
	    	}
	   	});
    },
    
    openModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"cANEdit",width:400,height:300,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },
    
    onAfterRender:function(paging){
    },
    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});