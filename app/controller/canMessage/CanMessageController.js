Ext.define('app.controller.canMessage.CanMessageController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.canMessageController',
    
    rowdblclick: function(gridpanel, record, tr, rowIndex, e, eOpts){
		var me = this;
    	if(record){
    		var title = "edit";
    		var params = {canMessageid:record.data.ID};
    		me.openModule(title,params);
    	}
    },
    
    onAdd:function(btn){
		this.openModule("add a CAN message",null,btn);
    },
    
    onUpdate:function(btn) {

    },
    
    onDelete:function(btn){
		var me = this;
        var selecteds = this.gridpanel.getSelection();
        if(selecteds.length==0){EU.toastWarn("select a data!");return null;}
        Ext.Msg.confirm('system hint','confirm to delete?',
	    function(btn){
	        if(btn=='yes'){
	        	var ids = new Array();
				for(var i = 0; i < selecteds.length; i++){
					ids[i] = selecteds[i].get("id");
					this.gridpanel.getStore().remove(selecteds[i]);
				}
				var url = '../canMessage.do?method=removeCanMessage';
		        Ext.Ajax.request({url: url,method: 'post',params:{"ids": ids},
			        success: function(resp,opts) {
			     		 Ext.Msg.alert("hint","successfully deleted!");
			    	}
			   	});
	        }
	    },this);
    },
    
    onRefresh:function(btn){
    	this.gridpanel.getStore().reload();
    },
        
    onDetail:function(title,params,btn){

    },
       
    openModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"canMessageEdit",width:600,height:800,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },

    openDetailModule:function(title,params,btn){
		PU.openModule({title:title,xtype:"detailWin",width:900,height:800,params:params,scope:this,callback:function(result){
		    this.gridpanel.getStore().reload();
    	}});
    },
    
    onAfterRender:function(paging){
	    var gridstore = Ext.create('Ext.data.Store', {
		  	pageSize: 20,
	       	autoLoad: {start: 0, limit: 20},
		    proxy: {
		        type: 'ajax',
		        url: '../canMessage.do?method=pageList',
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