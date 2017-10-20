Ext.define('app.view.login.Login', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'login',
    xtype: 'login',
    requires: [
        'app.controller.login.LoginController',
        'app.view.frame.SystemFrame'
    ],
    controller:'login',
    layout: { type: 'fit'},
    referenceHolder: true,
    items:[
    	{   
    		xtype:'panel',
		    title: '<h2><font color="#ffffff"><span style="letter-spacing:2mm;text-shadow: 3px 3px 3px rgba(42, 42, 42, 0.75);">CanToolApp</span></font></h2>',
		    titleAlign: 'center',
		    bodyStyle:"background-image:url('resources/images/bg.gif');",
		    heigth: 900,
		    layout: {
		        type: 'vbox',
		        align: 'center',
		        pack: 'center'
		    },
    		items:[
		    	{
		            xtype: 'form',
		            reference:'p_form',
		            width: 415,
		            height:360,
		            bodyPadding: '20 20',
		            layout: {
		                type: 'vbox'
		            },
		            defaults : {
		                margin : '5 0',
		                width :'100%'
		            },
		            items:[
		                {
		                    xtype: 'label',
		                    text: 'Log in to your account'
		                },
		                {
		                    xtype: 'textfield',
		                    name: 'username',
		                    height: 55,
		                    hideLabel: true,
		                    allowBlank:false,
                    		cls: 'auth-textbox',
		                    emptyText: 'username',
		                    listeners: {  
			                    specialkey: 'onUserNameEnterKey'
			                }
		                },
		                {
		                    xtype: 'textfield',
		                    reference:'t_password',
		                    name: 'password',
		                    height: 55,
		                    hideLabel: true,
		                    emptyText: 'password',
		                    inputType: 'password',
		                    allowBlank:false,
		                    listeners: {  
			                    specialkey: 'onPasswordEnterKey'
			                }
		                },		              
		                {
		                    xtype: 'button',
		                    name:'loginButton',
		                    scale: 'large',
		                    height: 50,
		                    iconAlign: 'right',
		                    iconCls: 'x-fa fa-angle-right',
		                    text: 'login',
				            action:'login',
				            listeners: {
		                        click: 'onLoginButton'
		                    }
		                }
		            ]
		        }
    		],
		    buttons: [
			    {
				    width:'100%',
				    html: '©CanToolApp version:<font color="#ffffff">(Ver:6.0.2017.10.10)</font> ' 
			    }
			]
    	}
    ]
});