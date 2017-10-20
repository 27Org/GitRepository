Ext.define('app.view.Main', {
	extend : 'Ext.container.Viewport',
	alternateClassName : 'main',
	xtype : 'main',
	requires : [
		'app.controller.MainController',
		'app.view.login.Login'
	],
	controller : 'main',
	layout: 'card',
	items: [
		 {layout:'fit'}//主窗口
	]
});