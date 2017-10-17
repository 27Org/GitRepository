Ext.define('app.expand.ux.UploadField', {
    extend: 'Ext.form.field.Base',
    alternateClassName:'ux.form.field.uploadfield',
    xtype: 'uploadfield',
    fieldLabel: '相关附件',
    afterRender:function(){
	    this.callParent(arguments);
	    this.udisabled = this.disabled || this.readOnly;
	    this.data = {};
    	this.refreshImg();
    },
    initComponent:function(){
    	this.callParent(arguments);
    },
    
    refreshImg : function() {
    	var me = this,el = this.bodyEl;
		var src = "resources/images/system/"+(this.value>0?(this.udisabled?"attachment.png":"attachment_add.png"):(this.udisabled?"attachment_none.png":"attachment_add.png"));
		if(me.img==null){
    		el.dom.innerHTML = "";
			el.dom.style = "text-align:left;padding-top: 5px;";
			me.img = document.createElement("img");
			me.img.src = src;
			me.img.style = "border:0px;cursor:pointer;";
			el.dom.appendChild(me.img);
			me.img.onclick = function(){
				var cfg = me.cfg;
				cfg.disabeld = me.udisabled;
				cfg.nfield = cfg.nfield || me.name || 'attachs';
				if(Ext.isEmpty(cfg.tablename)){EU.toastWarn("参数:tablename不能为空!");return;}
				if(Ext.isEmpty(cfg.fieldname)){EU.toastWarn("参数:fieldname不能为空!");return;}
				if(Ext.isEmpty(cfg.fieldvalue)){EU.toastWarn(cfg.tip||"请先保存数据后在上传附件!");return;}
				PU.openAttachWindow(me.cfg);
			}
		}else{
			me.img.src = src;
		}
	},
	
	getData :function(){
		return {};
	},
	
	setValue : function(v) {
		v = parseInt(v, 10);
		this.value = isNaN(v)||v<0 ? 0 : v;
		this.refreshImg();
	},
	
	getValue : function() {
		return this.value;
	},
	
	setFieldValue:function(v){
		this.cfg.fieldvalue = v;
	},
	
	setReadOnly : function(d) {
		this.udisabled = d;
		this.refreshImg();
	},
	
	setDisabled : function(d) {
		this.udisabled = d;
		this.refreshImg();
	}
});