Ext.define('app.view.canMessage.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'canMessageEdit',
    xtype: 'canMessageEdit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'Submit',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'CanMessage',defaults: {xtype:"textfield",anchor: '100%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
	        	{fieldLabel: 'CANmessage',value: 'BO_',allowBlank:false, readOnly: true, blankText: '不能为空!'},
	        	{fieldLabel: 'Cid',name: 'cid',allowBlank:false,blankText: '不能为空!'},
	        	{fieldLabel: 'MessageName',name: 'messageName',allowBlank:false,blankText: '不能为空!'},
	        	{fieldLabel: 'Divide',value: ':',allowBlank:false, readOnly: true, blankText: '不能为空!'},
	        	{fieldLabel: 'DLC',name: 'DLC',allowBlank:false,blankText: '不能为空!'},
	        	{fieldLabel: 'NodeName',name: 'nodeName',allowBlank:false,blankText: '不能为空!'}

	        ]
		});
		Ext.apply(this, {
		 	items:[me.userfieldset],
		 	buttons:buttons
		});
		this.callParent();
	},
    
    beforeRender:function(){
		var me = this;
		var canMessageid = me.get("canMessageid");
        if(Ext.isEmpty(canMessageid))return;
		me.loadData(canMessageid);
	},

	loadData:function(canMessageid){
	    var me = this;
	    var url = "../canMessage.do?method=getCanMessageInfo";
	    Ext.Ajax.request({url:url,method:'post',params:{"canMessageid":canMessageid},
		    success: function(resp,opts) {
		    	var result = eval('(' + resp.responseText + ')');
		    	me.getForm().setValues(result.data);
	        },
	        failure:function(resp,opts){
	        	EU.toastWarn("超时请重新登录!");
	        }
	    });
	},	
    
	onFormCancel:function(){
		var me = this;
		me.closeWindow();
    }, 
    
    onFormSubmit:function(btn){
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
    	var canMessageid = me.get("canMessageid");
    	form.submit({ 
            url: '../canMessage.do?method=saveCanMessage',
            params:{"canMessageid":canMessageid},
            success:function(form,action){ 
             	EU.toastWarn("success!");
             	me.closeWindow();
            },
            failure:function(form,action){ 
             	EU.toastWarn("failure!");
             	me.closeWindow();
            }
     	});
    }
});