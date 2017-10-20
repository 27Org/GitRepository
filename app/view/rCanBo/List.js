Ext.define('app.view.rCanBo.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'rCanBoList',
    xtype: 'rCanBoList',
    requires: [
        'app.controller.rCanBo.RCanBoController'
//        'app.view.canMessage.Edit'
    ],
    controller:'rCanBoController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
		tbar: [
	    	{text: 'add',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	{text: '保存到excel数据文件',reference:'',iconCls:'x-fa fa-plus',cls:'active',handler: ''},
	    	"->",
	    	{cls: 'delete-focus-bg',iconCls:'x-fa fa-refresh',handler: 'onRefresh',tooltip : 'refresh'}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'CanTool Msg',flex: 3,sortable: true,dataIndex:'boMsg',align: 'center'}
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