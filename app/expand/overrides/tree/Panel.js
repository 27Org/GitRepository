Ext.define('expand.overrides.tree.Panel', {
    override :'Ext.tree.Panel',
    
    rootVisible:false,
    
    constructor: function() {
        var me = this;
        me.callParent(arguments);
    },
    
   initComponent:function(){
     	var me = this;
     	var mystore = me.store;
     	if(!(mystore instanceof Ext.data.Store)){
	        if(mystore && Ext.isEmpty(mystore.data)){
	        	mystore.rootVisible = mystore.rootVisible == null ? false : mystore.rootVisible;
	     		mystore.type =  mystore.type || 'tree';
	        	mystore.defaultRootId =  mystore.defaultRootId || "00";
	        	if(Ext.isEmpty(mystore.proxy) && !Ext.isEmpty(mystore.url)){
	     			mystore.proxy = {type:'ajax',reader: {type: 'json'}};
	        		mystore.proxy.url = me.store.url;
	     			mystore.proxy.extraParams = mystore.params;
	        	}
	        }else{
	        	me.store = {data: mystore ? (mystore.data || []) : []};
	        }
	     	if(mystore.listeners == null) mystore.listeners = {};
	     	if(me.selFirstNode){
	 			mystore.listeners.load = function(thiz, records, successful, operation, node, eOpts){
					if(node.id == thiz.defaultRootId){
						Ext.callback(me.selectFirstNode, me, [true]);
					}
				}
	 		}
     	}
    	this.callParent();
    },
    
    /**
     * 刷新根节点,并且选中根节点下指定id节点
     * @param {} currid
     * @param {} callback
     */
    reloadRootNode:function(currid,callback){
    	var me = this;
        var store = me.getStore();
    	var parentNode = store.getRootNode();
    	this.reloadNode(parentNode,currid,callback)
    },
    
    /**
     * 根据选择节点刷新数据
     * @param {} currid 选择节点id
     * @param {} iscurr 是否刷新本级节点  缺省:false 
     * @param {} callback 回调函数
     */
    reloadSelectNode:function(currid,iscurr,callback){
    	var me = this;
        var store = me.getStore();
    	iscurr = CU.getBoolean(iscurr);
        var selecteds = me.getSelection();
    	var parentNode = null;
        var childNodes = null;
        if(selecteds.length==0){
        	parentNode = store.getRootNode();
        }else {
        	childNodes = selecteds[0];
        	parentNode = iscurr?childNodes:childNodes.parentNode;
        	if(Ext.isEmpty(currid)&&!iscurr)currid =childNodes.id; 
        }
        me.reloadNode(parentNode,currid,callback)
    },
    
    /**
     * 刷新节点 ,如果currid为null 不刷新
     * @param {} parentNode
     * @param {} currid
     * @param {} callback
     */
    reloadNode:function(parentNode,currid,callback){
    	var me = this;
        var store = me.getStore();
        if(Ext.isEmpty(currid) || Ext.isFunction(callback))callback.call(me);
    	store.reload({node:parentNode,callback:function(records, options, success){
        	if(Ext.isEmpty(currid))return;
			Ext.each(records, function(rec) { 
             	if(rec.id == currid){
             		me.selectNode(rec);
             		return;
            	}
         	});
         	if(Ext.isFunction(callback))callback.call(me);
		}});
    },
    
    /**
     * 根据节点id获取节点
     * @param {} nodeid
     * @return {}
     */
    getNodeById :function(nodeid){
    	return this.getStore().getNodeById(nodeid);
    },
    
    /**
     * 选择节点
     * @param {} node
     */
    selectNode:function(node){
    	if(Ext.isString(node)){
        	node = this.getNodeById(node);
        	if(node==null)return;
    	}
        var idPath = node.getPath("id");
        this.expandPath(idPath,{field :"id",select:true,focus:true});  
    },
    
    /**
     * 获取第一个节点的末级节点
     */
    selectFirstNode:function(sellast,rootNode){
    	var me = this,
    		sellast = Ext.isEmpty(sellast)?true:sellast,
     		rootNode = rootNode || me.getStore().getRootNode();
     	if(rootNode.childNodes.length==0)return;
     	var node = rootNode.childNodes[0];
        if(sellast){
        	me.expandLastNode(node,function(lastNode){
        		me.selectNode(lastNode);
        	});
        }else{
        	me.selectNode(node);
        }
    	
    },
    
    /**
     * 获取树全部数据
     * @param {} callback 获取bean中数据对象字段,缺省获取node.data
     * @return {} 
     */
    getData:function(callback){
    	var me = this;
        var store = me.getStore();
        var datas = [];
        var rootNode = store.getRootNode();
        rootNode.eachChild(function(child){
			me.eachAllChild(child,datas,callback);
		});
        return datas;
    },
    
    /**
     * 获取指定节点下全部数据
     * @param {} node  节点
     * @param {} datas  承载数据对象
     * @param {} callback 获取bean中数据对象字段,缺省获取node.data
     */
    eachAllChild:function(node,datas,callback){
    	var me = this;
        var bean = node.data;
		if(Ext.isFunction(callback))bean = callback.call(this,bean);
        var children = [];
    	node.eachChild(function(child){
			me.eachAllChild(child,children,callback);
		});
		bean.children = children;
		datas.push(bean);
    },
    
    /**
     * 展开获取末级节点
     * @param {} node
     * @param {} callback
     */
    expandLastNode:function(node,callback){
    	var me = this;
    	this.expandNode(node,false,function(childNodes){
	    	if(childNodes == null || childNodes.length==0){
	    		Ext.callback(callback,me,[node]);
	    	}else{
	    		node = childNodes[0];
	    		this.expandLastNode(node,callback)
	    	}
		},this)
    }
});
