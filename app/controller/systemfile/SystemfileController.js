Ext.define('app.controller.systemfile.SystemfileController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.systemfileController',

    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});