Ext.define('app.controller.canSignal.CanSignalController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.canSignalController',
    
    rowdblclick: function(gridpanel, record, tr, rowIndex, e, eOpts){
		var me = this;
    	if(record){
    		var title = "edit";
    		var params = {canSignalid:record.data.ID};
    		me.openModule(title,params);
    	}
    },
    
    onAdd:function(btn){
		this.openModule("add a CAN signal",null,btn);
    },
    
    onUpdate:function(btn) {

    },
    
    onDelete:function(btn){
		var me = this;
        var selecteds = this.gridpanel.getSelection();
        if(selecteds.length==0){EU.toastWarn("最少选择一行数据!");return null;}
        Ext.Msg.confirm('系统提示','确定要删除选中事项吗？',
	    function(btn){
	        if(btn=='yes'){
	        	var ids = new Array();
				for(var i = 0; i < selecteds.length; i++){
					ids[i] = selecteds[i].get("id");
					this.gridpanel.getStore().remove(selecteds[i]);
				}
				var url = '../dailyItem.do?method=removeDailyItem';
		        Ext.Ajax.request({url: url,method: 'post',params:{"ids": ids},
			        success: function(resp,opts) {
			     		 Ext.Msg.alert("提示","删除成功!");
			    	}
			   	});
	        }
	    },this);
    },
    
    onRefresh:function(btn){
    	this.gridpanel.getStore().reload();
    },
        
    openModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"canSignalEdit",width:600,height:800,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },
    
    onAfterRender:function(paging){
	    var gridstore = Ext.create('Ext.data.Store', {
		  	pageSize: 20,
	       	autoLoad: {start: 0, limit: 20},
		    proxy: {
		        type: 'ajax',
		        url: '../canSignal.do?method=pageList',
		        reader: {type: 'json',rootProperty: 'data',totalProperty:'totalProperty'}
		    }
		});
		this.gridpanel.setStore(gridstore);
		paging.setStore(gridstore);
    },
    
    init:function(){
    	this.gridpanel = this.lookupReference('gridPanel');
    }
});