Ext.define('expand.overrides.grid.column.Action', {
    override :'Ext.grid.column.Action',
    
    defaultRenderer: function(v, cellValues, record, rowIdx, colIdx, store, view) {
        var me = this,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i, item, ret, disabled, tooltip, altText, icon,handler;
        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';
        
        cellValues.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
        
        for (i = 0; i < len; i++) {
            item = items[i];
            icon = item.icon;
			handler = item.handler;
            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
            altText = item.getAltText ? item.getAltText.apply(item.scope || scope, arguments) : item.altText || me.altText;
            if (!item.hasActionConfiguration) {
                item.stopSelection = me.stopSelection;
                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
                item.hasActionConfiguration = true;
            }
            if(Ext.isFunction(item.renderer)){
            	ret += '<div tabIndex="0" role="button"  class="'+Ext.baseCSSPrefix + 'grid-cell-inner-action-col ' + 
            		Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' +
	                (disabled ? me.disabledCls + ' ' : ' ') +
	                (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : ' ') + '" ' +
	                (tooltip ? ' data-qtip="' + tooltip + '"' : '') + 
	                'style="cursor:pointer;font-size: 13px;padding: 7px 4px 7px 4px; '+
	                (item.style ? item.style + '"' : '"') +
	                '>'+item.renderer.apply(item.scope || scope, arguments)+'</div>';
            }else{
	            ret += '<' + (icon ? 'img' : 'div') + ' tabIndex="0" role="button"' + (icon ? (' alt="' + altText + '" src="' + item.icon + '"') : '') +
	                ' class="' + me.actionIconCls + ' ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' +
	                (disabled ? me.disabledCls + ' ' : ' ') +
	                (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
	                (tooltip ? ' data-qtip="' + tooltip + '"' : '') + 
	                (handler? '': ' style="cursor:default;" ')+
	                (icon ? '/>' : '></div>');
            }
        }
        return ret;
    }
});