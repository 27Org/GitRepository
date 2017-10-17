Ext.define('expand.overrides.toolbar.Paging', {
    override :'Ext.toolbar.Paging',
    
    getPagingItems: function() {
    	var me = this,
    		pagingItems = me.callParent();
    	pagingItems[4].triggers = {clear:false};
    	var items = [{
				xtype : 'label',
				text : '预览模式:'
			},{
				xtype : 'toggleslide',
				state : false,
				onText : '是',
				offText : '否',
				listeners:{
					change:function(thiz,value){
						var grid = me.up("grid");
						if(grid==null)return;
						if(value && me.bufstore == null){
							me.bufstore = Ext.create('Ext.data.BufferedStore', {
						        leadingBufferZone:300,
						        pageSize: 100,
						        proxy: {
						            type: 'ajax',
						            url: me.store.proxy.url,
						            extraParams:{paging:true},
						            reader: {
						            	type: 'json',
						                rootProperty: 'list'
						            }
						        },
						        autoLoad: true,
						        listeners:{//防止更新store时store还未加载完成出现错误
						        	load:function(thiz, records, successful, eOpts){
						        		grid.reconfigure(me.bufstore);
						        	}
						        }
						    });
						}else{
					    	grid.reconfigure(value?me.bufstore:me.store);
						}
					}
				}
			},{
			xtype : 'combobox',
			fieldLabel : '页大小',
			labelWidth : 50,
			labelAlign : 'right',
			width : 140,
			viewname : 'v_pagesize',
			value:20,
			emptyText:null,
			triggers:{clear:false},
			listeners:{
    			select: function(combo, record, eOpts){
    				if(me.store instanceof Ext.data.BufferedStore)return;
    				var pagesize = record.get("id");
    				me.store.pageSize = record.get("id");
    				me.store.loadPage(1);
    			}
			}
		}];
    	return items.concat(pagingItems);
    }
});