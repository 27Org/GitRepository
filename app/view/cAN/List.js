Ext.define('app.view.cAN.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'cANList',
    xtype: 'cANList',
    requires: [
        'app.controller.cAN.CANController',
        'app.view.cAN.Edit'
    ],
    controller:'cANController',
    layout: 'fit',
    items:[{
		xtype: 'grid',reference:'gridPanel',selType: 'checkboxmodel',paging:true,
      	listeners: {rowdblclick: 'rowdblclick'},
		tbar: [
	    	{text: 'add',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'},
	    	{text: 'Send CAN',reference:'',iconCls:'x-fa fa-shopping-cart',handler: 'onSend'},
	    	"->",
	    	{cls: 'delete-focus-bg',iconCls:'x-fa fa-refresh',handler: 'onRefresh',tooltip : 'refresh'}
	    ],
        columns: [
          	{text: 'SN',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
          	{text: 'CAN ID',flex: 1,sortable: true,dataIndex:'cID',align: 'center'},
          	{text: 'CAN DLC',flex: 1,sortable: true,dataIndex:'dLC',align: 'center'},
          	{text: 'CAN DATA',flex: 3,sortable: true,dataIndex:'dATA',align: 'center'}
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