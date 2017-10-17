Ext.define('expand.overrides.grid.Panel', {
    override :'Ext.grid.Panel',
    
    constructor: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    initComponent:function(){
        var me = this;
        var mystore = me.store;
        if(!(mystore instanceof Ext.data.Store)){
        	if(mystore && Ext.isEmpty(mystore.data)){
		     	if(Ext.isEmpty(mystore.proxy) && !Ext.isEmpty(mystore.url)){
		     		mystore.proxy = {type:'ajax',extraParams:{},reader: {type: 'json'}};
		     		if(!Ext.isEmpty(mystore.url))mystore.proxy.url = mystore.url;
		     		if(!Ext.isEmpty(mystore.params))mystore.proxy.extraParams = mystore.params;
		     	}
		     	if(!Ext.isEmpty(mystore.proxy)){
			 		mystore.proxy.reader.rootProperty = function(data){
			 			if(!Ext.isEmpty(data) && data.paging)return data.list;
			 			return data;
			 		};
		     	}
		     	if(me.paging){
		     		mystore.pageSize = mystore.pageSize || 20;
		     		mystore.remoteSort = Ext.isEmpty(mystore.remoteSort)?true:mystore.remoteSort,
		 			mystore.proxy.extraParams = Ext.apply(mystore.proxy.extraParams,{paging:true});
		     		me.store = new Ext.data.Store(mystore);
		     		if(mystore.remoteSort){
			     		me.store.on("beforeload",function(store, operation, eOpts){
			     			var sorters = operation.getSorters();
			     			var params = store.proxy.extraParams;
			     			if(Ext.isArray(sorters)){
			     				params.sortField = sorters[0].getProperty();
			     				params.sortOrder = sorters[0].getDirection();
			     			}
			     		})
		 			}
		 			if(Ext.isEmpty(me.bbar)){
		     			me.bbar = new Ext.PagingToolbar({store:me.store,displayInfo:true});
		 			}else{
		 				if(me.bbar instanceof Ext.toolbar.Paging){
		 					me.bbar.bindStore(me.store);
		 				}else{
		 					me.bbar.store = me.store;
		 				}
		 			}
		     	}
	        }else{
	        	me.store = {data: mystore ? (mystore.data || []) : []};
	        }
        }
        if(Ext.isEmpty(me.viewConfig))me.viewConfig = {};
        if(Ext.isEmpty(me.viewConfig.emptyText))me.viewConfig.emptyText = '暂无数据';
        
    	this.callParent();
    },
    
    /**
     * 增加永久条件
     * @param {} params
     */
    setBaseParam:function(params){
        var me = this;
    	me.store.proxy.extraParams= Ext.apply(me.store.proxy.extraParams,params);
    },
    
    /**
     * 清空永久条件
     * @param {} params
     */
    removeBaseParam:function(params){
        var me = this;
    	me.store.proxy.extraParams= {paging:me.paging};
    },
    
    /**
     * 加载数据
     * @param {} params  参数
     * @param {} callback 成功回调
     * @param {} config
     */
    load : function(params, callback,config) {
        var me = this;
        var config = Ext.isEmpty(config)?{}:config;
		config.params = config.params || params;
		config.isCacheParams = Ext.isEmpty(config.isCacheParams)?true:config.isCacheParams;
		config.callback = config.callback || callback;
		if(config.isCacheParams){
			me.store.proxy.extraParams= Ext.apply(me.store.proxy.extraParams,config.params);
		}
    	if(me.paging){
    		me.getStore().loadPage(1,config);
    	}else{
    		me.getStore().load(config);
    	}
    },
    
     /**
     * 获取grid全部数据
     * @return {}
     */
    getValues:function(){
    	var me = this;
    	var rowIndex = me.getStore().getCount();
    	var data  = [];
    	for (var i = 0; i < rowIndex; i++) {
    		data.push(me.getStore().getAt(i).data);
    	}
    	return data;
    },
    
    /**
     * 获取选中数据
     * @return {}
     */
    getSelectValues:function(){
    	var me = this;
    	var data  = [];
    	Ext.each(me.getSelection(),function(rec){
    		data.push(rec.data);
    	});
    	return data;
    },
    
    /**
     * 判断数据是否修改 true = 修改
     * @return {}
     */
    isDirty:function(){
    	var me = this;
    	var store = me.getStore();
    	var myNew = store.getNewRecords();
		var myRemove = store.getRemovedRecords();
		var myUpdate = store.getUpdatedRecords();
		return myNew.length>0||myRemove.length>0||myUpdate.length>0;
    },
    
    /**
     * 获取增加、删除、修改后的数据集合。row.state 为added/updateded/removed。
     * @return {}
     */
    getChanges :function(){
    	var me = this;
    	var store = me.getStore();
    	var changes = [];
    	var myNew = store.getNewRecords();
		var myRemove = store.getRemovedRecords();
		var myUpdate = store.getUpdatedRecords();
		Ext.each(myNew, function(rec) {
		    rec.state = "added";
            changes.push(rec);
        });
        Ext.each(myRemove, function(rec) {
		    rec.state = "removed";
            changes.push(rec);
        }); 
        Ext.each(myUpdate, function(rec) {
		    rec.state = "updateded";
            changes.push(rec);
        }); 
        return changes;
    },
    
    /**
     * 根据ID获取行数据对象
     * @param {} id
     * @return {}
     */
    getRecord:function(id){
    	var store = this.getStore();
    	var rowIndex = store.indexOfId(id);
		var rec = store.getAt(rowIndex);
		return rec;
    },
    
    /**
     * 获取grid全部行数据对象
     * @return {}
     */
    getRecValues:function(){
    	var me = this;
    	var rowIndex = me.getStore().getCount();
    	var data  = [];
    	for (var i = 0; i < rowIndex; i++) {
    		data.push(me.getStore().getAt(i));
    	}
    	return data;
    },
    
    /**
     * 获取grid单列数据
     * @param field  dataIndex 或 方法
     * @return 数组
     */
    getFieldDataAt:function(field){
    	var me = this,datas = [];
    	Ext.each(me.getStore().data.items,function(rec){
    		if(Ext.isFunction(field)){
    			datas.push(Ext.callback(field,this,[rec]));
    		}else{
    			var value = rec.get(field);
    			datas.push(value);
    		}
    	});
    	return datas;
    }
});
