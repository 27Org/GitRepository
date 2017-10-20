Ext.define('app.view.frame.default.UserEdit', {
    extend: 'ux.form.Panel',
    alternateClassName: 'userEdit',
    xtype: 'userEdit',
    initComponent:function(){
    	var me = this;
    	var buttons = [{text:'提交',scope:this,handler:this.onFormSubmit},{text:'关闭',scope:this,handler:this.onFormCancel}];
    	me.photo =  Ext.create('Ext.Img',{width:'74%',rowspan:5, src:"resources/images/noImg.png", 	alt:'人员照片',listeners: {el: {scope:this,click: me.onPhotoUpload}}});
    	Ext.apply(me, {
    	 	items:[{
	 			xtype: 'fieldset',title: '人员信息',defaults: {xtype:"textfield",width: '100%'},
	 			layout: {type: 'table',columns: 2, tdAttrs :{style : {width: '50%',textAlign:'center'}
		        }},
		        items: [
	        		{fieldLabel: '员工姓名',name: 'name',allowBlank:false},
	        		me.photo,
	        		{xtype:'combobox',fieldLabel: '性别',name:'sex',allowBlank:false,valueField:'name',displayField:'name',editable : false,
	        			store:new Ext.data.ArrayStore({fields: ['id', 'name'],data: [[1, '男'], [2, '女']]})
	        		},
	        		{xtype:'datefield',fieldLabel: '出生年月',name:'birthdate',format: 'Y-m-d',allowBlank:true,editable : false}, 
	        		{fieldLabel: '电话',name: 'mobile',allowBlank:false}, 
	        		{fieldLabel: '邮箱',name: 'email',allowBlank:false}
		        ]
			}],
    	 	buttons:buttons
    	});
    	this.callParent();
    },
    
    beforeRender:function(){
    	var me = this;
        var personid = me.get("personid");
		var url = "../person.do?method=getPhoto";
		Ext.Ajax.request({url:url,method:'post',params:{"personid":personid},
			success: function(resp,opts) {me.photo.setSrc(resp.responseText);}//responseText为图片相对路径
		});
        if(Ext.isEmpty(personid))return;
        me.loadData(personid);
    },
    
    loadData:function(personid){
    	var me = this;
        var params =  {personid:personid};
        var url = "../person.do?method=getPersonInfo";
        Ext.Ajax.request({url:url,method:'post',params:params,
       		success: function(resp,opts) {
		    	var result = eval('(' + resp.responseText + ')');
		    	me.getForm().setValues(result.data);	
		    	me.getForm().findField('birthdate').setValue(Ext.util.Format.date(result.data.birthdate, 'Y-m-d'));
	        }
        });
        /*
        EU.RS({url:url,scope:me,msg:false,params:params,callback:function(result){
        	if(!Ext.isEmpty(result)){
        		me.getForm().setValues(result);
        	}
        }});
        */
    },
    
	onPhotoUpload:function(){
    	var me = this;
    	var personid = me.get("personid");
    	if(Ext.isEmpty(personid)){EU.toastWarn("保存单据信息后在上传头像。");return;}
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
		            	if (form.isValid()) {
				            p_form.submit({
				                url: '../person.do?method=uploadPhoto',
				                params:{personid:personid},
				                waitMsg: '照片上传中..',
				                timeout:60,
				                success: function(form,action) {
				                	EU.toastWarn("上传成功!");
    								var url = "../person.do?method=getPhoto";
    								Ext.Ajax.request({url:url,method:'post',params:{"personid":personid},
    									success: function(resp,opts) {me.photo.setSrc(resp.responseText);Ext.getCmp("clsPhoto").setSrc(resp.responseText);}
    								});
				                }
				            });
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
    
    onFormSubmit:function(){
    	var me = this;
		var form = this.getForm();
    	if(!form.isValid())return;
    	var personid = me.get("personid");
    	form.submit({ 
            url: '../person.do?method=savePerson',
            params:{"personid":personid},
            success:function(form,action){ 
             	EU.toastWarn("编辑成功!");
             	
            }
     	});
    },
    
    onFormCancel:function(){
    	var me = this;
	    me.closeWindowVerify();
    }
});