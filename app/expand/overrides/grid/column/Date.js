Ext.define('expand.overrides.grid.column.Date', {
    override :'Ext.grid.column.Date',
    
    defaultRenderer: function(value){
    	if(Ext.isNumber(value)){
    		return Ext.util.Format.date(new Date(parseInt(value)),this.format);
    	}
        return Ext.util.Format.date(value, this.format);
    }
});