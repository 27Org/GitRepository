Ext.define('app.view.cAN.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'cANEdit',
    xtype: 'cANEdit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'Submit',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'COM Port Settings',defaults: {xtype:"textfield",anchor: '70%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
	        	{fieldLabel: 'ID', name: 'id',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'DATA',name: 'data',allowBlank:false,blankText: 'not null!'}
	        	]
		});
		Ext.apply(this, {
		 	items:[me.userfieldset],
		 	buttons:buttons
		});
		this.callParent();
	},
    
    beforeRender:function(){

    },

	loadData:function(cOMSettingsid){
	  
	},	
    
	onFormCancel:function(){

    }, 
    
    onFormSubmit:function(btn){
//    	saveAndSendToCanTool
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
    	form.submit({ 
            url: '../cAN.do?method=saveAndSendToCanTool',
//            params:{"canMessageid":canMessageid},
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