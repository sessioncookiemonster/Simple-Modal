//forEach polyfill
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach (callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var array = this;
        thisArg = thisArg || this;
        for (var i = 0, l = array.length; i !== l; ++i) {
            callback.call(thisArg, array[i], i, array);
        }
    };
}

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
        //Main modal element to recieve .modal-active when active. Content inside .modalContent
        var _this = this;
        var modal = document.createElement('div');
        modal.setAttribute('id','modalOverlay');
        var contentWrapper= document.createElement('div');
        contentWrapper.classList.add('modalContent');
        contentWrapper.classList.add(this.id);
        if (!this.forceOpen) {      //Create closing X
            var closingX =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
            closingX.setAttribute('viewBox','0 0 460.775 460.775');
            var innerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            innerPath.setAttribute('d',"M285.08 230.397L456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 00-21.985 0l-171.138 171.14L59.25 4.565a15.551 15.551 0 00-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0021.986 0l171.117-171.12 171.118 171.12a15.551 15.551 0 0021.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986L285.08 230.397z");
            closingX.setAttribute('alt','X');
            closingX.appendChild(innerPath);
            closingX.classList.add('closebutton');
            closingX.addEventListener('click',closebyx = function(){_this.closeModal()});
            contentWrapper.appendChild(closingX);
        }
        contentWrapper.style.cssText += extraCss;
        modal.appendChild(contentWrapper);
        if(content){
            if(typeof(content) === 'string')
                contentWrapper.appendChild(document.createTextNode(content));

            if(typeof(content)==='object')
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
        this.mainElement.classList.add('modal-active');
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
        this.mainElement.classList.remove('modal-active');
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
            document.querySelector("html").style.width = "100%";
        }
    }

};