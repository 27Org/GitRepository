
/**
*项目基础配置信息-存放一些项目全局变量
*/
Ext.define('app.utils.Config', {
	 alternateClassName: 'cfg', //设置别名
	 statics: {
	 	 systemname:'Ext6 框架平台',
	 	 
	 	 xtypeLogin : 'login',
	 	 
	 	 xtypeFrame : 'systemFrame',
	 	 
	 	 resourcesPath: 'resources/',
	 	 
	 	 /**用户信息*/
	 	 sub : {},
	 	 
	 	 /**系统默认语言*/
	 	 language:'zh_CN',
	 	 
	 	 /**系统默认主题风格-01->网页主题*/
	 	 theme:'01',
	 	 
	 	 /**跨域请求*/
	 	 crossdomain : false//,
	 	 
	 	 /**跨域url*/
	 	 //requestUrl : "http://192.168.15.138:8088/extjs6/"
	 }
});