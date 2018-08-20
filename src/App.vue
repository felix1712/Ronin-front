<template lang="pug">
	#app.u-bg-snow
		Header
		.p-prfrm-wrapper
			.p-prfrm-content.u-hsm-up.u-tac.u-py-90
				h1.c-smb-18.u-mb-40 Halaman tidak tersedia dalam ukuran mobile.
				<!-- img(src="/assets/images/pages/icon-goals.svg", alt="") -->
			router-view

		<!-- Modal Section -->
		.c-popover.jc-povc-confirmation.u-w-400.u-dn
			.u-tac
				h3.c-smb-15.u-mb-20 Cancel confirmation
				p Are you sure want to cancel this process?
				.u-mt-40
					button.c-btn.c-btn--ghost.c-btn--sm.jc-pov-x No
					button.c-btn.c-btn--delete.c-btn--sm(type="submit") Yes
</template>

<script>
	// design JS include
	var designJs = require('@/assets/scripts/main.js');
	// end design Js
	import Header from '@/components/header/header.vue';

	export default {
		name: 'App',
		components: {
			Header,
		},
		mounted() {
			/* hasClass reusable function ruslan*/
			var hasClass = function(el, className) {
			  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
			}

			/* hasAttr reusable function ruslan*/
			var hasAttr = function(el, attrName, val){
			  var attrVal, toreturn;
			  attrVal = el.getAttribute(attrName);
			  if(val === null || val === undefined){
			    if(attrVal){
			      toreturn = true;
			    } else {
			      toreturn = false;
			    }
			  } else {
			    if(attrVal === val){
			      toreturn = true;
			    } else {
			      toreturn = false;
			    }
			  }
			  return toreturn;
			}

			/* find next sibling */
			var getNextSiblings = function(el, filter) {
			  var siblings = [];
			  while (el= el.nextSibling) { if (!filter || filter(el)) siblings.push(el); }
			  return siblings;
			}

			/* findSibling reusable function ruslan*/
			var findSibling = function(el, className) {
			  var res;
			  var listArr = Array.prototype.filter.call(el.parentNode.children, function(child){
			    return child !== el;
			  });
			  Array.prototype.forEach.call(listArr, function(el, i){
			    if(hasClass(el, className)){
			      res = el;
			    }
			  });
			  return res;
			}

			var findSiblingAll = function(el, className) {
			  var res = [];
			  var listArr = Array.prototype.filter.call(el.parentNode.children, function(child){
			    return child !== el;
			  });
			  Array.prototype.forEach.call(listArr, function(el, i){
			    if(hasClass(el, className)){
			      res.push(el);
			    }
			  });
			  return res;
			}


			/* addClass reusable function ruslan*/
			var addClass = function(el, className, callback) {
			  if (el.classList) el.classList.add(className);
			  else if (!hasClass(el, className)) el.className += ' ' + className;
			  if (callback){
			    callback();
			  }
			}

			/* removeClass reusable function ruslan*/
			var removeClass = function(el, className, callback) {
			  if (el.classList) el.classList.remove(className);
			  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
			  if (callback){
			    callback();
			  }
			}

			/* toggleClass reusable function ruslan*/
			var toggleClass = function(el, className, callback) {
			  if (el.classList) {
			    el.classList.toggle(className);
			  } else {
			    var classes = el.className.split(' ');
			    var existingIndex = classes.indexOf(className);
			    if (existingIndex >= 0)
			      classes.splice(existingIndex, 1);
			    else
			      classes.push(className);
			      el.className = classes.join(' ');
			  }
			  if (callback){
			    callback();
			  }
			}

			var stopPropClick = function(el, callback){
			  if(el){
			    el.addEventListener('click', function(e){
			      e.stopPropagation();
			    });
			  }
			  if (callback){
			    callback();
			  }
			}

			var outsideClickListener = function(state){
			  if(state === "active") {
			    if(!hasClass(document.body, "listenerOn")){
			      addClass(document.body, "listenerOn");
			      document.body.addEventListener("click", hideAllAbsoluteComponent);
			      window.addEventListener("keydown", listenEscButton)
			    }
			  } else {
			    document.body.removeEventListener("click", hideAllAbsoluteComponent);
			    window.removeEventListener("keydown", listenEscButton)
			    removeClass(document.body, "listenerOn");
			  }
			}

			var scrollListener = function(state){
			  var elmList, scrollable =['.l-container', 'body', '.c-table__responsive'];
			  // bug if table more than 1, body not detected.
			  Array.prototype.forEach.call(scrollable, function(el, i){
			    if(el === "body"){
			      elmList = document;
			    } else {
			      elmList = document.querySelector(el);
			    }
			    if(elmList){
			      if(state === "active") {
			        elmList.addEventListener("scroll", hideAllContentPopover);
			      } else {
			        elmList.removeEventListener("scroll", hideAllContentPopover);
			      }
			    }
			  });
			}

			var hideAllAbsoluteComponent = function(){
			  hideAllContentPopover("fade");
			  closeAllOpenSelect();
			  closeAllDropdownActive();
			  outsideClickListener("inactive");
			}

			var listenEscButton = function(e){
			  if(e.key=='Escape'||e.key=='Esc'||e.keyCode==27) {
			    document.body.click();
			  }
			}

			var hideAllContentPopover = function(type){
			  var allpovc, allpovt, scrollable;
			  allpovc = document.getElementsByClassName("c-popover");
			  Array.prototype.forEach.call(allpovc, function(elm, idx){
			    if(!hasClass(elm, "u-dn")){
			      closePopover();
			      outsideClickListener();
			      scrollListener("unactive");
			      if(type == "fade"){
			        fadeOut(elm);
			      } else {
			        addClass(elm, "u-dn");
			      }
			    }
			  });
			  allpovt = document.querySelector(".jc-popover.is-active");
			  if(allpovt)
			    removeClass(allpovt, "is-active");
			}

			/* Event listener for trigger popover close button */
			var closePopover = function(state){
			  var activeCont, closePovc;
			  activeCont = document.querySelector(".c-popover:not(.u-dn)");
			  if(activeCont)
			    closePovc = activeCont.querySelectorAll(".jc-pov-x");
			  if(closePovc){
			    if(state === "active"){
			      Array.prototype.forEach.call(closePovc, function(el, i){
			        el.addEventListener("click", hideAllAbsoluteComponent);
			      });
			    } else {
			      Array.prototype.forEach.call(closePovc, function(el, i){
			        el.removeEventListener("click", hideAllAbsoluteComponent);
			      });
			      scrollListener("unactive");
			    }
			  }
			}

			var closeAllDropdownActive = function(){
			  var $wrapperAll = document.getElementsByClassName("ju-dropdown-w");
			  Array.prototype.forEach.call($wrapperAll, function(elm, i){
			    if(hasClass(elm, "is-active")){
			      removeClass(elm, "is-active");
			      addClass(elm.querySelector(".ju-dropdown-c"), "u-dn");
			    }
			  });
			}
			// // select js

			var defaultSelectTrigger = function(e){
			  var arrow, menu, switchSearch
			  if(!hasClass(this,"is-disabled")){
			    e.stopPropagation();
			    arrow = this.querySelector('.c-select__arrow');
			    menu = findSibling(this, 'c-select__menu');
			    switchSearch = findSibling(this, 'c-select__search--switch');

			    // toggle show menu
			    if (hasClass(menu, 'is-open')){
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

			        function checkHeight() {
			          if (hasClass(menu, 'c-select__top')) {
			            var selectH = menu.offsetHeight;
			            var contentHeight = selectH;
			            menu.style.top = '-'+(contentHeight + 4)+'px';
			          }
			        }

			        Array.prototype.forEach.call(searchEvent, function(elm, i){
			          var resetClick = findSibling(elm, 'with-icon--reset');
			          elm.focus();
			          elm.addEventListener('click', function(e){ e.stopPropagation(); });
			          elm.addEventListener('keyup', function(){
			            var val = this.value.toLowerCase();
			            if (val.length > 0) {
			              removeClass(resetClick, 'u-dn');
			              resetClick.addEventListener('click', function(e){
			                e.stopPropagation();
			                var resetInput = findSibling(this, 'c-form-control');
			                var noResultInfo = this.closest('.c-select__menu').querySelector('.c-select__item--noresult');
			                resetInput.value = "";
			                resetInput.focus();
			                addClass(noResultInfo, 'u-dn');
			                addClass(this, 'u-dn');
			                removeClass(elm, 'u-dn');
			                Array.prototype.forEach.call(itemSearch, function(el, i){
			                  removeClass(el, 'u-dn');
			                  checkHeight();
			                });
			              });
			            }
			            else if (val.length === 0) {
			              addClass(resetClick, 'u-dn');
			            }

			            Array.prototype.forEach.call(itemSearch, function(el, i){
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
			                menu.style.top = '-'+ 96 +'px';
			              }
			            }
			            else {
			              addClass(noResult, 'u-dn');
			              checkHeight();
			            }

			          });
			        });

			      }
			    }
			  }
			}

			var multipleSelectTrigger = function(e){
			  var itemVal, itemValspan, itemValh2,
			      inject, injectPill, itemSelected,
			      item, remove, removedAttr,
			      targetRemoveSelect, toggleType,
			      contentLink, content;

			  itemValspan = this.closest("label").querySelector("span");
			  itemValh2 = this.closest("label").querySelector("h2");
			  if(itemValspan){
			    itemVal = itemValspan.textContent;
			  } else if(itemValh2){
			    itemVal = itemValh2.textContent;
			  } else {
			    itemVal = this.closest("label").textContent;
			  }

			  // when multiple selected item
			  if (this.checked === true && !hasAttr(this, 'data-cbtrigger', 'trigger-remove-all')) {
			    inject = this.closest('.c-select__menu--multiple');
			    injectPill = findSibling(inject, 'c-select__multiple');
			    injectPill.insertAdjacentHTML('beforeend', "<span class='c-select__multiple-item' data-val='"+itemVal+"'>"+itemVal+"<span class='c-select__multiple-remove'>&times;</span></span>");
			    itemSelected = this.closest('.c-select__item');
			    addClass(itemSelected, 'is-selected');

			    if (this.checked === true && hasAttr(this, 'data-cbtrigger', 'trigger-all')){
			      var allOptionItems = inject.querySelectorAll('.c-select__item');
			      Array.prototype.forEach.call(allOptionItems, function(el, i){
			        var itemVal = el.querySelector('input').value;

			        // change selected item to blue
			        if(!hasClass(el, 'is-selected')){
			          el.classList.add('is-selected');
			        };

			        // if there's already a pill
			        var pill = injectPill.querySelector('[data-val="'+itemVal+'"]');
			        if(!pill){
			          injectPill.insertAdjacentHTML('beforeend', "<span class='c-select__multiple-item' data-val='"+itemVal+"'>"+itemVal+"<span class='c-select__multiple-remove'>&times;</span></span>");
			        };
			      });

			      // remove default pill with the trigger-all value
			      var selectAllVal = this.value;
			      var pillAll = injectPill.querySelector('[data-val="'+selectAllVal+'"]');
			      if(pillAll){ pillAll.remove(); }
			    };
			  }

			  // when multiple not selected item
			  else if (this.checked === false) {
			    itemSelected = this.closest('.c-select__item');
			    removeClass(itemSelected, 'is-selected');
			    inject = this.closest('.c-select__menu--multiple');
			    injectPill = findSibling(inject, 'c-select__multiple');
			    item = injectPill.querySelectorAll('.c-select__multiple-item');
			    Array.prototype.forEach.call(item, function(el, i){
			      if (itemVal === el.getAttribute('data-val')) {
			        el.remove();
			      }
			    });

			    if(hasAttr(this, 'data-cbtrigger', 'trigger-all')){
			      var allOptionItems = inject.querySelectorAll('.c-select__item');
			      Array.prototype.forEach.call(allOptionItems, function(el, i){
			        if(hasClass(el, 'is-selected')){
			          el.classList.remove('is-selected');
			        }
			      });

			      Array.prototype.forEach.call(item, function(el, i){
			        el.remove();
			      });
			    }
			  }

			  // remove item from pill and remove selected item on menu
			  inject = this.closest('.c-select__menu--multiple');
			  injectPill = findSibling(inject, 'c-select__multiple');
			  remove = injectPill.querySelectorAll('.c-select__multiple-remove');
			  Array.prototype.forEach.call(remove, function(el, i){
			    el.addEventListener('click', function(){
			      var removed;
			      removed = this.closest('.c-select__multiple-item');
			      removedAttr = removed.getAttribute('data-val');
			      item = inject.querySelectorAll('.c-select__item input[type="checkbox"]');

			      var pillWrapper = this.closest('.c-select__multiple');
			      if(pillWrapper){
			        var pillItem = pillWrapper.querySelectorAll('.c-select__multiple-item');
			        if(pillItem){
			          if(pillItem.length == 1){
			            var defaultVal = findSibling(pillWrapper, "c-select__menu--multiple").querySelector('.c-select__item input[data-type="default"]');
			            if(defaultVal){
			              var selectValue = findSibling(pillWrapper, "c-select__input").querySelector('.c-select__value');
			              var selectPlaceholder = findSibling(pillWrapper, "c-select__input").querySelector('.c-select__placeholder');

			              selectValue.innerHTML = defaultVal.value;

			              if(hasClass(selectValue, 'u-dn')){
			                selectValue.classList.remove('u-dn');
			                selectPlaceholder.classList.add('u-dn');
			              }
			            }
			          }
			        }
			      }
			      Array.prototype.forEach.call(item, function(el, i){
			        itemValspan = el.closest("label").querySelector("span");
			        itemValh2 = el.closest("label").querySelector("h2");
			        if(itemValspan){
			          itemVal = itemValspan.textContent;
			        } else if(itemValh2){
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
			            content = document.querySelectorAll(".ju-togglelc-"+contentLink+"");
			            Array.prototype.forEach.call(content, function(elm, idx){
			              toggleAnimate(elm, toggleType);
			            });
			          }
			          removeClass(targetRemoveSelect, 'is-selected');
			          removed.remove();
			        };

			        // remove select all
			        if( el.checked === true && el.getAttribute('data-cbtrigger') == 'trigger-all' ){
			          el.checked = false;
			          var itemOption = el.closest('.c-select__item');
			          if(hasClass(itemOption, 'is-selected')){
			            itemOption.classList.remove('is-selected');
			          }
			        }
			      });
			    });
			  });
			}

			var customSelect = function() {
			  var wrapper, multipleMenu, input, arrow,
			      switchSearch, placeholder, value,
			      reset, menu, item, def, applyVal,
			      itemVal, itemSelected, currentSelected,
			      defaultValue, inject, injectPill, remove,
			      removed, removedAttr, targetRemoveSelect,
			      itemMultipleChek;
			  var itemOpt, textVal, allCheckbox, allCheckboxChecked,
			      triggerAll, itemValspan, itemValh2,
			      allDefaultCheckboxChecked;

			  wrapper = document.getElementsByClassName('c-select');
			  Array.prototype.forEach.call(wrapper, function(el, i){
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
			      Array.prototype.forEach.call(item, function(elm, i){
			        elm.addEventListener('click', function(){
			          arrow = this.closest(".c-select").querySelector('.c-select__arrow');
			          placeholder = this.closest(".c-select").querySelector('.c-select__placeholder');
			          reset = this.closest(".c-select").querySelector('.c-select__reset');
			          applyVal = el.querySelector('.c-select__value');
			          itemValh2 = this.closest("label").querySelector("h2");
			          itemValspan = this.closest("label").querySelector("span");
			          var altVal = findSibling(this.closest("label"), "c-select--txt-abs");

			          if(itemValh2){
			            itemVal = itemValh2.textContent;
			          } else if(itemValspan){
			            itemVal = itemValspan.textContent;
			          } else if(altVal){
			            itemVal = this.closest("label").textContent + "-" + " " +altVal.textContent;
			          } else {
			            itemVal = this.closest("label").textContent;
			          }

			          itemSelected = this.closest('.c-select__item');
			          currentSelected = findSibling(itemSelected, 'is-selected');
			          if(currentSelected)
			            removeClass(currentSelected, "is-selected");
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
			        reset.addEventListener('click', function(){
			          wrapper = this.closest('.c-select');
			          if(hasClass(wrapper, "c-select--multiplecheck")){
			            menu = wrapper.querySelector(".c-select__menu");
			            allCheckbox = menu.querySelectorAll(".c-check__checkbox");
			            placeholder = wrapper.querySelector('.c-select__placeholder');
			            applyVal = wrapper.querySelector('.c-select__value');
			            Array.prototype.forEach.call(allCheckbox, function(elm, i){
			              setTimeout(function(){
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
			            setTimeout(function(){
			              itemSelected.querySelector("input").checked = false;
			            }, 100);

			            var inputSearch = menu.querySelector('input[type="text"]');
			            var itemSearch = menu.querySelectorAll('.c-select__item');
			            var noResult = menu.querySelector(".c-select__item--noresult");
			            if (inputSearch) {
			              inputSearch.value = "";
			            }
			            if (itemSearch) {
			              Array.prototype.forEach.call(itemSearch, function(elm, i){
			                removeClass(elm, 'u-dn');
			              });
			            }
			            if (noResult) {
			              addClass(noResult, 'u-dn');
			            }
			            if(def){
			              itemVal = def.closest("label").textContent;
			              applyVal.innerHTML = itemVal;
			              addClass(placeholder, "u-dn");
			              addClass(def.closest('.c-select__item'), "is-selected");
			              setTimeout(function(){
			                def.checked = true;
			              }, 100);

			            } else {
			              removeClass(placeholder, "u-dn");
			              applyVal.innerHTML = '';
			            }
			          }
			        });
			      }

			      Array.prototype.forEach.call(itemMultipleChek, function(elm, i){
			        stopPropClick(elm.closest("label"));
			        elm.addEventListener("change", function(e){

			          inject = this.closest('.c-select__menu');
			          injectPill = findSibling(inject, 'c-select__input');
			          placeholder = injectPill.querySelector('.c-select__placeholder');
			          reset = injectPill.querySelector('.c-select__reset');
			          applyVal = injectPill.querySelector('.c-select__value');
			          textVal = applyVal.textContent;
			          var multipleWithRemoveAll = this.closest('.c-select--multiple-remove');
			          var multipleWithDefaultVal = this.closest('.c-select--multiple-default');
			          var spanForpill = this.closest('label').querySelector('span')
			          if (spanForpill) {
			            itemOpt = spanForpill.textContent;
			          }
			          wrapper = this.closest('.c-select');

			          if(hasClass(reset, "u-dn") && hasClass(wrapper, "c-select--multiplecheck")){
			            addClass(placeholder, "u-dn");
			            removeClass(reset, "u-dn");
			          };

			          // when multiple selected item
			          if(this.checked){
			            if(hasAttr(this, "data-cbtrigger", "trigger-all")){
			              textVal = itemOpt;
			            } else if(hasAttr(this, "data-cbtrigger", "trigger-remove-all")){
			              // uncheck all other select options
			              var selectItem = multipleWithRemoveAll.querySelectorAll('.c-select__item label input');
			              Array.prototype.forEach.call(selectItem, function(el, i){
			                if(!hasAttr(el, "data-cbtrigger", "trigger-remove-all")){
			                  el.checked = false;
			                  el.closest('.c-select__item').classList.remove('is-selected');
			                }
			              });

			              // remove all pills
			              this.closest('.c-select--multiple').querySelector('.c-select__multiple').innerHTML = "";

			              // set value & placeholder
			              var placeholder = multipleWithRemoveAll.querySelector('.c-select__placeholder');
			              var value = multipleWithRemoveAll.querySelector('.c-select__value');
			              if(!hasClass(placeholder, 'u-dn')){
			                placeholder.classList.add('u-dn');
			                value.classList.remove('u-dn');
			              }
			            } else {
			              allCheckbox = inject.querySelectorAll(".c-check__checkbox");
			              allCheckboxChecked = inject.querySelectorAll(".c-check__checkbox:checked");

			              // special case for multiple select with remove all (payroll master > general setting)
			              if(multipleWithRemoveAll){
			                var triggerRemoveAll = multipleWithRemoveAll.querySelector(".c-check__checkbox[data-cbtrigger='trigger-remove-all']");
			                if(triggerRemoveAll){
			                  triggerRemoveAll.checked = false;
			                  var selectItemRmv = triggerRemoveAll.closest('.c-select__item.is-selected');
			                  if(selectItemRmv){ selectItemRmv.classList.remove('is-selected'); }
			                };

			                var placeholder = multipleWithRemoveAll.querySelector('.c-select__placeholder');
			                var value = multipleWithRemoveAll.querySelector('.c-select__value');

			                if(hasClass(placeholder, 'u-dn')){
			                  placeholder.classList.remove('u-dn');
			                  value.classList.add('u-dn');
			                }
			              }

			              // special case for multiple select with default value (payroll master > general setting)
			              if(multipleWithDefaultVal){
			                var placeholder = multipleWithDefaultVal.querySelector('.c-select__placeholder');
			                var value = multipleWithDefaultVal.querySelector('.c-select__value');

			                if(hasClass(placeholder, 'u-dn')){
			                  placeholder.classList.remove('u-dn');
			                  value.classList.add('u-dn');
			                };
			              }

			              if(allCheckboxChecked.length == allCheckbox.length){
			                triggerAll = inject.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
			                if(triggerAll) {
			                  textVal = triggerAll.closest("label").querySelector('span').textContent;
			                } else {
			                  var dataCheckAllAttr = wrapper.getAttribute("data-checked-all");
			                  if(dataCheckAllAttr)
			                    var dataCheckAllText = dataCheckAllAttr;
			                  else
			                    var dataCheckAllText = "All options";
			                  textVal = dataCheckAllText;
			                }
			              } else {
			                if(textVal !== ""){
			                  textVal = textVal + ", " +itemOpt;
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
			            if(selectMultiple){
			              placeholder = injectPill.querySelector('.c-select__placeholder');
			              reset = injectPill.querySelector('.c-select__reset');
			              applyVal = injectPill.querySelector('.c-select__value');

			              if(hasClass(placeholder, 'u-dn')){
			                placeholder.classList.remove('u-dn');
			                reset.classList.add('u-dn');
			                applyVal.classList.add('u-dn');
			              }
			            }

			          } else {
			            if(hasAttr(this, "data-cbtrigger", "trigger-all")){
			              textVal = "";
			              if(!hasClass(reset, "u-dn")){
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
			              if(checkAllCheckbox){
			                var selectItem = checkAllCheckbox.closest('.c-select__item');

			                if(hasClass(selectItem, 'is-selected')){
			                  selectItem.classList.remove('is-selected');
			                }
			              }

			              if(allCheckboxChecked.length > 0){
			                Array.prototype.forEach.call(allCheckboxChecked, function(el, i){
			                  if(textVal !== ""){
			                    textVal = textVal + ", " + el.closest("label").querySelector('span').textContent;
			                  } else {
			                    if(!hasAttr(el.closest("label").querySelector('input'), "data-cbtrigger", "trigger-all")){
			                      textVal = el.closest("label").querySelector('span').textContent;
			                    }
			                  }
			                });
			                if(allCheckbox.length == 2) {
			                  triggerAll = inject.querySelector(".c-check__checkbox[data-cbtrigger='trigger-all']");
			                  if(triggerAll) {
			                    if(!hasClass(reset, "u-dn")){
			                      removeClass(placeholder, "u-dn");
			                      addClass(reset, "u-dn");
			                    };
			                  }
			                }
			              } else if(allCheckboxChecked.length == 0) {
			                if(!hasClass(reset, "u-dn")){
			                  removeClass(placeholder, "u-dn");
			                  addClass(reset, "u-dn");
			                };
			              } else {
			                if(hasClass(reset, "u-dn")){
			                  removeClass(placeholder, "u-dn");
			                  addClass(reset, "u-dn");
			                };
			              }

			              if(allDefaultCheckboxChecked){
			                if(multipleWithDefaultVal){
			                  if(allCheckboxChecked.length == allDefaultCheckboxChecked.length){
			                    var placeholder = multipleWithDefaultVal.querySelector('.c-select__placeholder');
			                    var value = multipleWithDefaultVal.querySelector('.c-select__value');

			                    if(!hasClass(placeholder, 'u-dn')){
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
			            if(selectMultiple){
			              placeholder = injectPill.querySelector('.c-select__placeholder');
			              reset = injectPill.querySelector('.c-select__reset');
			              applyVal = injectPill.querySelector('.c-select__value');

			              if(hasClass(placeholder, 'u-dn')){
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
			  Array.prototype.forEach.call(multipleMenu, function(el, i){
			    item = el.querySelectorAll('.c-select__item input[type="checkbox"]');
			    Array.prototype.forEach.call(item, function(elm, i){
			      elm.addEventListener('change', multipleSelectTrigger);
			    });

			    // remove item from pill and remove selected item on menu
			    injectPill = findSibling(el, 'c-select__multiple');
			    remove = injectPill.querySelectorAll('.c-select__multiple-remove');
			    Array.prototype.forEach.call(remove, function(elm, i){
			      elm.addEventListener('click', function(){
			        removed = this.closest('.c-select__multiple-item');
			        removedAttr = removed.getAttribute('data-val');
			        item = el.querySelectorAll('.c-select__item input[type="checkbox"]');
			        Array.prototype.forEach.call(item, function(elmt, i){
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


			var closeAllOpenSelect = function(){
			  var menuAll, arrowAll, switchSearchAll;
			  menuAll = document.getElementsByClassName('c-select__menu');
			  Array.prototype.forEach.call(menuAll, function(el, i){
			    if (hasClass(el, 'is-open')) {
			      removeClass(el, 'is-open');
			      outsideClickListener();
			    }
			  });

			  arrowAll = document.getElementsByClassName('c-select__arrow');
			  Array.prototype.forEach.call(arrowAll, function(el, i){
			    if (hasClass(el, 'is-up')) {
			      removeClass(el, 'is-up');
			    }
			  });

			  switchSearchAll = document.getElementsByClassName('c-select__search--switch');
			  Array.prototype.forEach.call(switchSearchAll, function(el, i){
			    if (hasClass(el, 'is-open')) {
			      removeClass(el, 'is-open');
			      outsideClickListener();
			    }
			  });
			}

			var closeThisSelect = function(menu, switchSearch, arrow){
			  removeClass(menu, 'is-open');
			  if (switchSearch) {
			    removeClass(switchSearch, 'is-open');
			  }
			  removeClass(arrow, 'is-up');
			  outsideClickListener();
			}

			//c-select__menu--search, c-select__multiple, c-select__input is-error
			var openThisSelect = function(menu, switchSearch, arrow, trig){
			  var selectH, trigOffset,trigOffsetBottom, isMultiple,
			      isMultipleSelected, isError, contentHeight, isSwitch,
			      isWrapped;
			  menu.style.opacity = 0;
			  addClass(menu, "is-open", function(){
			    selectH = menu.offsetHeight;
			    contentHeight = selectH;
			    menu.style.opacity = 1;
			    removeClass(menu, "is-open");
			  });
			  isWrapped = trig.closest(".ju-wrapper-g");
			  trigOffset = trig.getBoundingClientRect();
			  if(isWrapped){
			    trigOffsetBottom = isWrapped.getBoundingClientRect().bottom - (trigOffset.top + trig.offsetHeight);
			  } else {
			    trigOffsetBottom = window.innerHeight - (trigOffset.top + trig.offsetHeight);
			  }
			  isMultiple = trig.closest('.c-select--multiple');
			  isSwitch = trig.closest('.c-select--switch');
			  if(hasClass(trig, 'is-error')){
			    contentHeight = selectH + 30;
			  }
			  if(isMultiple) {
			    isMultipleSelected = isMultiple.querySelector('.c-select__menu--multiple .is-selected');
			    if(isMultipleSelected)
			      contentHeight = selectH + 35;
			  }
			  if(trigOffsetBottom < contentHeight){
			    addClass(menu, 'c-select__top');
			    menu.style.top = ((selectH +4) *-1) +'px';
			  } else {
			    if(hasClass(menu, 'c-select__top')){
			      removeClass(menu, 'c-select__top');
			    }
			    menu.style.top = trig.offsetHeight+2+'px';
			  }
			  if(isSwitch) {
			    addClass(switchSearch, 'is-open');
			  }

			  if (switchSearch) {
			    var showSearch = switchSearch.querySelector('input');
			    showSearch.focus();
			    var result = findSibling(switchSearch, 'c-select__menu--result');
			    var items = result.querySelectorAll(".c-select__item");
			    var noResult = result.querySelector(".c-select__item--noresult");
			    var itemsLength = items.length;
			    showSearch.addEventListener('click', function(e){
			      e.stopPropagation();
			    });

			    showSearch.addEventListener('keyup', function(){

			      function checkHeight() {
			        if (hasClass(result, 'c-select__top')) {
			          selectH = menu.offsetHeight;
			          contentHeight = selectH;
			          result.style.top = '-'+(contentHeight + 4)+'px';
			        }
			      }

			      var val = this.value.toLowerCase();
			      var resetClick = findSibling(this, "with-icon--reset");
			      removeClass(resetClick, 'u-dn');
			      if (val.length > 0) {
			        resetClick.addEventListener('click', function(e){
			          var pasteVal = findSibling(this, "c-form-control");
			          pasteVal.value = '';
			          e.stopPropagation();
			          if (pasteVal.value === '') {
			            Array.prototype.forEach.call(items, function(el, i){
			              removeClass(el, 'u-dn');
			              addClass(noResult, 'u-dn');
			              checkHeight();
			            });
			          }
			          addClass(resetClick, 'u-dn');
			          showSearch.focus();
			        });
			      }
			      else if (val.length === 0) {
			        addClass(resetClick, 'u-dn');
			      }

			      Array.prototype.forEach.call(items, function(el, i){
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
			          result.style.top = '-'+ 42 +'px';
			        }
			      }
			      else {
			        addClass(noResult, 'u-dn');
			        checkHeight();
			      }
			    });
			  }

			    addClass(arrow, 'is-up');
			    addClass(menu, 'is-open');
			    outsideClickListener("active");
			}


			/// filter search
			var filterSearch = function() {
			  var iconSearch = document.querySelector('.c-filter__button-search');
			  if(iconSearch) {
			    iconSearch.onclick = function(e) { active(this, e); }
			    deactive(iconSearch.closest('.c-filter__search--autohide'));
			  }
			}

			var deactive = function(el) {
			  var reset = el.querySelector('.with-icon--reset');
			  var input = el.querySelector('.c-form-control');
			  window.onclick = function() {
			    removeClass(el, 'is-active');
			    resetSearch(el, input);
			  }

			  window.onkeyup = function(e) {
			    if(e.keyCode == 27) {
			      removeClass(el, 'is-active');
			      resetSearch(el, input);
			    }
			  }

			  input.onclick = function(e) {
			    active(this, e);
			  }
			}

			var active = function(el, e) {
			  e.stopPropagation();
			  var searchWrapper = el.closest('.c-filter__search');
			  addClass(searchWrapper, 'is-active');
			  size(el.closest('.c-filter'));
			}

			var size = function(el) {
			  if(window.innerWidth > 1199 && window.innerWidth < 1601) {
			    var boxRight = el.querySelector('.c-filter__search').getBoundingClientRect().right;
			    var showLeft = el.querySelector('.c-filter__button').getBoundingClientRect().left;
			    var boxSize = boxRight - showLeft - 15;
			    var input = el.querySelector('.c-filter__search .c-form-control');
			    input.style.width = boxSize +'px';
			  }
			}

			var resetSearch = function(el, input) {
			  var $reset = el.querySelector('.with-icon--reset');
			  if($reset) {
			    var reset = function(el) {
			      var resetEl = findSibling(el, 'jc-input-search');
			      resetEl.value = '';
			      resetEl.blur();
			      addClass(el, 'u-dn');
			      input.removeAttribute('style');
			    }

			    if(!hasClass(el, 'is-active')) {
			      reset($reset);
			    }

			    $reset.addEventListener('click', function(){
			      reset(this);
			    });
			  }
			}

			filterSearch();

		}
	};
</script>

<style src="@/assets/styles/main.scss"></style>
