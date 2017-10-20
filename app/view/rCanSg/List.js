Ext.define('app.view.canToolMsg.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'canToolMsgList',
    xtype: 'canToolMsgList',
    requires: [
        'app.controller.canToolMsg.CanToolMsgController'
//        'app.view.canMessage.Edit'
    ],
    controller:'canToolMsgController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
		tbar: [
	    	{text: '物理曲线',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	{text: '仪表盘展示',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	{text: 'LED展示',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	"->",
	    	{cls: 'delete-focus-bg',iconCls:'x-fa fa-refresh',handler: 'onRefresh',tooltip : 'refresh'}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'CanTool Msg',flex: 3,sortable: true,dataIndex:'canToolMsg',align: 'center'}
        ],
        bbar: {
	        xtype : 'pagingtoolbar',
	        dock : 'bottom',
	        pageSize: 20,
	        displayInfo : true,
	        displayMsg: 'show the {0} to {1} records',
	        beforePageText : "current page ",  
	        afterPageText : "total {0}",
	        plugins: Ext.create('Ext.ux.ProgressBarPager'),
	        listeners: {afterrender: 'onAfterRender'}
		}	
    }]
});