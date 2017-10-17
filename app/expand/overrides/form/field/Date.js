Ext.define('expand.overrides.form.field.Text', {
    override :'Ext.form.field.Date',
    
    constructor:function(config){
        var me = this;
        me.callParent(arguments);
    },
    
    setValue:function(v){
    	if(!Ext.isEmpty(v) && Ext.isString(v))v = CU.toDate(v);
    	this.superclass.setValue.call(this,v);
    }
});
