Ext.define('expand.overrides.form.ComboBox', {
    override :'Ext.form.ComboBox',
    
	viewname :'',  //视图名称
	url : '',     //url地址
	field:'',     //标识符
	store:{},
    valueField: 'id',
	displayField: 'text',
	emptyText : "请选择",
	editable : false,
	
    constructor: function(config) {
        var me = this;
        me.callParent(arguments);
    },
    
    initComponent:function(){
    	var me = this;
    	var myStore = {};
    	if(Ext.isArray(me.datas)){
    		myStore = Ext.create('Ext.data.Store',{data:me.datas});
    		Ext.apply(me,{store:myStore});
    	}else if(!Ext.isEmpty(me.viewname) || !(Ext.isEmpty(me.url) || Ext.isEmpty(me.field))){
    		var key = Ext.isEmpty(me.field)?me.viewname:me.field;
    		var cache = Ext.isEmpty(me.cache)?true:me.cache;//是否缓存,缺省true
    		var data = cache?session.get(key):null;
    		if(!Ext.isEmpty(data) && Ext.isArray(data)){
    			myStore = Ext.create('Ext.data.Store',{data:data});
    		}else{
    			myStore = Ext.create('Ext.data.Store',{proxy:me.getViewProxy()});
	    		myStore.load({callback: function(records, options, success){
    				 if(Ext.isEmpty(key)&&!cache)return;
    				 var data = [];
    				 Ext.each(records, function(rec) { 
	                     data.push(rec.data);
	                 });  
    				 session.set(key,data);
    			}});
	    	}
    		Ext.apply(me,{store:myStore});
    	}
    	if(me.editable){
	    	me.queryMode =  'local';		 //本地搜索
		 	me.triggerAction = "all";        //单击触发按钮显示全部数据  
		 	me.typeAhead = true;  			 //允许自动选择匹配的剩余部分文本  
		 	me.forceSelection = true;		 //要求输入值必须在列表中存在
    	}
        me.callParent(arguments);
    },
    
    getViewProxy:function(){
    	var me = this,
    		proxy = {type: 'ajax',url: 'platform/basecode/getviewlist.do',reader: {type: 'json'}};
		if(!Ext.isEmpty(me.viewname)){
			proxy = Ext.apply(proxy,{extraParams:{viewname:me.viewname,ids:me.ids,idfield:me.idfield,orderbyfield:me.orderbyfield}});
		}else if(!Ext.isEmpty(me.url)){
			proxy = Ext.apply(proxy,{url:me.url});
		}
		return proxy;
    },
    
    setParams :function(params){
    	var me = this;
    	if(me.store.proxy.type == 'memory')me.store.setProxy(me.getViewProxy());
    	me.store.proxy.extraParams = Ext.apply(me.store.proxy.extraParams,params);
    },
    
    refresh:function(params,callback){
    	var me = this;
    	me.setParams(params);
		me.reset();
		me.store.reload({callback:callback});
    }
});
