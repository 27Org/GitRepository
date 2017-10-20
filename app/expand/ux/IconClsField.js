Ext.define('app.expand.ux.IconClsField', {
    extend: 'Ext.form.field.Picker',
    xtype: 'iconclsfield',

    editable: false,

    beforeBodyEl: [
        '<div style="position: absolute;width: 24px;height: 24px;left: 4px;top: 0px;bottom: 0px;margin: auto;text-align:center;font-size:16px;" >' +
            '<div id="{id}-swatchEl" data-ref="swatchEl" class="x-fa fa-expand" ' +
            	'style="width:24px;height:24px;text-align:center;line-height:24px;font-size:16px;float:left;color:#5fa2dd;">' + 
            '</div>' +
        '</div>'
    ],
    
    cls: Ext.baseCSSPrefix + 'colorpicker-field',
    
    childEls: [
        'swatchEl'
    ],
    
    createPicker:function(){
    	var me = this;
    	if(me.iconClsPickerWindow == null){
			var imageTpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div class="iconclsSelector {name}" data-qtip="{name}" ',
							'style="width:24px;height:24px;text-align:center;line-height:24px;font-size:16px;float:left;color:#38393A;">', 
					'</div>',
				'</tpl>'
			);
			var store = Ext.create('Ext.data.Store',{
					autoLoad: true,sortOnLoad: true,fields:['name'],
					proxy: {type:'ajax',url:'classic/resources/data/iconCls.json',reader:{type:'json'}}
	            });
    		var dataView = Ext.create("Ext.view.View",{
    			store: store,
    			tpl: imageTpl,
				layout : 'fit',
				autoScroll : true,
    			itemSelector: 'div.iconclsSelector',
    			emptyText: 'No images available',
    			listeners : {
					itemdblclick : function(cp, record, item, index, e, eOpts ){
						var name = record.get("name");
						me.setValue(name);
						me.collapse();
					}
				},
				setIconcls : function(iconcls) {  
			        if(iconcls){
			        	this.getSelectionModel().select(this.getStore().findRecord('name',iconcls));
			        }
			    }  
    		});
    		var maxWidth = (Ext.isNumber(me.col)?(me.col * 25 +20) : me.maxWidth) || 500;
    		var minWidth = me.minWidth || 385;
    		minWidth = minWidth > maxWidth ? maxWidth : minWidth;
    		me.iconClsPickerWindow = Ext.create("Ext.window.Window",{
    			closeAction: 'hide',
                referenceHolder: true,
                minWidth: minWidth,
                minHeight: me.minHeight || 200,
				maxHeight: me.maxHeight || 300,
				maxWidth: maxWidth,
                layout: 'fit',
                header: false,
                resizable: true,
                items:dataView
            });
    	}
    	return me.iconClsPickerWindow;
    },
    
    setValue:function(v){
       var me = this;
       if(me.swatchEl)me.swatchEl.setCls(v);
       me.superclass.setValue.call(me,v);
    },
    
    setColor:function(color){
       var me = this;
       if(me.swatchEl){
       	  color = color || 'none';
       	  me.swatchEl.setStyle("color",color);
       }
    }
});