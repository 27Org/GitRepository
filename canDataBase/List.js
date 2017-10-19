Ext.define('app.view.canDataBase.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'canDataBaseList',
    xtype: 'canDataBaseList',
    requires: [
        'app.controller.canDataBase.CanDataBaseController',
        'app.view.canDataBase.ImportWin',
    ],
    controller:'canDataBaseController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
      	tbar: [
      		{text: 'load CAN database',reference:'onImport',iconCls:'x-fa fa-plus',cls:'active',handler: 'onImport'},
	    	{text: 'tree structure display',reference:'showJsonTree',iconCls:'x-fa fa-plus',cls:'active',handler: 'showJsonTree'},
	    	{text: 'save as JSON',reference:'saveAsJson',iconCls:'x-fa fa-plus',cls:'active',handler: 'saveAsJson'},
	    	{text: 'show CAN layout',reference:'',iconCls:'x-fa fa-plus',cls:'active',handler: ''}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'Message',flex: 3,sortable: true,dataIndex:'showMsg',align: 'center'}
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