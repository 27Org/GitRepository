Ext.define('app.controller.cOMSettings2.COMSettings2Controller', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.cOMSettings2Controller',

    openModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"cOMSettings2Edit",width:600,height:800,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },

    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});