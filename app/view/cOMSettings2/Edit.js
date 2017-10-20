Ext.define('app.view.cOMSettings2.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'cOMSettings2Edit',
    xtype: 'cOMSettings2Edit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'Submit',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'COM',defaults: {xtype:"textfield",anchor: '70%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
//	        	{text: 'Send/Receive on Comm.'},
	        	{xtype:'combobox',fieldLabel: 'PortName',name:'portName',valueField:'portName',displayField:'portName',emptyText: 'please choose...',editable : false,allowBlank:false,blankText: 'please choose!',
	        		 store:new Ext.data.ArrayStore({fields: ['id', 'portName'],data: [['1', 'COM1'], ['2', 'COM2'],['3', 'COM3'],['4', 'COM4'], ['5', 'COM5'],['6', 'COM6']]}),
	        		 listeners: {
        			     select: function(combo, record){
        			    	 var cOMSettingsid = combo.getSelection().id;
        			    	 me.loadData(cOMSettingsid);
        			     }
	        		 }
	        	},
//	        	{text: 'Choose a COM port(e.g. COM3).'}
	        	]
		});
		me.userfieldset2 = new Ext.form.FieldSet({xtype: 'fieldset',title: 'COM Port Settings',defaults: {xtype:"textfield",anchor: '70%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
	        	{xtype:'combobox',fieldLabel: 'BitRate',name:'bitRate',valueField:'bitRate',displayField:'bitRate',emptyText: 'please choose...',editable : false,allowBlank:false,blankText: 'please choose!',
	        		 store:new Ext.data.ArrayStore({fields: ['id', 'bitRate'],data: [[1, '4800'], [2, '9600'],[3, '19200'],[5, '38400'], [6, '56000'],[7, '115200']]})},
	        	{fieldLabel: 'DataBits',value:'8', name: 'dataBits',allowBlank:false,readOnly: true,blankText: 'not null!',editable:false},
	        	{fieldLabel: 'StopBits',value:'1',name: 'stopBits',allowBlank:false, readOnly: true, blankText: 'not null!'},
	        	{fieldLabel: 'Parity',name: 'parity',value:"NONE",allowBlank:false,readOnly: true,blankText: 'not null!'}
	        	]
		});
		Ext.apply(this, {
		 	items:[me.userfieldset,me.userfieldset2],
		 	buttons:buttons
		});
		this.callParent();
	},
    
    beforeRender:function(){
    	var me = this;
		var dailyItemid = me.get("dailyItemid");
    },

	loadData:function(cOMSettingsid){
	    var me = this;
	    var url = "../cOMSettings.do?method=getCOMSettingsInfo";
	    Ext.Ajax.request({url:url,method:'post',params:{"cOMSettingsid":cOMSettingsid},
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
		var form = this.getForm();
    	if(!form.isValid())return;
    	var cOMSettingsid = form.findField('portName').getSelection().id;
    	EU.toastWarn(cOMSettingsid);
    	form.submit({ 
            url: '../canToolMsg.do?method=closeCOM',
            params:{"cOMSettingsid":cOMSettingsid},
            success:function(form,action){ 
             	EU.toastWarn("success-close!");
             	me.closeWindow();
            },
            failure:function(form,action){ 
             	EU.toastWarn("failure-close!");
             	me.closeWindow();
            }
     	});
    }, 
    
    onFormSubmit:function(btn){
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
//    	EU.toastWarn(form.findField('portName').getSelection().id);
    	var cOMSettingsid = form.findField('portName').getSelection().id;
    	form.submit({ 
            url: '../canToolMsg.do?method=openCOM',
            params:{"cOMSettingsid":cOMSettingsid},
            success:function(form,action){ 
             	EU.toastWarn("success-open!");
             	me.closeWindow();
            },
            failure:function(form,action){ 
             	EU.toastWarn("failure-open!");
             	me.closeWindow();
            }
     	});
    }
});