Ext.define('expand.overrides.data.Store', {
    override :'Ext.data.Store',
    constructor: function(config) {
        var me = this;
        if(!Ext.isEmpty(config) && Ext.isObject(config.proxy)){
	        if(cfg.crossdomain === true){
	        	config.proxy.type = 'jsonp';
				var url =  cfg.requestUrl + config.proxy.url;
	        	config.proxy.url = url;
	        }else{
	        	config.proxy.type = 'ajax';
	        }
        }
        me.callParent(arguments);
    }
});