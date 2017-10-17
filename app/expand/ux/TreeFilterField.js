Ext.define('app.expand.ux.TreeFilterField', {
    extend: 'Ext.form.field.Text',
    alternateClassName:'ux.form.field.treefilterfield',
    xtype: 'treefilterfield',
	
	emptyText : '搜索菜单',
	
	autoFilter : false,
	
	triggers : {
        clear: {
            cls: 'x-form-clear-trigger',
            hidden: true
        },
        search: {
            cls: 'x-form-search-trigger',
            weight: 1
        }
    },
    
    constructor: function(){
        this.callParent(arguments);
    },
		    
	initComponent:function(){
    	var me = this,triggers = me.getTriggers();
    	triggers['clear'].handler = me.onNavFilterClearTriggerClick;
    	triggers['search'].handler = me.onNavFilterSearchTriggerClick;
    	me.listeners =  me.autoFilter ? 
    		{change: me.onNavFilterSearchTriggerClick}:
    		{specialkey: function(field,e){
	    		if (e.getKey()==Ext.EventObject.ENTER){    
		           me.onNavFilterSearchTriggerClick();
		        } 
			}};
		this.callParent(arguments);
    },
    
    afterRender : function(thiz, eOpts ){
    	var me = this;
    	me.treePanel = me.up('treepanel') || me.lookupController().lookupReference(me.treeReference);
		this.callParent(arguments);
    },
    
	//搜索
    treeNavNodeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return this.rendererRegExp ? value.replace(this.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },
    
    onNavFilterSearchTriggerClick: function() {
        var me = this,
        	field = this,
        	value = this.getValue(),
            treePanel = me.treePanel;
        if (value) {
            treePanel.view.rendererRegExp = me.rendererRegExp = new RegExp( '(' + value + ')', "gi");
            field.getTrigger('clear').show();
            me.filterStore(value);
        } else {
            treePanel.view.rendererRegExp = me.rendererRegExp = null;
            treePanel.store.clearFilter();
            field.getTrigger('clear').hide();
        }
    },
	
    filterStore: function(value) {
        var me = this,
            treePanel = me.treePanel,
            store = treePanel.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get(me.dataIndex)),
                    i;
                if ( !visible ) {
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }
                }else {
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }
                }
                return visible;
            }, v;
        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    },
    
    onNavFilterClearTriggerClick: function() {
        this.setValue();
	    if(!this.autoFilter)this.onNavFilterSearchTriggerClick();
    }
});