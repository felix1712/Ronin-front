'use strict';

var accordion = function accordion() {
  var $component;
  $component = document.querySelectorAll('.c-accordion');
  Array.prototype.forEach.call($component, function (el, i) {
    accordionParent(el);
    accordionAction(el);
    accordionWithCheckbox(el);
  });
};

var accordionParent = function accordionParent($this) {
  var $panel, $panelBody, $panelIcon;
  $panel = $this.querySelectorAll('.c-accordion__panel');
  Array.prototype.forEach.call($panel, function (el, i) {
    $panelBody = el.querySelector('.c-accordion__body');
    $panelIcon = el.firstElementChild.querySelector('.c-accordion__icon');
    if ($panelBody) {
      $panelIcon.classList.remove('u-dn');
    } else {
      $panelIcon.classList.add('u-dn');
    }
  });
};

var accordionAction = function accordionAction($this) {
  var $panelWrapper, $panelBody, $panelMain, $panelSub, $panelTarget, $panelParent, $panelEdit;
  var $panel = $this.querySelectorAll('.c-accordion__panel');
  var $head = $this.querySelectorAll('.c-accordion__head');
  Array.prototype.forEach.call($head, function (el, i) {
    el.onclick = function (e) {
      $panelWrapper = e.target.closest('.c-accordion__panel');
      $panelEdit = $panelWrapper.querySelector('.c-accordion__action');
      $panelParent = $panelWrapper.parentNode;
      $panelTarget = e.currentTarget;
      if (hasClass($panelParent, 'c-accordion--multiple')) {
        accordionToggleActionOpenClose($panelWrapper);
      } else {
        if ($panelEdit) {
          accordionToggleAction($panelWrapper, $panelParent, $panelTarget, $panelEdit);
        } else {
          accordionToggleAction($panelWrapper, $panelParent, $panelTarget);
        }
      }
    };
  });
};

var accordionToggleActionOpenClose = function accordionToggleActionOpenClose($panelWrapper) {
  toggleClass($panelWrapper, 'is-open');
};

var accordionToggleAction = function accordionToggleAction($panelWrapper, $panelParent, $panelTarget, $panelEdit) {
  var $panelOpen, $panelSubOpen, $panelCurrentEdit;
  $panelOpen = $panelParent.querySelectorAll('.c-accordion__panel.is-open');
  $panelSubOpen = $panelWrapper.querySelectorAll('.c-accordion__panel.is-open');
  toggleClass($panelWrapper, 'is-open');
  accordionNestedStyle($panelWrapper);
  if ($panelEdit) {
    toggleClass($panelEdit, 'u-dn');
  }
  if (hasClass($panelTarget.parentElement.parentNode, 'c-accordion__table')) {
    Array.prototype.forEach.call($panelSubOpen, function (el, i) {
      removeClass(el, 'is-open');
    });
  } else {
    if ($panelOpen && !hasClass($panelParent, 'c-accordion__nested')) {
      Array.prototype.forEach.call($panelOpen, function (el, i) {
        if (el.parentElement.className != 'c-accordion__body') {
          removeClass(el, 'is-open');
          $panelCurrentEdit = el.querySelector('.c-accordion__action');
          if ($panelCurrentEdit) {
            addClass($panelCurrentEdit, 'u-dn');
          }
        }
      });
    }
  }
};

var accordionNestedStyle = function accordionNestedStyle($this) {
  var $panelBody, $panelAll, $panelFigure, $nestedWidth, $panelAva, $panelPadding, $value, $wrapper, $avatarPadding, $newValue, $leftColwidth, $avaTxt, $currentValue;
  // Only run in large screen
  $panelBody = $this.querySelector('.c-accordion__body');
  if ($panelBody) {
    $panelAll = $panelBody.children;
    if ($panelAll) {
      Array.prototype.forEach.call($panelAll, function (el, i) {
        $panelFigure = $this.querySelector('.c-avatar');
        if ($panelFigure) {
          $nestedWidth = $panelFigure.getBoundingClientRect().width + 5;
          $panelAva = el.querySelector('.c-avatar').parentNode;
          $panelPadding = $panelFigure.parentNode.style.paddingLeft;
          if ($panelPadding == '') {
            $value = $panelFigure.parentNode.style.paddingLeft + $nestedWidth + 'px';
            if (window.innerWidth > 992) {
              $panelAva.style.paddingLeft = $value;
            } else {
              $panelAva.style.paddingLeft = '10px';
            }
          } else {
            $value = parseInt($panelFigure.parentNode.style.paddingLeft) + $nestedWidth + 'px';
            if (window.innerWidth > 992) {
              $panelAva.style.paddingLeft = $value;
            } else {
              $panelAva.style.paddingLeft = parseInt($panelPadding) + 10 + 'px';
            }
          }
        }
      });
    }
  }
  accordionRemoveNested($this);
};

var accordionRemoveNested = function accordionRemoveNested(el) {
  if (el.closest('.c-accordion.is-show-all')) {
    var panelFigure = el.querySelectorAll('.c-avatar');
    Array.prototype.forEach.call(panelFigure, function (el, i) {
      el.parentElement.removeAttribute('style');
    });
  }
};

var accordionWithCheckbox = function accordionWithCheckbox(el) {
  var edit = el.querySelector('.jc-accordion-edit');
  var head = el.querySelectorAll('.c-accordion__head');
  if (edit) edit.onclick = function (e) {
    var $wrapper = this.closest('.c-accordion');
    var $titleTable = $wrapper.querySelectorAll('.ju-bulk-wc');
    toggleClass($wrapper, 'is-show-all');
    accordionAddingCheckbox(head);

    if (hasClass($wrapper, 'is-show-all')) {
      this.innerText = 'Batalkan Edit';
    } else {
      this.innerText = 'Edit';
      if (hasClass($wrapper, 'isBulk')) hideBulk(e);
    }
  };
};

function accordionAddingCheckbox(el) {
  Array.prototype.forEach.call(el, function (elm, i) {
    var title = elm.querySelector('.c-accordion__title');
    var bulk = elm.querySelector('.c-accordion__bulk');
    if (i == 0) {
      addClass(elm, 'is-show-bulk');
    }
  });
}

document.addEventListener("DOMContentLoaded", accordion);
"use strict";

// alert playground
var Alert = function Alert(state) {
  var alertSuccess = document.querySelectorAll("a.jl-success");
  var alertFailed = document.querySelectorAll("a.jl-failed");
  var alertSuccessBtn = document.querySelectorAll("button.jl-success");
  var alertFailedBtn = document.querySelectorAll("button.jl-failed");
  if (alertSuccess) {
    Array.prototype.forEach.call(alertSuccess, function (el, i) {
      el.addEventListener('click', function () {
        var showAlert = document.querySelector('.c-alert__wrapper.jl-success');
        showAlert.classList.add('is-show');
        setTimeout(function () {
          showAlert.classList.remove('is-show');
        }, 2500);
      });
    });
  }
  if (alertSuccessBtn) {
    Array.prototype.forEach.call(alertSuccessBtn, function (el, i) {
      el.addEventListener('click', function () {
        var showAlert = document.querySelector('.c-alert__wrapper.jl-success');
        showAlert.classList.add('is-show');
        setTimeout(function () {
          showAlert.classList.remove('is-show');
        }, 2500);
      });
    });
  }
  if (alertFailed) {
    Array.prototype.forEach.call(alertFailed, function (el, i) {
      el.addEventListener('click', function () {
        var showAlert = document.querySelector('.c-alert__wrapper.jl-failed');
        showAlert.classList.add('is-show');
        setTimeout(function () {
          showAlert.classList.remove('is-show');
        }, 2500);
      });
    });
  }
  if (alertFailedBtn) {
    Array.prototype.forEach.call(alertFailedBtn, function (el, i) {
      el.addEventListener('click', function () {
        var showAlert = document.querySelector('.c-alert__wrapper.jl-failed');
        showAlert.classList.add('is-show');
        setTimeout(function () {
          showAlert.classList.remove('is-show');
        }, 2500);
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", Alert);

var callAlert = function callAlert(state, alertClass) {
  var showAlert = document.querySelector(".c-alert__wrapper." + alertClass + "");
  if (state == "fade") {
    showAlert.classList.add('is-show');
    setTimeout(function () {
      showAlert.classList.remove('is-show');
    }, 2500);
  } else if (state == "show") {
    showAlert.classList.add('is-show');
  } else if (state == "hide") {
    showAlert.classList.remove('is-show');
  }
};
callAlert();
"use strict";

/* change text button type submit see components */
var changeButton = function changeButton() {
  var button = document.querySelectorAll('button[type="submit"]');
  if (button) {
    Array.prototype.forEach.call(button, function (el, i) {
      el.addEventListener("click", function () {
        if (!hasClass(this, "jc-pov-x")) {
          addClass(this, "is-loading");
        }
      });
    });
  }
};
document.addEventListener("DOMContentLoaded", changeButton);
'use strict';

var dateTimePicker = function dateTimePicker() {
  var elem = document.querySelectorAll('.c-calendar--default');
  Array.prototype.forEach.call(elem, function (el, i) {
    if (el) {
      $('.c-calendar--default').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false,
        locale: 'id',
        icons: {
          time: 'fa fa-time',
          date: 'fa fa-calendar',
          up: 'fa fa-angle-up',
          down: 'fa fa-angle-down',
          previous: 'fa fa-angle-left',
          next: 'fa fa-angle-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        }
      });
    }
  });

  var specialLeave = function specialLeave() {
    var wrapper, input, attDay, attPeriode;
    wrapper = document.getElementsByClassName("jp-timeoff-special");
    Array.prototype.forEach.call(wrapper, function (el, i) {
      el.addEventListener('change', function () {
        input = this.querySelectorAll(".c-select__item input");
        Array.prototype.forEach.call(input, function (el, i) {
          if (el.checked == true) {
            if (!!el.getAttribute('data-month') == true) {
              attPeriode = el.getAttribute('data-month');
              $(".jc-timeoff-special-start").on("dp.change", function (e) {
                resultDate = e.target.value;
                var periodeTimeoff = moment(resultDate).add(attPeriode, 'months').format('DD MMM YYYY');
                $(".jc-timeoff-special-end").val(periodeTimeoff);
                $(".jc-timeoff-special-end").attr("disabled", "");
              });
            } else {
              $(".jc-timeoff-special-start").on("dp.change", function (e) {
                resultDate = e.target.value;
                $(".jc-timeoff-special-end").val('');
                $(".jc-timeoff-special-end").removeAttr("disabled");
              });
            }
          }
        });
      });
      el.addEventListener('change', function () {
        input = this.querySelectorAll(".c-select__item input");
        Array.prototype.forEach.call(input, function (el, i) {
          if (el.checked == true) {
            if (!!el.getAttribute('data-month') == true) {
              attPeriode = el.getAttribute('data-month');
              var timeOffstart = document.getElementsByClassName('jc-timeoff-special-start');
              var timeOffend = document.getElementsByClassName('jc-timeoff-special-end');
              Array.prototype.forEach.call(timeOffstart, function (el, i) {
                var startDate = el.value;
                var periodeTimeoff = moment(startDate).add(attPeriode, 'months').format('DD MMM YYYY');
                if (startDate) {
                  Array.prototype.forEach.call(timeOffend, function (elm, i) {
                    elm.value = periodeTimeoff;
                    elm.setAttribute("disabled", "");
                  });
                }
              });
            } else {
              var timeOffend = document.getElementsByClassName('jc-timeoff-special-end');
              Array.prototype.forEach.call(timeOffend, function (elm, i) {
                elm.value = '';
                elm.removeAttribute('disabled');
              });
            }
          }
        });
      });
    });
  };
  specialLeave();
};
document.addEventListener("DOMContentLoaded", dateTimePicker);
"use strict";

//dropdown

var dropdown = function dropdown() {
  var trigger, wrapper, wrapperGlobal, setFix, leftPos, leftTrigger, leftContent;
  trigger = document.getElementsByClassName("ju-dropdown-t");
  Array.prototype.forEach.call(trigger, function (elm, i) {
    elm.onclick = function (e) {
      e.stopPropagation();
      wrapper = this.closest(".ju-dropdown-w");
      wrapperGlobal = this.closest(".ju-wrapper-g");
      if (wrapperGlobal) {
        setFix = wrapperGlobal.getAttribute("set-fix");
        if (setFix === "true") {
          addClass(wrapper.querySelector(".ju-dropdown-c"), "fixed");
        }
      }
      if (hasAttr(wrapper, "rel", "tab-dropdown")) {
        var dropdownContent = wrapper.querySelector(".ju-dropdown-c");
        removeClass(dropdownContent, "u-dn", function (elm) {
          leftTrigger = e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2;
          leftContent = e.currentTarget.closest(".ju-dropdown-w").querySelector(".ju-dropdown-c").offsetWidth;
          leftPos = leftTrigger - leftContent / 2;
          dropdownContent.style.left = leftPos + "px";
          dropdownContent.style.opacity = 1;
          addClass(dropdownContent, "u-dn");
        });
      }
      if (hasClass(wrapper, "is-active")) {
        removeClass(wrapper, "is-active");
        addClass(wrapper.querySelector(".ju-dropdown-c"), "u-dn");
        outsideClickListener("inactive");
      } else {
        closeAllDropdownActive();
        addClass(wrapper, "is-active");
        removeClass(wrapper.querySelector(".ju-dropdown-c"), "u-dn");
        outsideClickListener("active");
      }
      dropdownPosition(this);
    };
  });
};

var closeAllDropdownActive = function closeAllDropdownActive() {
  var $wrapperAll = document.getElementsByClassName("ju-dropdown-w");
  Array.prototype.forEach.call($wrapperAll, function (elm, i) {
    if (hasClass(elm, "is-active")) {
      removeClass(elm, "is-active");
      addClass(elm.querySelector(".ju-dropdown-c"), "u-dn");
    }
  });
};

var dropdownPosition = function dropdownPosition(trigger) {
  if (trigger.closest('.ju-wrapper-g') && trigger.closest('.is-active')) {
    var $dropdown, $positionDropdown, $positionTrigger, $positionOuter;
    var $left, $bottom, $wrapperGlobal, $setFix;
    $dropdown = trigger.closest('.is-active').querySelector('.ju-dropdown-c');
    $positionDropdown = $dropdown.getBoundingClientRect();
    $positionTrigger = trigger.getBoundingClientRect();
    $wrapperGlobal = trigger.closest('.ju-wrapper-g');
    $positionOuter = $wrapperGlobal.getBoundingClientRect();
    $setFix = $wrapperGlobal.getAttribute("set-fix");

    if ($setFix === "true") {
      $bottom = $positionTrigger.top + $positionTrigger.height;
      $left = $positionTrigger.right - 150;
      $dropdown.style.top = $bottom + 'px';
      $dropdown.style.left = $left + 'px';
    } else {
      $left = $positionTrigger.left - $positionDropdown.width - $positionTrigger.width - 20 < $positionOuter.left;
      $bottom = $positionTrigger.bottom + $positionDropdown.height + 20 > $positionOuter.bottom;
      if ($bottom && $left) {
        addClass($dropdown, 'top');
        addClass($dropdown, 'left');
      } else if ($bottom) {
        addClass($dropdown, 'top');
      } else if ($left) {
        addClass($dropdown, 'left');
      } else {
        removeClass($dropdown, 'top');
        removeClass($dropdown, 'left');
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", dropdown);
'use strict';

// All js for form

// textarea auto height
var jcTxtAutoheight = function jcTxtAutoheight() {
  var wrapper = document.querySelectorAll("textarea.c-auto-height");
  Array.prototype.forEach.call(wrapper, function (el, i) {
    el.addEventListener('keydown', autosizeTextarea);
  });
};

var autosizeTextarea = function autosizeTextarea() {
  var el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
};

document.addEventListener("DOMContentLoaded", jcTxtAutoheight);

// tab to move field
var juTabMoveField = function juTabMoveField() {
  var formWrapper;
  formWrapper = document.querySelectorAll("form");
  Array.prototype.forEach.call(formWrapper, function (el, i) {
    el.addEventListener('keydown', tabMoveField);
  });
};

var tabMoveField = function tabMoveField(el) {
  var srcElm, nextElmSibling, targetBlockElm, selectElm;
  if (el.code === "Tab") {
    srcElm = el.srcElement.closest(".p-setting__list");
    if (srcElm) {
      nextElmSibling = srcElm.nextElementSibling;
      if (hasClass(nextElmSibling, "p-setting__list") && nextElmSibling.querySelector(".c-form-group .c-select")) {
        el.preventDefault();
        selectElm = nextElmSibling.querySelector(".c-form-group .c-select .c-select__input");
        selectElm.click();
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", juTabMoveField);

// input with count
var jcInputLimit = function jcInputLimit() {
  var val, maxlength;
  var wrapper = document.querySelectorAll(".jc-inputlimit");
  if (wrapper) {
    Array.prototype.forEach.call(wrapper, function (el, i) {
      var trigger = el.querySelector('input');
      var triggerTextarea = el.querySelector('textarea');
      var count = el.querySelector('span');
      if (trigger) {
        val = trigger.value.length;
        maxlength = trigger.getAttribute('maxlength');
        count.innerHTML = maxlength - val;
        trigger.addEventListener('keyup', function () {
          val = this.value.length;
          count.innerHTML = maxlength - val;
        });
      }
      if (triggerTextarea) {
        val = triggerTextarea.value.length;
        maxlength = triggerTextarea.getAttribute('maxlength');
        count.innerHTML = maxlength - val;
        triggerTextarea.addEventListener('keyup', function () {
          val = this.value.length;
          count.innerHTML = maxlength - val;
        });
      }
    });
  }
};
document.addEventListener("DOMContentLoaded", jcInputLimit);

// input onlyNumber
var jcInputNumber = function jcInputNumber() {
  var inputNumber = document.getElementsByClassName("c-only-number");
  if (inputNumber) {
    Array.prototype.forEach.call(inputNumber, function (el, i) {
      el.addEventListener('keyup', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
      });
    });
  }
};
document.addEventListener("DOMContentLoaded", jcInputNumber);

// input currency
var jcInputCurrency = function jcInputCurrency() {
  var inputNumber = document.getElementsByClassName("c-only-currency");
  if (inputNumber) {
    Array.prototype.forEach.call(inputNumber, function (el, i) {
      el.addEventListener('keyup', function () {
        this.value = this.value.replace(/[^0-9]/g, '');

        // format input to currency
        var val = parseInt(this.value);
        if (!isNaN(val)) {
          var val = formatCurrency(val);
          this.value = val;
        }
      });
    });
  }
};
document.addEventListener("DOMContentLoaded", jcInputCurrency);

function formatCurrency(num) {
  var p = num.toFixed(0).split(".");
  return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
    return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
  }, "");
}

// input reset value
var resetValinput = function resetValinput() {
  // For reset text input
  var resetValinput = document.querySelectorAll('.with-reset-val input');
  Array.prototype.forEach.call(resetValinput, function (el, i) {
    el.addEventListener('keydown', function () {
      var currentVal = this.getAttribute('value');
      var resetClick = findSibling(this, "c-rest-val");
      resetClick.addEventListener('click', function () {
        var pasteVal = findSibling(this, "c-form-control");
        pasteVal.value = currentVal;
      });
    });
  });

  // For reset time input with select
  var select, inputVal, selectVal, close;
  select = document.querySelectorAll('.c-select--close');
  Array.prototype.forEach.call(select, function (el, i) {
    inputVal = el.querySelector('.c-select__input input').getAttribute('value');
    selectVal = el.querySelector('.c-select__input .c-select__value').innerHTML;
    close = el.querySelector('.c-select__close');

    close.addEventListener('click', function () {
      select = this.closest('.c-select--close');
      select.querySelector('.c-select__input input').value = "";
      select.querySelector('.c-select__value').innerHTML = "";
      select.querySelector('.c-select__menu .is-selected').classList.remove('is-selected');
    });
  });
};
document.addEventListener("DOMContentLoaded", resetValinput);

// input search
var jcInputSearch = function jcInputSearch() {
  var wrapper = document.querySelectorAll(".jc-input-search");
  if (wrapper) {
    Array.prototype.forEach.call(wrapper, function (el, i) {
      // check null
      if (el.value != null && el.value != '') {
        var reset = findSibling(el, 'with-icon--reset');
        removeClass(reset, 'u-dn');
      }

      el.addEventListener('keyup', function () {
        var currentVal = this.value;
        if (currentVal.length > 0) {
          removeClass(reset, 'u-dn');
        } else if (currentVal.length === 0) {
          addClass(reset, 'u-dn');
        }
      });

      var reset = findSibling(el, 'with-icon--reset');
      reset.addEventListener('click', function () {
        var resetEl = findSibling(this, 'jc-input-search');
        resetEl.value = '';
        resetEl.focus();
        addClass(this, 'u-dn');
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", jcInputSearch);

// to reset all checkbox using dropdown select
var jcCheckboxRemove = function jcCheckboxRemove() {
  var reset = document.querySelectorAll('.jc-checkbox-reset input');
  if (reset) {
    Array.prototype.forEach.call(reset, function (el, i) {
      el.addEventListener('click', function () {
        var wrapper = this.closest('.jc-checkbox-wrapper');
        var checkbox = wrapper.querySelectorAll('input.c-check__checkbox[type="checkbox"]');

        Array.prototype.forEach.call(checkbox, function (elm, i) {
          if (elm.checked == true) {
            elm.checked = false;
          };
        });
      });
    });
  };
};
document.addEventListener("DOMContentLoaded", jcCheckboxRemove);
'use strict';

/* ======================================================================================== */
/* ================================ helper function ======================================= */
/* ======================================================================================== */

/* showHide reusable function*/
var showHide = function showHide(el, value, callback) {
  el.style.display = value;
  if (callback) {
    callback();
  }
};

/* showHide toggle reusable function ruslan*/
var toggle = function toggle(el, value, callback) {
  var display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display;
  if (display == 'none') el.style.display = value;else el.style.display = 'none';
  if (callback) {
    callback();
  }
};

/* fadeIn - fadeOut reusable function ruslan*/
var fadeIn = function fadeIn(el, duration, callback) {
  el.style.opacity = 0;
  removeClass(el, "u-dn");
  var duration; /* This overrides variable passed to method */
  if (duration == null) {
    duration = 200;
  }
  var last = +new Date();
  var tick = function tick() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity < 1) {
      window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
    }
    if (callback) {
      callback();
    }
  };
  tick();
};

var fadeOut = function fadeOut(el, duration, callback) {
  el.style.opacity = 1;

  var duration; /* This overrides variable passed to method */
  if (duration == null) {
    duration = 150;
  }
  var last = +new Date();
  var tick = function tick() {
    el.style.opacity = +el.style.opacity - (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity > 0) {
      window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
    } else {
      addClass(el, "u-dn");
    }
  };
  tick();
  if (callback) {
    callback();
  }
};

var toggleFade = function toggleFade(el, callback) {
  if (hasClass(el, "u-dn")) {
    fadeIn(el);
  } else {
    fadeOut(el);
  }
  if (callback) {
    callback();
  }
};

/* slide Up - down reusable function ruslan*/
var slideDown = function slideDown(el, duration, callback) {
  var s = el.style;
  removeClass(el, "u-dn");
  s.display = 'block';
  var finalheight = el.offsetHeight;
  s.height = '0px';
  s.overflow = 'hidden';

  var y = 0;
  var framerate = 10;
  var one_second = 1;
  var interval = one_second * duration / framerate;
  var totalframes = one_second * duration / interval;
  var heightincrement = finalheight / totalframes;

  var tween = function tween() {
    y += heightincrement;
    s.height = y + 'px';
    if (y < finalheight) {
      setTimeout(tween, interval);
    } else {
      s.overflow = 'visible';
      s.height = 'auto';
    }
  };
  tween();
  if (callback) {
    callback();
  }
};

var slideUp = function slideUp(el, duration, callback) {
  var s = el.style;
  if (s.display != 'none') {
    var finalheight = el.offsetHeight;
    s.overflow = 'hidden';

    var y = finalheight;
    var framerate = 10;
    var one_second = 1;
    var interval = one_second * duration / framerate;
    var totalframes = one_second * duration / interval;
    var heightincrement = finalheight / totalframes;

    var tween = function tween() {
      y -= heightincrement;
      s.height = y + 'px';
      if (y > 0) {
        setTimeout(tween, interval);
      } else {
        s.height = finalheight + 'px';
        s.display = 'none';
        addClass(el, "u-dn");
      }
    };
    tween();
  }
  if (callback) {
    callback();
  }
};

var toggleSlide = function toggleSlide(el, duration, callback) {
  if (hasClass(el, "u-dn")) {
    slideDown(el, duration);
  } else {
    slideUp(el, duration);
  }
  if (callback) {
    callback();
  }
};

/* hasClass reusable function ruslan*/
var hasClass = function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
};

/* hasAttr reusable function ruslan*/
var hasAttr = function hasAttr(el, attrName, val) {
  var attrVal, toreturn;
  attrVal = el.getAttribute(attrName);
  if (val === null || val === undefined) {
    if (attrVal) {
      toreturn = true;
    } else {
      toreturn = false;
    }
  } else {
    if (attrVal === val) {
      toreturn = true;
    } else {
      toreturn = false;
    }
  }
  return toreturn;
};

/* find next sibling */
var getNextSiblings = function getNextSiblings(el, filter) {
  var siblings = [];
  while (el = el.nextSibling) {
    if (!filter || filter(el)) siblings.push(el);
  }
  return siblings;
};

/* findSibling reusable function ruslan*/
var findSibling = function findSibling(el, className) {
  var res;
  var listArr = Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
  Array.prototype.forEach.call(listArr, function (el, i) {
    if (hasClass(el, className)) {
      res = el;
    }
  });
  return res;
};

var findSiblingAll = function findSiblingAll(el, className) {
  var res = [];
  var listArr = Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
  Array.prototype.forEach.call(listArr, function (el, i) {
    if (hasClass(el, className)) {
      res.push(el);
    }
  });
  return res;
};

/* addClass reusable function ruslan*/
var addClass = function addClass(el, className, callback) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += ' ' + className;
  if (callback) {
    callback();
  }
};

/* removeClass reusable function ruslan*/
var removeClass = function removeClass(el, className, callback) {
  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  if (callback) {
    callback();
  }
};

/* toggleClass reusable function ruslan*/
var toggleClass = function toggleClass(el, className, callback) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);
    if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);
    el.className = classes.join(' ');
  }
  if (callback) {
    callback();
  }
};

/* getOffset element reusable function ruslan*/
var getOffset = function getOffset(el, callback) {
  var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  if (callback) {
    callback();
  }
};

/* stop Propagation reusable function ruslan*/
var stopPropClick = function stopPropClick(el, callback) {
  if (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  if (callback) {
    callback();
  }
};

var scrollTow = function scrollTow(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

var validateEmail = function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var getDateTime = function getDateTime() {
  var time = new Date();
  time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return time;
};
/* ======================================================================================== */
/* ================================ reusable function ======================================= */
/* ======================================================================================== */

/* Javascript Utilities for detect outside click listener */
var outsideClickListener = function outsideClickListener(state) {
  if (state === "active") {
    if (!hasClass(document.body, "listenerOn")) {
      addClass(document.body, "listenerOn");
      document.body.addEventListener("click", hideAllAbsoluteComponent);
      window.addEventListener("keydown", listenEscButton);
    }
  } else {
    document.body.removeEventListener("click", hideAllAbsoluteComponent);
    window.removeEventListener("keydown", listenEscButton);
    removeClass(document.body, "listenerOn");
  }
};

var scrollListener = function scrollListener(state) {
  var elmList,
      scrollable = ['.l-container', 'body', '.c-table__responsive'];
  // bug if table more than 1, body not detected.
  Array.prototype.forEach.call(scrollable, function (el, i) {
    if (el === "body") {
      elmList = document;
    } else {
      elmList = document.querySelector(el);
    }
    if (elmList) {
      if (state === "active") {
        elmList.addEventListener("scroll", hideAllContentPopover);
      } else {
        elmList.removeEventListener("scroll", hideAllContentPopover);
      }
    }
  });
};

var hideAllAbsoluteComponent = function hideAllAbsoluteComponent() {
  hideAllContentPopover("fade");
  closeAllOpenSelect();
  closeAllDropdownActive();
  outsideClickListener("inactive");
};

var listenEscButton = function listenEscButton(e) {
  if (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) {
    document.body.click();
  }
};

/* Javascript Utilities Toggle Show Hide Element ruslan*/
var toggleAnimate = function toggleAnimate(elm, toggleType) {
  if (toggleType == "fade") {
    toggleFade(elm);
  } else if (toggleType == "slide") {
    toggleSlide(elm, 150);
  } else {
    toggleClass(elm, "u-dn");
  }
};

/*  Toggle with wrapper, ruslan
    attribute on wrapper element(not required) :
      data-effect (fade, slide)
      data-nested : for nested wrapper
      data-triggertype : checkbox, radio, select, select-multitrig
*/
var juToggleW = function juToggleW() {
  var wrapper, trigger, content, toggleType, trigAction, radioName, thisVal, radioVal, nestedWrap, listen, selected, resetButton, subTriggerType;
  wrapper = document.querySelectorAll(".ju-toggle-w");
  Array.prototype.forEach.call(wrapper, function (el, i) {
    trigAction = el.getAttribute("data-triggertype");
    trigger = el.querySelector(".ju-toggle-wt");
    if (trigAction == "checkbox") {
      trigger.addEventListener("change", function () {
        wrapper = this.closest(".ju-toggle-w");
        nestedWrap = wrapper.getAttribute("data-nested");
        toggleType = wrapper.getAttribute("data-effect");
        subTriggerType = wrapper.getAttribute("data-subtriggertype");
        if (nestedWrap) {
          content = wrapper.querySelectorAll(".ju-toggle-wc-" + nestedWrap);
        } else {
          content = wrapper.querySelectorAll(".ju-toggle-wc");
        }
        if (subTriggerType) {
          if (subTriggerType == "disabled-select") {
            Array.prototype.forEach.call(content, function (elms, index) {
              toggleClass(elms, "is-disabled");
            });
          } else if (subTriggerType == "disabled-input") {
            Array.prototype.forEach.call(content, function (elms, index) {
              if (hasAttr(elms, "disabled")) {
                elms.removeAttribute("disabled");
              } else {
                elms.setAttribute("disabled", true);
              }
            });
          }
          customSelect();
        } else {
          Array.prototype.forEach.call(content, function (elm, idx) {
            toggleAnimate(elm, toggleType);
          });
        }
      });
    } else if (trigAction == "radio" || trigAction == "select") {
      radioName = trigger.getAttribute("name");
      trigger = el.querySelectorAll("input[name=" + radioName + "][type='radio']");
      Array.prototype.forEach.call(trigger, function (elm, idx) {
        elm.addEventListener("change", function () {
          wrapper = this.closest(".ju-toggle-w");
          nestedWrap = wrapper.getAttribute("data-nested");
          if (nestedWrap) {
            content = wrapper.querySelectorAll(".ju-toggle-wc-" + nestedWrap);
          } else {
            content = wrapper.querySelectorAll(".ju-toggle-wc");
          }
          radioVal = wrapper.querySelector(".ju-toggle-wt").getAttribute("value");
          toggleType = wrapper.getAttribute("data-effect");

          thisVal = this.getAttribute("value");
          if (thisVal == radioVal) {
            Array.prototype.forEach.call(content, function (elms, index) {
              if (toggleType == "fade") {
                fadeIn(elms);
              } else if (toggleType == "slide") {
                slideDown(elms, 150);
              } else {
                removeClass(elms, "u-dn");
              }
            });
          } else {
            Array.prototype.forEach.call(content, function (elms, index) {
              if (toggleType == "fade") {
                fadeOut(elms);
              } else if (toggleType == "slide") {
                slideUp(elms, 150);
              } else {
                addClass(elms, "u-dn");
              }
            });
          }
        });
      });
      if (trigAction == "select") {
        trigger = el.querySelector(".ju-toggle-wt");
        resetButton = trigger.closest(".c-select").querySelector(".c-select__reset");
        resetButton.addEventListener("click", function () {
          wrapper = this.closest(".ju-toggle-w");
          nestedWrap = wrapper.getAttribute("data-nested");
          if (nestedWrap) {
            content = wrapper.querySelectorAll(".ju-toggle-wc-" + nestedWrap);
          } else {
            content = wrapper.querySelectorAll(".ju-toggle-wc");
          }
          toggleType = wrapper.getAttribute("data-effect");
          Array.prototype.forEach.call(content, function (elms, index) {
            if (toggleType == "fade") {
              fadeOut(elms);
            } else if (toggleType == "slide") {
              slideUp(elms, 150);
            } else {
              addClass(elms, "u-dn");
            }
          });
        });
      }
    } else if (trigAction == "select-multitrig") {
      trigger = el.querySelectorAll(".ju-toggle-wt");
      Array.prototype.forEach.call(trigger, function (elt, idx) {
        if (hasAttr(elt, "type", "radio") || hasClass(elt, "type", "checkbox")) {
          listen = "change";
        } else {
          listen = "click";
        }
        elt.addEventListener(listen, function (e) {
          wrapper = this.closest(".ju-toggle-w");
          nestedWrap = wrapper.getAttribute("data-nested");
          toggleType = wrapper.getAttribute("data-effect");
          if (e.type == "click") {
            selected = wrapper.querySelector(".ju-toggle-wt[type='radio']");
            if (selected) {
              selected.closest(".c-select").querySelector(".c-select__reset").click();
            }
          }
          if (nestedWrap) {
            content = wrapper.querySelectorAll(".ju-toggle-wc-" + nestedWrap);
          } else {
            content = wrapper.querySelectorAll(".ju-toggle-wc");
          }
          Array.prototype.forEach.call(content, function (elm, idx) {
            toggleAnimate(elm, toggleType);
          });
        });
      });
    } else if (trigAction == "enabledisabled") {
      console.log("this type is not defined yet");
    } else {
      trigger.addEventListener("click", function (el) {
        wrapper = this.closest(".ju-toggle-w");
        nestedWrap = wrapper.getAttribute("data-nested");
        toggleType = wrapper.getAttribute("data-effect");
        if (nestedWrap) {
          content = wrapper.querySelectorAll(".ju-toggle-wc-" + nestedWrap);
        } else {
          content = wrapper.querySelectorAll(".ju-toggle-wc");
        }
        toggleClass(this, "is-active");
        Array.prototype.forEach.call(content, function (elm, idx) {
          toggleAnimate(elm, toggleType);
        });
      });
    }
  });
};
document.addEventListener("DOMContentLoaded", juToggleW);

/*  Toggle with link, ruslan
    attribute on trigger element (not required) :
      data-effect : fade, slide. (by default : no animation)
      data-triggertype : checkbox, radio, select. (by default : onclick)
    attribute on trigger element (required) :
      data-link
*/
var juToggleL = function juToggleL() {
  var trigger, content, toggleType, trigAction, contentLink, radioName, thisVal, radioVal, wrapperSelect, resetButton, selected, targetType, contentAttr, contentAttr2, val2, _this;
  var latestElChecked, latestTrigAction, latestContent, latestToggleType, subTriggerType, latestTrigAction2, latestContent2, latestToggleType2, subTriggerType2, contentLink2, content2, toggleType2;

  trigger = document.querySelectorAll(".ju-toggle-l");
  Array.prototype.forEach.call(trigger, function (el, i) {
    trigAction = el.getAttribute("data-triggertype");
    if (trigAction == "checkbox") {
      el.addEventListener("change", function () {
        toggleType = this.getAttribute("data-effect");
        contentLink = this.getAttribute("data-link");
        content = document.querySelectorAll(".ju-togglelc-" + contentLink + "");
        _this = this;
        Array.prototype.forEach.call(content, function (elm, idx) {
          contentAttr = elm.getAttribute("data-action");
          contentAttr2 = elm.getAttribute("data-action2");
          if (_this.checked) {
            if (contentAttr == "disabled-input") {
              if (!hasAttr(elm, "disabled")) elm.setAttribute("disabled", true);
            } else if (contentAttr == "disabled-select") {
              addClass(elm, "is-disabled");
              elm.closest(".c-select").querySelector(".c-select__reset").click();
            } else if (contentAttr == "undisabled-select") {
              if (hasClass(elm, "is-disabled")) {
                removeClass(elm, "is-disabled");
                customSelect();
              }
            } else if (contentAttr == "undisabled-input") {
              if (hasAttr(elm, "disabled")) elm.removeAttribute("disabled");
            } else {
              toggleAnimate(elm, toggleType);
            }
            if (contentAttr2) {
              if (contentAttr2 == "change-value") {
                val2 = elm.getAttribute("data-value2");
                elm.value = val2;
              }
            }
          } else {
            if (contentAttr == "disabled-input") {
              if (hasAttr(elm, "disabled")) elm.removeAttribute("disabled");
            } else if (contentAttr == "disabled-select") {
              if (hasClass(elm, "is-disabled")) {
                removeClass(elm, "is-disabled");
                customSelect();
              }
            } else if (contentAttr == "undisabled-select") {
              addClass(elm, "is-disabled");
              elm.closest(".c-select").querySelector(".c-select__reset").click();
            } else if (contentAttr == "undisabled-input") {
              if (!hasAttr(elm, "disabled")) elm.setAttribute("disabled", true);
            } else {
              toggleAnimate(elm, toggleType);
            }
            if (contentAttr2) {
              if (contentAttr2 == "change-value") {
                elm.value = "";
              }
            }
          }
        });
      });
    } else if (trigAction == "select" || trigAction == "radio") {
      radioName = el.getAttribute("name");
      trigger = el.querySelectorAll("input[type='radio']");
      latestElChecked = el.querySelector("input[type='radio'][checked]");
      if (latestElChecked) addClass(latestElChecked, "latestChecked");
      Array.prototype.forEach.call(trigger, function (elm, idx) {
        elm.addEventListener("change", function (e) {
          wrapperSelect = this.closest(".ju-toggle-l");

          // latest trigger action setup
          latestElChecked = wrapperSelect.querySelector(".latestChecked");
          if (latestElChecked && hasAttr(latestElChecked, "data-link")) {
            // jika elemen ada & ada attribute data-link
            if (hasAttr(latestElChecked, "data-subtriggertype")) {
              // jika ada attribute data-subtriggertype
              latestTrigAction = latestElChecked.getAttribute("data-subtriggertype");
              latestContent = latestElChecked.getAttribute("data-link");
              latestToggleType = latestElChecked.getAttribute("data-effect");
            } else {
              latestTrigAction = "toggle-showhide";
              latestContent = latestElChecked.getAttribute("data-link");
              latestToggleType = latestElChecked.getAttribute("data-effect");
            }

            if (hasAttr(latestElChecked, "data-link2")) {
              // jika elemen ada & ada attribute data-link2
              if (hasAttr(latestElChecked, "data-subtriggertype2")) {
                // jika ada attribute data-subtriggertype2
                latestTrigAction2 = latestElChecked.getAttribute("data-subtriggertype2");
                latestContent2 = latestElChecked.getAttribute("data-link2");
                latestToggleType2 = latestElChecked.getAttribute("data-effect2");
              } else {
                latestTrigAction2 = "toggle-showhide";
                latestContent2 = latestElChecked.getAttribute("data-link2");
                latestToggleType2 = latestElChecked.getAttribute("data-effect2");
              }
            } else {
              latestTrigAction2 = "none";
              latestContent2 = "";
            }
          } else {
            latestTrigAction = "none";
            latestContent = "";
            latestTrigAction2 = "none";
            latestContent2 = "";
          }

          // latest content action reset
          if (latestContent !== "") latestContent = document.getElementsByClassName("ju-togglelc-" + latestContent);
          if (latestContent2 !== "") latestContent2 = document.getElementsByClassName("ju-togglelc-" + latestContent2);
          if (latestElChecked) removeClass(latestElChecked, "latestChecked");
          addClass(this, "latestChecked");

          if (latestTrigAction == "disabled-select") {
            Array.prototype.forEach.call(latestContent, function (elms, index) {
              if (hasClass(elms, "is-disabled")) removeClass(elms, "is-disabled");
            });
          } else if (latestTrigAction == "disabled-input") {
            Array.prototype.forEach.call(latestContent, function (elms, index) {
              if (hasAttr(elms, "disabled")) elms.removeAttribute("disabled");
            });
          } else if (latestTrigAction == "toggle-showhide") {
            Array.prototype.forEach.call(latestContent, function (elms, index) {
              if (latestToggleType == "fade") {
                fadeOut(elms);
              } else if (latestToggleType == "slide") {
                slideUp(elms, 150);
              } else {
                addClass(elms, "u-dn");
              }
            });
          } else if (latestTrigAction == "toggle-hideshow") {
            Array.prototype.forEach.call(latestContent, function (elms, index) {
              if (latestToggleType == "fade") {
                fadeIn(elms);
              } else if (latestToggleType == "slide") {
                slideDown(elms, 150);
              } else {
                removeClass(elms, "u-dn");
              }
            });
          }
          if (latestTrigAction2 !== "") {
            if (latestTrigAction2 == "disabled-select") {
              Array.prototype.forEach.call(latestContent2, function (elms, index) {
                if (hasClass(elms, "is-disabled")) removeClass(elms, "is-disabled");
              });
            } else if (latestTrigAction2 == "disabled-input") {
              Array.prototype.forEach.call(latestContent2, function (elms, index) {
                if (hasAttr(elms, "disabled")) elms.removeAttribute("disabled");
              });
            } else if (latestTrigAction2 == "toggle-showhide") {
              Array.prototype.forEach.call(latestContent2, function (elms, index) {
                if (latestToggleType2 == "fade") {
                  fadeOut(elms);
                } else if (latestToggleType2 == "slide") {
                  slideUp(elms, 150);
                } else {
                  addClass(elms, "u-dn");
                }
              });
            } else if (latestTrigAction2 == "toggle-hideshow") {
              Array.prototype.forEach.call(latestContent2, function (elms, index) {
                if (latestToggleType2 == "fade") {
                  fadeIn(elms);
                } else if (latestToggleType2 == "slide") {
                  slideDown(elms, 150);
                } else {
                  removeClass(elms, "u-dn");
                }
              });
            }
          }

          // action toggle
          contentLink = this.getAttribute("data-link");
          if (contentLink) {
            content = document.getElementsByClassName("ju-togglelc-" + contentLink);
            subTriggerType = this.getAttribute("data-subtriggertype");
            if (subTriggerType == "disabled-select") {
              Array.prototype.forEach.call(content, function (elms, index) {
                addClass(elms, "is-disabled");
                elms.closest(".c-select").querySelector(".c-select__reset").click();
              });
            } else if (subTriggerType == "disabled-input") {
              Array.prototype.forEach.call(content, function (elms, index) {
                if (!hasAttr(elms, "disabled")) elms.setAttribute("disabled", true);
              });
            } else if (subTriggerType == "toggle-hideshow" || subTriggerType == "always-hide") {
              toggleType = this.getAttribute("data-effect");
              Array.prototype.forEach.call(content, function (elms, index) {
                if (toggleType == "fade") {
                  fadeOut(elms);
                } else if (toggleType == "slide") {
                  slideUp(elms, 150);
                } else {
                  addClass(elms, "u-dn");
                }
              });
            } else if (subTriggerType == "always-show") {
              toggleType = this.getAttribute("data-effect");
              Array.prototype.forEach.call(content, function (elms, index) {
                if (toggleType == "fade") {
                  fadeIn(elms);
                } else if (toggleType == "slide") {
                  slideDown(elms, 150);
                } else {
                  removeClass(elms, "u-dn");
                }
              });
            } else {
              toggleType = this.getAttribute("data-effect");
              Array.prototype.forEach.call(content, function (elms, index) {
                if (toggleType == "fade") {
                  fadeIn(elms);
                } else if (toggleType == "slide") {
                  slideDown(elms, 150);
                } else {
                  removeClass(elms, "u-dn");
                }
              });
            }
          }

          // action toggle if data-link is more than 1
          contentLink2 = this.getAttribute("data-link2");
          if (contentLink2) {
            content2 = document.getElementsByClassName("ju-togglelc-" + contentLink2);
            subTriggerType2 = this.getAttribute("data-subtriggertype2");
            if (subTriggerType2 == "disabled-select") {
              Array.prototype.forEach.call(content2, function (elms, index) {
                addClass(elms, "is-disabled");
                elms.closest(".c-select").querySelector(".c-select__reset").click();
              });
            } else if (subTriggerType2 == "disabled-input") {
              Array.prototype.forEach.call(content2, function (elms, index) {
                if (!hasAttr(elms, "disabled")) elms.setAttribute("disabled", true);
              });
            } else if (subTriggerType2 == "toggle-hideshow" || subTriggerType2 == "always-hide") {
              toggleType2 = this.getAttribute("data-effect2");
              Array.prototype.forEach.call(content2, function (elms, index) {
                if (toggleType2 == "fade") {
                  fadeOut(elms);
                } else if (toggleType2 == "slide") {
                  slideUp(elms, 150);
                } else {
                  addClass(elms, "u-dn");
                }
              });
            } else if (subTriggerType2 == "always-show") {
              toggleType2 = this.getAttribute("data-effect2");
              Array.prototype.forEach.call(content2, function (elms, index) {
                if (toggleType2 == "fade") {
                  fadeIn(elms);
                } else if (toggleType2 == "slide") {
                  slideDown(elms, 150);
                } else {
                  removeClass(elms, "u-dn");
                }
              });
            } else {
              toggleType2 = this.getAttribute("data-effect2");
              Array.prototype.forEach.call(content2, function (elms, index) {
                if (toggleType2 == "fade") {
                  fadeIn(elms);
                } else if (toggleType2 == "slide") {
                  slideDown(elms, 150);
                } else {
                  removeClass(elms, "u-dn");
                }
              });
            }
          }
        });
      });
      if (latestElChecked && trigAction == "select") {
        var wrapperMenu = latestElChecked.closest(".c-select").querySelector(".c-select__menu");
        var wrapperSelect = latestElChecked.closest(".c-select").querySelector(".c-select__input");
        var itemSwicth = wrapperMenu.querySelector(".c-select__item:not(.is-selected)");
        wrapperSelect.click();
        itemSwicth.querySelector("label").click();
        wrapperSelect.click();
        latestElChecked.closest(".c-select__item").querySelector("label").click();
      }

      // if not multiple action but multiple trigger select and button
      if (hasAttr(el, "data-toggle", "multiple-trigger")) {
        console.log("multiple trigger");
      }

      // reset select option
      if (trigAction == "select") {
        resetButton = el.closest(".c-select").querySelector(".c-select__reset");
        resetButton.addEventListener("click", function () {
          wrapperSelect = this.closest(".c-select");
          latestElChecked = wrapperSelect.querySelector("input[type='radio']:checked");
          contentLink = latestElChecked.getAttribute("data-link");
          if (contentLink) {
            toggleType = latestElChecked.getAttribute("data-effect");
            content = document.querySelectorAll(".ju-togglelc-" + contentLink);
            if (hasAttr(latestElChecked, "data-subtriggertype")) {
              latestTrigAction = latestElChecked.getAttribute("data-subtriggertype");
              if (latestTrigAction == "disabled-select") {
                Array.prototype.forEach.call(content, function (elms, index) {
                  if (hasClass(elms, "is-disabled")) removeClass(elms, "is-disabled");
                });
              } else if (latestTrigAction == "disabled-input") {
                Array.prototype.forEach.call(content, function (elms, index) {
                  if (hasAttr(elms, "disabled")) elms.removeAttribute("disabled");
                });
              } else if (latestTrigAction == "toggle-hideshow") {
                Array.prototype.forEach.call(content, function (elms, index) {
                  if (toggleType == "fade") {
                    fadeIn(elms);
                  } else if (toggleType == "slide") {
                    slideDown(elms, 150);
                  } else {
                    removeClass(elms, "u-dn");
                  }
                });
              }
            } else {
              Array.prototype.forEach.call(content, function (elms, index) {
                if (toggleType == "fade") {
                  fadeOut(elms);
                } else if (toggleType == "slide") {
                  slideUp(elms, 150);
                } else {
                  addClass(elms, "u-dn");
                }
              });
            }
          }
        });
      }
    } else if (trigAction == "select-multitrig") {
      el.addEventListener("click", function () {
        toggleType = this.getAttribute("data-effect");
        contentLink = this.getAttribute("data-link");
        content = document.querySelectorAll(".ju-togglelc-" + contentLink + "");
        toggleClass(this, "is-active");
        selected = document.querySelector(".ju-toggle-l[data-link=" + contentLink + "][type='radio']");
        if (selected) {
          selected.closest(".c-select").querySelector(".c-select__reset").click();
        }
        Array.prototype.forEach.call(content, function (elm, idx) {
          toggleAnimate(elm, toggleType);
        });
      });
    } else {
      el.addEventListener("click", function () {
        toggleType = this.getAttribute("data-effect");
        contentLink = this.getAttribute("data-link");
        content = document.querySelectorAll(".ju-togglelc-" + contentLink + "");
        toggleClass(this, "is-active");
        Array.prototype.forEach.call(content, function (elm, idx) {
          toggleAnimate(elm, toggleType);
        });
      });
    }
  });
};
document.addEventListener("DOMContentLoaded", juToggleL);

/*  Toggle with sibling, ruslan
    attribute on trigger element (not required) :
      data-effect : fade, slide. (by default : no animation)
      data-triggertype : checkbox, radio, select. (by default : onclick)
*/
var juToggleS = function juToggleS() {
  var trigger, content, toggleType, trigAction, elCheck;
  trigger = document.querySelectorAll(".ju-toggle-s");
  Array.prototype.forEach.call(trigger, function (el, i) {
    trigAction = el.getAttribute("data-triggertype");
    if (trigAction == "checkbox") {
      elCheck = el.querySelector('.c-check__checkbox');
      elCheck.addEventListener("change", function () {
        toggleType = el.getAttribute("data-effect");
        content = findSiblingAll(el, "ju-toggle-sc");
        Array.prototype.forEach.call(content, function (elm, idx) {
          toggleAnimate(elm, toggleType);
        });
      });
    } else if (trigAction == "radio") {
      console.log("toggle sibling for radio not defined yet");
    } else if (trigAction == "select") {
      console.log("toggle sibling for select not defined yet");
    } else {
      el.addEventListener("click", function (e) {
        toggleType = this.getAttribute("data-effect");
        content = findSiblingAll(this, "ju-toggle-sc");
        toggleClass(this, "is-active");
        Array.prototype.forEach.call(content, function (elm, idx) {
          toggleAnimate(elm, toggleType);
        });
      });
    }
  });
};
document.addEventListener("DOMContentLoaded", juToggleS);

// scroll focus
var JuScrollFocus = function JuScrollFocus(el) {
  var scrollFocus = document.getElementsByClassName(el);
  Array.prototype.forEach.call(scrollFocus, function (el, i) {
    el.addEventListener('mousewheel', function (e) {
      var delta = e.wheelDelta || e.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    });
  });
};

var callJuScrollFocus = function callJuScrollFocus() {
  if (window.matchMedia('(min-width: 769px)').matches) {
    JuScrollFocus('ju-scroll-focus');
    JuScrollFocus('c-select__menu');
  }
};
document.addEventListener("DOMContentLoaded", callJuScrollFocus);

var juCheckAllList = function juCheckAllList(wrapper, trigger) {
  var checkbox, checkboxLength, checkedLength;
  checkbox = wrapper.querySelectorAll(".c-check__checkbox");
  Array.prototype.forEach.call(checkbox, function (el, i) {
    if (!hasAttr(el, "data-cbtrigger")) {
      el.addEventListener("change", function () {
        wrapper = this.closest(".ju-checkall-w");
        trigger = wrapper.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
        if (trigger.checked) {
          trigger.checked = false;
        } else {
          checkbox = wrapper.getElementsByClassName("c-check__checkbox");
          checkboxLength = checkbox.length - 1;
          checkedLength = wrapper.querySelectorAll(".c-check__checkbox:checked").length;
          if (checkedLength >= checkboxLength) {
            trigger.checked = true;
            var dataCheckAllText = trigger.closest("label").querySelector("span").textContent;
            wrapper.querySelector(".c-select__value").textContent = dataCheckAllText;
          }
        }
      });
    }
  });
};

// CheckAll
var juCheckAll = function juCheckAll() {
  var wrapper, trigger, triggertype, checkbox, checkallVal;
  wrapper = document.getElementsByClassName("ju-checkall-w");
  Array.prototype.forEach.call(wrapper, function (el, i) {
    trigger = el.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
    if (trigger) {
      juCheckAllList(el, trigger);
      trigger.addEventListener("change", function () {
        wrapper = this.closest(".ju-checkall-w");
        checkallVal = this.checked;
        checkbox = wrapper.getElementsByClassName("c-check__checkbox");
        Array.prototype.forEach.call(checkbox, function (elm, i) {
          elm.checked = checkallVal;
        });
      });
    }
  });
};
document.addEventListener("DOMContentLoaded", juCheckAll);

var hideBulk = function hideBulk(e) {
  var trigger, wrapper, checkbox, content;
  trigger = e.currentTarget;
  wrapper = trigger.closest(".ju-bulk-w");
  checkbox = wrapper.getElementsByClassName("c-check__checkbox");
  content = wrapper.getElementsByClassName("ju-bulk-wc");
  removeClass(wrapper, "isBulk");
  Array.prototype.forEach.call(checkbox, function (elm, i) {
    elm.checked = false;
  });
  Array.prototype.forEach.call(content, function (elm, i) {
    toggleClass(elm, "u-dn");
  });
};

var showBulk = function showBulk() {
  var wrapper, trigger, checkbox, checkedLength, content, stopBulk;
  wrapper = document.getElementsByClassName("ju-bulk-w");
  Array.prototype.forEach.call(wrapper, function (el, i) {
    checkbox = el.getElementsByClassName("c-check__checkbox");
    Array.prototype.forEach.call(checkbox, function (elm, i) {
      elm.addEventListener("change", function () {
        wrapper = this.closest(".ju-bulk-w");
        checkbox = wrapper.getElementsByClassName("c-check__checkbox").length;
        checkedLength = wrapper.querySelectorAll(".c-check__checkbox:checked").length;
        content = wrapper.getElementsByClassName("ju-bulk-wc");
        stopBulk = wrapper.querySelectorAll(".ju-unbulk");
        if (checkedLength >= 2 && !hasClass(wrapper, "isBulk")) {
          addClass(wrapper, "isBulk");
          if (stopBulk) {
            Array.prototype.forEach.call(stopBulk, function (elms, i) {
              elms.addEventListener("click", hideBulk);
            });
          }
          Array.prototype.forEach.call(content, function (elms, i) {
            toggleClass(elms, "u-dn");
          });
        } else if (checkedLength < 2 && hasClass(wrapper, "isBulk")) {
          if (stopBulk) Array.prototype.forEach.call(stopBulk, function (elms, i) {
            elms.removeEventListener("click", hideBulk);
          });
          removeClass(wrapper, "isBulk");
          Array.prototype.forEach.call(content, function (elms, i) {
            toggleClass(elms, "u-dn");
          });
        }
      });
    });
  });
};
document.addEventListener("DOMContentLoaded", showBulk);

// JS for show hide salary
var showHideSalary = function showHideSalary() {
  var e = document.querySelectorAll('.jp-modal-salary-t');
  if (e) {
    Array.prototype.forEach.call(e, function (elm, i) {
      elm.addEventListener("click", function (event) {
        var salary = this.closest('.jp-modal-salary-w').querySelector('.jp-modal-salary-c');
        var status = salary.getAttribute('type');
        if (status) {
          if (status.toLowerCase() == 'password') {
            salary.setAttribute('type', 'text');
          }
        }
      });
    });
  }
};
document.addEventListener("DOMContentLoaded", showHideSalary);

var copiedText = function copiedText() {
  var trigger, content, target, targetLink, toggleType, trigAction, $temp;
  trigger = document.getElementsByClassName("ju-copytext");
  Array.prototype.forEach.call(trigger, function (el, i) {
    el.addEventListener('click', function () {
      targetLink = el.getAttribute("data-target");
      target = document.querySelector(".ju-copytextc-" + targetLink + "");
      content = target.innerHTML;
      alert = document.querySelector(".ju-copytextc-" + targetLink + "-alert");

      // create $temp textarea element
      $temp = document.createElement("textarea");
      $temp.value = content;
      document.querySelector('body').appendChild($temp);

      // copy
      $temp.select();
      document.execCommand('copy');

      // show alert 2s
      fadeIn(alert);
      setTimeout(function () {
        fadeOut(alert);
      }, 1300);
    });
  });
};
document.addEventListener("DOMContentLoaded", copiedText);

var juButtonDisabled = function juButtonDisabled() {
  var trigger = document.querySelectorAll(".ju-button-disabled");
  Array.prototype.forEach.call(trigger, function (el, i) {
    el.addEventListener("click", function () {
      addClass(el, 'is-disabled');
      el.disabled = true;
      var form = el.closest('form');
      form.submit();
    });
  });
};

document.addEventListener("DOMContentLoaded", juButtonDisabled);
'use strict';

/* go to next question */
var nextReviewQuestion = function nextReviewQuestion() {
  var buttonNext = document.querySelectorAll('.jc-reviewquest-next');
  var buttonBack = document.querySelectorAll('.jc-reviewquest-back');
  if (buttonNext) {
    var question = document.querySelectorAll('.p-prfrm-review__question');
    var progress = document.querySelector('.jc-reviewquest-progress .c-progress__fill');
    var questLength = question.length;

    var progressBarQuestion = function progressBarQuestion(progressBar, questionNo, questionLength) {
      var progressLength = questionNo / questionLength * 100;
      progressBar.style.width = progressLength + "%";
      progressBar.querySelector(".c-progress__status").innerHTML = questionNo + '/' + questionLength;
      if (progressLength < 50) {
        if (hasClass(progressBar, "u-bg-blue")) progressBar.classList.remove("u-bg-blue");
        if (hasClass(progressBar, "u-bg-purple")) progressBar.classList.remove("u-bg-purple");
        progressBar.classList.add("u-bg-slate");
      } else if (progressLength == 100) {
        if (hasClass(progressBar, "u-bg-slate")) progressBar.classList.remove("u-bg-slate");
        if (hasClass(progressBar, "u-bg-blue")) progressBar.classList.remove("u-bg-blue");
        progressBar.classList.add("u-bg-purple");
      } else {
        if (hasClass(progressBar, "u-bg-slate")) progressBar.classList.remove("u-bg-slate");
        if (hasClass(progressBar, "u-bg-purple")) progressBar.classList.remove("u-bg-purple");
        progressBar.classList.add("u-bg-blue");
      }
    };

    Array.prototype.forEach.call(buttonNext, function (el, i) {
      el.addEventListener("click", function () {
        var currentQuestion = this.closest(".p-prfrm-review__question");
        var nextQuestion = currentQuestion.nextElementSibling;

        if (nextQuestion != null && hasClass(nextQuestion, "p-prfrm-review__question")) {
          currentQuestion.classList.remove("is-active");
          nextQuestion.classList.add("is-active");

          var questNo = nextQuestion.getAttribute("data-question");
          progressBarQuestion(progress, questNo, questLength);
        } else if (nextQuestion == null) {
          var currentCategory = this.closest(".p-prfrm-review__category");
          var nextCategory = currentCategory.nextElementSibling;
          if (nextCategory != null && hasClass(nextCategory, "p-prfrm-review__category")) {
            currentQuestion.classList.remove("is-active");
            currentCategory.classList.remove("is-active");
            nextCategory.classList.add("is-active");
            nextQuestion = nextCategory.querySelector(".p-prfrm-review__question");
            nextQuestion.classList.add("is-active");

            questNo = nextQuestion.getAttribute("data-question");
            progressBarQuestion(progress, questNo, questLength);
          }
        }
      });
    });

    Array.prototype.forEach.call(buttonBack, function (el, i) {
      el.addEventListener("click", function () {
        var currentQuestion = this.closest(".p-prfrm-review__question");
        var previousQuestion = currentQuestion.previousElementSibling;

        if (hasClass(previousQuestion, "p-prfrm-review__question")) {
          currentQuestion.classList.remove("is-active");
          previousQuestion.classList.add("is-active");

          var questNo = previousQuestion.getAttribute("data-question");
          progressBarQuestion(progress, questNo, questLength);
        } else {
          var currentCategory = this.closest(".p-prfrm-review__category");
          var previousCategory = currentCategory.previousElementSibling;
          if (previousCategory != null && hasClass(previousCategory, "p-prfrm-review__category")) {
            currentQuestion.classList.remove("is-active");
            currentCategory.classList.remove("is-active");
            previousCategory.classList.add("is-active");
            previousQuestion = previousCategory.querySelectorAll(".p-prfrm-review__question");
            previousQuestion = previousQuestion[previousQuestion.length - 1];
            previousQuestion.classList.add("is-active");

            questNo = previousQuestion.getAttribute("data-question");
            progressBarQuestion(progress, questNo, questLength);
          }
        }
      });
    });
  }
};
document.addEventListener("DOMContentLoaded", nextReviewQuestion);
"use strict";

/*
  Popover reusable function
  Attribute required : "data-type" (profile, detail, form, 'custom_link')
  Attribute not req : "data-pos" (horizontal, center)
*/

/* Set stop propagation click for click inside popover */
document.addEventListener("DOMContentLoaded", function () {
  var allpovc = document.querySelectorAll(".c-popover");
  Array.prototype.forEach.call(allpovc, function (el, i) {
    stopPropClick(el);
  });
});

var popoverListener = function popoverListener(e) {
  var povtype, content, custom;
  e.stopPropagation();
  custom = this.getAttribute("data-custom");
  if (custom == "preventDefault") {
    e.preventDefault();
  }
  if (!hasClass(this, "is-active")) {
    hideAllContentPopover();
    addClass(this, "is-active");
    povtype = this.getAttribute("data-type");
    if (povtype) {
      content = document.querySelector(".jc-povc-" + povtype);
      showContentPopover(this, content, povtype);
    }
  }
};

/* Function for detect popover trigger */
var popover = function popover() {
  var trigger, content, povtype;
  trigger = document.getElementsByClassName('jc-popover');
  Array.prototype.forEach.call(trigger, function (el, i) {
    el.addEventListener("click", popoverListener);
  });
};
document.addEventListener("DOMContentLoaded", popover);

/* Function for show popover content */
var showContentPopover = function showContentPopover(trig, content, povtype) {
  var povH, povW, trigOffset, contentPosition, trigOffsetBottom, trigOffsetRight, scrollable;
  if (window.matchMedia('(max-width: 766px)').matches) {
    addClass(content, "c-popover--mobile");
    fadeIn(content);
  } else {
    if (hasClass(content, "c-popover--mobile")) {
      removeClass(content, "c-popover--mobile");
    }
    content.style.opacity = 0;
    removeClass(content, "u-dn", function () {
      povH = content.offsetHeight + 15;
      povW = content.offsetWidth;
      content.style.opacity = 1;
      addClass(content, "u-dn");
    });
    trigOffset = trig.getBoundingClientRect();
    contentPosition = trig.getAttribute("data-pos");
    trigOffsetBottom = window.innerHeight - (trigOffset.top + trig.offsetHeight);
    trigOffsetRight = window.innerWidth - (trigOffset.left + trig.offsetWidth);
    if (contentPosition === "horizontal") {
      if (trigOffsetRight < povW) {
        if (trigOffset.top < povH / 2) {
          content.style.top = trigOffset.top - 40 + 'px';
          content.style.left = trigOffset.left - (povW + 15) + 'px';
          fadeIn(content);
        } else if (trigOffsetBottom < povH / 2) {
          content.style.top = trigOffset.top - (povH - 40) + 'px';
          content.style.left = trigOffset.left - (povW + 15) + 'px';
          fadeIn(content);
        } else {
          content.style.top = trigOffset.top - povH / 2 + 'px';
          content.style.left = trigOffset.left - (povW + 15) + 'px';
          fadeIn(content);
        }
      } else {
        if (trigOffset.top < povH / 2) {
          content.style.top = trigOffset.top - 40 + 'px';
          content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
          fadeIn(content);
        } else if (trigOffsetBottom < povH / 2) {
          content.style.top = trigOffset.top - (povH - 40) + 'px';
          content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
          fadeIn(content);
        } else {
          content.style.top = trigOffset.top - povH / 2 + 'px';
          content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
          fadeIn(content);
        }
      }
    } else if (contentPosition === "center") {
      if (trigOffset.top < povH / 2) {
        content.style.top = trigOffset.top - 40 + 'px';
        content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
        fadeIn(content);
      } else if (trigOffsetBottom < povH / 2) {
        content.style.top = trigOffset.top - (povH - 40) + 'px';
        content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
        fadeIn(content);
      } else {
        content.style.top = trigOffset.top - povH / 2 + 'px';
        content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
        fadeIn(content);
      }
    } else {
      if (trigOffset.top > povH) {
        content.style.top = trigOffset.top - (povH - 5) + 'px';
        content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
        removeClass(content, "c-popover--top");
        addClass(content, "c-popover--bottom");
        fadeIn(content);
      } else {
        content.style.top = trigOffset.top + trig.offsetHeight + 10 + 'px';
        content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
        removeClass(content, "c-popover--bottom");
        addClass(content, "c-popover--top");
        fadeIn(content);
      }
    }
  }
  closePopover("active");
  outsideClickListener("active");
  scrollListener("active");
};

/* Function for hide all popover content */
var hideAllContentPopover = function hideAllContentPopover(type) {
  var allpovc, allpovt, scrollable;
  allpovc = document.getElementsByClassName("c-popover");
  Array.prototype.forEach.call(allpovc, function (elm, idx) {
    if (!hasClass(elm, "u-dn")) {
      closePopover();
      outsideClickListener();
      scrollListener("unactive");
      if (type == "fade") {
        fadeOut(elm);
      } else {
        addClass(elm, "u-dn");
      }
    }
  });
  allpovt = document.querySelector(".jc-popover.is-active");
  if (allpovt) removeClass(allpovt, "is-active");
};

/* Event listener for trigger popover close button */
var closePopover = function closePopover(state) {
  var activeCont, closePovc;
  activeCont = document.querySelector(".c-popover:not(.u-dn)");
  if (activeCont) closePovc = activeCont.querySelectorAll(".jc-pov-x");
  if (closePovc) {
    if (state === "active") {
      Array.prototype.forEach.call(closePovc, function (el, i) {
        el.addEventListener("click", hideAllAbsoluteComponent);
      });
    } else {
      Array.prototype.forEach.call(closePovc, function (el, i) {
        el.removeEventListener("click", hideAllAbsoluteComponent);
      });
      scrollListener("unactive");
    }
  }
};

/*
  Pop-hover pophover reusable function
  Attribute required : "data-type" (profile, detail, form, 'custom_link')
  Attribute not req : "data-pos" (horizontal, center)
*/
/* Set stop propagation hover for click inside popover */

/* Function for detect pohpover trigger */
var pophover = function pophover() {
  var trigger, content, povtype, target;
  trigger = document.getElementsByClassName('jc-pophover');
  Array.prototype.forEach.call(trigger, function (el, i) {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      el.addEventListener("mouseover", function (e) {

        if (!hasClass(this, "is-active")) {
          povtype = this.getAttribute("data-type");
          if (povtype) {
            content = document.querySelector(".jc-phovc-" + povtype);
            hideAllContentPophover();
            showContentPophover(this, content, povtype);
            addClass(this, "is-active");
            JuScrollFocus();
          }
        }
      });
      el.addEventListener("mouseleave", function (e) {
        setTimeout(function () {
          povtype = el.getAttribute("data-type");
          target = e.toElement;
          if (povtype) {
            content = document.querySelector(".jc-phovc-" + povtype);
            if (!hasClass(content, "on")) {
              if (!hasClass(target, "c-popover") && !hasClass(target, "jc-pophover")) {
                hideAllContentPophover();
              }
            }
          }
        }, 150);
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    pophover();
  }
});

/* Function for show pophover content */
var showContentPophover = function showContentPophover(trig, content, povtype) {
  var povH, povW, trigOffset, contentPosition, trigOffsetBottom, trigOffsetRight;
  content.style.opacity = 0;
  removeClass(content, "u-dn", function () {
    povH = content.offsetHeight + 15;
    povW = content.offsetWidth;
    content.style.opacity = 1;
    addClass(content, "u-dn");
  });
  trigOffset = trig.getBoundingClientRect();
  trigOffsetBottom = window.innerHeight - (trigOffset.top + trig.offsetHeight);
  trigOffsetRight = window.innerWidth - (trigOffset.left + trig.offsetWidth);
  if (trigOffsetRight < povW) {
    if (trigOffset.top < povH) {
      content.style.top = trigOffset.top + trig.offsetHeight + 'px';
      content.style.left = trigOffset.left - (povW + 15) + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    } else if (trigOffsetBottom < povH) {
      content.style.top = trigOffset.top - povH + 'px';
      content.style.left = trigOffset.left - (povW + 15) + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    } else {
      content.style.top = trigOffset.top - povH / 2 + 'px';
      content.style.left = trigOffset.left - (povW + 15) + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    }
  } else if (trigOffset.left < povW) {
    if (trigOffset.top < povH) {
      content.style.top = trigOffset.top + trig.offsetHeight + 'px';
      content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    } else if (trigOffsetBottom < povH) {
      content.style.top = trigOffset.top - povH + 'px';
      content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    } else {
      content.style.top = trigOffset.top - povH / 2 + 'px';
      content.style.left = trigOffset.left + trig.offsetWidth + 15 + 'px';
      removeClass(content, "c-popover--top");
      removeClass(content, "c-popover--bottom");
      fadeIn(content);
    }
  } else {
    if (trigOffset.top > povH) {
      content.style.top = trigOffset.top - (povH - 5) + 'px';
      content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
      removeClass(content, "c-popover--top");
      addClass(content, "c-popover--bottom");
      fadeIn(content);
    } else {
      content.style.top = trigOffset.top + trig.offsetHeight + 10 + 'px';
      content.style.left = trigOffset.left - (povW / 2 - trig.offsetWidth / 2) + 'px';
      removeClass(content, "c-popover--bottom");
      addClass(content, "c-popover--top");
      fadeIn(content);
    }
  }
  listenerPophover(content, "active");
};

/* Function for hide all pophover content */
var hideAllContentPophover = function hideAllContentPophover(type) {
  var allphovc, allphovt;
  allphovc = document.getElementsByClassName("c-popover");
  allphovt = document.querySelector(".jc-pophover.is-active");
  Array.prototype.forEach.call(allphovc, function (elm, idx) {
    if (!hasClass(elm, "u-dn")) {
      addClass(elm, "u-dn");
      listenerPophover(elm);
    }
  });
  if (allphovt) removeClass(allphovt, "is-active");
};

var listenerPophover = function listenerPophover(el, state) {
  if (state === "active") {
    el.addEventListener("mouseover", function () {
      addClass(this, "on");
    });
    el.addEventListener("mouseleave", hideAllContentPophover);
  } else {
    el.removeEventListener("mouseleave", hideAllContentPophover);
    removeClass(el, "on");
  }
};

/*
  Tooltip reusable function
  Attribute required : "data-content"
  data-close : "active" // for self closing tooltip
  data-pos : remove-auto, left, right, bottom
*/
var tooltipMouseover = function tooltipMouseover(e) {
  var content, tooltipAppend;
  var createDiv = "<div class='jc-appendtooltip c-tooltip'>\n      <span>\n      </span>\n    </div>";
  var triggerType = this.getAttribute('data-type');
  if (triggerType == 'tooltip-select') {
    var select = this.querySelector('.c-select__item.is-selected');
    if (select) {
      content = select.querySelector('label input').getAttribute('data-content');
    } else {
      content = this.getAttribute('data-content');
    }
  } else {
    content = this.getAttribute('data-content');
  }
  tooltipAppend = document.querySelector(".jc-appendtooltip");
  if (tooltipAppend) {
    tooltipAppend.querySelector('span').innerHTML = content;
    showTooltip(this, tooltipAppend);
  } else {
    document.body.insertAdjacentHTML('beforeend', createDiv);
    tooltipAppend = document.querySelector(".jc-appendtooltip");
    tooltipAppend.querySelector('span').innerHTML = content;
    showTooltip(this, tooltipAppend);
  }
};
var tooltipContentMouseleave = function tooltipContentMouseleave(e) {
  var tooltipAppend, toElm;
  toElm = e.toElement;
  tooltipAppend = document.querySelector(".jc-appendtooltip");
  if (tooltipAppend) {
    tooltipAppend.parentNode.removeChild(tooltipAppend);
  }
};

var tooltipMouseleave = function tooltipMouseleave(e) {
  var tooltipAppend, toElm;
  toElm = e.toElement;
  if (toElm != null && !hasClass(toElm, "c-tooltip")) {
    tooltipAppend = document.querySelector(".jc-appendtooltip");
    if (tooltipAppend) {
      tooltipAppend.parentNode.removeChild(tooltipAppend);
    }
  } else if (toElm != null) {
    toElm.addEventListener("mouseleave", tooltipContentMouseleave);
  }
};
var tooltipClick = function tooltipClick(e) {
  var toClose, tooltipAppend;
  toClose = this.getAttribute('data-close');
  if (toClose === "active") {
    tooltipAppend = document.querySelector(".jc-appendtooltip");
    if (tooltipAppend) {
      tooltipAppend.parentNode.removeChild(tooltipAppend);
    }
  }
};

var tooltipHover = function tooltipHover() {
  var trigger, content, createDiv, tooltipAppend, toClose;

  trigger = document.getElementsByClassName('jc-tooltip');
  Array.prototype.forEach.call(trigger, function (el, i) {
    //reset this function first to avoid calling function twice.
    el.removeEventListener("mouseenter", tooltipMouseover);
    el.addEventListener("mouseenter", tooltipMouseover);

    el.removeEventListener("mouseleave", tooltipMouseleave);
    el.addEventListener("mouseleave", tooltipMouseleave);

    el.removeEventListener("click", tooltipClick);
    el.addEventListener("click", tooltipClick);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    tooltipHover();
  }
});

var showTooltip = function showTooltip(trig, content) {
  var trigH, trigW, trigOffset, contentPos, contentH, contentW, rightSpace, leftSpace;
  addClass(content, "is-open", function () {
    content.style.opacity = 0;
    trigH = trig.offsetHeight + 5;
    trigW = trig.offsetWidth + 5;
    contentH = content.offsetHeight + 5;
    contentW = content.offsetWidth + 5;
  });
  trigOffset = trig.getBoundingClientRect();
  contentPos = trig.getAttribute('data-pos');
  rightSpace = window.screen.width - trigOffset.right;
  leftSpace = trigOffset.left;
  content.style.opacity = '1';
  if (contentPos == "bottom") {
    if (rightSpace < contentW) {
      content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
      content.style.left = trigOffset.left - contentW - 5 + 'px';
      addClass(content, "c-tooltip--left");
    } else if (leftSpace < contentW) {
      content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
      content.style.left = trigOffset.left + trigW + 'px';
      addClass(content, "c-tooltip--right");
    } else {
      content.style.top = trigOffset.top + trigH + 'px';
      content.style.left = trigOffset.left + trigW / 2 + 'px';
      addClass(content, "c-tooltip--bottom");
    }
  } else if (contentPos == "left") {
    content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
    content.style.left = trigOffset.left - contentW - 5 + 'px';
    addClass(content, "c-tooltip--left");
  } else if (contentPos == "right") {
    content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
    content.style.left = trigOffset.left + trigW + 'px';
    addClass(content, "c-tooltip--right");
  } else if (contentPos == "custom-row") {
    var icon = trig.querySelector('.jc-tooltip-mark');
    var label = icon.querySelectorAll('label');
    var form = icon.querySelectorAll('.c-form-group:not(.u-dn)');
    var arrayMax = [];
    Array.prototype.forEach.call(label, function (elm, i) {
      var trigLabel = elm.getBoundingClientRect();
      arrayMax.push(trigLabel.width);
    });
    Array.prototype.forEach.call(form, function (elm, i) {
      var trigForm = elm.getBoundingClientRect();
      arrayMax.push(trigForm.width);
    });
    var largestValue = Math.max.apply(Math, arrayMax);
    var trigPostition = icon.getBoundingClientRect();
    content.style.top = trigPostition.top + 'px';
    content.style.left = trigPostition.x + largestValue + 40 + 'px';
    if (form.length > 1) {
      var formLast = form[form.length - 1];
      var trigForm = formLast.getBoundingClientRect();
      arrayMax.push(trigForm.right);
      content.style.left = trigForm.right + 30 + 'px';
    }
    addClass(content, "c-tooltip--custom");
  } else if (contentPos == "custom-row-attd") {
    var $contentPosition, $formPosition;
    $contentPosition = trig.getBoundingClientRect();
    $formPosition = trig.querySelector('.jc-att--form').getBoundingClientRect();
    content.style.top = $contentPosition.top + 'px';
    content.style.left = $formPosition.right + 30 + 'px';
    addClass(content, "c-tooltip--custom");
  } else {
    if (rightSpace < contentW && contentPos !== "remove-auto") {
      content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
      content.style.left = trigOffset.left - contentW - 5 + 'px';
      addClass(content, "c-tooltip--left");
    } else if (leftSpace < contentW && contentPos !== "remove-auto") {
      content.style.top = trigOffset.top + trigH / 2 - contentH / 2 + 'px';
      content.style.left = trigOffset.left + trigW + 'px';
      addClass(content, "c-tooltip--right");
    } else {
      content.style.top = trigOffset.top - contentH + 'px';
      content.style.left = trigOffset.left + trigW / 2 + 'px';
      addClass(content, "c-tooltip--top");
    }
  }
};
'use strict';

// // select js

var defaultSelectTrigger = function defaultSelectTrigger(e) {
  var arrow, menu, switchSearch;
  if (!hasClass(this, "is-disabled")) {
    e.stopPropagation();
    arrow = this.querySelector('.c-select__arrow');
    menu = findSibling(this, 'c-select__menu');
    switchSearch = findSibling(this, 'c-select__search--switch');

    // toggle show menu
    if (hasClass(menu, 'is-open')) {
      closeThisSelect(menu, switchSearch, arrow);
    } else {
      // remove all menu open and up
      closeAllOpenSelect();
      // Action apply for open menu and animation arrow
      openThisSelect(menu, switchSearch, arrow, this);

      var searchEvent = menu.querySelectorAll('.c-select__search input');
      var itemSearch = menu.querySelectorAll('.c-select__item');
      var itemSearchLength = itemSearch.length;
      var noResult = menu.querySelector(".c-select__item--noresult");
      if (searchEvent) {
        var checkHeight = function checkHeight() {
          if (hasClass(menu, 'c-select__top')) {
            var selectH = menu.offsetHeight;
            var contentHeight = selectH;
            menu.style.top = '-' + (contentHeight + 4) + 'px';
          }
        };

        Array.prototype.forEach.call(searchEvent, function (elm, i) {
          var resetClick = findSibling(elm, 'with-icon--reset');
          elm.focus();
          elm.addEventListener('click', function (e) {
            e.stopPropagation();
          });
          elm.addEventListener('keyup', function () {
            var val = this.value.toLowerCase();
            if (val.length > 0) {
              removeClass(resetClick, 'u-dn');
              resetClick.addEventListener('click', function (e) {
                e.stopPropagation();
                var resetInput = findSibling(this, 'c-form-control');
                var noResultInfo = this.closest('.c-select__menu').querySelector('.c-select__item--noresult');
                resetInput.value = "";
                resetInput.focus();
                addClass(noResultInfo, 'u-dn');
                addClass(this, 'u-dn');
                removeClass(elm, 'u-dn');
                Array.prototype.forEach.call(itemSearch, function (el, i) {
                  removeClass(el, 'u-dn');
                  checkHeight();
                });
              });
            } else if (val.length === 0) {
              addClass(resetClick, 'u-dn');
            }

            Array.prototype.forEach.call(itemSearch, function (el, i) {
              var wrapper = el.querySelector('.c-select__item--name');
              var txt = el.getElementsByTagName("span")[0];
              if (wrapper) {
                var name = wrapper.getElementsByTagName("h2")[0];
              }
              if (name) {
                if (name.innerHTML.toLowerCase().indexOf(val) > -1) {
                  removeClass(el, 'u-dn');
                } else {
                  addClass(el, 'u-dn');
                }
              }
              if (txt) {
                if (txt.innerHTML.toLowerCase().indexOf(val) > -1) {
                  removeClass(el, 'u-dn');
                } else {
                  addClass(el, 'u-dn');
                }
              }
              checkHeight();
            });

            var itemsHide = menu.querySelectorAll(".c-select__item.u-dn");
            if (itemsHide.length === itemSearchLength) {
              removeClass(noResult, 'u-dn');
              if (hasClass(menu, 'c-select__top')) {
                menu.style.top = '-' + 96 + 'px';
              }
            } else {
              addClass(noResult, 'u-dn');
              checkHeight();
            }
          });
        });
      }
    }
  }
};

var multipleSelectTrigger = function multipleSelectTrigger(e) {
  var itemVal, itemValspan, itemValh2, inject, injectPill, itemSelected, item, remove, removedAttr, targetRemoveSelect, toggleType, contentLink, content;

  itemValspan = this.closest("label").querySelector("span");
  itemValh2 = this.closest("label").querySelector("h2");
  if (itemValspan) {
    itemVal = itemValspan.textContent;
  } else if (itemValh2) {
    itemVal = itemValh2.textContent;
  } else {
    itemVal = this.closest("label").textContent;
  }

  // when multiple selected item
  if (this.checked === true && !hasAttr(this, 'data-cbtrigger', 'trigger-remove-all')) {
    inject = this.closest('.c-select__menu--multiple');
    injectPill = findSibling(inject, 'c-select__multiple');
    injectPill.insertAdjacentHTML('beforeend', "<span class='c-select__multiple-item' data-val='" + itemVal + "'>" + itemVal + "<span class='c-select__multiple-remove'>&times;</span></span>");
    itemSelected = this.closest('.c-select__item');
    addClass(itemSelected, 'is-selected');

    if (this.checked === true && hasAttr(this, 'data-cbtrigger', 'trigger-all')) {
      var allOptionItems = inject.querySelectorAll('.c-select__item');
      Array.prototype.forEach.call(allOptionItems, function (el, i) {
        var itemVal = el.querySelector('input').value;

        // change selected item to blue
        if (!hasClass(el, 'is-selected')) {
          el.classList.add('is-selected');
        };

        // if there's already a pill
        var pill = injectPill.querySelector('[data-val="' + itemVal + '"]');
        if (!pill) {
          injectPill.insertAdjacentHTML('beforeend', "<span class='c-select__multiple-item' data-val='" + itemVal + "'>" + itemVal + "<span class='c-select__multiple-remove'>&times;</span></span>");
        };
      });

      // remove default pill with the trigger-all value
      var selectAllVal = this.value;
      var pillAll = injectPill.querySelector('[data-val="' + selectAllVal + '"]');
      if (pillAll) {
        pillAll.remove();
      }
    };
  }

  // when multiple not selected item
  else if (this.checked === false) {
      itemSelected = this.closest('.c-select__item');
      removeClass(itemSelected, 'is-selected');
      inject = this.closest('.c-select__menu--multiple');
      injectPill = findSibling(inject, 'c-select__multiple');
      item = injectPill.querySelectorAll('.c-select__multiple-item');
      Array.prototype.forEach.call(item, function (el, i) {
        if (itemVal === el.getAttribute('data-val')) {
          el.remove();
        }
      });

      if (hasAttr(this, 'data-cbtrigger', 'trigger-all')) {
        var allOptionItems = inject.querySelectorAll('.c-select__item');
        Array.prototype.forEach.call(allOptionItems, function (el, i) {
          if (hasClass(el, 'is-selected')) {
            el.classList.remove('is-selected');
          }
        });

        Array.prototype.forEach.call(item, function (el, i) {
          el.remove();
        });
      }
    }

  // remove item from pill and remove selected item on menu
  inject = this.closest('.c-select__menu--multiple');
  injectPill = findSibling(inject, 'c-select__multiple');
  remove = injectPill.querySelectorAll('.c-select__multiple-remove');
  Array.prototype.forEach.call(remove, function (el, i) {
    el.addEventListener('click', function () {
      var removed;
      removed = this.closest('.c-select__multiple-item');
      removedAttr = removed.getAttribute('data-val');
      item = inject.querySelectorAll('.c-select__item input[type="checkbox"]');

      var pillWrapper = this.closest('.c-select__multiple');
      if (pillWrapper) {
        var pillItem = pillWrapper.querySelectorAll('.c-select__multiple-item');
        if (pillItem) {
          if (pillItem.length == 1) {
            var defaultVal = findSibling(pillWrapper, "c-select__menu--multiple").querySelector('.c-select__item input[data-type="default"]');
            if (defaultVal) {
              var selectValue = findSibling(pillWrapper, "c-select__input").querySelector('.c-select__value');
              var selectPlaceholder = findSibling(pillWrapper, "c-select__input").querySelector('.c-select__placeholder');

              selectValue.innerHTML = defaultVal.value;

              if (hasClass(selectValue, 'u-dn')) {
                selectValue.classList.remove('u-dn');
                selectPlaceholder.classList.add('u-dn');
              }
            }
          }
        }
      }
      Array.prototype.forEach.call(item, function (el, i) {
        itemValspan = el.closest("label").querySelector("span");
        itemValh2 = el.closest("label").querySelector("h2");
        if (itemValspan) {
          itemVal = itemValspan.textContent;
        } else if (itemValh2) {
          itemVal = itemValh2.textContent;
        } else {
          itemVal = this.closest("label").textContent;
        }

        if (removedAttr === itemVal) {
          targetRemoveSelect = el.closest('.c-select__item');
          el.checked = false;
          if (hasClass(el, 'ju-toggle-l')) {
            toggleType = el.getAttribute("data-effect");
            contentLink = el.getAttribute("data-link");
            content = document.querySelectorAll(".ju-togglelc-" + contentLink + "");
            Array.prototype.forEach.call(content, function (elm, idx) {
              toggleAnimate(elm, toggleType);
            });
          }
          removeClass(targetRemoveSelect, 'is-selected');
          removed.remove();
        };

        // remove select all
        if (el.checked === true && el.getAttribute('data-cbtrigger') == 'trigger-all') {
          el.checked = false;
          var itemOption = el.closest('.c-select__item');
          if (hasClass(itemOption, 'is-selected')) {
            itemOption.classList.remove('is-selected');
          }
        }
      });
    });
  });
};

var customSelect = function customSelect() {
  var wrapper, multipleMenu, input, arrow, switchSearch, placeholder, value, reset, menu, item, def, applyVal, itemVal, itemSelected, currentSelected, defaultValue, inject, injectPill, remove, removed, removedAttr, targetRemoveSelect, itemMultipleChek;
  var itemOpt, textVal, allCheckbox, allCheckboxChecked, triggerAll, itemValspan, itemValh2, allDefaultCheckboxChecked;

  wrapper = document.getElementsByClassName('c-select');
  Array.prototype.forEach.call(wrapper, function (el, i) {
    input = el.querySelector('.c-select__input:not(.is-disabled)');
    if (input) {
      menu = findSibling(input, 'c-select__menu');
      item = menu.querySelectorAll('.c-select__item input[type="radio"]');
      itemMultipleChek = menu.querySelectorAll('.c-select__item input[type="checkbox"]');
      reset = el.querySelector('.c-select__reset');
      switchSearch = findSibling(input, 'c-select__search--switch');

      //reset event listener
      input.removeEventListener('click', defaultSelectTrigger);
      //activate event listener
      input.addEventListener('click', defaultSelectTrigger);

      // customSelect
      Array.prototype.forEach.call(item, function (elm, i) {
        elm.addEventListener('click', function () {
          arrow = this.closest(".c-select").querySelector('.c-select__arrow');
          placeholder = this.closest(".c-select").querySelector('.c-select__placeholder');
          reset = this.closest(".c-select").querySelector('.c-select__reset');
          applyVal = el.querySelector('.c-select__value');
          itemValh2 = this.closest("label").querySelector("h2");
          itemValspan = this.closest("label").querySelector("span");
          var altVal = findSibling(this.closest("label"), "c-select--txt-abs");

          if (itemValh2) {
            itemVal = itemValh2.textContent;
          } else if (itemValspan) {
            itemVal = itemValspan.textContent;
          } else if (altVal) {
            itemVal = this.closest("label").textContent + "-" + " " + altVal.textContent;
          } else {
            itemVal = this.closest("label").textContent;
          }

          itemSelected = this.closest('.c-select__item');
          currentSelected = findSibling(itemSelected, 'is-selected');
          if (currentSelected) removeClass(currentSelected, "is-selected");
          addClass(itemSelected, "is-selected");
          applyVal.innerHTML = itemVal;
          closeThisSelect(menu, switchSearch, arrow);
          if (reset && placeholder) {
            removeClass(reset, "u-dn");
            addClass(placeholder, "u-dn");
          }
        });
      });

      // reset click
      if (reset) {
        reset.addEventListener('click', function () {
          wrapper = this.closest('.c-select');
          if (hasClass(wrapper, "c-select--multiplecheck")) {
            menu = wrapper.querySelector(".c-select__menu");
            allCheckbox = menu.querySelectorAll(".c-check__checkbox");
            placeholder = wrapper.querySelector('.c-select__placeholder');
            applyVal = wrapper.querySelector('.c-select__value');
            Array.prototype.forEach.call(allCheckbox, function (elm, i) {
              setTimeout(function () {
                elm.checked = false;
              }, 100);
            });
            removeClass(placeholder, "u-dn");
            addClass(this, "u-dn");
            applyVal.innerHTML = '';
          } else {
            itemSelected = wrapper.querySelector('.c-select__item.is-selected');
            def = wrapper.querySelector('.c-select__item input[data-type="default"]');
            placeholder = wrapper.querySelector('.c-select__placeholder');
            applyVal = wrapper.querySelector('.c-select__value');
            value = wrapper.querySelector('.c-select__value');
            addClass(this, "u-dn");
            removeClass(itemSelected, "is-selected");
            setTimeout(function () {
              itemSelected.querySelector("input").checked = false;
            }, 100);

            var inputSearch = menu.querySelector('input[type="text"]');
            var itemSearch = menu.querySelectorAll('.c-select__item');
            var noResult = menu.querySelector(".c-select__item--noresult");
            if (inputSearch) {
              inputSearch.value = "";
            }
            if (itemSearch) {
              Array.prototype.forEach.call(itemSearch, function (elm, i) {
                removeClass(elm, 'u-dn');
              });
            }
            if (noResult) {
              addClass(noResult, 'u-dn');
            }
            if (def) {
              itemVal = def.closest("label").textContent;
              applyVal.innerHTML = itemVal;
              addClass(placeholder, "u-dn");
              addClass(def.closest('.c-select__item'), "is-selected");
              setTimeout(function () {
                def.checked = true;
              }, 100);
            } else {
              removeClass(placeholder, "u-dn");
              applyVal.innerHTML = '';
            }
          }
        });
      }

      Array.prototype.forEach.call(itemMultipleChek, function (elm, i) {
        stopPropClick(elm.closest("label"));
        elm.addEventListener("change", function (e) {

          inject = this.closest('.c-select__menu');
          injectPill = findSibling(inject, 'c-select__input');
          placeholder = injectPill.querySelector('.c-select__placeholder');
          reset = injectPill.querySelector('.c-select__reset');
          applyVal = injectPill.querySelector('.c-select__value');
          textVal = applyVal.textContent;
          var multipleWithRemoveAll = this.closest('.c-select--multiple-remove');
          var multipleWithDefaultVal = this.closest('.c-select--multiple-default');
          var spanForpill = this.closest('label').querySelector('span');
          if (spanForpill) {
            itemOpt = spanForpill.textContent;
          }
          wrapper = this.closest('.c-select');

          if (hasClass(reset, "u-dn") && hasClass(wrapper, "c-select--multiplecheck")) {
            addClass(placeholder, "u-dn");
            removeClass(reset, "u-dn");
          };

          // when multiple selected item
          if (this.checked) {
            if (hasAttr(this, "data-cbtrigger", "trigger-all")) {
              textVal = itemOpt;
            } else if (hasAttr(this, "data-cbtrigger", "trigger-remove-all")) {
              // uncheck all other select options
              var selectItem = multipleWithRemoveAll.querySelectorAll('.c-select__item label input');
              Array.prototype.forEach.call(selectItem, function (el, i) {
                if (!hasAttr(el, "data-cbtrigger", "trigger-remove-all")) {
                  el.checked = false;
                  el.closest('.c-select__item').classList.remove('is-selected');
                }
              });

              // remove all pills
              this.closest('.c-select--multiple').querySelector('.c-select__multiple').innerHTML = "";

              // set value & placeholder
              var placeholder = multipleWithRemoveAll.querySelector('.c-select__placeholder');
              var value = multipleWithRemoveAll.querySelector('.c-select__value');
              if (!hasClass(placeholder, 'u-dn')) {
                placeholder.classList.add('u-dn');
                value.classList.remove('u-dn');
              }
            } else {
              allCheckbox = inject.querySelectorAll(".c-check__checkbox");
              allCheckboxChecked = inject.querySelectorAll(".c-check__checkbox:checked");

              // special case for multiple select with remove all (payroll master > general setting)
              if (multipleWithRemoveAll) {
                var triggerRemoveAll = multipleWithRemoveAll.querySelector(".c-check__checkbox[data-cbtrigger='trigger-remove-all']");
                if (triggerRemoveAll) {
                  triggerRemoveAll.checked = false;
                  var selectItemRmv = triggerRemoveAll.closest('.c-select__item.is-selected');
                  if (selectItemRmv) {
                    selectItemRmv.classList.remove('is-selected');
                  }
                };

                var placeholder = multipleWithRemoveAll.querySelector('.c-select__placeholder');
                var value = multipleWithRemoveAll.querySelector('.c-select__value');

                if (hasClass(placeholder, 'u-dn')) {
                  placeholder.classList.remove('u-dn');
                  value.classList.add('u-dn');
                }
              }

              // special case for multiple select with default value (payroll master > general setting)
              if (multipleWithDefaultVal) {
                var placeholder = multipleWithDefaultVal.querySelector('.c-select__placeholder');
                var value = multipleWithDefaultVal.querySelector('.c-select__value');

                if (hasClass(placeholder, 'u-dn')) {
                  placeholder.classList.remove('u-dn');
                  value.classList.add('u-dn');
                };
              }

              if (allCheckboxChecked.length == allCheckbox.length) {
                triggerAll = inject.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
                if (triggerAll) {
                  textVal = triggerAll.closest("label").querySelector('span').textContent;
                } else {
                  var dataCheckAllAttr = wrapper.getAttribute("data-checked-all");
                  if (dataCheckAllAttr) var dataCheckAllText = dataCheckAllAttr;else var dataCheckAllText = "All options";
                  textVal = dataCheckAllText;
                }
              } else {
                if (textVal !== "") {
                  textVal = textVal + ", " + itemOpt;
                } else {
                  textVal = itemOpt;
                };
              }
            }

            if (hasClass(wrapper, "c-select--multiplecheck")) {
              applyVal.textContent = textVal;
            }

            // to display only placeholder if there's a trigger all
            var selectMultiple = this.closest('.c-select__menu--multiple');
            if (selectMultiple) {
              placeholder = injectPill.querySelector('.c-select__placeholder');
              reset = injectPill.querySelector('.c-select__reset');
              applyVal = injectPill.querySelector('.c-select__value');

              if (hasClass(placeholder, 'u-dn')) {
                placeholder.classList.remove('u-dn');
                reset.classList.add('u-dn');
                applyVal.classList.add('u-dn');
              }
            }
          } else {
            if (hasAttr(this, "data-cbtrigger", "trigger-all")) {
              textVal = "";
              if (!hasClass(reset, "u-dn")) {
                removeClass(placeholder, "u-dn");
                addClass(reset, "u-dn");
              };
            } else {
              allCheckbox = inject.querySelectorAll(".c-check__checkbox");
              allCheckboxChecked = inject.querySelectorAll(".c-check__checkbox:checked");
              allDefaultCheckboxChecked = inject.querySelectorAll(".c-check__checkbox:checked[data-type='default']");
              textVal = "";

              // remove is-selected class if there's an trigger-all (select all) option
              var checkAllCheckbox = inject.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
              if (checkAllCheckbox) {
                var selectItem = checkAllCheckbox.closest('.c-select__item');

                if (hasClass(selectItem, 'is-selected')) {
                  selectItem.classList.remove('is-selected');
                }
              }

              if (allCheckboxChecked.length > 0) {
                Array.prototype.forEach.call(allCheckboxChecked, function (el, i) {
                  if (textVal !== "") {
                    textVal = textVal + ", " + el.closest("label").querySelector('span').textContent;
                  } else {
                    if (!hasAttr(el.closest("label").querySelector('input'), "data-cbtrigger", "trigger-all")) {
                      textVal = el.closest("label").querySelector('span').textContent;
                    }
                  }
                });
                if (allCheckbox.length == 2) {
                  triggerAll = inject.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
                  if (triggerAll) {
                    if (!hasClass(reset, "u-dn")) {
                      removeClass(placeholder, "u-dn");
                      addClass(reset, "u-dn");
                    };
                  }
                }
              } else if (allCheckboxChecked.length == 0) {
                if (!hasClass(reset, "u-dn")) {
                  removeClass(placeholder, "u-dn");
                  addClass(reset, "u-dn");
                };
              } else {
                if (hasClass(reset, "u-dn")) {
                  removeClass(placeholder, "u-dn");
                  addClass(reset, "u-dn");
                };
              }

              if (allDefaultCheckboxChecked) {
                if (multipleWithDefaultVal) {
                  if (allCheckboxChecked.length == allDefaultCheckboxChecked.length) {
                    var placeholder = multipleWithDefaultVal.querySelector('.c-select__placeholder');
                    var value = multipleWithDefaultVal.querySelector('.c-select__value');

                    if (!hasClass(placeholder, 'u-dn')) {
                      placeholder.classList.add('u-dn');
                      value.classList.remove('u-dn');
                    }
                  }
                }
              }
            }

            if (hasClass(wrapper, "c-select--multiplecheck")) {
              applyVal.textContent = textVal;
            }

            // to display only placeholder if there's a trigger all
            var selectMultiple = this.closest('.c-select__menu--multiple');
            if (selectMultiple) {
              placeholder = injectPill.querySelector('.c-select__placeholder');
              reset = injectPill.querySelector('.c-select__reset');
              applyVal = injectPill.querySelector('.c-select__value');

              if (hasClass(placeholder, 'u-dn')) {
                placeholder.classList.remove('u-dn');
                reset.classList.add('u-dn');
                applyVal.classList.add('u-dn');
              }
            }
          }
        });
      });
    }
  });

  // multiple
  multipleMenu = document.querySelectorAll('.c-select__menu--multiple');
  Array.prototype.forEach.call(multipleMenu, function (el, i) {
    item = el.querySelectorAll('.c-select__item input[type="checkbox"]');
    Array.prototype.forEach.call(item, function (elm, i) {
      elm.addEventListener('change', multipleSelectTrigger);
    });

    // remove item from pill and remove selected item on menu
    injectPill = findSibling(el, 'c-select__multiple');
    remove = injectPill.querySelectorAll('.c-select__multiple-remove');
    Array.prototype.forEach.call(remove, function (elm, i) {
      elm.addEventListener('click', function () {
        removed = this.closest('.c-select__multiple-item');
        removedAttr = removed.getAttribute('data-val');
        item = el.querySelectorAll('.c-select__item input[type="checkbox"]');
        Array.prototype.forEach.call(item, function (elmt, i) {
          itemVal = elmt.getAttribute('value');
          if (removedAttr === itemVal) {
            targetRemoveSelect = elmt.closest('.c-select__item');
            elmt.checked = false;
            removeClass(targetRemoveSelect, 'is-selected');
            removed.remove();
          }
        });
      });
    });
  });
};
customSelect();

var closeAllOpenSelect = function closeAllOpenSelect() {
  var menuAll, arrowAll, switchSearchAll;
  menuAll = document.getElementsByClassName('c-select__menu');
  Array.prototype.forEach.call(menuAll, function (el, i) {
    if (hasClass(el, 'is-open')) {
      removeClass(el, 'is-open');
      outsideClickListener();
    }
  });

  arrowAll = document.getElementsByClassName('c-select__arrow');
  Array.prototype.forEach.call(arrowAll, function (el, i) {
    if (hasClass(el, 'is-up')) {
      removeClass(el, 'is-up');
    }
  });

  switchSearchAll = document.getElementsByClassName('c-select__search--switch');
  Array.prototype.forEach.call(switchSearchAll, function (el, i) {
    if (hasClass(el, 'is-open')) {
      removeClass(el, 'is-open');
      outsideClickListener();
    }
  });
};

var closeThisSelect = function closeThisSelect(menu, switchSearch, arrow) {
  removeClass(menu, 'is-open');
  if (switchSearch) {
    removeClass(switchSearch, 'is-open');
  }
  removeClass(arrow, 'is-up');
  outsideClickListener();
};

//c-select__menu--search, c-select__multiple, c-select__input is-error
var openThisSelect = function openThisSelect(menu, switchSearch, arrow, trig) {
  var selectH, trigOffset, trigOffsetBottom, isMultiple, isMultipleSelected, isError, contentHeight, isSwitch, isWrapped;
  menu.style.opacity = 0;
  addClass(menu, "is-open", function () {
    selectH = menu.offsetHeight;
    contentHeight = selectH;
    menu.style.opacity = 1;
    removeClass(menu, "is-open");
  });
  isWrapped = trig.closest(".ju-wrapper-g");
  trigOffset = trig.getBoundingClientRect();
  if (isWrapped) {
    trigOffsetBottom = isWrapped.getBoundingClientRect().bottom - (trigOffset.top + trig.offsetHeight);
  } else {
    trigOffsetBottom = window.innerHeight - (trigOffset.top + trig.offsetHeight);
  }
  isMultiple = trig.closest('.c-select--multiple');
  isSwitch = trig.closest('.c-select--switch');
  if (hasClass(trig, 'is-error')) {
    contentHeight = selectH + 30;
  }
  if (isMultiple) {
    isMultipleSelected = isMultiple.querySelector('.c-select__menu--multiple .is-selected');
    if (isMultipleSelected) contentHeight = selectH + 35;
  }
  if (trigOffsetBottom < contentHeight) {
    addClass(menu, 'c-select__top');
    menu.style.top = (selectH + 4) * -1 + 'px';
  } else {
    if (hasClass(menu, 'c-select__top')) {
      removeClass(menu, 'c-select__top');
    }
    menu.style.top = trig.offsetHeight + 2 + 'px';
  }
  if (isSwitch) {
    addClass(switchSearch, 'is-open');
  }

  if (switchSearch) {
    var showSearch = switchSearch.querySelector('input');
    showSearch.focus();
    var result = findSibling(switchSearch, 'c-select__menu--result');
    var items = result.querySelectorAll(".c-select__item");
    var noResult = result.querySelector(".c-select__item--noresult");
    var itemsLength = items.length;
    showSearch.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    showSearch.addEventListener('keyup', function () {

      function checkHeight() {
        if (hasClass(result, 'c-select__top')) {
          selectH = menu.offsetHeight;
          contentHeight = selectH;
          result.style.top = '-' + (contentHeight + 4) + 'px';
        }
      }

      var val = this.value.toLowerCase();
      var resetClick = findSibling(this, "with-icon--reset");
      removeClass(resetClick, 'u-dn');
      if (val.length > 0) {
        resetClick.addEventListener('click', function (e) {
          var pasteVal = findSibling(this, "c-form-control");
          pasteVal.value = '';
          e.stopPropagation();
          if (pasteVal.value === '') {
            Array.prototype.forEach.call(items, function (el, i) {
              removeClass(el, 'u-dn');
              addClass(noResult, 'u-dn');
              checkHeight();
            });
          }
          addClass(resetClick, 'u-dn');
          showSearch.focus();
        });
      } else if (val.length === 0) {
        addClass(resetClick, 'u-dn');
      }

      Array.prototype.forEach.call(items, function (el, i) {
        var txt = el.getElementsByTagName("span")[0];
        if (txt.innerHTML.toLowerCase().indexOf(val) > -1) {
          removeClass(el, 'u-dn');
        } else {
          addClass(el, 'u-dn');
        }
        checkHeight();
      });

      var itemsHide = result.querySelectorAll(".c-select__item.u-dn");
      if (itemsHide.length === itemsLength) {
        removeClass(noResult, 'u-dn');
        if (hasClass(result, 'c-select__top')) {
          result.style.top = '-' + 42 + 'px';
        }
      } else {
        addClass(noResult, 'u-dn');
        checkHeight();
      }
    });
  }

  addClass(arrow, 'is-up');
  addClass(menu, 'is-open');
  outsideClickListener("active");
};

/// filter search
var filterSearch = function filterSearch() {
  var iconSearch = document.querySelector('.c-filter__button-search');
  if (iconSearch) {
    iconSearch.onclick = function (e) {
      active(this, e);
    };
    deactive(iconSearch.closest('.c-filter__search--autohide'));
  }
};

var deactive = function deactive(el) {
  var reset = el.querySelector('.with-icon--reset');
  var input = el.querySelector('.c-form-control');
  window.onclick = function () {
    removeClass(el, 'is-active');
    resetSearch(el, input);
  };

  window.onkeyup = function (e) {
    if (e.keyCode == 27) {
      removeClass(el, 'is-active');
      resetSearch(el, input);
    }
  };

  input.onclick = function (e) {
    active(this, e);
  };
};

var active = function active(el, e) {
  e.stopPropagation();
  var searchWrapper = el.closest('.c-filter__search');
  addClass(searchWrapper, 'is-active');
  size(el.closest('.c-filter'));
};

var size = function size(el) {
  if (window.innerWidth > 1199 && window.innerWidth < 1601) {
    var boxRight = el.querySelector('.c-filter__search').getBoundingClientRect().right;
    var showLeft = el.querySelector('.c-filter__button').getBoundingClientRect().left;
    var boxSize = boxRight - showLeft - 15;
    var input = el.querySelector('.c-filter__search .c-form-control');
    input.style.width = boxSize + 'px';
  }
};

var resetSearch = function resetSearch(el, input) {
  var $reset = el.querySelector('.with-icon--reset');
  if ($reset) {
    var reset = function reset(el) {
      var resetEl = findSibling(el, 'jc-input-search');
      resetEl.value = '';
      resetEl.blur();
      addClass(el, 'u-dn');
      input.removeAttribute('style');
    };

    if (!hasClass(el, 'is-active')) {
      reset($reset);
    }

    $reset.addEventListener('click', function () {
      reset(this);
    });
  }
};

filterSearch();
"use strict";

var slTabbing = function slTabbing() {
  var wrapper, headList, content, rel, contentActive, mobileHead, mobileMenuTab, mobileMenuList, textList, tabType, activeSibling, tabWrapperCol, dropdownTrig, btnTerm, singleColumn, trigMoremenu, ddMenuList, listMenu, listMenuLength;
  wrapper = document.getElementsByClassName("c-tabbing");
  Array.prototype.forEach.call(wrapper, function (el, i) {
    tabType = el.getAttribute("tab-type");
    // jika tipe tabbing bukan onpage
    if (tabType !== "onpage") {
      // jika tipe tabing adalah single column
      if (hasAttr(el, 'tab-type', 'single-column')) {
        singleColumn = el.querySelector('.c-tabbing__head');
        listMenu = singleColumn.getElementsByTagName('li');
        listMenuLength = listMenu.length;
        // jika jumlah menu tab lebih dari 3, tambahkan menu lainnya dan tampilkan hanya 3 menu awal, sisanya masukan ke dalam dropdown menu lainnya
        if (listMenuLength > 4) {
          singleColumn.insertAdjacentHTML('beforeend', "<li class='ju-dropdown-w' rel='tab-dropdown'><a class='ju-dropdown-t'> <span class='tabDropdownText'>Lainnya</span><span class='fa fa-angle-down'></span></a><ul class='tab-wrapper-column column-single-list ju-dropdown-c u-dn'></ul></li>");
          ddMenuList = singleColumn.querySelector('.tab-wrapper-column');
          for (i = 3; i < listMenu.length;) {
            if (!hasAttr(listMenu[i], 'rel', 'tab-dropdown') == true && !hasAttr(listMenu[i], 'rel', 'terminasi') == true) {
              ddMenuList.appendChild(listMenu[i]);
            } else {
              break;
            }
          }
        }
      }
      headList = el.querySelectorAll(".c-tabbing__head li");
      Array.prototype.forEach.call(headList, function (elm, i) {
        elm.addEventListener("click", function (e) {
          e.preventDefault();
          rel = this.getAttribute("rel");
          // jika menu adalah tab dropdown maka toggle class show hide menu dropdown
          if (rel == "tab-dropdown") {
            e.stopPropagation();
            if (hasClass(this, "is-active")) {
              removeClass(this, "is-active");
              addClass(this.querySelector(".ju-dropdown-c"), "u-dn");
              outsideClickListener("inactive");
            } else {
              closeAllDropdownActive();
              addClass(this, "is-active");
              removeClass(this.querySelector(".ju-dropdown-c"), "u-dn");
              outsideClickListener("active");
            }
            dropdownPosition(this);
          } else if (rel) {
            wrapper = this.closest(".c-tabbing");
            if (!hasClass(this, "active")) {
              // matikan semua class active pada menu
              activeSibling = wrapper.querySelectorAll('li.active');
              Array.prototype.forEach.call(activeSibling, function (elmn, i) {
                elmn.classList.remove("active");
                if (hasAttr(elmn, 'rel', 'terminasi')) {
                  btnTerm = elmn.querySelector('.c-btn--default');
                  removeClass(btnTerm, 'is-disabled');
                }
              });
              // tambahkan class active pada menu yang di click
              addClass(this, "active");
              tabWrapperCol = this.closest(".tab-wrapper-column");
              dropdownTrig = wrapper.querySelector("li[rel='tab-dropdown']");
              // jika menu yang dipilih berada didalam tab wrapper column
              if (tabWrapperCol) {
                addClass(tabWrapperCol.closest("li"), "active");
                findSibling(tabWrapperCol, "ju-dropdown-t").querySelector('.tabDropdownText').innerHTML = this.querySelector('a').text;
                // jika menu yang dipilih memiliki sibling tab wrapper column dan menu yg dipilih tidak berada didalamnya
              } else if (dropdownTrig) {
                dropdownTrig.querySelector('.tabDropdownText').innerHTML = "Lainnya";
              }
              // jika menu yang dipilih adalah button terminasi
              if (rel == 'terminasi') {
                dropdownTrig.querySelector('.tabDropdownText').innerHTML = "Terminasi";
                addClass(dropdownTrig, 'active');
                addClass(this.querySelector('.c-btn--default'), 'is-disabled');
              }
              contentActive = wrapper.querySelector(".c-tabbing__konten.active");
              // hapus / hide content yang sedang aktif
              if (contentActive) {
                contentActive.style.display = 'none';
                removeClass(contentActive, "active");
              }
              // tampilkan content yang dipilih
              content = document.getElementById(rel);
              addClass(content, "active");
              content.style.display = 'block';
              rowCollInfo();
            }
          }
        });
      });
    }
    if (window.matchMedia('(max-width: 766px)').matches) {
      mobileHead = el.querySelector(".c-tabbing__mobile");
      mobileMenuTab = el.querySelector(".c-tabbing__head");
      if (!hasClass(mobileMenuTab, "u-dn") && window.getComputedStyle(mobileMenuTab).display == "none") ;
      addClass(mobileMenuTab, "u-dn");
      mobileHead.addEventListener("click", function () {
        mobileMenuTab = this.closest(".c-tabbing").querySelector(".c-tabbing__head");
        toggleSlide(mobileMenuTab, 150);
      });
      if (tabType !== "onpage") {
        mobileMenuList = mobileMenuTab.querySelectorAll("li a");
        Array.prototype.forEach.call(mobileMenuList, function (el, i) {
          el.addEventListener("click", function () {
            slideUp(mobileMenuTab, 150);
            textList = this.innerHTML;
            this.closest(".c-tabbing").querySelector(".c-tabbing__mobile").innerHTML = textList;
          });
        });
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", slTabbing);

// this is for information filter fot user
var rowCollInfo = function rowCollInfo() {
  var row, col;
  row = document.querySelectorAll(".c-tabbing__konten.active");
  Array.prototype.forEach.call(row, function (el, i) {
    col = el.querySelectorAll('.p-timeoff-staff__col h2');
    var arrayMax = [];
    Array.prototype.forEach.call(col, function (el, i) {
      arrayMax.push(el.clientHeight);
      var largestValue = Math.max.apply(Math, arrayMax);
      el.style.height = largestValue + "px";
    });
  });
};
rowCollInfo();
'use strict';

// Table shadow
var tableCustom = function tableCustom() {
  var $elm, $elmLength, $elmWidth, $sidebar, $wrapperWidth;
  $elm = document.querySelectorAll('.is-table--custom');
  Array.prototype.forEach.call($elm, function (elm, i) {
    $elmLength = elm.querySelectorAll('th').length;
    $elmWidth = elm.getBoundingClientRect().width;
    $wrapperWidth = elm.closest('.jc-table--wrapper').getBoundingClientRect().width;
    calculateWidth(elm, $elmWidth, $elmLength, $wrapperWidth);
  });
};

var calculateWidth = function calculateWidth(elm, elmWidth, elmLength, wrapperWidth) {
  var $tr, $coloumnFirst, $coloumnFirstSpan, $countWidthFirstCol, $elmLength, $array;
  $tr = elm.querySelectorAll('tr'), $array = [];;
  Array.prototype.forEach.call($tr, function (el, i) {
    $coloumnFirst = el.querySelector('th:first-child, td:first-child');
    $coloumnFirstSpan = $coloumnFirst.querySelectorAll('span');
    if ($coloumnFirstSpan.length > 0) {
      Array.prototype.forEach.call($coloumnFirstSpan, function (elm, i) {
        $array.push(elm.clientWidth);
      });
      $countWidthFirstCol = $array[0] + $array[1];
      $elmLength = elmLength - 1;
    } else if (hasClass(elm, 'ju-checkall-w')) {
      $elmLength = elmLength - 2;
      $countWidthFirstCol = $coloumnFirst.getBoundingClientRect().width;
    }
    calculatePerColoumn(el, elmWidth, $elmLength, wrapperWidth, $countWidthFirstCol, $coloumnFirstSpan);
    if ($coloumnFirstSpan.length > 0) {
      $coloumnFirst.style.width = $countWidthFirstCol + 20 + "px";
    }
    setHeightTD(el);
    setHeightHeader(el);
  });
};

var setHeightTD = function setHeightTD(el) {
  var $col = el.querySelectorAll('td');
  var $height = [];
  Array.prototype.forEach.call($col, function (el, i) {
    var getHeight = el.getBoundingClientRect().height;
    $height.push(getHeight);
  });

  var $value = Math.max.apply(Math, $height);
  Array.prototype.forEach.call($col, function (el, i) {
    el.style.height = $value + 'px';
  });
};

var setHeightHeader = function setHeightHeader(el) {
  var $col = el.querySelectorAll('th');
  var $height = [];
  Array.prototype.forEach.call($col, function (el, i) {
    var getHeight = el.getBoundingClientRect().height;
    $height.push(getHeight);
  });

  var $value = Math.max.apply(Math, $height);

  Array.prototype.forEach.call($col, function (el, i) {
    var height = el.getBoundingClientRect().height;
    if (height < $value) {
      var $paddingTop = 5 + ($value - height);
      el.style.paddingTop = $paddingTop + 'px';
    }
  });
};

var calculatePerColoumn = function calculatePerColoumn(elm, elmWidth, elmLength, wrapperWidth, countWidthFirstCol, coloumnFirstSpan) {
  var $elmLength = elmLength,
      $colWidthMinFirstCol = wrapperWidth - countWidthFirstCol,
      $col = elm.querySelectorAll('td, th');
  Array.prototype.forEach.call($col, function (el, i) {
    if (elmWidth > wrapperWidth && window.innerWidth > 1200) {
      if (coloumnFirstSpan.length > 0) {
        el.style.width = "";
      } else {
        el.style.width = $colWidthMinFirstCol / $elmLength + "px";
      }
    } else if (elmWidth < wrapperWidth) {
      el.style.width = $colWidthMinFirstCol / $elmLength + "px";
    } else {
      el.style.width = "";
    }

    if (el.attributes.colspan) {
      el.style.overflow = 'visible';
      el.style.width = $colWidthMinFirstCol / $elmLength * el.attributes.colspan.value + "px";
    }
  });
};

document.addEventListener("DOMContentLoaded", tableCustom);

// Table hover
var tableHover = function tableHover() {
  var $target;
  $target = document.querySelectorAll(".ju-table--real");
  Array.prototype.forEach.call($target, function (el, i) {
    tableHoverElement(el);
  });
};

var tableHoverElement = function tableHoverElement(target) {
  var $target, $hover, $elem;
  $target = target;
  $hover = $target.getAttribute("data-hover");
  $elem = "<div class='c-table__hover'>" + "<div class='c-table__hover--plan'></div>" + "<div class='c-table__hover--inner'>" + "<a>" + $hover + "</a>";
  "</div>" + "</div>";
  $target.insertAdjacentHTML('beforeend', $elem);
  tableHoverAction($target);
};

var addHover = function addHover(el, elemLink, target) {
  var $target, $positionCol, $positionCard, $positionWrapper, $positionTable, $link, $card, $duplicate, $hover, $scrollLeft, $a;
  $target = el.closest('td');
  $positionCol = $target.getBoundingClientRect();
  $positionCard = el.getBoundingClientRect();
  $positionWrapper = target.getBoundingClientRect();
  $positionTable = target.querySelector('table').getBoundingClientRect();
  $scrollLeft = target.scrollLeft;
  $card = $target.querySelectorAll('.p-shift__card').length;
  $link = el.closest('a').getAttribute('href');
  $duplicate = $target.innerHTML;
  var $targetCol = target;
  var $text = $targetCol.getAttribute("data-hover");

  addClass($target, 'is-active');
  if (hasClass($target, 'is-active')) {
    $a = elemLink.querySelector('a');
    $a.parentNode.removeChild($a);
    if (!elemLink.querySelector('a')) {
      elemLink.querySelector('.c-table__hover--inner').insertAdjacentHTML('beforeend', '<a>' + $text + '</a>');
    }
    elemLink.querySelector('a').setAttribute('href', $link);

    elemLink.style.left = $positionCol.left - $positionWrapper.left + $scrollLeft + "px";
    elemLink.style.width = $positionCard.width + 20 + "px";
    elemLink.style.opacity = '1';
    elemLink.style.display = 'block';
    target.querySelector('.c-table__hover--plan').innerHTML = $duplicate;
    var $targetBottom = $target.getBoundingClientRect().bottom;
    var $elemLinkHeight = elemLink.getBoundingClientRect().height;
    var $pos = $targetBottom + $elemLinkHeight;
    if ($pos > $positionTable.bottom) {
      addClass(elemLink, 'is-bottom');
      elemLink.style.top = '';
      elemLink.style.bottom = $positionTable.bottom - $positionCol.bottom + "px";
    } else {
      removeClass(elemLink, 'is-bottom');
      elemLink.style.top = $positionCol.top - $positionTable.top - 5 + "px";
      elemLink.style.bottom = '';
    }
  }
};

var removeHover = function removeHover(el, elemLink, target) {
  removeClass(el, 'is-active');
  if (!hasClass(el, 'is-active')) {
    /* We already remove the calss. Should we check here? */
    target.querySelector('.c-table__hover--plan').innerHTML = '';
    elemLink.style.top = '';
    elemLink.style.left = '';
    elemLink.style.width = '';
    elemLink.style.opacity = '0';
    elemLink.style.display = 'none';
  }
};

var tableHoverAction = function tableHoverAction(target) {
  var $target, $position, $link, $elemLink, $card, $wrapper;
  $target = target.querySelectorAll('.p-shift__card');
  $elemLink = target.querySelector('.c-table__hover');
  Array.prototype.forEach.call($target, function (el, i) {
    el.addEventListener("mouseover", function () {
      $card = hasClass(this, 'p-shift__card--blank');
      if (!$card) {
        addHover(this, $elemLink, target);
      } else {
        removeHover(this, $elemLink, target);
      }
    });
    target.addEventListener("mouseleave", function () {
      removeHover(this, $elemLink, target);
    });
  });

  target.addEventListener("scroll", function () {
    removeHover(this, $elemLink, target);
  });
};

document.addEventListener("DOMContentLoaded", tableHover);

var tableShadow = function tableShadow() {
  var $wrapper, $responsive, $shadowLeft, $shadowRight, $table;
  $wrapper = document.querySelectorAll('.jc-table--wrapper');
  Array.prototype.forEach.call($wrapper, function (elm, i) {
    $responsive = elm.querySelector('.c-table--responsive');
    $shadowLeft = elm.querySelector('.c-table-shadow--left');
    $shadowRight = elm.querySelector('.c-table-shadow--right');
    $table = elm.querySelector('.c-table');
    shadowDefault($responsive, $table, $shadowLeft, $shadowRight);
    shadowScroll($responsive, $table, $shadowLeft, $shadowRight);
  });
};

var shadowScroll = function shadowScroll(responsive, table, shadowLeft, shadowRight) {
  var $scrollTop, $scrollLeft, $table, $responsive, $scrollLeftEnd;
  responsive.onscroll = function () {
    $scrollTop = this.scrollTop;
    $scrollLeft = this.scrollLeft;
    $table = table.getBoundingClientRect();
    $responsive = responsive.getBoundingClientRect();
    $scrollLeftEnd = $table.width - $responsive.width;
    shadowHeader(this, $scrollTop, $scrollLeft);
    shadowSide($scrollLeft, $scrollLeftEnd, shadowLeft, shadowRight);
  };
};

var shadowDefault = function shadowDefault(responsive, table, shadowLeft, shadowRight) {
  var $table, $responsive, $colFirst;
  $responsive = responsive.getBoundingClientRect();
  $table = table.getBoundingClientRect();
  $colFirst = table.querySelector('th:first-child');
  if (window.innerWidth > 768 && hasClass(responsive, 'is-sticky')) {
    shadowLeft.style.left = $colFirst.getBoundingClientRect().width + 'px';
  } else if (hasClass(responsive, 'c-table--pending')) {
    shadowLeft.style.left = '5px';
  }
  if ($table.width > $responsive.width) {
    addClass(shadowLeft, 'u-dn');
  } else if ($table.width == $responsive.width) {
    addClass(shadowLeft, 'u-dn');
    addClass(shadowRight, 'u-dn');
  } else {
    addClass(shadowLeft, 'u-dn');
    addClass(shadowRight, 'u-dn');
  }
};

var shadowHeader = function shadowHeader(el, scrollTop, scrollLeft) {
  var $head = el.querySelector('thead');
  if (scrollTop > 0) {
    addClass($head, 'c-table-shadow--header');
  } else {
    removeClass($head, 'c-table-shadow--header');
  }
};

var shadowSide = function shadowSide(scrollLeft, scrollLeftEnd, shadowLeft, shadowRight) {
  if (scrollLeft >= scrollLeftEnd) {
    addClass(shadowRight, 'u-dn');
  } else if (scrollLeft > 0) {
    removeClass(shadowLeft, 'u-dn');
    removeClass(shadowRight, 'u-dn');
  } else {
    addClass(shadowLeft, 'u-dn');
  }
};

document.addEventListener("DOMContentLoaded", tableShadow);

// sorting
var sorting = function sorting($target) {
  var target;
  target = document.querySelectorAll($target);
  Array.prototype.forEach.call(target, function (elm, i) {
    elm.onclick = function () {
      Array.prototype.forEach.call(target, function (el, i) {
        if (hasClass(el, 'is-active')) {
          removeClass(el, 'is-active');
          addClass(elm, 'is-active');
        } else {
          addClass(elm, 'is-active');
        }
      });
    };
  });
};

document.addEventListener("DOMContentLoaded", function () {
  sorting('.c-sorting');
});

var tableResponsive = function tableResponsive($target) {
  var target = document.querySelectorAll($target);
  Array.prototype.forEach.call(target, function (el, i) {
    var elm = el.getBoundingClientRect();
    var table = el.querySelector('table').getBoundingClientRect();
    var tbody = el.querySelector('tbody');
    var thead = el.querySelector('thead');
    if (tbody) {
      if (elm.width == table.width && tbody.getBoundingClientRect().height + thead.getBoundingClientRect().height < elm.height) {
        el.style.overflow = 'visible';
      } else {
        el.style.overflow = 'auto';
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  tableResponsive('.c-table--responsive');
});
'use strict';

// Truncate text
var truncate = function truncate() {
  var obj = document.querySelectorAll('.c-truncate');
  Array.prototype.forEach.call(obj, function (el, i) {
    window.addEventListener('load', function () {
      var trun = el.innerHTML;
      var fullTxt = trun;
      var lengthTxt = trun.length;
      var maxLength = el.getAttribute('max-length');
      if (lengthTxt > maxLength && maxLength != '0') {
        var shortText = trun.substring(0, maxLength);
        el.innerHTML = shortText;
        el.addEventListener('mouseover', function () {
          var heighTxt = this.clientHeight;
          el.innerHTML = fullTxt;
          addClass(el, 'is-hover');
          el.parentNode.style.position = 'relative';
          el.parentNode.style.height = heighTxt + 'px';
        });
        el.addEventListener('mouseout', function () {
          el.innerHTML = shortText;
          removeClass(el, 'is-hover');
          el.parentNode.style.position = ' ';
          el.parentNode.style.height = 'auto';
        });
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", truncate);
'use strict';

// Component Multilevel Sidebar Menu
// this is for prototype index
var indexPrototype = function indexPrototype() {
  var trigger = document.getElementsByClassName('jlp-trigger');
  Array.prototype.forEach.call(trigger, function (wrapper, i) {
    var menu = wrapper.querySelectorAll('.lp-sidebar__menu[data-menu]');
    Array.prototype.forEach.call(menu, function (link, i) {
      link.addEventListener('click', function () {
        var removeActive = document.querySelectorAll('.lp-sidebar__menu');
        Array.prototype.forEach.call(removeActive, function (removeactive, i) {
          removeClass(removeactive, 'is-active');
        });
        addClass(this, 'is-active');
        var dataMenuLink = this.getAttribute('data-menu');

        // find data menu page
        var page = document.querySelectorAll('.lp-sidebar__page');
        Array.prototype.forEach.call(page, function (menupage, i) {
          var dataMenuPage = menupage.getAttribute('data-menu');
          if (dataMenuPage === dataMenuLink) {
            removeClass(menupage, 'u-dn');
          } else {
            addClass(menupage, 'u-dn');
          }
        });

        // find data content
        var page = document.querySelectorAll('.lp-content');
        Array.prototype.forEach.call(page, function (menupage, i) {
          var dataMenuPage = menupage.getAttribute('data-content');
          if (dataMenuPage === dataMenuLink) {
            removeClass(menupage, 'u-dn');
            changeContent();
          } else {
            addClass(menupage, 'u-dn');
          }
        });
      });
    });
  });
  changeContent();
  function changeContent() {
    // find content
    var pageContent = document.querySelectorAll('.lp-content');
    Array.prototype.forEach.call(pageContent, function (menupageContent, i) {
      if (!hasClass(menupageContent, 'u-dn')) {
        var wrapperMenu = findSibling(menupageContent, 'lp-sidebar');
        var linkMenu = wrapperMenu.querySelectorAll('.lp-sidebar__page');
        Array.prototype.forEach.call(linkMenu, function (link, i) {
          if (!hasClass(link, 'u-dn')) {
            var linkAction = link.querySelectorAll('.lp-sidebar__page--menu');
            Array.prototype.forEach.call(linkAction, function (el, i) {
              el.addEventListener('click', function () {
                var dataMenu = this.getAttribute('data-menu');
                var currentActive = findSiblingAll(this, 'is-active');
                Array.prototype.forEach.call(currentActive, function (elm, i) {
                  removeClass(elm, 'is-active');
                });
                addClass(this, 'is-active');
                var content = menupageContent.querySelectorAll('.lp-content__link');
                Array.prototype.forEach.call(content, function (el, i) {
                  var contentDataMenu = el.getAttribute('data-menu');
                  if (contentDataMenu == dataMenu) {
                    removeClass(el, 'u-dn');
                  } else {
                    addClass(el, 'u-dn');
                  }
                  var contentMobile = el.closest('.lp-content');
                  if (window.matchMedia('(max-width: 766px)').matches) {
                    addClass(contentMobile, 'is-show-mobile');
                    var back = document.querySelectorAll('.lp-content__back');
                    Array.prototype.forEach.call(back, function (el, i) {
                      el.addEventListener('click', function () {
                        removeClass(contentMobile, 'is-show-mobile');
                      });
                    });
                  }
                });
              });
            });
          }
        });
      }
    });
  }
};
indexPrototype();