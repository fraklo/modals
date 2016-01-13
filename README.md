# simplemodals.js

> Eezy peezy modals

A simple js drop-in for basic modals. In plain JS. 

## Basic Setup

Include the script and css located on the `dist` folder

```html
<script src="dist/js/simplemodals.min.js"></script>
<link href="dist/css/simplemodals.min.css" rel="stylesheet">
```

Add class and data-target to element(s) that you want as modal triggers
```html
<!-- Triggers -->
<button class="js_modal_open" data-target="js_some_modal">Some Button</button>
<div class="js_modal_open" data-target="js_another_modal">Some Div</div>
```

Add class to element that will serve as modal that matches the data-target attribute from the trigger
```html
<!-- Targets -->
<div class="modal js_some_modal">
  <div class="modal-wrapper">
    <div class="modal-body">
      Modal Contents
    </div>
  </div>
</div>
<div class="modal js_another_modal">
  <div class="modal-wrapper">
    <div class="modal-body">
      More Modal Contents
    </div>
  </div>
</div>
```

Instantiate the modals
```js
new SimpleModals();
```

## A little more complex

If you want to trigger modals programatically, you can. To do so, let's assume this modal:
```html
<div class="modal js_trigger_happy">
  <div class="modal-wrapper">
    <div class="modal-body">
      I was triggered to do this.
    </div>
  </div>
</div>
```
Now, we just need to pass the target class along to the open method, like so:
```js
var modals = new SimpleModals();
// lengthy events, calculations and animations...
modals.open('js_trigger_happy');
```

That's it. And now you want to close it programatically as well.

```js
var modals = new SimpleModals();
// lengthy events, calculations and animations...
// and open modal
modals.open('js_trigger_happy');

// more stuffs that do neat things...
// now close modal
modals.close();
```

Peezy.

Now, what if you want your modal contents to be ajaxed in? I'm going to make you make a promise.

In that case we'll need some html that is something like this:
```html
<div class="modal js_modal_data">
  <div class="modal-wrapper">
    <div class="modal-header">
      Look at that.
    </div>
    <div class="modal-body">
      <div class="js_modal_data"></div>
    </div>
    <div class="modal-footer">
      <button class="js_modal_close">Close</button>
    </div>
  </div>
</div>
```
The only relevant addition there is the js_modal_data class. That is the element that simplemodals will target and inject with the data.

Once you have your target modal, you can hand the open function a promise along with the target class:
```js
// Promise can be a standard JS Promise like
var promise = new Promise(function(resolve, reject){ /* to the internets and beyond! */ }),
// Or a jQuery promise such as that returned by $.getJSON
    promise = $.getJSON('http://totespromise.com');

// Promise results in JSON
/*
{
  "html": "Special delivery data"
}
*/

modals.open('js_modal_data', promise);
```

## Options
You can change the trigger/style classes that simplemodals will look for and set. Here are the options and the defaults:
```js
// Class applied to active modal
activeClass: 'active',

// Class to trigger modal close
closeTrigger: 'js_modal_close',

// Class to inject AJAX Promise data into
dataClass: 'js_modal_data',

// JSON key to pull data from Promise result
dataKey: 'html',

// This value will be prepended with data-, by default this is data-target
// This is the attribute that simplemodals looks for to get the target of the modal
dataTarget: 'target',

// Class applied to modal when fetching Promise data
loadingClass: 'loading',

// Class to trigger open modal
modalTrigger: 'js_modal_open',

// Class used to create modal background shade
shadeClass: 'modal-shade',

// Class used to trigger modal close on shade click
shadeTrigger: 'js_modal_shade'
```


