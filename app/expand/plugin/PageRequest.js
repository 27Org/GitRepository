Ext.define('app.expand.plugin.PageRequest', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.PRQ',
    
    init:function(me){
        this.me = me;
        if(Ext.isEmpty(me.params))me.params = {};
        me.set = Ext.bind(this.set,this);
        me.setParams = Ext.bind(this.setParams,this);
        me.get = Ext.bind(this.get,this);
        me.getParams = Ext.bind(this.getParams,this);
        me.setReturnValue = Ext.bind(this.setReturnValue,this);
        me.getReturnValue = Ext.bind(this.getReturnValue,this);
        me.closeWindow = Ext.bind(this.closeWindow,this);
        this.callParent(arguments);
    },
    
    set : function(key,value) {
 	 	this.setParams(key,value);
	},
    
    setParams:function(key,value) {
 	 	var me = this.me;
 	 	if(Ext.isObject(key)){
 	 		me.params = key;
 	 	}else{
 	 		me.params[key] = value;
 	 	}
	},
    
    get:function(key){
 	 	return this.getParams(key);
 	},
 	 
 	getParams:function(key){
 	 	var me = this.me;
 	 	if(Ext.isEmpty(me) || Ext.isEmpty(me.params))return null;
 	 	if(!Ext.isEmpty(key))return me.params[key];
		return me.params;
 	},
 	
 	setReturnValue:function(value){
 	 	var me = this.me;
 	 	if(Ext.isEmpty(me))return;
 	 	me.returnValue = value;
 	},
 	
 	getReturnValue:function(){
 	 	var me = this.me;
 		return me.returnValue;
 	},
 	
 	closeWindow:function(value) {
 	 	var me = this.me;
		if(!Ext.isEmpty(value))this.setReturnValue(value);
		if(Ext.isFunction(me.callback)){
			window.setTimeout(function(){  
				me.callback.call(me.pscope,me.returnValue);
		    },0);
		}
		me.up('window').close();
	 }
});