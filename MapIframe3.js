Ext.define('app.view.rCanSg.MapIframe3', {
	extend:'Ext.ux.IFrame',
	xtype: 'mapIframe3',
	frameName: 'phy',
	src:'../demo/resources/phy/index.html',
	listeners: {
        load: function(iframeComponent){
//        	alert("bbb");
        }
	}

});