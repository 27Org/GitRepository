Ext.define('app.view.canSignal.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'canSignalList',
    xtype: 'canSignalList',
    requires: [
        'app.controller.canSignal.CanSignalController',
        'app.view.canSignal.Edit'
    ],
    controller:'canSignalController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
		tbar: [
	    	{text: 'add',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	{text: 'detail',reference:'detail',iconCls:'x-fa fa-shopping-cart',handler: 'onDetail'}, 
	    	{text: 'update',reference:'update',iconCls:'x-fa fa-pencil-square-o',handler: 'onUpdate'}, 
	    	{text: 'delete',reference:'delete',iconCls:'x-fa fa-trash',handler: 'onDelete'},
	    	"->",
	    	{cls: 'delete-focus-bg',iconCls:'x-fa fa-refresh',handler: 'onRefresh',tooltip : 'refresh'}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'Can Message',flex: 3,sortable: true,dataIndex:'canSignal',align: 'center'}
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