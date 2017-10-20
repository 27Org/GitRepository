Ext.define('expand.overrides.ux.form.SearchField', {
    override :'Ext.ux.form.SearchField',
	focusWidth : 300,
	blurWidth : 100,
	widthAnimate:false,
	
	constructor: function(config) {
        var me = this;
        me.callParent(arguments);
    },
    
    initComponent:function(){
        var me = this;
        if(me.widthAnimate){
        	me.listeners = {
				afterRender:function(field){
					field.blurWidth = field.getWidth();
		    	},
		    	focus : function(field) {
		    		if(field.focusWidth<field.blurWidth)return;
		    		field.getEl().animate({
						to : {
							width : field.focusWidth
						},
						listeners : {
							afteranimate : function() {
								field.setWidth(field.focusWidth);
							}
						}
					})
		    	},
				blur : function(field) {
		    		if(field.focusWidth<field.blurWidth)return;
					if (field.getValue().length != 0)return;
					field.getEl().animate({
						to : {
							width : field.blurWidth
						},
						listeners : {
							afteranimate : function() {
								field.setWidth(field.blurWidth);
							}
						}
					})
				}
		    }	
        }
     	this.callParent(arguments);
    },
    
    onClearClick : function(){
        var me = this,
            activeFilter = me.activeFilter;

        if (activeFilter) {
            me.setValue('');
            me.store.getFilters().remove(activeFilter);
            me.activeFilter = null;
            me.getTrigger('clear').hide();
            me.updateLayout();
            if(Ext.isFunction(me.callback))Ext.callback(me.callback,me,['clear']);
        }
    },
    
    onSearchClick : function(){
        var me = this,
            value = me.getValue();
        me.activeFilter = new Ext.util.Filter({
            property: me.paramName,
            value: value
        });
        me.store.getFilters().add(me.activeFilter);
        me.getTrigger('clear').show();
        me.updateLayout();
        if(Ext.isFunction(me.callback))Ext.callback(me.callback,me,['search']);
    }
});
