Ext.define('app.view.frame.default.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'defaultThene',
    requires: [
        'app.controller.frame.default.MainController',
        'app.view.frame.default.TabPanel',
        'app.view.frame.default.UserEdit'
    ],
    controller:'defaultThemeController',
    layout: 'border',
    referenceHolder: true,
    menuPatternKey : "SYSTEM_MENU_PATTERN_KEY",
    initComponent : function() {
    	var me = this;
    	var type = local.get(me.menuPatternKey) || 0; 
    	var northPanel = Ext.create("Ext.panel.Panel",{
			region: 'north',
	    	items:[{xtype:'toolbar',height: 64,items: [
			        {xtype:'label',cls: 'delete-focus-bg',html:'<span style="letter-spacing:2mm;font-size:24px; color:#4D4D4D;" class="x-fa fa-th"><b>'+"CanToolApp"+'</b></span>(Ver:6.0.2017.9.28) '},
			        "->",
			        {xtype: 'button',cls: 'delete-focus-bg',iconCls: 'x-fa fa-th-large',text: 'Theme Style',reference:'b_style',
			           	menu:{items: [
				  	        {iconCls:'x-fa fa-th-large',text: 'triton',handler:'onSwapStyle'},
				  	        {iconCls:'x-fa fa-th-large',text: 'neptune',handler:'onSwapStyle'},
				  	        {iconCls:'x-fa fa-th-large',text: 'crisp',handler:'onSwapStyle'},
				  	        {iconCls:'x-fa fa-th-large',text: 'classic',handler:'onSwapStyle'},
				  	        {iconCls:'x-fa fa-th-large',text: 'gray',handler:'onSwapStyle'},
				  	        {iconCls:'x-fa fa-th-large',text: 'aria',handler:'onSwapStyle'}
			  	        ]}
			        },
			        {cls: 'delete-focus-bg',iconCls:'x-fa fa-search',tooltip: 'search'},
			        {cls: 'delete-focus-bg',iconCls:'x-fa fa-sign-out',tooltip: 'sign out',handler: 'onLogout'},
                	{cls: 'delete-focus-bg',iconCls:'x-fa fa-bell',tooltip: 'message'},
	                {cls: 'delete-focus-bg',iconCls:'x-fa fa-user',tooltip: 'user infomation',handler: 'onUserclick'},
	                {id:'clsPhoto',xtype: 'image',cls: 'header-right-profile-image',height: 35,width: 35,alt:'facial photo',src: ''}
//                    {xtype: 'tbtext',text: local.get("personinfo").name,cls: 'top-user-name'}//见logincontroller中实现//cfg.sub.name
                ]}
	    	],
	    	beforeRender:function(){//获取小头像
//		    	var me = this;
//				var url = "../person.do?method=getPhoto";
//				Ext.Ajax.request({url:url,method:'post',params:{"personid":local.get("personinfo").id},
//					success: function(resp,opts) {me.down("image").setSrc(resp.responseText);}//responseText为图片相对路径
//				});
		    }
	    });
	    var southPanel = Ext.create("Ext.panel.Panel",{
			region: 'south',
	    	items:[{xtype:'toolbar',height: 36,items: [
			        {xtype:'label',cls: 'delete-focus-bg',html:'<span style="letter-spacing:1.5mm;font-size:12px; color:#4D4D4D;" class="fa fa-copyright"><b>'+"27Org"+'</b></span>'},
			        "->",
			        {xtype:'label',html:'<span class="fa fa-phone"><b>'+"CREATE TIME：2017-9-28 "+'</b></span>'},
			        {xtype:'label',html:'<span class="fa fa-qq"><b>'+" 123456"+'</b></span>'},
			        {id:"totalDate",xtype:"label"},
			        {id:"totalPrice",xtype:"label"}
                ]}
	    	],
	    	beforeRender:function(){//获取总价,总天数
		    	var me = this;
				var url = "../dailyItem.do?method=getTotalPrice";
				Ext.Ajax.request({url:url,method:'post',
					success: function(resp,opts) {
						Ext.getCmp("totalPrice").setText("总价:"+resp.responseText);
					}
				});
				var url2 = "../dailyItem.do?method=getTotalDate";
				Ext.Ajax.request({url:url2,method:'post',
					success: function(resp,opts) {
						Ext.getCmp("totalDate").setText("总计日长:"+resp.responseText+"天");
					}
				});
		    }
	    });
	    var tools = [
	    	{type : 'unpin',tooltip:'切换至层叠方式显示',handler : function(event, toolEl, panelHeader){
	    		local.set(me.menuPatternKey,type = (type==0?1:0))
	    		this.setTooltip(type==0?'切换至层叠方式显示':'切换至树状方式显示');
	    		this.setType(type==0?'unpin':'pin');
	    		me.updateMenuStyle(westPanel,systemPanel,commonPanel,type)
	    	}}, 
			{type : 'expand',tooltip:'收缩全部树节点',handler : function(event, toolEl, panelHeader){
				var panel = me.getHandleTreePanel(westPanel,type);
				if(panel)panel.collapseAll();
			}}, 
			{type : 'collapse',tooltip:'展开全部树节点',handler : function() {
				var panel = me.getHandleTreePanel(westPanel,type);
				if(panel)panel.expandAll();
			}},
			{type : 'refresh',tooltip:'刷新菜单树',handler : function(event, toolEl, panelHeader) {
				var panel = me.getHandleTreePanel(westPanel,type);
				if(panel)panel.getStore().reload();
			}
		}];
	    var maintabpanel = Ext.SystemTabPanel = Ext.create("frame.default.TabPanel");
	    var systemPanel = {xtype:'treepanel',layout: 'fit',title:"Menu",useArrows: true,hideHeaders: true,
        	store: Ext.create('Ext.data.TreeStore',{
			    fields: ['id','text'],
	    	    root: {text: 'Catalog',iconCls: "x-fa fa-cogs",expanded: true},
	            proxy: {type: 'ajax',url: 'app/data/mainTree.json',reader: {type: 'json'}}
	        }),
            columns: [{xtype: 'treecolumn',flex: 1,dataIndex: 'text',scope: 'controller', renderer: 'treeNavNodeRenderer'}],
            listeners: {itemclick: 'onMenuTreeItemClick'},
            buttons:[{xtype:"treefilterfield",width:'100%',emptyText: 'Search',autoFilter:true,dataIndex:'text'}]
		};
		
		var commonPanel = {xtype:'treepanel',layout: 'fit',title:"Common",useArrows: true,hideHeaders: true,
        	store: Ext.create('Ext.data.TreeStore',{
			    fields: ['id','text'],
	    	    root: {text: 'Catalog',iconCls: "x-fa fa-cogs",expanded: true},
	            proxy: {type: 'ajax',url: 'app/data/commonTree.json',reader: {type: 'json'}}
	        }),
            columns: [{xtype: 'treecolumn',flex: 1,dataIndex: 'text',scope: 'controller', renderer: 'treeNavNodeRenderer'}],
            listeners: {itemclick: 'onMenuTreeItemClick'},
            buttons:[{xtype:"treefilterfield",width:'100%',emptyText: 'Search',autoFilter:true,dataIndex:'text'}]
		};
		
	    var westPanel = Ext.create("Ext.panel.Panel",{region:'west',layout: 'fit',title:"Search",width: 250,minWidth: 250,collapsible: true,split: true,tools:tools});
    	me.items = [northPanel,westPanel,maintabpanel,southPanel];
	    me.updateMenuStyle(westPanel,systemPanel,commonPanel,type);
    	me.callParent();
    },
    
    /**
     * 更新菜单风格
     * @param {} type 0=卡片式菜单（tabPanel），1=切换式菜单（accordion布局）
     */
    updateMenuStyle:function(westPanel,systemPanel,commonPanel,type){
    	var me = this; westPanel.removeAll(true);
    	switch(type){
    		case 0: {westPanel.add({xtype:'tabpanel',tabPosition:'left',items:[systemPanel,commonPanel]});break;}
    		case 1: {westPanel.add({xtype:'panel',layout:'accordion',items:[systemPanel,commonPanel]});break;}
    	}
    },
    
    /**
     * 获取当前活动panel
     * @param {} westPanel
     * @param {} type
     * @return {}
     */
    getHandleTreePanel:function(westPanel,type){
    	var me = this;
    	var item = westPanel.items.items[0];
    	var panel = null;
    	switch(type){
    		case 0:{panel = item.getActiveTab();break;}
    		case 1:{panel = item.getLayout().getExpanded()[0];break;}
    	}
    	return panel;
    }
});