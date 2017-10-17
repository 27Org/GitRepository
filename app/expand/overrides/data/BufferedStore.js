Ext.define('expand.overrides.data.BufferedStore', {
    override :'Ext.data.BufferedStore',
    
    prefetchRange: function(start, end) {
        var me = this,
            startPage, endPage, page,
            data = me.getData();
        if (!me.rangeCached(start, end)) {
            startPage = me.getPageFromRecordIndex(start);
            endPage = me.getPageFromRecordIndex(end);
            data.setMaxSize(me.calculatePageCacheSize(end - start + 1));
            for (page = startPage; page <= endPage; page++) {
                if (!me.pageCached(page) || page == endPage) {
                    me.prefetchPage(page);
                }
            }
        }
    }
});