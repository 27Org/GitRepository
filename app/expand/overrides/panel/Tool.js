Ext.define('expand.overrides.panel.Tool', {
    override :'Ext.panel.Tool',
    renderTpl: [
        '<div id="{id}-toolEl" data-ref="toolEl" class="',
	        '<tpl if="iconCls">',
	            '{iconCls} {baseCls}-img {childElCls}" style="font:16px/1 FontAwesome;background: none;"',
	        '<tpl else>',
	        	'{baseCls}-img {baseCls}-{type} {childElCls}"',
	        '</tpl>',
	        ' role="presentation"></div>'
    ],
    initComponent: function() {
        var me = this;
        if (me.id && me._toolTypes[me.id]) {
            Ext.raise('When specifying a tool you should use the type option, the id can conflict now that tool is a Component');
        }
        me.type = me.type || me.id;
        Ext.applyIf(me.renderData, {
            baseCls: me.baseCls,
            type: me.type,
            iconCls: me.iconCls
        });

        me.tooltip = me.tooltip || me.qtip;
        me.callParent();
    }
});