Ext.define('app.view.rCanSg.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'rCanSgEdit',
    xtype: 'rCanSgEdit',
    requires: [
        'app.view.rCanSg.MapIframe'
    ],
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'OK',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'CAN signal',defaults: {xtype:"textfield",anchor: '100%',readOnly:display},
	        layout: {type: 'form'},
	        items:[{
	        	xtype:'panel',flex:1,layout:'fit',region:'center',reference: 'contentPanel',height:300,
	        	items:[{
	        		id:'mapframe',
	        		xtype:'mapIframe',
	        		title : 'Gauge',
	        		reference:'mapPanel',
	        		listeners: {
	        	        load: function(iframeComponent){
	        	        	var contentWindow = this.contentWindow = iframeComponent.iframeEl.dom.contentWindow;
	        	        	var contentPane = this.contentPane = contentWindow.contentPane;
	        	        	var input = contentWindow.document.getElementById("cansignal");
	        	        	var sgid = me.get("sgid");
	        	        	input.value = sgid;
	        	        	console.log(input.value);
	        	        }
	        		}
	            }]
	         }]
	 
		});
		Ext.apply(this, {
		 	items:[me.userfieldset],
		 	buttons:buttons
		});
		this.callParent();
	},

	beforeRender:function(){
		var me = this;
//		var params = {canMessageid:record.data.ID};
		var sgid = me.get("sgid");
        if(Ext.isEmpty(sgid))return;
		me.loadData(sgid);
	},

	loadData:function(){
	
	},	
    
	
});