Ext.define('app.view.sCanBo.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'sCanBoList',
    xtype: 'sCanBoList',
    requires: [
        'app.controller.sCanBo.SCanBoController',
        'app.view.sCanBo.Edit'
    ],
    controller:'sCanBoController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
		tbar: [
			{text: 'init',reference:'initSBo',iconCls:'x-fa fa-shopping-cart',handler: 'initSBo'},
	    	{text: 'Phy',reference:'onPhy',iconCls:'x-fa fa-plus',cls:'active',handler: 'onPhy'},
	    	{text: 'Send',reference:'onSend',iconCls:'x-fa fa-shopping-cart',handler: 'onSend'},
	    	"->",
	    	{cls: 'delete-focus-bg',iconCls:'x-fa fa-refresh',handler: 'onRefresh',tooltip : 'refresh'}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'CAN Message',flex: 3,sortable: true,dataIndex:'canBoMsg',align: 'center'}
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