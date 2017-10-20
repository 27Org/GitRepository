Ext.util.Format.date = function(v, format){
    if (!v) {
        return "";
    }
    if (!Ext.isDate(v)) {
    	if(v.indexOf("T")>0){
        	v = new Date(Date.parse(v));
    	}else{
    		v = new Date(v.replace(/-/g,"/"));
    	}
    }
    return Ext.Date.dateFormat(v, format || Ext.Date.defaultFormat);
}


Ext.define("Ext.locale.zh_CN.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "读取中..."
});

Math.ln = function(v){
	return Math.log(v)/Math.log(Math.E);
};


Ext.util.Format.dateformatter = {  
    patterns:{  
        YEAR      : /yy/g,  
        MONTH     : /mm/g,  
        DAY       : /dd/g,  
        HOUR      : /HH/g,  
        MINUTE    : /ii/g,  
        SECOND    : /ss/g
    },  
    formatPatterns : function(format){  
        return eval("/^"+  
                 format
                .replace(/\//g,'\\/')
                .replace(this.patterns.YEAR,'(\\d{4})')  
                .replace(this.patterns.MONTH,'(0\\d{1}|1[0-2])')  
                .replace(this.patterns.DAY,'(0\\d{1}|[12]\\d{1}|3[01])')  
                .replace(this.patterns.HOUR,'(([01]?[0-9])|(2[0-3]))')  
                .replace(this.patterns.MINUTE,'[0-5]?[0-9]')  
                .replace(this.patterns.SECOND,'[0-5]?[0-9]')  
                + "$/");  
    },  
    validate : function(value,format){
        if(Ext.isEmpty(value) || Ext.isEmpty(format))return false;  
        var formatReg = this.formatPatterns(format);
        return formatReg.test(value);  
    }  
}  

/**自定义验证**/
Ext.apply(Ext.form.VTypes, {
    date : function(val, field) {
    	var d = Ext.util.Format.dateformatter.validate(val,field.format);
    	if(d==false){
    		this.dateText = "无效的日期 - 必须符合格式："+ field.format;
    	}
        return d;
    }
});  