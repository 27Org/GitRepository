Ext.define('expand.overrides.form.action.Action', {
    override :'Ext.form.action.Action',
    
    createCallback: function() {
        var me = this;

        return {
        	callback : me.callback,
            success: me.onSuccess,
            failure: me.onFailure,
            scope: me,
            timeout: (me.timeout || me.form.timeout) * 1000
        };
    }
});
