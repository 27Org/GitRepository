Ext.define('app.view.rCanSg.MapIframe', {
	extend:'Ext.ux.IFrame',
	xtype: 'mapIframe',
	frameName: 'gauge',
	src:'../demo/resources/gauge/index.html',
	listeners: {
        load: function(iframeComponent){
//        	alert("bbb");
        }
	}

});