var Modal = function(id,forceOpen,clickable_overlay){
    if (forceOpen === undefined) forceOpen = false;
    if (clickable_overlay === undefined) clickable_overlay = false;
    this.id = id;
    this.element =null;
    this.mainElement = null;
    this.isOpen = false;
    this.forceOpen = forceOpen;
    this.clickable_overlay = clickable_overlay;
};

Modal.prototype ={
    createModal: function(content,extraCss){
        if(extraCss === undefined) extraCss = '';
        //Overlay element css #modalOverlay
        //Body to recieve .modal-active when active. Content inside .modalContent
        var _this = this;
        var modal = document.createElement('div');
        modal.setAttribute('id','modalOverlay');
       // modal.style.cssText += extraCss;
        var contentWrapper= document.createElement('div');
        contentWrapper.classList.add('modalContent');
        contentWrapper.classList.add(this.id);
        if (!this.forceOpen) {
            var closingX = document.createElement('img');
            closingX.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0QkYxODJCQUI2NDExRTg5NzFDOTJFNkE4RDcwMkNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0QkYxODJDQUI2NDExRTg5NzFDOTJFNkE4RDcwMkNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzRCRjE4MjlBQjY0MTFFODk3MUM5MkU2QThENzAyQ0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzRCRjE4MkFBQjY0MTFFODk3MUM5MkU2QThENzAyQ0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7FKelYAAAA70lEQVR42rzWOw6DMAwGYMLC1gvAKZB6qUyMuRMX6GE69gCoYxc3aU0bhTzsOMLSPxCQPwWEFQUA3VnVB9eDzdKo94L9/uV2hhlsNviW8dZrYrDPhn0/6zEIhKAJ+vzA/YHR5g7HMkIIsO/oYy6TEExBU/gapWARimE1IAlKYRyQDOUwCsiCSlgOvHEhCpYDWRAVK4EkyKUnzrmHzZq4t+L9cgl+WPaPXwu9asDaEXStmTSSEcQebZ1wBLFA0azjglKIBbaAyOD+4CyESuAc7kwLoRSoU99MC6EQ1P66ihxSLzbPBufGQx915on4LcAAim/OXHCq4hcAAAAASUVORK5CYII=');
            closingX.setAttribute('alt','X');
            closingX.classList.add('closebutton');
            closingX.addEventListener('click',closebyx = function(){_this.closeModal()});
            contentWrapper.appendChild(closingX);
        } else {
            //Do nothing
        }
        contentWrapper.style.cssText += extraCss;
        modal.appendChild(contentWrapper);
        if(content){
            contentWrapper.appendChild(content);
        }
        this.element = contentWrapper;
        this.mainElement = modal;
        document.body.appendChild(modal);
        for(var el of modal.getElementsByTagName("*")){
            el.classList.add('insideModal');
        };
    },
    removeModal: function(){
        if(this.isOpen){
            this.closeModal();
        }
        this.mainElement.remove();
        this.element = this.mainElement = this.id = null;
        this.isOpen = false;
    },
    openModal : function(){
        var _this = this;
        _this.toggleTabs();
        _this.toggleScrollLock();
        document.body.classList.add('modal-active');
        this.isOpen = true;
        if (!this.forceOpen) {
            if(!this.clickable_overlay){
                this.mainElement.addEventListener('click',closethat = function(){_this.closeModal()},false);
            }
            this.element.addEventListener('click',stopProp = function(e){e.stopPropagation()});
            document.addEventListener("keydown",closeme = function(e){
                if(e.which==27 && _this.isOpen){
                    _this.closeModal();
                }
            });
        }else {
            //do nothing
        }
    },
    closeModal : function(){
        this.toggleTabs();
        this.toggleScrollLock();
        document.body.classList.remove('modal-active');
        if(!this.clickable_overlay) {
            this.mainElement.removeEventListener('click', closethat);
        }
        this.element.removeEventListener('click',stopProp);
        document.removeEventListener("keydown",closeme);
        this.isOpen = false;
    },
    tabsInModal: function(){
        //there has to be a better way but this works for now
        document.querySelectorAll('body *:not(.insideModal)').forEach(function(el){
            (el.getAttribute('tabindex') && el.getAttribute('tabindex')!=-1) ? el.setAttribute('tabindex_old',el.getAttribute('tabindex')) :  el.setAttribute('tabindex_old','none');
            el.setAttribute('tabindex','-1')
        });
        for(var el of this.element.getElementsByTagName("*")){
            if (el.tabIndex >= 0){
                el.focus();
                break;
            }
        }
    },
    tabsInPage:function(){
        document.querySelectorAll('body *:not(.insideModal)').forEach(function(el){
            (el.getAttribute('tabindex_old')=='none') ? el.removeAttribute('tabindex') : el.setAttribute('tabindex',el.getAttribute('tabindex_old'));
            el.removeAttribute('tabindex_old');

        });
    },
    toggleTabs:function(){
        if(this.isOpen){
            this.tabsInPage();
        }
        else{
            this.tabsInModal();
        }
    },
    toggleScrollLock:function(){
        if(this.isOpen){
            document.querySelector("html").style.overflow = "";
            document.querySelector("html").style.position = "";
        }
        else{
            document.querySelector("html").style.overflow = "hidden";
            document.querySelector("html").style.position = "fixed";
        }
    }

};