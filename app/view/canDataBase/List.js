Ext.define('app.view.canDataBase.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'canDataBaseList',
    xtype: 'canDataBaseList',
    requires: [
        'app.controller.canDataBase.CanDataBaseController'
    ],
    controller:'canDataBaseController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
      	tbar: [
      		{text: 'load CAN database',reference:'',iconCls:'x-fa fa-plus',cls:'active',handler: ''},
	    	{text: 'tree structure display',reference:'',iconCls:'x-fa fa-plus',cls:'active',handler: ''},
	    	{text: 'save as JSON',reference:'',iconCls:'x-fa fa-plus',cls:'active',handler: ''},
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