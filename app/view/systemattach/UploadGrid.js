Ext.define('app.view.systemattach.UploadGrid', {
    extend: 'Ext.grid.Panel',
    alternateClassName:'uploadgrid',
    xtype: 'uploadgrid',
    store:{},
    initComponent:function(){
    	var me = this;
    	var C_index = Ext.create('Ext.form.field.Checkbox',{boxLabel:'添加到索引',name:'isindex',checked: true});
    	var B_addfile = Ext.create('Ext.Button',{iconCls:'x-fa fa-plus-square',tooltip:"添加文件",border:"0px",scope:this});
    	var B_startupload = Ext.create('Ext.Button',{iconCls:'x-fa fa-upload',tooltip:"开始上传",border:"0px",scope:this,handler:me.start});
    	var B_clearfile = Ext.create('Ext.Button',{iconCls:'x-fa fa-trash',tooltip:"清空列表",border:"0px",scope:this,handler:me.clear});
    	me.bts = [B_addfile,B_startupload,B_clearfile,C_index];
    	Ext.apply(me,{
    		tbar: [C_index,'->',B_addfile,B_startupload,B_clearfile],
    		columns:[
				{header:'文件名',flex:1, dataIndex:'fileName',sortable:false,fixed:true,renderer:function(_v, cellmeta, record){
					var error = record.get("fileState") == SWFUpload.FILE_STATUS.ERROR || record.get("fileState") == SWFUpload.FILE_STATUS.CANCELLED;
					return  error ? ('<div class="ux-cell-color-gray">' + _v + '</div>') :_v;
				}},
		        {header:'进度',xtype:'widgetcolumn',width:98,dataIndex: 'progress',widget: {xtype: 'progressbarwidget',textTpl: ['{percent:number("0")}%']}},
		        {header:'&nbsp;', width:40,dataIndex:'fileState',sortable:false,fixed:true,align:'center',renderer:function(_v, cellmeta, record) {
					var returnValue = '';
					switch(_v){
						case SWFUpload.FILE_STATUS.QUEUED:
							returnValue = '<span id="' + record.id + '"><div id="fileId_' + record.data.fileId + '" style="background:url(resources/images/icons/16x16/delete.gif) no-repeat;cursor: pointer;height:16px;"/></span>';
							break;
						case SWFUpload.FILE_STATUS.ERROR:
							returnValue = '<span id="' + record.id + '"><div id="fileId_' + record.data.fileId + '" style="color:gray;font-style:italic;"/>失败</span>';
							break;
						case SWFUpload.FILE_STATUS.COMPLETE:
							returnValue = '<span id="' + record.id + '"><div id="fileId_' + record.data.fileId + '" style="background:url(resources/images/icons/16x16/checked.gif) no-repeat;cursor: pointer;height:16px;"/></span>';
							break;
						case SWFUpload.FILE_STATUS.CANCELLED:
							returnValue = '<span id="' + record.id + '"><div id="fileId_' + record.data.fileId + '" style="color:gray;font-style:italic;"/>取消</span>';
							break;
						default : break;
					}
					return returnValue;
				}}
			]
    	});
		this.callParent(arguments);
    },
    
	afterRender:function(){
		this.callParent(arguments);
		var me = this,bts = me.bts;
		
		var upcfg = this.upcfg || {};//上传参数配置
    	upcfg.filetypes = upcfg.filetypes || "*.*";//上传文件类型限制
    	upcfg.filesize = Ext.isEmpty(upcfg.filesize)?10:parseInt(upcfg.filesize,10);//上传文件的大小限制,默认为10MB
    	upcfg.limit = upcfg.limit || 100;//文件上传数目限制,默认为100个    	
    	
    	upcfg.nfield = upcfg.nfield || 'attachs';//
    	upcfg.isindex = Ext.isEmpty(upcfg.isindex)?true:upcfg.isindex;//
    	upcfg.JSESSIONID = cfg.sub.sessionid;//
    	
    	var B_addfile = bts[0];
    	var em = B_addfile.el.child('span');
	    var placeHolderId = Ext.id();
	    em.createChild({tag:'div',id: placeHolderId});
	    
    	var settings = {//swf参数配置
			upload_url: upcfg.uploadurl ||　"systemFile.do?method=batchUpload",
			post_params: upcfg,
			flash_url : 'expand/plugin/swfupload/swf/swfupload.swf', 
			flash9_url : 'expand/plugin/swfupload/swf/swfupload_fp9.swf', 
			file_post_name: "formFile",
			file_size_limit: upcfg.filesize+" MB",
			file_types: upcfg.filetypes,
			file_upload_limit: upcfg.limit,
			use_query_string:true,
			button_width : B_addfile.getWidth(),
			button_height : B_addfile.getHeight(),
			style:'position:absolute;left:0px;top:0px;',
			button_placeholder_id: placeHolderId,
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor : SWFUpload.CURSOR.HAND,
			file_queued_handler : onFileQueued,
			file_queue_error_handler : onFileQueueError,
			file_dialog_complete_handler : null,
			upload_start_handler : null,
			
			upload_progress_handler : onUploadProgress,
			upload_error_handler : null,
			upload_success_handler : onUploadSuccess,
			upload_complete_handler : onUploadComplete
		};
		Ext.apply(settings,this.settings);
		var swfupload = me.swfupload = new SWFUpload(settings);
		swfupload.uploadStopped = false;
    	
    	this.on('cellclick',function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
			if(cellIndex!=2 ) return ;
			var fileId = record.data.id;
			var file = swfupload.getFile(fileId);
			if(file){
				if(file.filestatus == SWFUpload.FILE_STATUS.QUEUED){
					grid.getStore().remove(record);
				}else if(file.filestatus == SWFUpload.FILE_STATUS.IN_PROGRESS){
					swfupload.cancelUpload(fileId);
					record.set('fileState',SWFUpload.FILE_STATUS.CANCELLED);
					file.filestatus = SWFUpload.FILE_STATUS.QUEUED; 
				}
			}
		});
		
		function onFileQueued(file) {
			me.getStore().add({id:file.id,fileName:file.name,fileSize:file.size,fileType:file.type,fileState:file.filestatus});
		};
		
		function onFileQueueError(file) {
			if(Ext.isEmpty(file)) return ;
			EU.toastWarn("文件：\""+file.name+"\"\r\n 超过了指定大小："+upcfg.filesize+"MB!不能上传!");
		};
		
		/**
		 * 过程记录
		 */
		function onUploadProgress(file, completeBytes, bytesTotal) {
			var percent = completeBytes / bytesTotal;
			var rec = me.getRecord(file.id);
			if(rec==null)return;
			rec.set("progress",percent);
		}
				
		/**
		 * 单个文件上传完成
		 */
		function onUploadSuccess(file, serverData) {
			var result = eval("("+serverData+")");
			if(result.success) {
				var rec = me.getRecord(file.id);
				if(rec==null)return;
				rec.set('fileState',SWFUpload.FILE_STATUS.COMPLETE);
				if(Ext.isFunction(me.successHandler)){
					Ext.callback(me.successHandler, me, [file, serverData]);
				}
			}
		}
		
		/**
		 * 完整的上传完成
		 */
		function onUploadComplete(file) {
			if(swfupload.getStats().files_queued > 0 && swfupload.uploadStopped==false){
				swfupload.startUpload();
				return;
			}
			me.setBtnsDisabled(false);
			var store = me.getStore(),
				count = store.getCount();
			for(var i=count-1; i>=0; i--) {
				var record = store.getAt(i),
					fileid = record.get("id");
				if(record.get("fileState") == SWFUpload.FILE_STATUS.COMPLETE) {
					store.remove(record);
				}
			}
			if(Ext.isFunction(me.uploadComplete)){
				Ext.callback(me.uploadComplete, me, [file]);
			}
		}
	},
	
	setBtnsDisabled :function(disabled) {
		var me = this,bts = me.bts;
		Ext.each(bts,function(rec){
			rec.setDisabled(disabled);
		});
	},
	
	/**
	 * 开始上传
	 */
	start : function () {
		var me=this,filecount = 0;
		Ext.each(me.getStore().data.items,function(record){
			if(record.get("fileState") == SWFUpload.FILE_STATUS.QUEUED) {
				filecount = 1;
				return;
			}
		});
		if(filecount == 0) {EU.toastWarn("请添加上传文件!");return ;}
		if (me.swfupload) {
			if(this.swfupload.getStats().files_queued == 0){
				EU.toastWarn("请添加上传文件!");return ;
			}
			me.upcfg.isindex = me.bts[3].getValue() ;
			me.swfupload.setPostParams(me.upcfg); 
			this.swfupload.uploadStopped = false;
			this.swfupload.startUpload();
			this.setBtnsDisabled(true);
		}
	},
	
	/**
	 * 清空
	 */
	clear : function () {
		this.getStore().removeAll();
	}
});


/**
  1、uploadUrl为后台处理文件，和一般上传的处理端一样，只是后台接收文件参数由filePostName决定，这里特别的说说postParams这个参数，该参数直接加到地址上传递，包括使用addFileParam（）增加的参数也一样，后台接收采用Request.QueryString[""]形式。
  2、swfupload.swf和swfupload.js的版本请使用同一版本，因为本人之前使用了czpae86实例中的swfupload.js文件，发现及及报错。
  3、后台上传成功或失败返回格式如下： Response.Write("{success:true,msg:'文档上传成功！'}")，swfupload只识别success:true或者false。
  4、本后台上传文件后将文件信息保存至数据库，其中加入PDF,SWF字段标识是否已转为该格式文档，方便后台的文档转换服务程序访问。
 */


/**
this.setting = {  
    upload_url : this.uploadUrl,   
    flash_url : this.flashUrl,  
    file_size_limit : this.fileSize || (1024*50) ,//上传文件体积上限，单位MB  
    file_post_name : this.filePostName,  
    file_types : this.fileTypes||"*.*",  //允许上传的文件类型   
    file_types_description : "All Files",  //文件类型描述  
    file_upload_limit : "0",  //限定用户一次性最多上传多少个文件，在上传过程中，该数字会累加，如果设置为“0”，则表示没有限制   
    //file_queue_limit : "10",//上传队列数量限制，该项通常不需设置，会根据file_upload_limit自动赋值                
    post_params : this.postParams||{Detail:'ok'} ,  
    use_query_string : true,  
    debug : false,  
    button_cursor : SWFUpload.CURSOR.HAND,  
    button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,  
    custom_settings : {//自定义参数  
        scope_handler : this  
    },  
    file_queued_handler : this.onFileQueued,  
    swfupload_loaded_handler : function(){},// 当Flash控件成功加载后触发的事件处理函数  
    file_dialog_start_handler : function(){},// 当文件选取对话框弹出前出发的事件处理函数  
    file_dialog_complete_handler : this.onDiaogComplete,//当文件选取对话框关闭后触发的事件处理  
    upload_start_handler : this.onUploadStart,// 开始上传文件前触发的事件处理函数  
    upload_success_handler : this.onUploadSuccess,// 文件上传成功后触发的事件处理函数   
    swfupload_loaded_handler : function(){},// 当Flash控件成功加载后触发的事件处理函数    
    upload_progress_handler : this.uploadProgress,  
    upload_complete_handler : this.onUploadComplete,  
    upload_error_handler : this.onUploadError,  
    file_queue_error_handler : this.onFileError  
};   
 */