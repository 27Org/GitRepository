Ext.define('app.view.frame.SystemFrame', {
    extend: 'Ext.panel.Panel',
    alternateClassName: 'systemFrame',
    xtype: 'systemFrame',
    requires: [
        'app.controller.frame.SystemFrameController'
    ],
    controller:'systemFrame',
    layout: 'fit',
    referenceHolder: true,
    items:[]
});