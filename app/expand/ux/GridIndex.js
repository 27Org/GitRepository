Ext.define('app.expand.ux.GridIndex', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridindex',
    
    datas : null,
    fields : null,
    istrans : false,
    rowDataIdentifier : "GRID_ROWDATA_TYPE",
    colorIdentifier : "GRID_DATA_COLOR",
    filterField: ['sum','avg','max','min','md','mo','s2'],
    keyname : "",
    
    /**
     * 刷新显示
     * @param {} fields 字段
     * @param {} data   数据
     * @param {} nochange  不更新基础数据
     */
    refresh:function(fields,datas,nochange){
    	var me = this;
    	if(fields == null && !Ext.isEmpty(me.fields)){
    		fields = Ext.clone(me.fields);
    	}else if(!nochange){
    		me.fields = Ext.clone(fields);
    	}
    	if(datas ==null && !Ext.isEmpty(me.datas)){
    		datas = Ext.clone(me.datas);
    	}else if(!nochange){
    		me.datas = Ext.clone(datas);
    	}
    	Ext.each(fields,function(rec){
    		if(!Ext.isFunction(rec.renderer)){
				rec.renderer = function(value, metaData, record, rowIndex, colIndex, store, view){
					if(Ext.isEmpty(value))return "";
					value = Ext.isNumber(value)?Ext.util.Format.number(value,'0.00'):value;
				    var color = Ext.isEmpty(record.data[me.colorIdentifier])?null:record.data[me.colorIdentifier][rec.dataIndex];
				    if(Ext.isEmpty(color))return value;
				    return "<font color='"+color+"' style=	'font-weight:bold;'>"+value+"</font>";
				}
    		}
    	});
    	for (var i = 0; i < fields.length; i++) {
    		if(fields[i].type =='key'){
    			me.keyname=fields[i].dataIndex;
    			break;
    		}
    	}
    	var store = Ext.create('Ext.data.Store',{data:datas});
      	this.reconfigure(store,fields);
    	if(this.rowOperation.me==null)this.rowOperation.me = me;
    	if(this.colOperation.me==null)this.colOperation.me = me;
    },
    
    /**
     * 转置
     * @param {} text
     */
    transdata:function(text,callback){
    	var me = this;
    	var transdatas = me.getTransData(text);
    	var newfield = transdatas.field;
    	var newdatas = transdatas.datas;
    	if(Ext.isFunction(callback))callback(newdatas);
    	me.istrans = !me.istrans;
    	me.refresh(newfield,newdatas,true);
    },
    
    /**
     * 添加自定义指标
     * @param {} type  		row=行 col=列
     * @param {} indexname  指标名称
     * @param {} str        运算字符串
     * @param {} cfg        新增行或列附加参数
     * @param {} isupdate   是否修改
     */
    addIndex:function(type,indexname,str,cfg){
    	var me = this;
        if(type=='row'){
        	var oldrec = me.isExistRowData(indexname);
	        var rowdata = {};
	        rowdata[me.keyname] = indexname;
	        var datas = me.getTypeValues();
	        var colMap = {};
	        Ext.each(datas,function(data){
	        	var name = data[me.keyname];
	        	var vname = "#"+name.value+"#";
	        	for(var key in data) {
        			var bean = data[key];
        			if(bean==null || bean.type !='number')continue;
        			if(colMap[key]==null)colMap[key]=str;
        			var value = CU.getNumber(bean.value);
        			var v = value<0?"("+value+")":value;
        			colMap[key] = CU.replaceAll(colMap[key],vname,v);
        		}
	        });
	        for (var key in colMap)rowdata[key] = eval(colMap[key]);
	        var rowlength = me.getStore().getCount();
	    	var columns  = me.ownerGrid.getColumns();  //列
	    	var colors = rowdata[me.colorIdentifier] = {};
	    	Ext.each(columns,function(rec){
	    		colors[rec.dataIndex] = 'blue';
	    	})
	        rowdata[me.rowDataIdentifier] = indexname;//标记非原始数据
	        rowdata['color'] = CU.getRandomColor();
	        rowdata['formula'] = str;//行公式
	        if(Ext.isEmpty(oldrec)){
		        me.getStore().add(Ext.apply(rowdata,cfg));
				me.datas.push(rowdata);//加入原始数据
	        }else{
	        	oldrec.set(rowdata);
	        	for (var i = 0; i < me.datas.length; i++) {//修改原始数据
	        		if(me.datas[i][me.keyname].toUpperCase() == indexname.toUpperCase()){
	        			me.datas[i] = rowdata;
	        			break;
	        		}
	        	}
	        }
        }else{
	        var columns = me.addColumn(indexname,indexname,'number',Ext.apply({formula:str},cfg));//加入列公式
        	var datas = me.rowDataProcessing(function(map,data,count){
	        	map[indexname] = eval(data);
	        	if(Ext.isEmpty(map[me.colorIdentifier]))map[me.colorIdentifier] = {};
	        	map[me.colorIdentifier][indexname] = 'red';
	        },function(key,type,value,data){
	        	if(str.indexOf(key)>-1){
	        		if(Ext.isArray(data))data = str;
	        		var vname = "#"+key+"#";
	        		var v = value<0?"("+value+")":value;
	        		return CU.replaceAll(data,vname,v);
	        	}else{
	        		return data;
	        	}
        	});
	        if(Ext.isObject(columns)){
	        	me.datas = datas;
	        	columns.formula = str;
	        	Ext.each(me.fields, function(rec) {
				     if(rec.dataIndex.toUpperCase() == indexname.toUpperCase()){
				     	 rec.formula = str;
				     	 return;
				     }
		        });
		        me.refresh(null,datas);
	        }else{
	        	me.datas = datas;
	        	me.fields = columns;
		        me.refresh(columns,datas);
	        }
        }
    },
    
    /**
     * 筛选数据显示
     * @param {} type  row=行 col=列
     * @param {} logic [{name,sign,value}] name=指标名称 sign符号=>、 < 、>= 、<=  value=值
     */
    dataFilter:function(type,logics){
    	var me = this;
    	var columns  = me.getColumns();  //列
    	var indexs = {};
    	for (var i = 0; i < logics.length; i++) {
    		indexs[logics[i].name] = logics[i];
    	}
    	var datas = me.getTwoWayData();
    	if(type=='row'){
    		for (var i = datas.length-1; i >= 0; i--) {
	    		var iskey = false;
	    		var isshow = true;
	    		var logic = null;
    			for (var j = 0; j < datas[i].length; j++) {
    				var data = datas[i][j];
    				if(data.type == 'key' && indexs[data.value]){
    					logic = indexs[data.value];
    					iskey = true;
    				}else if(data.type == 'number'){
    					isshow = iskey && me.comparison(data.value,logic.value,logic.sign);
    					if(!isshow)break;
    				}
    			}
	    		if(iskey && !isshow){
	    			me.getStore().removeAt(i);
	    		}
    		}
    	}else if(type=='col'){
    		for (var i = 0; i < datas.length; i++) {
    			for (var j = 0; j < datas[i].length; j++) {
    				var data = datas[i][j];
    				var logic = indexs[data.field];
    				if(data.type == 'number' && logic && !me.comparison(data.value,logic.value,logic.sign)){
    					columns[j].hide();
    				}
	    		}
    		}
    	}
    },
    
    /**
     * 行运算
     * @type 
     */
    rowOperation :{
    	me : null,
    	sum:function(){
    		var me = this.me;
	        var columns = me.addColumn("sum",'合计');
	        if(Ext.isObject(columns))return;
        	var datas = me.rowDataProcessing(function(map,datas,count){
        		map['sum'] = Ext.Array.sum(datas);
			    map[me.colorIdentifier]['sum'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	avg:function(){
    		var me = this.me;
    		var columns = me.addColumn("avg",'平均值');
	        if(Ext.isObject(columns))return;
        	var datas = me.rowDataProcessing(function(map,datas,count){
        		map['avg'] = Ext.util.Format.number(Ext.Array.mean(datas),'0.00');
			    map[me.colorIdentifier]['avg'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	max:function(){
    		var me = this.me;
    		var columns = me.addColumn("max",'最大值');
	        if(Ext.isObject(columns))return;
        	var datas = me.rowDataProcessing(function(map,data,count){
        		map['max'] = Ext.Array.max(data); 
			    map[me.colorIdentifier]['max'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	min:function(){
    		var me = this.me;
    		var columns = me.addColumn("min",'最小值');
	        if(Ext.isObject(columns))return;
        	var datas = me.rowDataProcessing(function(map,data,count){
        		map['min'] = Ext.Array.min(data); 
			    map[me.colorIdentifier]['min'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	md:function(){
    		var me = this.me;
    		var columns = me.addColumn("md",'中位数');
	        if(Ext.isObject(columns))return;
	        var datas = me.rowDataProcessing(function(map,data,count){
        		map['md'] = CU.getMd(data);
			    map[me.colorIdentifier]['md'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	mo:function(){
    		var me = this.me;
    		var columns = me.addColumn("mo",'众数');
	        if(Ext.isObject(columns))return;
	        var datas = me.rowDataProcessing(function(map,data,count){
        		map['mo'] = CU.getMo(data);
			    map[me.colorIdentifier]['mo'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	s2:function(){
    		var me = this.me;
    		var columns = me.addColumn("s2",'方差');
	        if(Ext.isObject(columns))return;
	        var datas = me.rowDataProcessing(function(map,data,count){
	        	map['s2'] = CU.getS2(data);
			    map[me.colorIdentifier]['s2'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	},
    	sd:function(){
    		var me = this.me;
    		var columns = me.addColumn("sd",'标准差');
	        if(Ext.isObject(columns))return;
	        var datas = me.rowDataProcessing(function(map,data,count){
	        	map['sd'] = CU.getSd(data);
			    map[me.colorIdentifier]['sd'] = 'red';
        	});
	        me.refresh(columns,datas,true);
    	}
    },
    
    /**
     * 列运算
     * @type 
     */
    colOperation:{
    	me : null,
    	sum:function(){
    		var me = this.me;
	        if(me.isExistRowData('sum')!=null)return;
	        var rowdata = me.colDataProcessing("sum",'合计',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = Ext.Array.sum(coldatas);
	        });
    		me.getStore().add(rowdata);
    	},
    	avg:function(){
    		var me = this.me;
	        if(me.isExistRowData('avg')!=null)return;
	        var rowdata = me.colDataProcessing('avg','平均值',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = Ext.util.Format.number(Ext.Array.mean(coldatas),'0.00');
	        });
    		me.getStore().add(rowdata);
    	},
    	max:function(){
    		var me = this.me;
	        if(me.isExistRowData('max')!=null)return;
	        var rowdata = me.colDataProcessing('max','最大值',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = Ext.Array.max(coldatas); 
	        });
    		me.getStore().add(rowdata);
    	},
    	min:function(){
    		var me = this.me;
	        if(me.isExistRowData('min')!=null)return;
	        var rowdata = me.colDataProcessing('min','最小值',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = Ext.Array.min(coldatas); 
	        });
    		me.getStore().add(rowdata);
    	},
    	md:function(){
    		var me = this.me;
    		var me = this.me;
	        if(me.isExistRowData('md')!=null)return;
	        var rowdata = me.colDataProcessing('md','中位数',function(rowdata,coldatas,column,type,dataIndex,i){
	        	rowdata[dataIndex] = CU.getMd(coldatas);
	        });
    		me.getStore().add(rowdata);    		
    	},
    	mo:function(){
    		var me = this.me;
	        if(me.isExistRowData('mo')!=null)return;
	        var rowdata = me.colDataProcessing('mo','众数',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = CU.getMo(coldatas);
	        });
    		me.getStore().add(rowdata);
    	},
    	s2:function(){
    		var me = this.me;
	        if(me.isExistRowData('s2')!=null)return;
	        var rowdata = me.colDataProcessing('s2','方差',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = CU.getS2(coldatas);
	        });
    		me.getStore().add(rowdata);
    	},
    	sd:function(){
    		var me = this.me;
	        if(me.isExistRowData('sd')!=null)return;
	        var rowdata = me.colDataProcessing('sd','标准差',function(rowdata,coldatas,column,type,dataIndex,i){
	        	 rowdata[dataIndex] = CU.getSd(coldatas);
	        });
    		me.getStore().add(rowdata);
    	}
    },
    
    //=========================================================方法==============================================================/
    
    /**
     * 值比对 value1和value2比较大小  成功返回true 失败false
     * @param {} value1
     * @param {} value2
     * @param {} sign
     * @return {Boolean}
     */
    comparison:function(value1,value2,sign){
    	switch(sign){
    		case '>' : return value1>value2;
    		case '<' : return value1<value2;
    		case '>=' : return value1>=value2;
    		case '<=' : return value1<=value2;
    	}
    	return false;
    },
    
    /**
     * 获取二维数据
     */
    getTwoWayData:function(){
        var me = this;
    	var rowIndex = me.getStore().getCount();
    	var columns  = me.getColumns();  //列
    	var datas = [];
    	for (var i = 0; i < rowIndex; i++) {
    		var record = me.getStore().getAt(i);
    		datas[i] = [];
    		for (var j = 0; j < columns.length; j++) {
    			var fieldName = columns[j].dataIndex;
    			var value = record.get(fieldName);
    			datas[i][j] = {field:fieldName,value:value,type:columns[j].type};
    		}
    	}
    	return datas;
    },
    
    /**
     * 获取数据[{name:{value:'',type:''}}]
     * @return {}
     */
    getTypeValues:function(){
    	var me = this;
    	var rowIndex = me.getStore().getCount();
    	var columns  = me.ownerGrid.getColumns();  //列
    	var datas = [];
    	for (var i = 0; i < rowIndex; i++) {
    		var record = me.getStore().getAt(i);
    		datas[i] = Ext.clone(record.data);
    		for (var j = 0; j < columns.length; j++) {
    			var fieldName = columns[j].dataIndex;
    			if(!Ext.isEmpty(fieldName)){
    				var value = record.get(fieldName);
    				datas[i][fieldName] = {value:value,type:columns[j].type};
    			}
    		}
    	}
    	return datas;
    },
    
    getIndexValues:function(){
    	var me = this;
    	var rowIndex = me.getStore().getCount();
    	var datas  = [];
    	for (var i = 0; i < rowIndex; i++) {
    		var data = me.getStore().getAt(i).data;
    		var identifier = data[me.rowDataIdentifier];
    		if(!Ext.isEmpty(identifier)){
	    		if(me.filterField.indexOf(identifier)>-1)continue;
    		}else if(!Ext.isEmpty(data.type) && data.type != 'number'){
    			continue;
    		}
    		datas.push(data);
    	}
    	return datas;
    },
    
    getFields:function(){
    	var me = this;
    	var fields = [];
    	var columns  = me.ownerGrid.getColumns();  //列
    	for (var i = 0; i < columns.length; i++) {
    		var column = columns[i];
    		if(column.text=='&#160;')continue;//多选框
    		var field = {};
    		if(!Ext.isEmpty(column.text))field.text = column.text;
    		if(!Ext.isEmpty(column.width))field.width = column.width;
    		if(!Ext.isEmpty(column.dataIndex))field.dataIndex = column.dataIndex;
    		if(!Ext.isEmpty(column.type))field.type = column.type;
    		if(!Ext.isEmpty(column.flex))field.flex = column.flex;
    		if(!Ext.isEmpty(column.align))field.align = column.align;
    		if(!Ext.isEmpty(column.renderer))field.renderer = column.renderer;
    		if(!Ext.isEmpty(column.locked))field.locked = column.locked;
    		if(!Ext.isEmpty(column.xtype))field.xtype = column.xtype;
    		if(!Ext.isEmpty(column.widget))field.widget = column.widget;
    		if(!Ext.isEmpty(column.widget))field.widget = column.widget;
    		if(!Ext.isEmpty(column.menuDisabled))field.menuDisabled = column.menuDisabled;
    		if(!Ext.isEmpty(column.sortable))field.sortable = column.sortable;
    		if(!Ext.isEmpty(column.formula))field.formula = column.formula;
    		if(!Ext.isEmpty(column.uid))field.uid = column.uid;
    		fields.push(field);
    	}
    	return fields;
    },
    
    /**
     * 添加新列
     * @param {} dataindex  列数据名称
     * @param {} text   显示名称
     * @param {} type   类型
     * @param {} cfg    附加参数
     * @return {}
     */
    addColumn:function(dataindex,text,type,cfg){
        var me = this;
    	var columns = me.getFields();
    	text = text || dataindex;
    	type = type || dataindex;
    	var oldcolumn = null;
    	Ext.each(columns, function(rec) {
		     if(rec.dataIndex == dataindex){
		     	oldcolumn = rec;
		     	return;
		     }
        });
        if(oldcolumn!=null)return oldcolumn;
        columns.push(Ext.apply({text:text,width:120,dataIndex:dataindex,type:type,align:'right'},cfg));
        return columns;
    },
    
    /**
     * 根据名称判断行数据是否存在 
     * @param {} type 名称
     * @return {}  null=不能存在,object=存在
     */
    isExistRowData : function(type){
        var me = this;
    	var datas = me.getRecValues();
    	var old_rec = null;
    	Ext.each(datas, function(rec) {
		     if(!Ext.isEmpty(rec.get(me.rowDataIdentifier)) && rec.get(me.rowDataIdentifier).toUpperCase()==type.toUpperCase()){
		     	old_rec = rec;
		     	return ;
		     }
        });
        return old_rec;
    },
    
    getTransData:function(text){
    	var me = this;
    	text = text || cfg.DateTime;
    	var fields = Ext.clone(me.fields);
    	var datas = Ext.clone(me.datas);
    	var newfield = [];
    	var newdatas = [];
    	if(!me.istrans){
	    	if(Ext.isEmpty(fields) || Ext.isEmpty(datas))return;
	    	var newfield = [{text:text,flex: 1,dataIndex:me.keyname,type:'key'}];
	    	for (var i = 0; i < datas.length; i++) {
	    		var value = datas[i][me.keyname];
	    		newfield.push({text: value,flex: 1,dataIndex:value,type:'number'});
	    	}
	    	var newdatas = [];
	    	for (var i = 0; i < fields.length; i++) {
	    		if(fields[i].type =='key' || Ext.isEmpty(fields[i].type))continue;
	    		var dataIndex = fields[i].dataIndex;
	    		var bean = {};
	    		for (var j = 0; j < datas.length; j++) {
	    			var data = datas[j];
	    			bean[data[me.keyname]] = data[dataIndex];
	    		}
	    		bean[me.keyname] = fields[i].text;
	    		bean['type'] = fields[i].type;
	    		newdatas.push(bean);
	    	}
    	}else{
    		newfield = fields;
    		newdatas = datas;
    	}
    	return {field:newfield,datas:newdatas};
    },
    
    rowDataProcessing:function(callback,colCallback){
        var me = this;
	    var datas = [];
    	var values = me.getTypeValues();
    	var length = me.ownerGrid.getColumns().length;
    	length = me.enableLocking == true?length-me.lockedGrid.getColumns().length:length;
        for (var i = 0; i < values.length; i++) {
        	var count = 0;
        	var data = [];
        	var bean = values[i];
        	var map = {};
		    for(var key in bean){
		    	var v = bean[key];
		    	if(Ext.isObject(v) && key !=me.colorIdentifier){
			    	var type = bean[key].type;
			    	var value = bean[key].value;
			     	map[key] = value;
			     	if(type=='number'){
			     		if(Ext.isFunction(colCallback)){
			     			data = colCallback(key,type,CU.getNumber(value),data);
			     		}else{
			     			data.push(CU.getNumber(value));
			     		}
			     		count++;
			     	}
		    	}else{
		    		map[key] = v;
		    	}
		    }
			if(!Ext.isObject(map[me.colorIdentifier]))map[me.colorIdentifier] = {};
		    if(Ext.isFunction(callback))callback(map,data,count);
		    datas.push(map);
        }
        return datas;
    },
    
    colDataProcessing:function(key,name,callback){
        var me = this;
	    var rowdata = {};
	    rowdata[me.colorIdentifier] = {};
    	var rowlength = me.getStore().getCount();
	    var columns  = me.ownerGrid.getColumns();  //列
	    
    	for (var i = 0; i < columns.length; i++) {
    		var column = columns[i];
    		var type = column.type;
    		var dataIndex = column.dataIndex;
    		var coldatas = me.getFieldDataAt(function(rec){
    			return CU.getNumber(rec.get(dataIndex))
    		});
    		if(type=='key'){
    			rowdata[dataIndex] = name;
    		}else if(Ext.isFunction(callback)){
    			callback(rowdata,coldatas,column,type,dataIndex,i);
    		}
    		rowdata[me.colorIdentifier][dataIndex] = 'blue';
    	}
    	rowdata[me.rowDataIdentifier] = key;
        return rowdata;
    }

});