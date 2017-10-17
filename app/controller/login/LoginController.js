Ext.define('app.controller.login.LoginController', {
    extend: 'Ext.app.ViewController',
    
    alias:'controller.login',
    
    views: ['systemFrame'],//绑定视图

    onLoginButton:function(button, e, eOpts){
    	var me = this;
  		var p_form = this.lookupReference('p_form').getForm();
    	if(!p_form.isValid())return;
    	p_form.submit({
            url: "../canMessage.do?method=login",
            success: function(form,action) {
            	EU.toastWarn("登录成功!");//页面右上方的提示弹框
           		me.redirectTo('systemFrame');//重定向到系统首页
           	},
            failure: function(form,action) {
            	EU.toastWarn("登录失败!");
            	return;
            }
        });
    }
});