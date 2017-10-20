Ext.define('app.view.rCanSg.MapIframe2', {
	extend:'Ext.ux.IFrame',
	xtype: 'mapIframe2',
	frameName: 'LED',
	src:'../demo/resources/led/index.html',
	listeners: {
        load: function(iframeComponent){
//        	alert("bbb");
        }
	}

});