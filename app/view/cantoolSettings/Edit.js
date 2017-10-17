Ext.define('app.view.cantoolSettings.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'cantoolSettingsEdit',
    xtype: 'cantoolSettingsEdit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'Submit',scope:this,handler:this.onFormSubmit},{text:'Cancel',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: 'CanTool Settings',defaults: {xtype:"textfield",anchor: '70%',readOnly:display},
	        layout: {type: 'form'},
	        items: [
	        	{xtype:'combobox',fieldLabel: 'BitRate',name:'bitRate',valueField:'bitRate',displayField:'bitRate',emptyText: 'please choose...',editable : false,allowBlank:false,blankText: 'please choose!',
	        		 store:new Ext.data.ArrayStore({fields: ['id', 'bitRate'],
	        			 data: [[1, '10Kbit'], [2, '20Kbit'],[3, '50Kbit'],[5, '100Kbit'], [6, '125Kbit'],[7, '250Kbit'],[8, '500Kbit'],[9, '800Kbit'],[10, '1Mbit']]})
	        	},
	        	{xtype: 'radiogroup',fieldLabel: 'WorkState',
                    items : [{boxLabel: 'OPEN', name: 'matterState', inputValue:'1',checked:true},{xtype: 'component', width: 50 },{boxLabel: 'CLOSE', name: 'matterState', inputValue:'0'}]
                },
            	{xtype: 'radiogroup',fieldLabel: 'InitState',
                    items : [{boxLabel: 'OPEN', name: 'matterState', inputValue:'1'},{xtype: 'component', width: 50 },{boxLabel: 'CLOSE', name: 'matterState', inputValue:'0',checked:true}]
                }
	        
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
		var me = this;
		me.closeWindow();
    }, 
    
    onFormSubmit:function(btn){

    }
});