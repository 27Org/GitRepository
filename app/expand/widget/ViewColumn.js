Ext.define('app.expand.widget.ViewColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.viewcolumn',
	viewname :'', //视图名称
	url : '',     //url地址
	fieldname:'', //标识符
	
    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        var headerCt = me.getHeaderContainer(),
            column = headerCt.getHeaderAtIndex(colIndex);
        if(!Ext.isEmpty(column.viewname) || !(Ext.isEmpty(column.url) || Ext.isEmpty(column.fieldname))){
        	var key = Ext.isEmpty(column.fieldname)?column.viewname:column.fieldname;
        	var cache = Ext.isEmpty(column.cache)?true:column.cache;//是否缓存,缺省true
        	var data = cache?session.get(key):column.datas;
        	if(Ext.isEmpty(data) || !Ext.isArray(data)){
    			var url = Ext.isEmpty(column.url)?"platform/basecode/getviewlist.do":column.url;
    			var params = !Ext.isEmpty(column.url)?null:{viewname:column.viewname};
    			EU.RS({url:url,async:false,msg:false,params:params,callback:function(result){
    				data = result;
    				if(cache){ //如果不做session缓存,那么就当前grid渲染缓存
    					session.set(key,result);
    				}else{
    					store.datas = result;
    				}
    			}});
        	}
    		Ext.each(data, function(rec) { 
             	if(rec.id == value){
             		value = rec.text;
             		return false;
             	}
         	}); 
        }
        return value;
    }
});