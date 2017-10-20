Ext.define('expand.overrides.ux.colorpick.ColorField', {
    override :'Ext.ux.colorpick.Field',
    
	defaultColor :'5FA2DD',
	
	setValue:function(color){
		var me = this;
		color = Ext.isEmpty(color)?me.defaultColor:color;
		var me = this,
            c = me.applyValue(color);
        me.callParent([c]);
        me.updateValue(c);
	},
	
	constructor: function() {
        var me = this;
        me.callParent(arguments);
    }
});
