Ext.Tips = function(){
    var msgCt;

    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }

    function createToolTip(class, message, title, closable){
        return ['<div class="tooltip-wrapper">',
            '<img src="/img/tooltip/', class, '.png" alt="', class, '" height="48" width="48" />',
            '<div class="tooltip ', class, '">',
            (title ? '<em>' + title + '</em>' : ''),
            message,
            '</div>',
            (closable ? getCloseButton() : ''),
            '</div>'].join('');
    }

    function getCloseButton(){
        return ['<a href="#" id="tooltip-close" onclick="Ext.Tips.removeAllTips();" class="close-img">',
            '<img src="/ext/resources/images/default/qtip/close.gif" ',
            'width="15px" height="15px" ',
            'alt="Close" ',
            ' />'].join('');
    }

    return {
        /**
         * show some nice information tooltip
         * @param string title
         * @param string format
         */
        msg : function(title, format){
            Ext.Tips.removeAllTips();
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(2).ghost("t", {remove:true});
        },

        /**
         * show one of the sexy tooltips
         * @param class
         * @param message
         * @param title
         */
        tooltip: function(class, message, title){
            Ext.Tips.removeAllTips();
            var m = Ext.DomHelper.insertHtml('afterBegin', document.body, createToolTip(class, message, title));
            Ext.get(m).slideIn('t').pause(2).ghost("t", {remove:true});
        },

        /**
         * show one of the sexy tooltips with close button
         * @param class
         * @param message
         * @param title
         */
        popup: function(class, message, title){
            Ext.Tips.removeAllTips();
            var m = Ext.DomHelper.insertHtml('afterBegin', document.body, createToolTip(class, message, title, true));
            m = Ext.get(m);
            m.slideIn('t').pause(20).ghost("t", {remove:true});
        },

        /**
         * show "critical" sexy tooltip with form error messages
         * @param form
         * @param messages
         */
        formErrors: function(form, messages){
            if(!messages){
                messages = [];
                if(form.getForm().isValid()){
                    return;
                }
                var items = form.getForm().items.items;
                for(var i = 0; i < items.length; i++){
                    if(!items[i].isValid()){
                        messages.push({ id: items[i].getName(), msg: items[i].getActiveError() });
                    }
                }
            }
            if(!messages){
                return;
            }

            var text_message = '<div>' + Translator._('Form can not be submitted!') + '</div>'
                    + '<a href="#" onclick="Ext.get(\'tooltip-invalid-fields\').slideIn(\'t\'); Ext.get(this).remove();"'
                         + ' class="tooltip-details">'
                    + Translator._('Details')
                    + '</a>'
                    + '<div id="tooltip-invalid-fields">';

            for(var i = 0; i < messages.length; i++){
                if(messages[i].id){
                    var field_name = form.getForm().findField(messages[i].id);
                    if(field_name){
                        field_name = field_name.initialConfig.fieldLabel + ': ';
                    } else {
                        field_name = '';
                    }
                } else {
                    field_name = '';
                }

                text_message += '<span>' + field_name + '</span>' + messages[i].msg + '<br/>';
            }
            text_message += '</div>';
            Ext.Tips.popup('critical', text_message);
        },

        /**
         * remove all tooltips
         */
        removeAllTips: function(){
            Ext.select('.tooltip-wrapper, .msg').remove();
        },

        /**
         * sexy tooltip types
         */
        CRITICAL: 'critical',
        WARNING: 'warning',
        INFO: 'info',
        HELP: 'help'
    };
}();
