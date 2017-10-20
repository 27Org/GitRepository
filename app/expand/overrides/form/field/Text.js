Ext.define('expand.overrides.form.field.Text', {
    override :'Ext.form.field.Text',
    
    constructor:function(config){
        var me = this;
        if(config.allowBlank==false && !Ext.isEmpty(config.fieldLabel)){
        	config.fieldLabel += "<font color='red'>*</font>";
        }
        if(!config.triggers){
        	config.triggers = {};
        }
        if(config.triggers.clear == false){
        	delete config.triggers.clear;
        }else{
        	config.triggers.clear = {type:'clear',hideWhenMouseOut: true};
        }
        me.callParent(arguments);
    },
    
    applyTriggers: function(triggers) {
    	if(triggers && triggers.picker){
    		var picker = triggers.picker;
    		delete triggers.picker;
    		triggers["picker"] = picker;
    	}
        return this.callParent(arguments);
    }
});
