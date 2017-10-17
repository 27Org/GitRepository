
Ext.define('app.Application', {
    extend: 'Ext.app.Application',
    
    name: 'app',

    stores: [
    ],
    
    requires: [
  		'app.utils.Loader', 
        'app.utils.ExtUtils', 
        'app.utils.ExtFactory', 
        'app.utils.ProjectUtils',//主要用里面的openModule方法,弹出一个窗口面板
        
        'app.expand.ux.FormPanel',//对面form进行了一些功能扩展
        'app.expand.ux.TreeFilterField',//左侧菜单搜索插件
        'app.expand.plugin.PageRequest'
    ],
     
    launch: function () {
    	//Ext.get("loading").remove();
    },
    
    onAppUpdate: function () {
		alert("onAppUpdate,keke");
    }
});