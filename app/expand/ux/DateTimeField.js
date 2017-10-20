/**
 * 日期组件 date/time/datetime
 * 
 * {xtype:'datetimefield',fieldLabel: '出生年月1',name: 'birthdate'},
 * {xtype:'datetimefield',fieldLabel: '风格1',name: 'birthdate2',cfg:{theme:'android-ics light',mode:'scroller',maxDate: new Date()}},
 * {xtype:'datetimefield',fieldLabel: '风格2',name: 'birthdate2',cfg:{mode:'scroller'}},
 * {xtype:'datetimefield',fieldLabel: '日期',name: 'birthdate3',preset:'date'},
 * {xtype:'datetimefield',fieldLabel: '年月',name: 'birthdate4',preset:'date',cfg:{dateFormat:'yy-mm',dateOrder:'yymm'}},
 * {xtype:'datetimefield',fieldLabel: '时间',name: 'birthdate4',preset:'time'},
 */
Ext.define('app.expand.ux.DateTimeField', {
    extend: 'Ext.form.field.Text',
    xtype: 'datetimefield',
    alternateClassName:'ux.datetimefield',
    preset: 'datetime',
    
    editable:false,
    
    triggers: {
        search: {
            cls: Ext.baseCSSPrefix + 'form-date-trigger',
            weight: 1
        }
    },
    
    onRender:function(ct, position){
		var me = this;
		this.callParent(arguments);
	    var triggers = me.getTriggers();
    	var id = triggers['search'].domId;
    	me.opt = {
    		preset: me.preset || 'datetime',
			theme: 'default',       // 主题方式 ：default 、android-ics light
			mode: 'clickpick',      // clickpick scroller
			display: 'modal',
	        setText: '确定',
	        cancelText: '取消',
	        dateFormat: 'yy-mm-dd', // 日期回显值
	        dateOrder: 'yymmdd',    // 日期控件显示顺序
	        dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
	        dayNamesShort: ['日','一','二','三','四','五','六'],
	        dayText: '日',
	        hourText: '时',
	        minuteText: '分',
	        monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	        monthNamesShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
	        monthText: '月',
	        secText: '秒',
	        timeFormat: 'HH:ii:ss', // 时间回显值
	        timeWheels: 'HHiiss',   // 时间控件显示顺序
	        yearText: '年',
	        nowText: '当前',
	        dateText: '日',
	        timeText: '时间',
	        calendarText: '日历',
	        onSelect : function (v) {
	        	me.setVal(v);
	    		me.focus();
	        }
    	};
    	if(me.editable && Ext.isEmpty(me.vtype)){
    		me.vtype ="date";
    		me.format = me.ms.scroller('getFormat');
    	}
    	me.ms = $('#'+id).scroller('destroy').scroller(Ext.apply(me.opt,me.cfg));
    },
    
    setVal:function(v){
	    this.superclass.setValue.call(this,v);
    },
    
    setValue:function(v){
    	this.superclass.setValue.call(this,v);
    	this.ms.scroller('setDate',v, true);
    },
    
    scroller:function(fn,v,b){
    	this.ms.scroller(fn,v,b);
    }
});