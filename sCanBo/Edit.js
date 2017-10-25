Ext.define('app.view.sCanBo.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'sCanBoEdit',
    xtype: 'sCanBoEdit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'Submit',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'COM Port Settings',defaults: {xtype:"textfield",anchor: '70%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
	        	{fieldLabel: 'A',name: 'a',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'B',name: 'b',allowBlank:false,blankText: 'not null!'},
	        	
	        	{fieldLabel: 'phy1',name: 'phy1',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy2',name: 'phy2',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy3',name: 'phy3',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy4',name: 'phy4',allowBlank:false,blankText: 'not null!'},
	        	
	        	{fieldLabel: 'phy5',name: 'phy5',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy6',name: 'phy6',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy7',name: 'phy7',allowBlank:false,blankText: 'not null!'},
	        	{fieldLabel: 'phy8',name: 'phy8',allowBlank:false,blankText: 'not null!'}
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
		var sCanBoid = me.get("sCanBoid");
        if(Ext.isEmpty(sCanBoid))return;
		me.loadData(sCanBoid);
	},

	loadData:function(sCanBoid){
		var me = this;
	    var url = "../sCanBo.do?method=getSCanBoInfo";
	    Ext.Ajax.request({url:url,method:'post',params:{"sCanBoid":sCanBoid},
		    success: function(resp,opts) {
		    	var result = eval('(' + resp.responseText + ')');
		    	me.getForm().setValues(result.data);
	        },
	        failure:function(resp,opts){
	        	EU.toastWarn("error!");
	        }
	    });
	},	
    
	onFormCancel:function(){

    }, 
    
    onFormSubmit:function(btn){
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
    	var sCanBoid = me.get("sCanBoid");
    	form.submit({ 
            url: '../sCanBo.do?method=saveSCanBo',
            params:{"sCanBoid":sCanBoid},
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