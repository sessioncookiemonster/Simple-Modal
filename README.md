# Simple Modal
Simple JS modal, no dependencies, compatible with legacy browsers.

### Basic usage:
Here is an example of a basic usage of this class:
```
var mod = new TinyModal('someId');
mod.createModal('content','color:red');
document.getElementById('openModalBtn').addEventListener('click',function(){
    mod.openModal();
});
```
Varibles and Methods available in a TinyModal class instance:
```
var mod = new TinyModal((string)id,(bool)forceOpen,(bool)clickable_overlay);
    (string) id - used to identify the element wwithin the DOM if needed(applied as a class to the wrapper element of the modal content)
    (bool) forceOpen (default:false) - set to true to disallow the closing "X" icon and the modal overlay from closing the modal (also removes the closing "X")
    (bool) clickable_overlay (default:false) - set to true to allow clicking on the overlay without closing the modal
    
mod.createModal((string OR DomElement)content,(string)extraCss);

mod.openModal():

mod.closeModal();

mod.removeModal();


mod.isOpen(bool) - stores the opening status of the modal

mod.mainElement(DomElement or null) - stores the root DOM element of the modal
```

