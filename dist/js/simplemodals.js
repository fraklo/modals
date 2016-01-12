;(function() {
  "use strict";
  window.SimpleModal = function(opts) {
    var activeModal = false,
        defaults = {
          activeClass: 'active',
          closeTrigger: 'js_modal_close',
          dataClass: 'js_modal_data',
          dataKey: 'html',
          dataTarget: 'target',
          loadingClass: 'loading',
          modalTrigger: 'js_modal_open',
          shadeClass: 'modal-shade',
          shadeTrigger: 'js_modal_shade'
        },
        options;

    if(opts && typeof opts === "object") {
      options = extendOptions(defaults, opts);
    } else {
      options = defaults;
    }


    // Private Methods
    function extendOptions(source, properties) {
      var property;
      for(property in properties) {
        if(properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    }


    function handlePromise(promise, modal) {
      var dataContainer = modal.getElementsByClassName(options.dataClass);
      if(typeof promise === 'object') {
        promise.then(function(data) {
          if(typeof data !== 'object') {
            data = JSON.parse(data);
          }
          dataContainer[0].innerHTML = data[options.dataKey];
          modal.className = modal.className.replace(options.loadingClass, '') +
                            " " + options.activeClass
          activeModal = modal;
        }, function(error) {
          dataContainer[0].innerHTML = error.status+" "+error.statusText;
          modal.className = modal.className.replace(options.loadingClass, '') +
                            " " + options.activeClass
          activeModal = modal;
        });
      }
    }


    function init() {
      var closeTriggers,
          i,
          modalTriggers;
      closeTriggers = document.getElementsByClassName(options.closeTrigger);
      modalTriggers = document.getElementsByClassName(options.modalTrigger);
      for(i = 0; i < modalTriggers.length; i++) {
        modalTriggers[i].addEventListener('click', function() {
          modalOpen(this.getAttribute('data-'+options.dataTarget));
        });
      }
      for(i = 0; i < closeTriggers.length; i++) {
        closeTriggers[i].addEventListener('click', function() {
          modalClose();
        });
      }

      shadeInsert();
    }


    function modalClose() {
      var newClass;
      if(activeModal) {
        newClass = activeModal.className.replace(options.loadingClass, '')
                      .replace(options.activeClass, '')
        activeModal.className = newClass;
        activeModal = false;
      }
      shadeHide();
    }


    function modalOpen(modal, promise) {
      var modals = document.getElementsByClassName(modal);
      if(shadeIsVisible()) {
        if(activeModal) {
          toggleActive(activeModal, false);
        }
      } else {
        shadeShow();
      }
      if(modals.length > 0) {
        modals = modals[0];
        if(promise) {
          modals.className = modals.className+" "+options.loadingClass;
          handlePromise(promise, modals);
        } else {
          toggleActive(modals, true);
          activeModal = modals;
        }
      }
    }


    function shadeHide() {
      var shade = document.getElementsByClassName(options.shadeTrigger);
      if(shade.length > 0) {
        toggleActive(shade[0]);
      }
    }


    function shadeInsert() {
      var shade = document.getElementsByClassName(options.shadeTrigger);
      if(shade.length === 0) {
        shade = document.createElement("div");
        shade.className = options.shadeTrigger+" "+options.shadeClass;
        document.body.appendChild(shade);
        shade.addEventListener('click', function() {
          modalClose();
        });
      }
    }


    function shadeIsVisible() {
      var result = false,
          shade = document.getElementsByClassName(options.shadeTrigger);
      if(shade.length > 0 &&
          shade[0].className.indexOf(options.activeClass) > -1) {
        result = true;
      }

      return result;
    }


    function shadeShow() {
      var shade = document.getElementsByClassName(options.shadeTrigger);
      if(shade.length > 0) {
        toggleActive(shade[0], true);
      }
    }


    function toggleActive(el, addClass) {
      var newClass;
      if(addClass) {
        newClass = el.className+" "+options.activeClass;
      } else {
        newClass = el.className.replace(options.activeClass, '');
      }
      el.className = newClass;
    }


    // Hooks for Public Methods
    this.modal__close = function() {
      modalClose();
    }

    this.modal__open = function(modal, promise) {
      modalOpen(modal, promise);
    }

    // Start the show
    init(options);
  }

  // Public Methods
  SimpleModal.prototype.close = function() {
    this.modal__close();
  }


  SimpleModal.prototype.open = function(modal, promise) {
    modal = modal.toString();
    this.modal__open(modal, promise);
  }

}());
