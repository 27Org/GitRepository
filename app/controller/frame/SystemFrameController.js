Ext.define('app.controller.frame.SystemFrameController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.systemFrame',
    
    init:function(){
    	var view = this.getView();
    	var xtype = "app.view.frame.default.Main";
    	var panel = Ext.create(xtype,{view:view});
		if(panel instanceof Ext.panel.Panel){
			view.add(panel);
		}
    }
});