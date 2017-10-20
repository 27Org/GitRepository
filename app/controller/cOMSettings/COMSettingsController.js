Ext.define('app.controller.cOMSettings.COMSettingsController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.cOMSettingsController',

    openModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"cOMSettingsEdit",width:600,height:800,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },

    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});