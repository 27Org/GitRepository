/**
 * 主窗口TabPanel
 * Ext.SystemTabPanelAutoOpens  当前业务Panel面板中TabPanel对象自动打开菜单窗口Map对象{menuid:obj}
 */
Ext.define('app.view.frame.default.TabPanel', {
	extend : 'Ext.tab.Panel',
    alternateClassName: 'frame.default.TabPanel',
	xtype : 'maintabpanel',
	region: 'center',
    style:'background-color:red',
	reference: 'contentPanel',
    tabPosition:'top',
    enableTabScroll:true,
    systemcfg:{type:'02'},
    items:[{
      	xtype : "image",
      	iconCls:'x-fa fa-home',
        src:"resources/images/homePage.jpg"
    }],
	initComponent : function() {
		var me = this;
		var tabmenu = me.plugins = new Ext.create('Ext.ux.TabCloseMenu',{
			closeTabText: '关闭面板',
		    closeOthersTabsText: '关闭其他',
		    closeAllTabsText: '关闭所有'
		});
		this.callParent();
	}
});