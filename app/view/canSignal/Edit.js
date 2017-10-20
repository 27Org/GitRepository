Ext.define('app.view.canSignal.Edit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'canSignalEdit',
    xtype: 'canSignalEdit',
    initComponent:function(){
    	var me = this;
    	me.params = me.params || {};
//    	me.photo =  Ext.create('Ext.Img',{width:'74%',rowspan:5, src:"resources/images/cat.jpg",alt:'照片',listeners: {el: {scope:this,click: me.onPhotoUpload}}});
    	var display = me.viewtype == 'display';
		var buttons = display?null:[{text:'提交',scope:this,handler:this.onFormSubmit},{text:'关闭',scope:this,handler:this.onFormCancel}];
		me.userfieldset = new Ext.form.FieldSet({xtype: 'fieldset',title: '事项信息',defaults: {xtype:"textfield",anchor: '100%',readOnly:display},
	        layout: {type: 'table',columns: 1, tdAttrs :{style : {width: '50%',textAlign:'center'}}},
	        items: [
        		{xtype:'combobox',fieldLabel: '周目',name: 'weekday',allowBlank:false,blankText: '周目名称不能为空!',valueField:'weekday',displayField:'weekday',editable : false,
        		 store:new Ext.data.ArrayStore({fields: ['id', 'weekday'],data: [[1, '周一'], [2, '周二'],[3, '周三'],[4, '周四'],[5, '周五'],[6, '周六'],[7, '周日']]})},
				{xtype:"textarea",fieldLabel: '描述',name: 'info'},
//				me.photo
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
		var dailyItemid = me.get("dailyItemid");
        if(Ext.isEmpty(dailyItemid))return;
        var url = "../dailyItem.do?method=getPhoto";
    	Ext.Ajax.request({url:url,method:'post',params:{"dailyItemid":dailyItemid},
			success: function(resp,opts) {me.photo.setSrc(resp.responseText);}//responseText为图片相对路径
		});
		me.loadData(dailyItemid);
	},

	loadData:function(dailyItemid){
	    var me = this;
	    var url = "../dailyItem.do?method=getDailyItemInfo";
	    Ext.Ajax.request({url:url,method:'post',params:{"dailyItemid":dailyItemid},
		    success: function(resp,opts) {
		    	var result = eval('(' + resp.responseText + ')');
		    	me.getForm().setValues(result.data);
	        },
	        failure:function(resp,opts){
	        	EU.toastWarn("超时请重新登录!");
	        }
	    });
	},	

	onPhotoUpload:function(){
    	var me = this;
    	var dailyItemid = me.get("dailyItemid");
    	if(!me.winPhoto){
    		var p_form = Ext.create("Ext.form.Panel",{layout: 'fit',items:{xtype:'filefield',labelWidth:70,emptyText: '请选择照片',fieldLabel: '照片',
    					name: 'photoFile',allowBlank:false,buttonText:'',buttonConfig: {iconCls: 'x-fa fa-file-image-o'}}});
    		var form  = p_form.getForm();
			me.winPhoto = Ext.create('Ext.window.Window', {title: '上传照片',height: 150,width: 500,
			    layout: 'fit',bodyPadding: 5,modal:true,
			    items: p_form,
			    buttons: [{
		            text: '上传',
		            handler: function(){
		            	if(dailyItemid == null){
		            		if (form.isValid()) {
					            p_form.submit({
					                url: '../dailyItem.do?method=saveNewPhoto',
					                waitMsg: '照片上传中..',
					                timeout:60,
					                success: function(form,action) {
					                	EU.toastWarn("上传成功!");
	    								var url = "../dailyItem.do?method=getNewPhoto";
	    								Ext.Ajax.request({url:url,method:'post',
	    									success: function(resp,opts) {me.photo.setSrc(resp.responseText);}
	    								});
					                }
					            });
					        }
		            	}else{
			            	if (form.isValid()) {
					            p_form.submit({
					                url: '../dailyItem.do?method=uploadPhoto',
					                params:{"dailyItemid":dailyItemid},
					                waitMsg: '照片上传中..',
					                timeout:60,
					                success: function(form,action) {
					                	EU.toastWarn("上传成功!");
	    								var url = "../dailyItem.do?method=getPhoto";
	    								Ext.Ajax.request({url:url,method:'post',params:{"dailyItemid":dailyItemid},
	    									success: function(resp,opts) {me.photo.setSrc(resp.responseText);}
	    								});
					                }
					            });
					        }
		            	}
		            }
		        }, {
		            text: '关闭',
		            handler: function(){form.reset();me.winPhoto.hide();}
		        }]
			})
    	}
    	me.winPhoto.show();
    },
    
	onFormCancel:function(){
		var me = this;
		me.closeWindow();
    }, 
    
    onFormSubmit:function(btn){
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
    	var dailyItemid = me.get("dailyItemid");
    	form.submit({ 
            url: '../dailyItem.do?method=saveDailyItem',
            params:{"dailyItemid":dailyItemid},
            success:function(form,action){ 
             	EU.toastWarn("编辑成功!");
             	me.closeWindow();
            },
            failure:function(form,action){ 
             	EU.toastWarn("编辑失败!");
             	me.closeWindow();
            }
     	});
    }
});