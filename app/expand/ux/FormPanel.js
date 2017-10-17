Ext.define('app.expand.ux.FormPanel', {
    extend: 'Ext.form.Panel',
    alternateClassName:'ux.form.Panel',
    xtype: 'winform',
    plugins:[{ptype:'PRQ'}],
    frame: false,
    border:false,
    autoScroll : true,
    bodyPadding: 5,
    referenceHolder: true,
    fieldDefaults: {labelAlign: 'right',labelWidth: 70,msgTarget: 'side'},
    dataObject:[], //除form以为的其他数据容器
    trackResetOnLoad:true, //开启/关闭验证提醒  
    submitFunction:"onFormSubmit",
    
    /**
     * form表单数据数据变动验证
     * dataObject,除表单数据外其他需要验证的组件对象.如果不写,默认只验证form表单变动
     * @return {}
     */
    isAllDirty:function(){
    	var me = this;
    	var isdirty = me.superclass.isDirty.call(me);
    	if(isdirty)return isdirty;
    	for (var i = 0; i < me.dataObject.length; i++) {
    		if(Ext.isFunction(me.dataObject[i].isDirty)){
	    		isdirty = me.dataObject[i].isDirty();
    		}
	    	if(isdirty)break;
    	}
    	return isdirty;
    },
    
    /**
     * 弹出框关闭时候执行调用（关闭按钮、右上角关闭x）
     * 必须设置submitFunction=?提交的方法名称,缺省:onFormSubmit,如果不存在且无法验证,submitFunction第一个参数为提交回调方法,提交成功后回调才关闭窗口。
     * trackResetOnLoad:true 开启退出验证功能,缺省:true
     */
    closeWindowVerify:function(){
    	this.closeWindow();
    	/*
    	var me = this;
    	var func=eval(me[me.submitFunction]);
    	if(me.trackResetOnLoad && me.isAllDirty() && Ext.isFunction(func) && func.length>0){
	    	EU.showMsg({title:'保存修改',message:"当前记录已经被修改过，需要保存吗?",option:1,scope:this,callback:function(btn, text){
	        	if(btn == 'yes'){
	        		func.call(this,function(){
	        			me.closeWindow();
	        		});
	        	}else{
	        		me.closeWindow();
	        	}
	        }});
    	}else{
    		 me.closeWindow();
    	}
    	*/
    }
    
});