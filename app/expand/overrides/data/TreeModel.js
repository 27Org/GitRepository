Ext.define('expand.overrides.data.TreeModel', {
    override :'Ext.data.TreeModel',
    
    constructor: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    addNode:function(newNode,action){
    	var me = this;
    	var parentNode = me.parentNode;
	    switch(action){
    		case 'before':{
    			action = parentNode.indexOf(me);
    			break;
    		}
    		case 'after':{
    			action = parentNode.indexOf(me)+1;
    			break;
    		}
    		case 'add':{
    			action = parentNode.childNodes.length;
    			break;
    		}
    	}
        return parentNode.insertChild(action,newNode);
    },
    
    /**
     * 包含自己的无限子节点递归循环
     * @param {} callback  回调方法
     * @param {} isinclude    是否包含自己node
     */
    eachChildNode:function(callback,isinclude){
    	var me = this;
		if(isinclude)Ext.callback(callback,me,[me]);
		if(this.childNodes.length==0)return;
    	me.eachChild(function(child){
			child.eachChildNode(callback,true);
		});
    }
});
