Ext.define('app.view.systemfile.List', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'systemfileList',
    xtype: 'systemfileList',
    requires: [
        'app.controller.systemfile.SystemfileController'
    ],
    controller:'systemfileController',
    layout: 'border',
    title:'附件上传',
	items:[{
		xtype: 'panel',region:'west',layout:'fit',reference:'a',flex: 2,border:true,
		items:[{xtype: 'grid',reference:'filelist',selType: 'checkboxmodel',paging:true,
      		tbar: [
		    	{text: '添加',reference:'add',iconCls:'x-fa fa-plus',cls:'active',handler: 'onAdd'}, 
		    	{text: '修改',reference:'update',iconCls:'x-fa fa-pencil-square-o',handler: 'onUpdate'}
		    ],
		    columns: [
	          	{text: '序  号',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
	          	{text: '文件名称',flex: 2,sortable: true,dataIndex:'fileName',align: 'center'},
				{text: '预  览',flex: 1,sortable: true,dataIndex:'fileName',align: 'center'},
				{text: '类  型',flex: 2,sortable: true,dataIndex:'suffix',align: 'center'},
				{text: '大  小',flex: 2,sortable: true,dataIndex:'fileSize',align: 'center'},
				{text: '上传时间',flex: 2,sortable: true,dataIndex:'createTime',align: 'center',format:'Y-m-d'},
				{xtype:'actioncolumn',text:'操作',menuDisabled:true,sortable:false,width:80,align:'center',items: [{
                     iconCls:'x-fa fa-trash',tooltip: '删除记录',scope:this//,handler:me.onRemovehandler
                }]}
	        ]
		}]
    },{
    	xtype:'panel',region:'center',layout:'fit',reference: 'b',flex: 1,border:true,
		items:[{xtype: 'grid',reference:'uploadfile',paging:true,
			tbar: [
		    	"->",
		    	{iconCls:'x-fa fa-plus-square',tooltip:"添加文件",border:"0px",scope:this},
		    	{iconCls:'x-fa fa-upload',tooltip:"开始上传",border:"0px",scope:this},//handler:me.start},
		    	{iconCls:'x-fa fa-trash',tooltip:"清空列表",border:"0px",scope:this}//,handler:me.clear}
		    ],
		    columns: [
	          	{text: '序  号',sortable:false,width:60,xtype: 'rownumberer',align: 'center'},
	          	{text: '文件名称',flex: 1,sortable: true,dataIndex:'fileName',align: 'center'},
				{header:'进度',flex: 1,align: 'center',xtype:'widgetcolumn',dataIndex: 'progress',widget: {xtype: 'progressbarwidget',textTpl: ['{percent:number("0")}%']}},
				{xtype:'actioncolumn',text:'操作',menuDisabled:true,sortable:false,width:80,align:'center',items: [{
                     iconCls:'x-fa fa-trash',tooltip: '删除',scope:this//,handler:me.onRemovehandler
                }]}
	        ]
		}]
    }]
});