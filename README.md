# Simple-Modal
Simple JS modal, no dependencies, compatible with legacy browsers.

### Basic usage:
Here is an example of a basic usage of this class:
```
var mod = new Modal('someId');		//Parameters : id(used in dom) - string , closingX - bool, whether the closing "X" exists - default false , clickable overlay - bool, whether it can be closed by clicking on the overlay - default false

mod.createModal('content','color:red');  //Parameters : content - string or DOM element, extraCss - string

//Relevant methods:
mod.openModal();
mod.closeModal();
mod.removeModal();
```

