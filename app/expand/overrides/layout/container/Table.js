Ext.define('expand.overrides.layout.container.Table', {
    override :'Ext.layout.container.Table',
    
    getRenderTree: function() {
        var me = this,
            items = me.getLayoutItems(),
            rows = [],
            result = Ext.apply({
                tag: 'table',
                id: me.owner.id + '-table',
                "data-ref": 'table',
                role: 'presentation',
                cls: me.tableCls,
                cellspacing: 0,
                cellpadding: 0,
                cn: {
                    tag: 'tbody',
                    id: me.owner.id + '-tbody',
                    "data-ref": 'tbody',
                    role: 'presentation',
                    cn: rows
                }
            }, me.tableAttrs),
            tdAttrs = me.tdAttrs,
            i, len = items.length, item, curCell, tr, rowIdx, cellIdx, cell, cells;

        // Calculate the correct cell structure for the current items
        cells = me.calculateCells(items);

        for (i = 0; i < len; i++) {
            item = items[i];
            
            curCell = cells[i];
            rowIdx = curCell.rowIdx;
            cellIdx = curCell.cellIdx;

            // If no row present, create and insert one
            tr = rows[rowIdx];
            if (!tr) {
                tr = rows[rowIdx] = {
                    tag: 'tr',
                    role: 'presentation',
                    cn: []
                };
                if (me.trAttrs) {
                    Ext.apply(tr, me.trAttrs);
                }
            }

            // If no cell present, create and insert one
            cell = tr.cn[cellIdx] = {
                tag: 'td',
                style:{},
                role: 'presentation'
            };
            if (tdAttrs) {
            	if((tdAttrs.style && Ext.isArray(tdAttrs.style.width)) || Ext.isArray(me.tdWidths)){
            		if(!me.tdWidths){
            			me.tdStyle = Ext.clone(tdAttrs.style);
            			me.tdWidths = Ext.clone(me.tdStyle.width);
            			delete tdAttrs.style;
            		}
            		Ext.apply(cell.style,tdAttrs,Ext.clone(me.tdStyle));
            		if(i<me.tdWidths.length){
            			cell.style.width = me.tdWidths[i];
            		}
            	}else{
            		Ext.apply(cell,tdAttrs);
            	}
            }
            Ext.apply(cell, {
                colSpan: item.colspan || 1,
                rowSpan: item.rowspan || 1,
                cls: me.cellCls + ' ' + (item.cellCls || '')
            });
            Ext.apply(cell.style,item.cellStyle);
            me.configureItem(item);
            // The DomHelper config of the item is the cell's sole child
            cell.cn = item.getRenderTree();
        }
        delete me.tdWidths;
        return result;
    }
});