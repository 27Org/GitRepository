Ext.define('app.view.canDataBase.ImportWin', {
    extend: 'ux.form.Panel',
    alternateClassName: 'importWin',
    xtype: 'importWin',

    initComponent:function(){
    	var me = this;
    	var buttons = [{text:'open',scope:this,handler:this.onFormSubmit},{text:'close',scope:this,handler:this.onFormCancel}];
		Ext.apply(me, {
    	 	items:[{
	 			xtype: 'fieldset',title: 'select xls(x)',
	 			layout: 'form',
		        items: [
	        		{xtype:'filefield',labelWidth:100,emptyText: 'select..',fieldLabel: 'select[xls(x)]',
    					name: 'excelFile',allowBlank:false,buttonText:'',buttonConfig: {iconCls: 'x-fa fa-file-excel-o'},
    					listeners :{
    						change:function(){
    							var fileName = this.getValue();
    							var isExcel = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
    							if(isExcel != ".xls" && isExcel != ".xlsx"){EU.toastWarn("select!");this.setRawValue('');}
    							else{EU.toastWarn("ok~");}
    						}
    					}
    				}
	        	]
			}],
    	 	buttons:buttons
    	});
		this.callParent();
	},
	
	onFormCancel:function(){
		var me = this;
    	me.closeWindow();
    }, 
    
    onFormSubmit:function(btn){
		var me = this;
		var form = this.getForm();
		if(!form.isValid())return;
    	form.submit({ 
            url: '../canDataBase.do?method=importToLocal',
            success:function(form,action){ 
             	EU.toastWarn("success!");
             	me.closeWindow();
            }
     	});
    }
});