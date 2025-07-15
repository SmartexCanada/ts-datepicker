/*! ts-datepicker v1.0.0, @license MIT */
(function(g,f){if(typeof exports=="object"&&typeof module<"u"){module.exports=f()}else if("function"==typeof define && define.amd){define(f)}else {g["DatePicker"]=f()}}(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : this,function(){var exports={};var __exports=exports;var module={exports};
"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => DatePicker
});
module.exports = __toCommonJS(index_exports);

// src/consts/classes.ts
var positions = ["left", "center", "right", "top", "middle", "bottom", "outside"];
var positionPrefix = "datepicker-position--";
var classes = {
  datepicker: "datepicker",
  picker: "datepicker-picker",
  navigation: "datepicker--navigation",
  content: "datepicker--content",
  buttons: "datepicker--buttons",
  navContainer: "datepicker-nav",
  navAction: "datepicker-nav--action",
  navTitle: "datepicker-nav--title",
  body: "datepicker-body",
  dayNames: "datepicker-body--day-names",
  dayName: "datepicker-body--day-name",
  weekNumbers: "datepicker-body--week-numbers",
  daysContainer: "datepicker-days",
  cells: "datepicker-body--cells",
  cell: "datepicker-cell",
  buttonsContainer: "datepicker-buttons",
  button: "datepicker-button",
  active: "active",
  inline: "inline",
  hidden: "hidden",
  disabled: "disabled",
  current: "current",
  focused: "focus",
  selected: "selected",
  minDate: "min-date",
  maxDate: "max-date",
  otherMonth: "other-month",
  otherDecade: "other-decade",
  rangeFrom: "range-from",
  rangeTo: "range-to",
  inRange: "in-range",
  rangeDisabled: "range-disabled",
  editMode: "edit-mode",
  hasWeekNumbers: "has-week-numbers",
  positions: positions.reduce((result, position) => {
    result[position] = positionPrefix + position;
    return result;
  }, {})
};

// src/consts/keybinds.ts
var defaultKeybinds = {
  prevMonth: { keys: { key: "ArrowLeft", ctrl: true }, callback: "prevMonth", preventDefault: true },
  nextMonth: { keys: { key: "ArrowRight", ctrl: true }, callback: "nextMonth", preventDefault: true },
  prevYear: { keys: { key: "ArrowLeft", shift: true }, callback: "prevYear", preventDefault: true },
  nextYear: { keys: { key: "ArrowRight", shift: true }, callback: "nextYear", preventDefault: true },
  switchView: { keys: { key: "ArrowUp", ctrl: true }, callback: "switchView", preventDefault: true },
  exitEditMode: { keys: { key: "ArrowDown", ctrl: true }, callback: "exitEditMode", preventDefault: true }
};

// src/consts/defaults.ts
var viewTypes = ["days", "months", "years"];
var defaults = {
  allowInput: true,
  altInput: false,
  altInputFormat: "M d, yyyy",
  autoClose: true,
  buttons: false,
  classes: "",
  container: null,
  dateDelimiter: ",",
  dateFormat: null,
  defaultDate: "",
  disabledDates: [],
  enabledDates: [],
  inline: false,
  keyboardNav: true,
  keybinds: defaultKeybinds,
  locale: "en",
  maxDate: null,
  minDate: null,
  maxView: "years",
  minView: "days",
  startView: "days",
  monthsField: "monthsShort",
  multipleDates: false,
  navTitles: {
    days: "MM, <i>yyyy</i>",
    months: "yyyy",
    years: "yyyy1 - yyyy2"
  },
  nextArrow: "",
  prevArrow: "",
  offset: 0,
  position: "auto",
  range: false,
  dynamicRange: true,
  rtl: null,
  showOtherMonths: true,
  selectOtherMonths: true,
  selectOtherYears: true,
  showOn: true,
  toggleSelected: true,
  updateOnBlur: true,
  weekNumbers: false,
  weekStart: null,
  onBeforeSelect: null,
  onRenderCell: null,
  onShow: null,
  onHide: null,
  onFocus: null,
  onChangeDate: null,
  onChangeView: null,
  onChangeViewDate: null
};
function getDefaults() {
  return defaults;
}

// src/eventable.ts
var Eventable = class {
  constructor() {
    __publicField(this, "__listeners", /* @__PURE__ */ new Map());
  }
  /**
   * Add event listener for specified event
   */
  on(eventType, handler) {
    if (!handler) {
      return () => {
      };
    }
    let listeners = this.__listeners.get(eventType);
    if (!listeners) {
      listeners = [];
      this.__listeners.set(eventType, listeners);
    }
    listeners.push(handler);
    return () => this.off(eventType, handler);
  }
  off(eventType, handler) {
    if (typeof eventType === "undefined") {
      return this.__listeners.clear();
    }
    if (typeof handler === "undefined") {
      this.__listeners.delete(eventType);
      return;
    }
    const listeners = this.__listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(handler);
      if (index > -1) {
        listeners.splice(index, 1);
        if (!listeners.length) {
          this.__listeners.delete(eventType);
        }
      }
    }
  }
  trigger(eventType, data) {
    if (!(eventType instanceof CustomEvent)) {
      eventType = new CustomEvent(eventType, {
        detail: data
      });
    }
    const listeners = this.__listeners.get(eventType.type);
    if (listeners) {
      listeners.forEach((handler) => handler(eventType));
    }
  }
};

// src/i18n/default.ts
var English = {
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  today: "Today",
  clear: "Clear",
  format: "mm/dd/yyyy",
  weekStart: 0
};
var locales = {
  default: English,
  en: English
};

// src/consts/buttons.ts
var buttonPresets = {
  today: {
    content: (picker) => picker.locale.today,
    onClick: (picker) => {
      const today2 = /* @__PURE__ */ new Date();
      if (picker.config.range) {
        picker.selectDate([today2, today2]);
      } else {
        const selectedDate = picker.adapter.getSelectedDate(today2);
        if (selectedDate) {
          picker.adapter.handleAlreadySelectedDates(selectedDate, today2);
        } else {
          picker.selectDate(today2);
        }
      }
    }
  },
  clear: {
    content: (picker) => picker.locale.clear,
    onClick: (picker) => picker.clear()
  }
};
function getButtonPreset(preset) {
  return buttonPresets[preset];
}

// src/utils/dom.ts
function parseHTML(html) {
  const template2 = document.createElement("template");
  template2.innerHTML = html;
  return template2.content;
}
function classNames(...classes2) {
  let classNames2 = [];
  classes2.forEach((className) => {
    if (typeof className === "object") {
      for (let name in className) {
        if (className[name]) {
          classNames2.push(name);
        }
      }
    } else if (className) {
      classNames2.push(className);
    }
  });
  return classNames2;
}
function findScrollParents(element) {
  const parent = getParent(element);
  if (!parent || parent === document.body) {
    return null;
  }
  return window.getComputedStyle(parent).overflow === "visible" ? findScrollParents(parent) : parent;
}
function getParent(element) {
  return element.parentElement || (element.parentNode instanceof ShadowRoot ? element.parentNode.host : null);
}
function getTextDirection(element) {
  return window.getComputedStyle(element).direction;
}

// src/picker/Buttons.ts
var Buttons = class {
  constructor(datePicker) {
    __publicField(this, "datePicker");
    __publicField(this, "element");
    this.datePicker = datePicker;
    this.element = document.createElement("div");
    this.element.classList.add(classes.buttonsContainer);
    this._render();
  }
  /**
   * Destroy instance
   */
  destroy() {
    this.datePicker = null;
    this.element.remove();
    this.element = null;
  }
  /**
   * Re-render buttons
   */
  update() {
    this._clearButtons();
    this._render();
  }
  /**
   * Render buttons
   */
  _render() {
    let buttons = this.datePicker.config.buttons;
    if (buttons === false || this.element.childElementCount) {
      return;
    }
    if (!Array.isArray(buttons)) {
      buttons = [buttons];
    }
    buttons.forEach((data) => {
      if (typeof data === "string") {
        if (!buttonPresets[data]) {
          return;
        }
        data = getButtonPreset(data);
      }
      const button = this._createButton(data);
      this.element.append(button);
    });
  }
  /**
   * Create button
   */
  _createButton(data) {
    const button = document.createElement(data.tagName || "button");
    const content = typeof data.content === "function" ? data.content(this.datePicker) : data.content;
    button.append(parseHTML(content));
    button.classList.add(...classNames(classes.button, data.className));
    if (data.attributes) {
      Object.keys(data.attributes).forEach((attr) => {
        if (data.attributes[attr] !== void 0) {
          button.setAttribute(attr, data.attributes[attr]);
        }
      });
    }
    if (data.onClick) {
      const onClick = data.onClick;
      button.addEventListener("click", () => onClick(this.datePicker));
    }
    return button;
  }
  /**
   * Remove buttons
   */
  _clearButtons() {
    this.element.innerHTML = "";
  }
};

// src/utils/date.ts
function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}
function today() {
  return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
}
function getDecade(date) {
  const firstYear = Math.floor(date.getFullYear() / 10) * 10;
  return [firstYear, firstYear + 9];
}
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
function subtractDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
function sortDates(dates, withTime = false) {
  return dates.slice().sort((a, b) => {
    return withTime ? a.getTime() - b.getTime() : stripTime(a) - stripTime(b);
  });
}
function isSameDate(d1, d2, type) {
  if (!d1 || !d2) {
    return false;
  }
  switch (type) {
    case "days":
      return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    case "months":
      return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    case "years":
      return d1.getFullYear() === d2.getFullYear();
  }
}
function isDateBefore(date, comparedDate, includeEqual = false) {
  const d1 = stripTime(date), d2 = stripTime(comparedDate);
  return includeEqual ? d1 <= d2 : d1 < d2;
}
function isDateAfter(date, comparedDate, includeEqual = false) {
  const d1 = stripTime(date), d2 = stripTime(comparedDate);
  return includeEqual ? d1 >= d2 : d1 > d2;
}
function isDateBetween(date, dateFrom, dateTo) {
  return isDateAfter(date, dateFrom) && isDateBefore(date, dateTo);
}
function dayDiff(day, from) {
  return (day - from + 7) % 7;
}
function getDayOfWeek(date, dayOfWeek, weekStart) {
  date = typeof date === "number" ? new Date(date) : date;
  const day = date.getDay();
  return addDays(date, dayDiff(dayOfWeek, weekStart) - dayDiff(day, weekStart));
}
function getWeekNumber(date, weekStart) {
  switch (weekStart) {
    case 6:
      return getMidEasternWeek(date);
    case 0:
      return getWesternTradWeek(date);
    default:
      return getIsoWeek(date);
  }
}
function getIsoWeek(date) {
  const thursOfWeek = getDayOfWeek(date, 4, 1);
  const firstThurs = getDayOfWeek(new Date(thursOfWeek).setMonth(0, 4), 4, 1);
  return calculateWeekNumber(thursOfWeek.getTime(), firstThurs.getTime());
}
function getWesternTradWeek(date) {
  return calculateTraditionalWeekNumber(date, 0);
}
function getMidEasternWeek(date) {
  return calculateTraditionalWeekNumber(date, 6);
}
function calculateWeekNumber(dayOfWeek, dayOfFirstWeek) {
  return Math.round((dayOfWeek - dayOfFirstWeek) / 6048e5) + 1;
}
function calculateTraditionalWeekNumber(date, weekStart) {
  const startOfFirstWeek = getDayOfWeek(new Date(date).setMonth(0, 1), weekStart, weekStart);
  const startOfWeek = getDayOfWeek(date, weekStart, weekStart);
  const weekNumber = calculateWeekNumber(startOfWeek.getTime(), startOfFirstWeek.getTime());
  if (weekNumber < 53) {
    return weekNumber;
  }
  const weekOneOfNextYear = getDayOfWeek(new Date(date).setDate(32), weekStart, weekStart);
  return startOfWeek === weekOneOfNextYear ? 1 : weekNumber;
}

// src/utils/equal.ts
/*!
 * Optimized `isEqual`
 * Underscore.js 1.13.7
 * https://underscorejs.org
 */
var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var symbolValueOf = Symbol.prototype.valueOf;
var keys = Object.keys;
var isView = ArrayBuffer.isView;
function isEqual(object, other) {
  return eq(object, other);
}
function eq(a, b, aStack, bStack) {
  if (a === b)
    return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null)
    return false;
  if (a !== a)
    return b !== b;
  const type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object")
    return false;
  return deepEqual(a, b, aStack, bStack);
}
function deepEqual(a, b, aStack, bStack) {
  const className = toString.call(a);
  if (className !== toString.call(b))
    return false;
  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a === "" + b;
    case "[object Number]":
      if (+a !== +a)
        return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;
    case "[object Symbol]":
      return symbolValueOf.call(a) === symbolValueOf.call(b);
    case "[object ArrayBuffer]":
    case "[object DataView]":
      return false;
  }
  let areArrays = className === "[object Array]";
  if (!areArrays && isTypedArray(a)) {
    if (getByteLength(a) !== getByteLength(b))
      return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
      return true;
    areArrays = true;
  }
  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object")
      return false;
    const aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(typeof aCtor === "function" && aCtor instanceof aCtor && typeof bCtor === "function" && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
      return false;
    }
  }
  aStack = aStack || [];
  bStack = bStack || [];
  let length = aStack.length;
  while (length--) {
    if (aStack[length] === a)
      return bStack[length] === b;
  }
  aStack.push(a);
  bStack.push(b);
  if (areArrays) {
    length = a.length;
    if (length !== b.length)
      return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack))
        return false;
    }
  } else {
    const _keys = keys(a);
    let key;
    length = _keys.length;
    if (keys(b).length !== length)
      return false;
    while (length--) {
      key = _keys[length];
      if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
        return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}
function has(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}
function getByteLength(obj) {
  return obj == null ? void 0 : obj.byteLength;
}
function isTypedArray(obj) {
  return isView(obj) && !(toString.call(obj) === "[object DataView]");
}

// src/picker/Keyboard.ts
var Keyboard = class {
  constructor(datePicker) {
    __publicField(this, "datePicker");
    __publicField(this, "keybinds", []);
    __publicField(this, "keydownListener");
    this.datePicker = datePicker;
    const element = this.datePicker.altInput || this.datePicker.element;
    this.keydownListener = this._onKeydown.bind(this);
    element.addEventListener("keydown", this.keydownListener);
    const keybinds = this.datePicker.config.keybinds;
    if (keybinds) {
      Object.keys(keybinds).forEach((name) => this.on(keybinds[name]));
    }
  }
  /**
   * Destroy instance
   */
  destroy() {
    this.datePicker.element.removeEventListener("keydown", this.keydownListener);
    this.datePicker = null;
    this.keybinds = null;
  }
  /**
   * Add keybind.
   */
  on(keybind) {
    if (Array.isArray(keybind)) {
      keybind.forEach((item) => this.on(item));
      return this;
    }
    if (!keybind.keys || !keybind.callback) {
      return this;
    }
    if (Array.isArray(keybind.keys)) {
      keybind.keys.forEach((key) => this.on(__spreadProps(__spreadValues({}, keybind), { keys: key })));
      return this;
    }
    const _keybind = __spreadProps(__spreadValues({}, keybind), {
      keys: __spreadProps(__spreadValues({}, keybind.keys), {
        key: keybind.keys.key.toLowerCase()
      })
    });
    let handler = this.keybinds.find((item) => isEqual(item.keys, _keybind.keys));
    if (!handler) {
      handler = {
        keys: _keybind.keys,
        callbacks: []
      };
      this.keybinds.push(handler);
    }
    const callbacks = Array.isArray(_keybind.callback) ? _keybind.callback : [_keybind.callback];
    callbacks.forEach((callback) => handler.callbacks.push(
      { callback, preventDefault: !!_keybind.preventDefault }
    ));
    return this;
  }
  /**
   * Remove keybind.
   * If `keybind.callback` is omitted, all keybinds with matching keys will be removed.
   * If keybind is omitted, all keybinds will be removed.
   */
  off(keybind) {
    if (!keybind) {
      this.keybinds = [];
      return this;
    }
    if (Array.isArray(keybind)) {
      keybind.forEach((item) => this.off(item));
      return this;
    }
    if (!keybind.keys) {
      return this;
    }
    if (Array.isArray(keybind.keys)) {
      keybind.keys.forEach((key) => this.off(__spreadProps(__spreadValues({}, keybind), { keys: key })));
      return this;
    }
    keybind = __spreadProps(__spreadValues({}, keybind), {
      keys: __spreadProps(__spreadValues({}, keybind.keys), {
        key: keybind.keys.key.toLowerCase()
      })
    });
    const handler = this.keybinds.find((item) => isEqual(item.keys, keybind.keys));
    if (handler) {
      if (keybind.callback) {
        const callbacks = Array.isArray(keybind.callback) ? keybind.callback : [keybind.callback];
        callbacks.forEach((callback) => {
          const index = handler.callbacks.findIndex((item) => item.callback === callback);
          if (index >= 0) {
            handler.callbacks.splice(index, 1);
          }
        });
      }
      if (!keybind.callback || !handler.callbacks.length) {
        this.keybinds.splice(this.keybinds.indexOf(handler), 1);
      }
    }
    return this;
  }
  /**
   * Handle keydown event
   */
  _onKeydown(event) {
    const isEditMode = this.datePicker.isEditMode();
    const key = event.key.toLowerCase();
    if (key === "tab") {
      this._unfocus();
      return;
    }
    if (key === "enter") {
      event.preventDefault();
      if (!this.datePicker.visible) {
        this.datePicker.show();
      } else if (isEditMode) {
        this.datePicker.adapter.exitEditMode(true);
      } else {
        if (!this.datePicker.isMinView()) {
          this.datePicker.changeView("down");
          return;
        }
        const focusDate = this.datePicker.focusDate;
        if (focusDate) {
          const selectedDate = this.datePicker.adapter.getSelectedDate(focusDate);
          if (selectedDate) {
            this.datePicker.adapter.handleAlreadySelectedDates(selectedDate, focusDate);
          } else {
            this.datePicker.selectDate(focusDate);
          }
          return;
        }
      }
    }
    if (key === "escape") {
      this.datePicker.hide();
      return;
    }
    const keybinds = this._findKeybinds(event);
    if (keybinds.length) {
      this._handleKeybinds(event, keybinds);
      return;
    }
    if (!isEditMode && this._focusNextCell(key)) {
      event.preventDefault();
      return;
    }
  }
  /**
   * Retrieve matching keybinds for given event
   */
  _findKeybinds(event) {
    const key = event.key.toLowerCase();
    const ctrlKey = event.ctrlKey || event.metaKey;
    const { shiftKey, altKey } = event;
    return this.keybinds.filter(
      (item) => item.keys.key == key && (item.keys.ctrl == null || item.keys.ctrl === ctrlKey) && (item.keys.shift == null || item.keys.shift === shiftKey) && (item.keys.alt == null || item.keys.alt === altKey)
    );
  }
  /**
   * Handle keybinds for event
   */
  _handleKeybinds(event, handlers) {
    handlers.sort((a, b) => Object.keys(b.keys).length - Object.keys(a.keys).length);
    handlers[0].callbacks.forEach((handler) => {
      if (typeof handler.callback === "string") {
        this._action(handler.callback);
      } else {
        handler.callback(event, this.datePicker);
      }
      if (handler.preventDefault) {
        event.preventDefault();
      }
    });
  }
  /**
   * Call datepicker action
   */
  _action(action) {
    switch (action) {
      case "show":
        this.datePicker.show();
        break;
      case "hide":
        this.datePicker.hide();
        break;
      case "toggle":
        if (this.datePicker.visible) {
          this.datePicker.hide();
        } else {
          this.datePicker.show();
        }
        break;
      case "prevMonth":
      case "nextMonth":
      case "prevYear":
      case "nextYear":
        break;
      case "switchView":
        this.datePicker.changeView("up");
        break;
      case "clear":
        this.datePicker.clear();
        break;
      case "today":
        this.datePicker.setViewDate(/* @__PURE__ */ new Date());
        break;
      case "exitEditMode":
        this.datePicker.adapter.exitEditMode();
        break;
    }
  }
  /**
   * Move focus between cells
   */
  _focusNextCell(key) {
    const { currentView } = this.datePicker;
    const focusDate = this._getFocusDate();
    let [year, month, day] = [focusDate.getFullYear(), focusDate.getMonth(), focusDate.getDate()];
    switch (key) {
      case "arrowleft":
        currentView === "days" ? day -= 1 : "";
        currentView === "months" ? month -= 1 : "";
        currentView === "years" ? year -= 1 : "";
        break;
      case "arrowright":
        currentView === "days" ? day += 1 : "";
        currentView === "months" ? month += 1 : "";
        currentView === "years" ? year += 1 : "";
        break;
      case "arrowup":
        currentView === "days" ? day -= 7 : "";
        currentView === "months" ? month -= 3 : "";
        currentView === "years" ? year -= 4 : "";
        break;
      case "arrowdown":
        currentView === "days" ? day += 7 : "";
        currentView === "months" ? month += 3 : "";
        currentView === "years" ? year += 4 : "";
        break;
      default:
        return false;
    }
    const newDate = this._clampDate(new Date(year, month, day));
    this.datePicker.setFocusDate(newDate, true);
    return true;
  }
  /**
   * Retrieve initial focus date
   */
  _getFocusDate() {
    const { focusDate, selectedDates, viewDate } = this.datePicker;
    const [year, month] = [viewDate.getFullYear(), viewDate.getMonth()];
    let focused = focusDate || selectedDates[selectedDates.length - 1];
    if (!focused) {
      switch (this.datePicker.currentView) {
        case "days":
          focused = new Date(year, month, (/* @__PURE__ */ new Date()).getDate());
          break;
        case "months":
          focused = new Date(year, month, 1);
          break;
        case "years":
          focused = new Date(year, 0, 1);
          break;
      }
    }
    return focused;
  }
  /**
   * Clamp date between min and max dates
   */
  _clampDate(date) {
    const { minDate, maxDate } = this.datePicker;
    if (maxDate && isDateAfter(date, maxDate)) {
      return maxDate;
    } else if (minDate && isDateBefore(date, minDate)) {
      return minDate;
    }
    return date;
  }
  /**
   * Handle removing focus from datepicker input
   */
  _unfocus() {
    if (this.datePicker.element !== document.activeElement) {
      if (this.datePicker.config.updateOnBlur) {
        this.datePicker.adapter.exitEditMode(true);
      } else {
        this.datePicker.adapter.setInputValue();
      }
      this.datePicker.hide();
    }
  }
};

// src/picker/Navigation.ts
var defaultTitles = {
  days: "MM, <i>yyyy</i>",
  months: "yyyy",
  years: "yyyy1 - yyyy2"
};
var defaultNextArrow = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path></svg>';
var defaultPrevArrow = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path></svg>';
var Navigation = class {
  constructor(datePicker) {
    __publicField(this, "datePicker");
    __publicField(this, "element");
    __publicField(this, "prevButton");
    __publicField(this, "nextButton");
    __publicField(this, "titleElement");
    __publicField(this, "prevClickListener");
    __publicField(this, "nextClickListener");
    __publicField(this, "titleClickListener");
    __publicField(this, "changeViewListener");
    __publicField(this, "changeDateListener");
    this.datePicker = datePicker;
    this.element = document.createElement("nav");
    this.element.classList.add(classes.navContainer);
    this._buildHtml();
    this._updateArrows();
    this.changeViewListener = () => this._onChangeView();
    this.changeDateListener = () => setTimeout(() => this.render());
    this.datePicker.on("_changeCurrentView", this.changeViewListener);
    this.datePicker.on("changeViewDate", this.changeViewListener);
    if (this._hasNavTitleCallback()) {
      this.datePicker.on("_changeSelectedDate", this.changeDateListener);
    }
    this.render();
    this._updateNavStatus();
  }
  /**
   * Destroy instance
   */
  destroy() {
    this.datePicker.off("changeViewDate", this.changeViewListener);
    this.datePicker.off("_changeCurrentView", this.changeViewListener);
    this.datePicker.off("_changeSelectedDate", this.changeDateListener);
    this.datePicker = null;
    this.prevButton = null;
    this.nextButton = null;
    this.titleElement = null;
    this.element.remove();
    this.element = null;
  }
  /**
   * Render title
   */
  render() {
    this.titleElement.innerHTML = this._getTitle();
    this.titleElement.classList.toggle(classes.disabled, this.datePicker.isMaxView());
  }
  /**
   * Update navigation
   */
  update() {
    this.render();
    this._updateNavStatus();
    this._updateArrows();
  }
  /**
   * Build html for navigation
   */
  _buildHtml() {
    this.prevClickListener = () => this.datePicker.prev();
    this.nextClickListener = () => this.datePicker.next();
    this.titleClickListener = () => this.datePicker.changeView("up");
    const { nextArrow, prevArrow } = this.datePicker.config;
    const rtl = this.datePicker.rtl;
    this.prevButton = document.createElement("button");
    this.prevButton.classList.add(classes.navAction, "prev");
    this.prevButton.setAttribute("data-action", "prev");
    this.prevButton.append(parseHTML(
      rtl ? nextArrow || defaultNextArrow : prevArrow || defaultPrevArrow
    ));
    this.prevButton.addEventListener("click", this.prevClickListener);
    this.nextButton = document.createElement("button");
    this.nextButton.classList.add(classes.navAction, "next");
    this.nextButton.setAttribute("data-action", "next");
    this.nextButton.append(parseHTML(
      rtl ? prevArrow || defaultPrevArrow : nextArrow || defaultNextArrow
    ));
    this.nextButton.addEventListener("click", this.nextClickListener);
    this.titleElement = document.createElement("button");
    this.titleElement.classList.add(classes.navTitle);
    this.titleElement.addEventListener("click", this.titleClickListener);
    this.element.append(this.prevButton, this.titleElement, this.nextButton);
  }
  /**
   * Update arrows content
   */
  _updateArrows() {
    const { nextArrow, prevArrow } = this.datePicker.config;
    const rtl = this.datePicker.rtl;
    this.prevButton.innerHTML = "";
    this.prevButton.append(parseHTML(
      rtl ? nextArrow || defaultNextArrow : prevArrow || defaultPrevArrow
    ));
    this.nextButton.innerHTML = "";
    this.nextButton.append(parseHTML(
      rtl ? prevArrow || defaultPrevArrow : nextArrow || defaultNextArrow
    ));
  }
  /**
   * Check if any nav title template is a callback
   */
  _hasNavTitleCallback() {
    const navTitles = this.datePicker.config.navTitles;
    return Object.keys(navTitles).some(
      (view) => typeof navTitles[view] === "function"
    );
  }
  /**
   * Get content for title
   */
  _getTitle() {
    const view = this.datePicker.currentView;
    const template2 = this.datePicker.config.navTitles[view];
    if (typeof template2 === "function") {
      return template2(this.datePicker);
    }
    return this.datePicker.formatDate(this.datePicker.viewDate, template2 || defaultTitles[view]);
  }
  /**
   * Handle view level change
   */
  _onChangeView() {
    this.render();
    this._updateNavStatus();
  }
  /**
   * Update navigation actions
   */
  _updateNavStatus() {
    const { minDate, maxDate, viewDate } = this.datePicker;
    this.prevButton.disabled = false;
    this.prevButton.classList.remove(classes.disabled);
    this.nextButton.disabled = false;
    this.nextButton.classList.remove(classes.disabled);
    if (!minDate && !maxDate) {
      return;
    }
    switch (this.datePicker.currentView) {
      case "days":
        if (minDate && minDate.getMonth() >= viewDate.getMonth() && minDate.getFullYear() >= viewDate.getFullYear()) {
          this.prevButton.disabled = true;
          this.prevButton.classList.add(classes.disabled);
        }
        if (maxDate && maxDate.getMonth() <= viewDate.getMonth() && maxDate.getFullYear() <= viewDate.getFullYear()) {
          this.nextButton.disabled = true;
          this.nextButton.classList.add(classes.disabled);
        }
        break;
      case "months":
        if (minDate && minDate.getFullYear() >= viewDate.getFullYear()) {
          this.prevButton.disabled = true;
          this.prevButton.classList.add(classes.disabled);
        }
        if (maxDate && maxDate.getFullYear() <= viewDate.getFullYear()) {
          this.nextButton.disabled = true;
          this.nextButton.classList.add(classes.disabled);
        }
        break;
      case "years":
        const decade = getDecade(viewDate);
        if (minDate && minDate.getFullYear() >= decade[0]) {
          this.prevButton.disabled = true;
          this.prevButton.classList.add(classes.disabled);
        }
        if (maxDate && maxDate.getFullYear() <= decade[1]) {
          this.nextButton.disabled = true;
          this.nextButton.classList.add(classes.disabled);
        }
        break;
    }
  }
};

// src/picker/Cell.ts
var typesSingle = {
  days: "day",
  months: "month",
  years: "year"
};
var Cell = class {
  constructor(datePicker, type, date) {
    __publicField(this, "datePicker");
    __publicField(this, "type");
    __publicField(this, "date");
    __publicField(this, "focused", false);
    __publicField(this, "disabled", false);
    __publicField(this, "selected", false);
    __publicField(this, "element");
    __publicField(this, "renderOptions", null);
    __publicField(this, "changeFocusListener");
    __publicField(this, "changeSelectedListener");
    this.datePicker = datePicker;
    this.type = type;
    this.date = date;
    const { onRenderCell } = this.datePicker.config;
    if (onRenderCell) {
      this.renderOptions = onRenderCell(this.date, this.type, this.datePicker) || null;
    }
    this._createElement();
    this.changeFocusListener = ({ detail: { date: date2 } }) => this._onChangeFocus(date2);
    this.changeSelectedListener = () => this._onChangeSelected();
    this.datePicker.on("_changeSelectedDate", this.changeSelectedListener);
    this.datePicker.on("_changeFocusedDate", this.changeFocusListener);
  }
  /**
   * Destroy instance
   */
  destroy() {
    this.datePicker.off("_changeSelectedDate", this.changeSelectedListener);
    this.datePicker.off("_changeFocusedDate", this.changeFocusListener);
    this.datePicker = null;
    this.element.remove();
    this.element = null;
  }
  /**
   * Render cell content
   */
  render() {
    this.element.innerHTML = this._getContent();
    this._updateClasses();
    this._updateFocused();
    this._updateSelected();
    this._updateRangeStatus();
  }
  /**
   * Create cell element
   */
  _createElement() {
    var _a, _b;
    const [year, month, day] = [this.date.getFullYear(), this.date.getMonth(), this.date.getDate()], attributes = __spreadValues({
      "data-year": year + "",
      "data-month": month + "",
      "data-date": day + "",
      "data-iso-date": `${year}-${month}-${day}`
    }, (_a = this.renderOptions) == null ? void 0 : _a.attributes);
    this.element = document.createElement("div");
    this.element.classList.add(
      ...classNames(classes.cell, typesSingle[this.type], (_b = this.renderOptions) == null ? void 0 : _b.classes)
    );
    Object.keys(attributes).forEach((attr) => {
      this.element.setAttribute(attr, attributes[attr]);
    });
  }
  /**
   * Retrieve cell content
   */
  _getContent() {
    var _a;
    if ((_a = this.renderOptions) == null ? void 0 : _a.content) {
      return this.renderOptions.content;
    }
    const config = this.datePicker.config;
    switch (this.type) {
      case "days":
        return config.showOtherMonths || !this.datePicker.isOtherMonth(this.date) ? "" + this.date.getDate() : "";
      case "months":
        return this.datePicker.locale[config.monthsField][this.date.getMonth()];
      case "years":
        return "" + this.date.getFullYear();
    }
  }
  /**
   * Update cell classes
   */
  _updateClasses() {
    var _a;
    const { config, minDate, maxDate } = this.datePicker;
    const outOfRange = this._isOutOfMinMaxRange();
    const disabled = this.datePicker.isDateDisabled(this.date) || ((_a = this.renderOptions) == null ? void 0 : _a.disabled) || false;
    const classList = this.element.classList;
    classList.toggle(classes.current, isSameDate(/* @__PURE__ */ new Date(), this.date, this.type));
    classList.toggle(classes.minDate, minDate && isSameDate(minDate, this.date, this.type) || false);
    classList.toggle(classes.maxDate, maxDate && isSameDate(maxDate, this.date, this.type) || false);
    switch (this.type) {
      case "days":
        const otherMonth = this.datePicker.isOtherMonth(this.date);
        this.disabled = !config.selectOtherMonths && otherMonth || outOfRange || disabled;
        classList.toggle(classes.otherMonth, otherMonth);
        classList.toggle(classes.disabled, this.disabled);
        break;
      case "months":
        this.disabled = outOfRange || disabled;
        classList.toggle(classes.disabled, disabled);
        break;
      case "years":
        const otherDecade = this.datePicker.isOtherDecade(this.date);
        this.disabled = !config.selectOtherYears && otherDecade || outOfRange || disabled;
        classList.toggle(classes.otherDecade, otherDecade);
        classList.toggle(classes.disabled, this.disabled);
        break;
    }
  }
  /**
   * Update focused state
   */
  _updateFocused() {
    this.focused = isSameDate(this.datePicker.focusDate, this.date, this.type);
    this.element.classList.toggle(classes.focused, this.focused);
  }
  /**
   * Update selected state
   */
  _updateSelected() {
    this.selected = this.datePicker.isDateSelected(this.date, this.type);
    this.element.classList.toggle(classes.selected, this.selected);
  }
  /**
   * Update range state
   */
  _updateRangeStatus() {
    const { focusDate, selectedDates } = this.datePicker;
    this.element.classList.remove(classes.rangeFrom, classes.rangeTo, classes.inRange);
    if (!selectedDates.length || !this.datePicker.config.range) {
      return;
    }
    let { rangeDateFrom: from, rangeDateTo: to } = this.datePicker;
    const classList = this.element.classList;
    if (selectedDates.length === 1 && focusDate) {
      const focusAfterSelected = isDateAfter(focusDate, selectedDates[0]);
      from = focusAfterSelected ? selectedDates[0] : focusDate;
      to = focusAfterSelected ? focusDate : selectedDates[0];
    }
    classList.toggle(classes.inRange, from && to && isDateBetween(this.date, from, to) || false);
    classList.toggle(classes.rangeFrom, from && isSameDate(this.date, from, this.type) || false);
    classList.toggle(classes.rangeTo, to && isSameDate(this.date, to, this.type) || false);
  }
  /**
   * Check if cell date is out of min/max range at current level
   */
  _isOutOfMinMaxRange() {
    const { minDate, maxDate } = this.datePicker;
    if (!minDate && !maxDate) {
      return false;
    }
    const isDay = this.type === "days";
    const isYear = this.type === "years";
    let result = false;
    if (minDate) {
      const cellDate = new Date(
        this.date.getFullYear(),
        (isYear ? minDate : this.date).getMonth(),
        (isDay ? this.date : minDate).getDate()
      );
      result = isDateBefore(cellDate, minDate);
    }
    if (maxDate && !result) {
      const cellDate = new Date(
        this.date.getFullYear(),
        (isYear ? maxDate : this.date).getMonth(),
        (isDay ? this.date : maxDate).getDate()
      );
      result = isDateAfter(cellDate, maxDate);
    }
    return result;
  }
  /**
   * Handle cell focus change
   */
  _onChangeFocus(date) {
    this._updateFocused();
    if (!date) {
      return;
    }
    this._updateRangeStatus();
  }
  /**
   * Handle date change
   */
  _onChangeSelected() {
    if (this.disabled) {
      return;
    }
    this._updateSelected();
    this._updateRangeStatus();
  }
};

// src/picker/View.ts
var templates = {
  days: `<div class="${classes.daysContainer}"><div class="${classes.dayNames}"></div><div class="${classes.cells} days"></div></div>`,
  months: `<div class="${classes.cells} months"></div>`,
  years: `<div class="${classes.cells} years"></div>`
};
var weekNumbersTemplate = `<div class="${classes.weekNumbers}"><div class="${classes.dayNames}"><div class="${classes.dayName}">&nbsp;</div></div><div class="${classes.cells} weeks"></div></div>`;
var View = class _View {
  constructor(datePicker, type) {
    __publicField(this, "datePicker");
    __publicField(this, "element");
    __publicField(this, "selected", []);
    __publicField(this, "type");
    __publicField(this, "isMinView", false);
    __publicField(this, "visible", true);
    __publicField(this, "cellsElement");
    __publicField(this, "dayNamesElement");
    __publicField(this, "weeksElement", null);
    __publicField(this, "weeksContainer", null);
    __publicField(this, "_cells", []);
    __publicField(this, "_cellsMap", /* @__PURE__ */ new WeakMap());
    __publicField(this, "_isRange", false);
    __publicField(this, "_pressed", false);
    __publicField(this, "_focusedDate", null);
    __publicField(this, "_rangeFromFocused", false);
    __publicField(this, "_rangeToFocused", false);
    __publicField(this, "_rangeMoved", false);
    __publicField(this, "_ignoreClick", false);
    __publicField(this, "mouseOverListener");
    __publicField(this, "mouseOutListener");
    __publicField(this, "clickListener");
    __publicField(this, "mouseDownListener");
    __publicField(this, "mouseMoveListener");
    __publicField(this, "mouseUpListener");
    __publicField(this, "changeViewListener");
    __publicField(this, "changeViewDateListener");
    this.datePicker = datePicker;
    this.type = type;
    const config = this.datePicker.config;
    this.element = document.createElement("div");
    this.element.classList.add(classes.body, this.type);
    this.element.innerHTML = templates[this.type];
    this.cellsElement = this.element.querySelector(`.${classes.cells}`);
    this.dayNamesElement = this.type === "days" ? this.element.querySelector(`.${classes.dayNames}`) : null;
    this.isMinView = this.type === config.minView;
    if (this.type === "days") {
      if (this.dayNamesElement) {
        this._renderDayNames();
      }
      const tmp = document.createElement("div");
      tmp.innerHTML = weekNumbersTemplate;
      this.weeksElement = tmp.firstElementChild;
      this.weeksContainer = this.weeksElement.querySelector(`.${classes.cells}`);
      if (config.weekNumbers) {
        this.element.prepend(this.weeksElement);
      }
    }
    this.mouseOverListener = this._onMouseOver.bind(this);
    this.mouseOutListener = this._onMouseOut.bind(this);
    this.clickListener = this._onClick.bind(this);
    this.mouseDownListener = this._onMouseDown.bind(this);
    this.mouseMoveListener = this._onMouseMove.bind(this);
    this.mouseUpListener = this._onMouseUp.bind(this);
    this.element.addEventListener("mouseover", this.mouseOverListener);
    this.element.addEventListener("mouseout", this.mouseOutListener);
    this.element.addEventListener("click", this.clickListener);
    if (config.range && config.dynamicRange) {
      this._isRange = true;
      this._bindRangeListeners();
    }
    this.changeViewListener = (event) => this._onChangeView(event.detail);
    this.changeViewDateListener = ({ detail }) => this._onChangeViewDate(detail.date, detail.oldDate);
    this.datePicker.on("_changeCurrentView", this.changeViewListener);
    this.datePicker.on("changeViewDate", this.changeViewDateListener);
    this.render();
  }
  /**
   * Destroy instance
   */
  destroy() {
    this._removeRangeListeners();
    this.datePicker.off("_changeCurrentView", this.changeViewListener);
    this.datePicker.off("changeViewDate", this.changeViewDateListener);
    this.datePicker = null;
    this._destroyCells();
    this._cellsMap = null;
    this.cellsElement = null;
    this.dayNamesElement = null;
    this.weeksContainer = null;
    this.weeksElement = null;
    this.element.remove();
    this.element = null;
  }
  /**
   * Render view content
   */
  render() {
    this._destroyCells();
    this._generateCells();
    this._cells.forEach((cell) => cell.render());
    if (this.type === "days") {
      this._renderWeekNumbers();
    }
  }
  /**
   * Update view content
   */
  update() {
    this.render();
    if (this.type === "days") {
      this._renderDayNames();
      if (!this.datePicker.config.weekNumbers) {
        this.weeksElement.remove();
      } else if (!this.element.contains(this.weeksElement)) {
        this.element.prepend(this.weeksElement);
      }
    }
    const config = this.datePicker.config;
    const isRange = config.range && config.dynamicRange;
    if (isRange && !this._isRange) {
      this._bindRangeListeners();
    } else if (!isRange && this._isRange) {
      this._removeRangeListeners();
    }
  }
  /**
   * Show view
   */
  show() {
    this.visible = true;
    this.element.classList.remove(classes.hidden);
  }
  /**
   * Hide view
   */
  hide() {
    this.visible = false;
    this.element.classList.add(classes.hidden);
  }
  /**
   * Bind range event listeners
   */
  _bindRangeListeners() {
    this.element.addEventListener("mousedown", this.mouseDownListener);
  }
  /**
   * Remove range event listeners
   */
  _removeRangeListeners() {
    this.element.removeEventListener("mousedown", this.mouseDownListener);
    this.element.removeEventListener("mousemove", this.mouseMoveListener);
    document.removeEventListener("mouseup", this.mouseUpListener);
  }
  /**
   * Render week day names
   */
  _renderDayNames() {
    const weekStart = this.datePicker.weekStart;
    let current = weekStart;
    this.dayNamesElement.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const day = current % 7, element = document.createElement("div");
      element.classList.add(classes.dayName);
      element.setAttribute("data-day-index", day + "");
      element.textContent = this.datePicker.locale.daysMin[day];
      this.dayNamesElement.append(element);
      current++;
    }
  }
  /**
   * Render week numbers
   */
  _renderWeekNumbers() {
    if (!this.datePicker.config.weekNumbers) {
      return;
    }
    this.weeksContainer.innerHTML = "";
    const { viewDate, weekStart } = this.datePicker;
    const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const startOfWeek = getDayOfWeek(firstOfMonth, weekStart, weekStart);
    const weeksToRender = this._cells.length / 7;
    for (let i = 0; i < weeksToRender; i++) {
      const element = document.createElement("div");
      element.classList.add(classes.cell, "week");
      element.textContent = "" + getWeekNumber(addDays(startOfWeek, 7 * i), weekStart);
      this.weeksContainer.append(element);
    }
  }
  /**
   * Destroy current cells
   */
  _destroyCells() {
    this._cells.forEach((cell) => {
      this._cellsMap.delete(cell.element);
      cell.destroy();
    });
    this._cells = [];
    this.cellsElement.innerHTML = "";
  }
  /**
   * Generate cells
   */
  _generateCells() {
    const getDates = _View.getDatesFunction(this.type);
    getDates(this.datePicker).forEach((date) => {
      const cell = new Cell(
        this.datePicker,
        this.type,
        date
      );
      this._cells.push(cell);
      this._cellsMap.set(cell.element, cell);
      this.cellsElement.append(cell.element);
    });
  }
  /**
   * Handle view level change
   */
  _onChangeView(view) {
    if (view !== this.type) {
      this.hide();
    } else {
      this.show();
      this.render();
    }
  }
  /**
   * Handle view date change
   */
  _onChangeViewDate(viewDate, oldViewDate) {
    if (!this.visible) {
      return;
    }
    const decade = getDecade(viewDate), decadeOld = getDecade(oldViewDate);
    switch (this.datePicker.currentView) {
      case "days":
        if (isSameDate(viewDate, oldViewDate, "months")) {
          return;
        }
        break;
      case "months":
        if (isSameDate(viewDate, oldViewDate, "years")) {
          return;
        }
        break;
      case "years":
        if (decade[0] === decadeOld[0] && decade[1] === decadeOld[1]) {
          return;
        }
        break;
    }
    this.render();
  }
  /**
   * Handle mouse over event on cell
   */
  _onMouseOver(event) {
    if (event.target instanceof HTMLElement) {
      const element = event.target.closest(`.${classes.cell}`);
      const cell = element ? this._cellsMap.get(element) : null;
      this.datePicker.setFocusDate(cell ? cell.date : null);
    }
  }
  /**
   * Handle mouse out event
   */
  _onMouseOut() {
    this.datePicker.setFocusDate(null);
  }
  /**
   * Handle click event on cell
   */
  _onClick(event) {
    if (event.target instanceof HTMLElement) {
      const element = event.target.closest(`.${classes.cell}`);
      const cell = element ? this._cellsMap.get(element) : null;
      if (cell && !cell.disabled) {
        if (!this.datePicker.isMinView()) {
          this.datePicker.changeView("down");
          return;
        }
        if (this._ignoreClick) {
          this._ignoreClick = false;
          return;
        }
        const selectedDate = this.datePicker.adapter.getSelectedDate(cell.date, cell.type);
        if (selectedDate) {
          this.datePicker.adapter.handleAlreadySelectedDates(selectedDate, cell.date);
        } else {
          this.datePicker.selectDate(cell.date);
        }
      }
    }
  }
  /**
   * Handle mouse down event
   */
  _onMouseDown(event) {
    if (!this.datePicker.isMinView() || !(event.target instanceof HTMLElement)) {
      return;
    }
    const element = event.target.closest(`.${classes.cell}`);
    const cell = element ? this._cellsMap.get(element) : null;
    if (!cell) {
      return;
    }
    this._pressed = true;
    this.element.addEventListener("mousemove", this.mouseMoveListener);
    document.addEventListener("mouseup", this.mouseUpListener);
    this._focusedDate = new Date(cell.date);
    if (isSameDate(cell.date, this.datePicker.rangeDateFrom, "days")) {
      this._rangeFromFocused = true;
    }
    if (isSameDate(cell.date, this.datePicker.rangeDateTo, "days")) {
      this._rangeToFocused = true;
    }
  }
  /**
   * Handle mouse move event
   */
  _onMouseMove(event) {
    if (!this._pressed || !this.datePicker.isMinView() || !(event.target instanceof HTMLElement)) {
      return;
    }
    const element = event.target.closest(`.${classes.cell}`);
    const cell = element ? this._cellsMap.get(element) : null;
    const onBeforeSelect = this.datePicker.config.onBeforeSelect;
    const pickerClassList = this.datePicker.pickerElement.classList;
    if (!cell || cell.disabled || onBeforeSelect && !onBeforeSelect(cell.date, this.datePicker)) {
      pickerClassList.add(classes.rangeDisabled);
      return;
    }
    const { rangeDateFrom, rangeDateTo } = this.datePicker;
    if (this.datePicker.selectedDates.length === 2) {
      const [firstDate, , lastDate] = sortDates([rangeDateFrom, cell.date, rangeDateTo]);
      if (this.datePicker.isDisabledDateInRange(firstDate, lastDate)) {
        pickerClassList.add(classes.rangeDisabled);
        return;
      } else {
        pickerClassList.remove(classes.rangeDisabled);
      }
      if (this._rangeFromFocused) {
        if (isDateAfter(cell.date, rangeDateTo)) {
          cell.date.setHours(rangeDateTo.getHours());
          cell.date.setMinutes(rangeDateTo.getMinutes());
          rangeDateTo.setHours(rangeDateFrom.getHours());
          rangeDateTo.setMinutes(rangeDateFrom.getMinutes());
          this.datePicker.rangeDateTo = cell.date;
          this.datePicker.rangeDateFrom = rangeDateTo;
          this.datePicker.replaceDate(rangeDateTo, cell.date);
          this.datePicker.replaceDate(rangeDateFrom, rangeDateTo);
          this._rangeFromFocused = false;
          this._rangeToFocused = true;
          this._rangeMoved = true;
        } else if (isDateBefore(cell.date, rangeDateTo)) {
          cell.date.setHours(rangeDateFrom.getHours());
          cell.date.setMinutes(rangeDateFrom.getMinutes());
          this.datePicker.rangeDateFrom = cell.date;
          this.datePicker.replaceDate(rangeDateFrom, cell.date);
          this._rangeMoved = true;
        }
      } else if (this._rangeToFocused) {
        if (isDateBefore(cell.date, rangeDateFrom)) {
          cell.date.setHours(rangeDateFrom.getHours());
          cell.date.setMinutes(rangeDateFrom.getMinutes());
          rangeDateFrom.setHours(rangeDateTo.getHours());
          rangeDateFrom.setMinutes(rangeDateTo.getMinutes());
          this.datePicker.rangeDateFrom = cell.date;
          this.datePicker.rangeDateTo = rangeDateFrom;
          this.datePicker.replaceDate(rangeDateFrom, cell.date);
          this.datePicker.replaceDate(rangeDateTo, rangeDateFrom);
          this._rangeToFocused = false;
          this._rangeFromFocused = true;
          this._rangeMoved = true;
        } else if (isDateAfter(cell.date, rangeDateFrom)) {
          cell.date.setHours(rangeDateTo.getHours());
          cell.date.setMinutes(rangeDateTo.getMinutes());
          this.datePicker.rangeDateTo = cell.date;
          this.datePicker.replaceDate(rangeDateTo, cell.date);
          this._rangeMoved = true;
        }
      }
    }
  }
  /**
   * Handle mouse up event
   */
  _onMouseUp(event) {
    this._pressed = false;
    this._rangeFromFocused = false;
    this._rangeToFocused = false;
    this._ignoreClick = false;
    if (event.target instanceof HTMLElement && this.datePicker.selectedDates.length === 2) {
      const element = event.target.closest(`.${classes.cell}`);
      const cell = element ? this._cellsMap.get(element) : null;
      if (cell && isSameDate(cell.date, this._focusedDate, this.type) && this._rangeMoved) {
        this._ignoreClick = true;
      }
    }
    this._rangeMoved = false;
    this._focusedDate = null;
    this.element.removeEventListener("mousemove", this.mouseMoveListener);
    document.removeEventListener("mouseup", this.mouseUpListener);
  }
  /**
   * Get dates function for specified view.
   */
  static getDatesFunction(type) {
    switch (type) {
      case "days":
        return _View.getDaysDates;
      case "months":
        return _View.getMonthsDates;
      case "years":
        return _View.getYearsDates;
    }
  }
  /**
   * Get dates for days view.
   */
  static getDaysDates(datePicker) {
    const { viewDate, weekStart } = datePicker, daysInMonth = getDaysInMonth(viewDate), year = viewDate.getFullYear(), month = viewDate.getMonth(), firstDay = new Date(year, month, 1), lastDay = new Date(year, month, daysInMonth), dates = [];
    let daysFromPrevMonth = firstDay.getDay() - weekStart, daysFromNextMonth = 6 - lastDay.getDay() - weekStart;
    daysFromPrevMonth = daysFromPrevMonth < 0 ? daysFromPrevMonth + 7 : daysFromPrevMonth;
    daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;
    const firstRenderDate = subtractDays(firstDay, daysFromPrevMonth), totalRenderDays = daysInMonth + daysFromPrevMonth + daysFromNextMonth, firstRenderDayDate = firstRenderDate.getDate(), renderYear = firstRenderDate.getFullYear(), renderMonth = firstRenderDate.getMonth();
    for (let i = 0; i < totalRenderDays; i++) {
      dates.push(new Date(renderYear, renderMonth, firstRenderDayDate + i));
    }
    return dates;
  }
  /**
   * Get dates for months view.
   */
  static getMonthsDates(datePicker) {
    const year = datePicker.viewDate.getFullYear(), dates = [];
    for (let month = 0; month < 12; month++) {
      dates.push(new Date(year, month));
    }
    return dates;
  }
  /**
   * Get dates for years view.
   */
  static getYearsDates(datePicker) {
    const viewDate = datePicker.viewDate, decade = getDecade(viewDate), dates = [];
    for (let year = decade[0] - 1; year <= decade[1] + 1; year++) {
      dates.push(new Date(year, 0));
    }
    return dates;
  }
};

// src/utils/format.ts
var knownFormats = {};
var reFormatTokens = /yy(?:yy)?(?:1|2)?|mm?|MM?|dd?|DD?|o/;
var reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
var parseFns = {
  y: (date, year) => {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  m: (date, month, locale) => {
    const newDate = new Date(date);
    let monthIndex = parseInt(month, 10) - 1;
    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }
      const monthName = month.toLowerCase();
      const compareNames = (name) => name.toLowerCase().startsWith(monthName);
      monthIndex = locale.monthsShort.findIndex(compareNames);
      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }
      if (monthIndex < 0) {
        return NaN;
      }
    }
    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex) ? newDate.setDate(0) : newDate.getTime();
  },
  d: (date, day) => {
    return new Date(date).setDate(parseInt(day, 10));
  }
};
var formatFns = {
  d: (date) => date.getDate().toString(),
  dd: (date) => padZero(date.getDate(), 2),
  D: (date, locale) => locale.daysShort[date.getDay()],
  DD: (date, locale) => locale.days[date.getDay()],
  o: (date) => {
    return Math.round(
      (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5
    ).toString();
  },
  m: (date) => (date.getMonth() + 1).toString(),
  mm: (date) => padZero(date.getMonth() + 1, 2),
  M: (date, locale) => locale.monthsShort[date.getMonth()],
  MM: (date, locale) => locale.months[date.getMonth()],
  yy: (date) => padZero(date.getFullYear(), 2).slice(-2),
  yyyy: (date) => padZero(date.getFullYear(), 4),
  yyyy1: (date) => padZero(getDecade(date)[0], 4),
  yyyy2: (date) => padZero(getDecade(date)[1], 4)
};
function padZero(num, length) {
  return num.toString().padStart(length, "0");
}
function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}
function parseFormatString(format) {
  if (typeof format !== "string") {
    throw new Error("Invalid date format");
  }
  if (format in knownFormats) {
    return knownFormats[format];
  }
  const parts = format.match(new RegExp(reFormatTokens, "g"));
  const separators = format.split(reFormatTokens);
  if (!separators.length || !parts) {
    throw new Error("Invalid date format");
  }
  const partFormatters = parts.map((token) => formatFns[token]);
  const partParserKeys = Object.keys(parseFns).reduce((keys2, key) => {
    const token = parts.find((part) => part[0] !== "D" && part[0].toLowerCase() === key);
    if (token) {
      keys2.push(key);
    }
    return keys2;
  }, []);
  return knownFormats[format] = {
    parse: (dateStr, locale) => {
      const dateParts = dateStr.split(reNonDateParts).reduce((dateParts2, part, index) => {
        if (part.length > 0 && parts[index]) {
          const token = parts[index][0];
          if (token === "M") {
            dateParts2.m = part;
          } else if (token !== "D") {
            dateParts2[token] = part;
          }
        }
        return dateParts2;
      }, {});
      const date = partParserKeys.reduce((origDate, key) => {
        const newDate = parseFns[key](origDate, dateParts[key], locale);
        return isNaN(newDate) ? origDate : newDate;
      }, today());
      return new Date(date);
    },
    format: (date, locale) => {
      let dateStr = partFormatters.reduce((str, fn, index) => {
        return str + `${separators[index]}${fn(date, locale)}`;
      }, "");
      return dateStr + separators[separators.length - 1];
    }
  };
}
function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === "number") {
    const date = stripTime(dateStr);
    return isNaN(date) ? void 0 : new Date(date);
  }
  if (!dateStr) {
    return void 0;
  }
  if (dateStr === "today") {
    return new Date(today());
  }
  if (typeof format !== "string") {
    const date = format.toValue ? format.toValue(dateStr, format, locale) : void 0;
    return typeof date !== "undefined" && !isNaN(date) ? new Date(stripTime(date)) : void 0;
  }
  return parseFormatString(format).parse(dateStr, locale);
}
function formatDate(date, format, locale) {
  if (isNaN(date) || !date && date !== 0) {
    return "";
  }
  const dateObj = typeof date === "number" ? new Date(date) : date;
  if (typeof format !== "string") {
    return format.toDisplay ? format.toDisplay(dateObj, format, locale) : "";
  }
  return parseFormatString(format).format(dateObj, locale);
}
function isFormatValid(format) {
  if (typeof format === "string") {
    return reFormatTokens.test(format);
  }
  return !!(format.toDisplay && format.toValue);
}

// src/utils/merge.ts
/*!
 *  ts-deepmerge
 *  https://github.com/voodoocreation/ts-deepmerge
 */
function isObject(obj) {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
}
function merge(...objects) {
  return objects.reduce((result, current) => {
    if (current === void 0) {
      return result;
    }
    if (Array.isArray(current)) {
      throw new TypeError(
        "Arguments provided to ts-deepmerge must be objects, not arrays."
      );
    }
    Object.keys(current).forEach((key) => {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return;
      }
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays ? merge.options.uniqueArrayItems ? Array.from(
          new Set(result[key].concat(current[key]))
        ) : [...result[key], ...current[key]] : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else if (!isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(current[key], void 0);
      } else {
        result[key] = current[key] === void 0 ? merge.options.allowUndefinedOverrides ? current[key] : result[key] : current[key];
      }
    });
    return result;
  }, {});
}
var defaultOptions = {
  allowUndefinedOverrides: true,
  mergeArrays: true,
  uniqueArrayItems: true
};
merge.options = defaultOptions;
merge.withOptions = (options, ...objects) => {
  merge.options = __spreadValues(__spreadValues({}, defaultOptions), options);
  const result = merge(...objects);
  merge.options = defaultOptions;
  return result;
};

// src/utils/misc.ts
function debounce(func, waitFor, immediate) {
  let timeout = 0;
  let previous = Date.now();
  const debouncedFunction = function(...args) {
    const context = this;
    const invokeFunction = function() {
      const passed = Date.now() - previous;
      if (waitFor > passed) {
        timeout = window.setTimeout(invokeFunction, waitFor - passed);
      } else {
        timeout = void 0;
        if (!immediate) func.apply(context, args);
      }
    };
    if (!timeout) {
      timeout = window.setTimeout(invokeFunction, waitFor);
      if (immediate) func.apply(context, args);
    }
  };
  debouncedFunction.cancel = function() {
    clearTimeout(timeout);
    timeout = void 0;
  };
  return debouncedFunction;
}

// src/consts/date.ts
var dayDuration = 864e5;

// src/datepicker.ts
function makeInstances() {
  const instances2 = /* @__PURE__ */ new WeakMap();
  return {
    get(key) {
      return instances2.get(key);
    },
    set(key, value) {
      instances2.set(key, value);
    },
    delete(key) {
      instances2.delete(key);
    }
  };
}
var instances = makeInstances();
var viewIndexes = {
  days: 0,
  months: 1,
  years: 1
};
var template = `<div class="${classes.picker}"><div class="${classes.navigation}"></div><div class="${classes.content}"></div></div>`;
var _DatePicker = class _DatePicker extends Eventable {
  constructor(element, options) {
    super();
    __publicField(this, "element");
    __publicField(this, "config");
    __publicField(this, "input");
    __publicField(this, "altInput");
    __publicField(this, "altInputFormat");
    __publicField(this, "pickerElement");
    __publicField(this, "navigationElement");
    __publicField(this, "contentElement");
    __publicField(this, "buttonsElement", null);
    __publicField(this, "locale", _DatePicker.locales.default);
    __publicField(this, "dateFormat");
    __publicField(this, "weekStart", 0);
    __publicField(this, "rtl", false);
    __publicField(this, "minDate", null);
    __publicField(this, "maxDate", null);
    __publicField(this, "minView", "days");
    __publicField(this, "maxView", "years");
    __publicField(this, "inline", false);
    __publicField(this, "visible", false);
    __publicField(this, "focused", false);
    __publicField(this, "focusDate", null);
    __publicField(this, "viewDate", new Date(today()));
    __publicField(this, "currentView", "days");
    __publicField(this, "selectedDates", []);
    __publicField(this, "lastSelectedDate", null);
    __publicField(this, "rangeDateFrom", null);
    __publicField(this, "rangeDateTo", null);
    __publicField(this, "_disabledDates", []);
    __publicField(this, "_enabledDates", []);
    __publicField(this, "_isMultipleDates", false);
    __publicField(this, "_views", {});
    __publicField(this, "_navigation");
    __publicField(this, "_buttons");
    __publicField(this, "_keyboardNav");
    __publicField(this, "_container");
    __publicField(this, "_position");
    __publicField(this, "_inputType");
    __publicField(this, "_inputId");
    __publicField(this, "_inputReadOnly");
    __publicField(this, "_inputDirection");
    __publicField(this, "_rendered", false);
    __publicField(this, "_editMode", false);
    __publicField(this, "_active", false);
    __publicField(this, "_clicking", null);
    __publicField(this, "_showing", false);
    __publicField(this, "_hideCallback", null);
    __publicField(this, "changeSelectedListener");
    __publicField(this, "changeFocusedListener");
    __publicField(this, "inputBlurListener");
    __publicField(this, "inputClickListener");
    __publicField(this, "inputFocusListener");
    __publicField(this, "inputMouseDownListener");
    __publicField(this, "inputPasteListener");
    __publicField(this, "mouseDownListener");
    __publicField(this, "mouseUpListener");
    __publicField(this, "resizeListener");
    /**
     * @private
     */
    __publicField(this, "adapter", {
      setPosition: this._setPosition.bind(this),
      getSelectedDate: this._getSelectedDate.bind(this),
      handleAlreadySelectedDates: this._handleAlreadySelectedDates.bind(this),
      setInputValue: this._setInputValue.bind(this),
      enterEditMode: this._enterEditMode.bind(this),
      exitEditMode: this._exitEditMode.bind(this)
    });
    const _element = typeof element === "string" ? document.querySelector(element) : element;
    if (!_element) {
      throw new Error("Could not find element to initialize DatePicker");
    }
    this.element = _element;
    this.element.datePicker = this;
    instances.set(this.element, this);
    this.config = merge(
      {},
      getDefaults(),
      _DatePicker.defaults,
      options
    );
    this._parseConfig();
    this._initInputs();
    this._processDates();
    this._limitViewDate();
    this.inline = this.config.inline || !this.input;
    this._container = this._getContainer();
    this.pickerElement = document.createElement("div");
    this.pickerElement.classList.add(classes.datepicker);
    this.pickerElement.innerHTML = template;
    this.changeFocusedListener = ({ detail: { date, view, moveToOther } }) => this._onChangeFocusedDate(date, view, moveToOther);
    this.changeSelectedListener = ({ detail: { silent } }) => this._onChangeSelectedDate(silent);
    this.on("_changeFocusedDate", this.changeFocusedListener);
    this.on("_changeSelectedDate", this.changeSelectedListener);
    this._bindConfigEvents();
    this.inputBlurListener = this._onBlurInput.bind(this);
    this.inputClickListener = () => this._onClickInput();
    this.inputFocusListener = () => this._onFocusInput();
    this.inputMouseDownListener = () => this._onMouseDownInput();
    this.inputPasteListener = this._onPasteInput.bind(this);
    this.mouseDownListener = () => this._onMouseDown();
    this.mouseUpListener = () => this._onMouseUp();
    this.resizeListener = debounce(() => this._onResize(), 300);
    this.pickerElement.addEventListener("mousedown", this.mouseDownListener);
    this.pickerElement.addEventListener("mouseup", this.mouseUpListener);
    if (this.input || this.altInput) {
      this._bindInputEvents();
    }
    if (!this.inline) {
      window.addEventListener("resize", this.resizeListener);
    }
    if (this.config.keyboardNav) {
      this._keyboardNav = new Keyboard(this);
    }
    this.navigationElement = this.pickerElement.querySelector(`.${classes.navigation}`);
    this.contentElement = this.pickerElement.querySelector(`.${classes.content}`);
    if (this.inline) {
      this.show();
    }
  }
  /**
   * Destroy instance
   */
  destroy() {
    var _a, _b, _c, _d;
    this.off();
    this.hide();
    this._removeInputEvents();
    this.pickerElement.removeEventListener("mousedown", this.mouseDownListener);
    this.pickerElement.removeEventListener("mouseup", this.mouseUpListener);
    window.removeEventListener("resize", this.resizeListener);
    (_a = this._keyboardNav) == null ? void 0 : _a.destroy();
    (_b = this._navigation) == null ? void 0 : _b.destroy();
    this._navigation = null;
    (_c = this._buttons) == null ? void 0 : _c.destroy();
    this._buttons = null;
    this.pickerElement.remove();
    this.pickerElement = null;
    this.navigationElement = null;
    this.contentElement = null;
    this.buttonsElement = null;
    if (this.input) {
      if (this._inputType)
        this.input.type = this._inputType;
      if (this._inputId)
        this.input.id = this._inputId;
      if (this._inputReadOnly !== void 0)
        this.input.readOnly = this._inputReadOnly;
    }
    this.input = null;
    this.element.dir = this._inputDirection;
    (_d = this.altInput) == null ? void 0 : _d.remove();
    this.altInput = null;
    instances.delete(this.element);
    delete this.element.datePicker;
    this.element = null;
  }
  /**
   * Check if provided date is currently selected at specified view level.
   */
  isDateSelected(date, type = "days") {
    return this.selectedDates.some((selectedDate) => isSameDate(date, selectedDate, type));
  }
  /**
   * Select provided date(s).
   * Returns false if date was invalid or not selected.
   *
   * @param silent silence date change events
   */
  selectDate(dates, silent = false) {
    if (Array.isArray(dates)) {
      return dates.map((date2) => this.selectDate(date2, silent)).some((item) => item);
    }
    if (typeof dates === "string" && this._isMultipleDates) {
      return this.selectDate(dates.split(this.config.dateDelimiter || ","), silent);
    }
    let date = this.parseDate(dates);
    if (date === void 0 || this.isDateDisabled(date)) {
      return false;
    }
    let newViewDate;
    if (this.config.onBeforeSelect && !silent && !this.config.onBeforeSelect(date, this)) {
      return false;
    }
    if (this.config.range && this.selectedDates.length === 1 && this.isDisabledDateInRange(this.selectedDates[0], date)) {
      return false;
    }
    if (this.currentView === "days") {
      if (date.getMonth() !== this.viewDate.getMonth() || date.getFullYear() !== this.viewDate.getFullYear()) {
        newViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }
    }
    if (this.currentView === "years" || this.currentView === "months") {
      if (date.getFullYear() !== this.viewDate.getFullYear()) {
        newViewDate = new Date(date.getFullYear(), 0, 1);
      }
    }
    if (newViewDate) {
      this.setViewDate(newViewDate);
    }
    if (this._isMultipleDates && !this.config.range) {
      if (this.selectedDates.length === this.config.multipleDates)
        return false;
      if (!this.isDateSelected(date)) {
        this.selectedDates.push(date);
      }
    } else if (this.config.range) {
      switch (this.selectedDates.length) {
        case 1:
          this.selectedDates.push(date);
          if (!this.rangeDateTo) {
            this.rangeDateTo = date;
          }
          if (isDateAfter(this.rangeDateFrom, this.rangeDateTo)) {
            this.rangeDateTo = this.rangeDateFrom;
            this.rangeDateFrom = date;
          }
          this.selectedDates = [this.rangeDateFrom, this.rangeDateTo];
          break;
        case 2:
          this.selectedDates = [date];
          this.rangeDateFrom = date;
          this.rangeDateTo = null;
          break;
        default:
          this.selectedDates = [date];
          this.rangeDateFrom = date;
      }
    } else {
      this.selectedDates = [date];
    }
    this.trigger("_changeSelectedDate", { date, selected: true, silent });
    this._setLastSelectedDate(date);
    if (this.config.autoClose && this.visible) {
      if (!this._isMultipleDates && !this.config.range || this.config.range && this.selectedDates.length === 2) {
        this.hide();
      }
    }
    return true;
  }
  /**
   * Deselect provided date.
   */
  deselectDate(date) {
    const _date = this.parseDate(date);
    if (_date === void 0) {
      return;
    }
    this.selectedDates.some((curDate, index) => {
      if (isSameDate(curDate, _date, "days")) {
        this.selectedDates.splice(index, 1);
        if (!this.selectedDates.length) {
          this.rangeDateFrom = null;
          this.rangeDateTo = null;
          this._setLastSelectedDate(null);
        } else {
          this.rangeDateTo = null;
          this.rangeDateFrom = this.selectedDates[0];
          this._setLastSelectedDate(this.selectedDates[this.selectedDates.length - 1]);
        }
        this.trigger("_changeSelectedDate", { date: _date, selected: false });
        return true;
      }
    });
  }
  /**
   * Replace selected date with new date
   */
  replaceDate(selectedDate, newDate) {
    const index = this.selectedDates.findIndex((date) => isSameDate(date, selectedDate, this.currentView));
    if (index < 0 || isSameDate(this.selectedDates[index], newDate, this.currentView)) {
      return;
    }
    this.selectedDates[index] = newDate;
    this.trigger("_changeSelectedDate", { date: newDate, selected: true });
    this._setLastSelectedDate(newDate);
  }
  /**
   * Set focused date
   *
   * @param moveToOther move to other month/year/decade
   */
  setFocusDate(date, moveToOther) {
    this.focusDate = date;
    this.trigger("_changeFocusedDate", { date, view: this.currentView, moveToOther });
  }
  /**
   * Set new view date
   */
  setViewDate(date) {
    if (isSameDate(date, this.viewDate, "days")) {
      return;
    }
    const oldDate = this.viewDate;
    this.viewDate = date;
    this.trigger("changeViewDate", { date, oldDate, datePicker: this });
  }
  /**
   * Navigate to next month/year/decade in current view level.
   */
  next() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    switch (this.currentView) {
      case "days":
        this.setViewDate(new Date(year, month + 1, 1));
        break;
      case "months":
        this.setViewDate(new Date(year + 1, month, 1));
        break;
      case "years":
        this.setViewDate(new Date(year + 10, 0, 1));
        break;
    }
  }
  /**
   * Navigate to previous month/year/decade in current view level.
   */
  prev() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    switch (this.currentView) {
      case "days":
        this.setViewDate(new Date(year, month - 1, 1));
        break;
      case "months":
        this.setViewDate(new Date(year - 1, month, 1));
        break;
      case "years":
        this.setViewDate(new Date(year - 10, 0, 1));
        break;
    }
  }
  /**
   * Change view level.
   *
   * @param silent silence view change events
   */
  changeView(view, silent = false) {
    if (view === "up") {
      view = this.currentView === "days" ? "months" : "years";
    } else if (view === "down") {
      view = this.currentView === "years" ? "months" : "days";
    }
    if (!viewTypes.includes(view)) {
      return;
    }
    if (viewIndexes[view] > viewIndexes[this.maxView]) {
      view = this.maxView;
    } else if (viewIndexes[view] < viewIndexes[this.minView]) {
      view = this.minView;
    }
    const date = this.focusDate || this.viewDate;
    this.setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
    if (!viewTypes.includes(view) || this.currentView === view) {
      return;
    }
    this.currentView = view;
    if ((this.altInput || this.input) && this.visible) {
      this._setPosition(void 0, true);
    }
    this.trigger("_changeCurrentView", view);
    if (!this._views[view]) {
      this._views[view] = new View(this, view);
      this.contentElement.append(this._views[view].element);
    }
    if (!silent) {
      this.trigger("changeView", { view, datePicker: this });
    }
  }
  /**
   * Returns if current view level is min configured level.
   */
  isMinView() {
    return this.currentView === this.minView;
  }
  /**
   * Returns if current view level is max configured level.
   */
  isMaxView() {
    return this.currentView === this.maxView;
  }
  /**
   * Format date
   */
  formatDate(date, format) {
    return formatDate(date, format || this.dateFormat, this.locale);
  }
  /**
   * Parse date
   */
  parseDate(date, format) {
    return parseDate(date, format || this.dateFormat, this.locale);
  }
  /**
   * Disable specified dates.
   * Overrides currently disabled dates.
   *
   * If enabled dates is currently set, removes from those instead.
   */
  disableDates(rules) {
    var _a, _b;
    rules = Array.isArray(rules) ? rules : [rules];
    const parsedRules = this._parseDateRules(rules);
    if (!this._enabledDates.length) {
      this._disabledDates = parsedRules;
      (_a = this._views[this.currentView]) == null ? void 0 : _a.render();
      return;
    }
    parsedRules.forEach((rule) => {
      if (typeof rule === "function") {
        const index = this._enabledDates.indexOf(rule);
        if (index >= 0) {
          this._enabledDates.splice(index, 1);
        }
      } else if (rule instanceof Date) {
        const index = this._enabledDates.findIndex((date) => date instanceof Date && isSameDate(date, rule, "days"));
        if (index >= 0) {
          this._enabledDates.splice(index, 1);
        }
      } else {
        const index = this._enabledDates.findIndex((date) => {
          if (!(date instanceof Date || typeof date === "function")) {
            return isSameDate(date.from, rule.from, "days") && isSameDate(date.to, rule.to, "days");
          }
        });
        if (index >= 0) {
          this._enabledDates.splice(index, 1);
        }
      }
    });
    (_b = this._views[this.currentView]) == null ? void 0 : _b.render();
  }
  /**
   * Enable specified dates, or all dates if `true` is passed.
   * Overrides currently enabled dates.
   */
  enableDates(dates) {
    var _a;
    dates = typeof dates === "boolean" || Array.isArray(dates) ? dates : [dates];
    this._enabledDates = Array.isArray(dates) ? this._parseDateRules(dates) : [];
    this._disabledDates = [];
    (_a = this._views[this.currentView]) == null ? void 0 : _a.render();
  }
  /**
   * Check if given date is disabled.
   */
  isDateDisabled(date) {
    if (this.minDate && isDateBefore(date, this.minDate) || this.maxDate && isDateAfter(date, this.maxDate)) {
      return true;
    }
    if (!this._enabledDates.length && !this._disabledDates.length) {
      return false;
    }
    const bool = !this._enabledDates.length;
    const rules = this._enabledDates.length ? this._enabledDates : this._disabledDates;
    for (let i = 0, d; i < rules.length; i++) {
      d = rules[i];
      if (typeof d === "function") {
        return d(date) ? bool : !bool;
      } else if (d instanceof Date) {
        return d.getTime() === date.getTime() ? bool : !bool;
      } else {
        return date.getTime() >= d.from.getTime() && date.getTime() <= d.to.getTime() ? bool : !bool;
      }
    }
    return !bool;
  }
  /**
   * Check if there is a disabled date between given dates
   */
  isDisabledDateInRange(from, to) {
    [from, to] = sortDates([from, to]);
    const rangeEnd = stripTime(to);
    for (let t = stripTime(from); t <= rangeEnd; t += dayDuration) {
      if (this.isDateDisabled(new Date(t))) {
        return true;
      }
    }
    return false;
  }
  /**
   * Show the date picker
   */
  show() {
    if (this.visible) {
      return;
    }
    const input = this.altInput || this.input;
    if (input) {
      if (input.disabled) {
        return;
      }
      if (input !== document.activeElement) {
        this._showing = true;
        input.focus();
        this._showing = false;
      }
    }
    this._render();
    this._syncTextDirection();
    if (input && !this.inline) {
      this._setPosition();
    }
    this.pickerElement.classList.add(classes.active);
    this.visible = true;
    this.trigger("show", this);
  }
  /**
   * Hide the date picker
   */
  hide() {
    if (!this.visible || this.inline) {
      return;
    }
    this._exitEditMode();
    this.visible = false;
    this.pickerElement.classList.remove(classes.active);
    if (this._hideCallback) {
      this._hideCallback();
      this._hideCallback = null;
    }
    this.trigger("hide", this);
  }
  /**
   * Clear selected values
   *
   * @param silent silence date change events
   */
  clear(silent = false) {
    this.selectedDates = [];
    this.rangeDateFrom = null;
    this.rangeDateTo = null;
    this.lastSelectedDate = null;
    this.trigger("_changeSelectedDate", { date: null, selected: false, silent });
  }
  /**
   * Update date picker options.
   *
   * (Does not process event listener options, use the on/off methods instead.)
   *
   * @param silent silence view/date change events
   */
  update(options, silent = false) {
    var _a, _b, _c, _d, _e;
    const currentView = this.currentView;
    const oldConfig = merge({}, this.config);
    this.config = merge(this.config, options);
    this._parseConfig();
    this._limitViewDate();
    this.currentView = currentView;
    this.element.dir = this.rtl ? "rtl" : "ltr";
    this.inline = this.config.inline || !this.input;
    window.removeEventListener("resize", this.resizeListener);
    if (!this.inline) {
      window.addEventListener("resize", this.resizeListener);
    }
    if (!this.config.altInput && this.altInput) {
      this._removeAltInput();
    }
    if (this.config.altInput) {
      if (this.altInput && this.config.altInput instanceof HTMLInputElement && this.config.altInput !== this.altInput) {
        this._removeAltInput();
      }
      if (!this.altInput) {
        this._createAltInput();
      }
    }
    if (this.altInput || this.input) {
      this._removeInputEvents();
      this._bindInputEvents();
    }
    if (this.config.multipleDates === 0 || options.multipleDates === false) {
      this.config.multipleDates = 1;
    }
    this._isMultipleDates = this.config.multipleDates === true || this.config.multipleDates > 1;
    if (this.config.startView !== this.currentView) {
      this.changeView(this.config.startView, silent);
    }
    if (this.config.defaultDate) {
      this.selectedDates = [];
      this.selectDate(this.config.defaultDate, silent);
    }
    this._setInputValue();
    if (oldConfig.range && !this.config.range) {
      this.rangeDateFrom = null;
      this.rangeDateTo = null;
    } else if (!oldConfig.range && this.config.range) {
      if (this.selectedDates.length) {
        this.rangeDateFrom = this.selectedDates[0] || null;
        this.rangeDateTo = this.selectedDates[1] || null;
      }
    }
    if (this.config.buttons && !this._buttons && this._rendered) {
      this._initButtons();
    }
    (_a = this._buttons) == null ? void 0 : _a.update();
    if (oldConfig.buttons && !this.config.buttons) {
      (_b = this.buttonsElement) == null ? void 0 : _b.remove();
      this.buttonsElement = null;
      (_c = this._buttons) == null ? void 0 : _c.destroy();
      this._buttons = null;
    }
    const container = this._getContainer();
    if (container !== this._container) {
      this._container = container;
      if (this._rendered) {
        this._attachToContainer();
      }
    }
    const classList = this.pickerElement.classList;
    if (oldConfig.classes !== this.config.classes) {
      const oldClasses = classNames(oldConfig.classes);
      const newClasses = classNames(this.config.classes);
      if (oldClasses.length)
        classList.remove(...oldClasses);
      if (newClasses.length)
        classList.add(...newClasses);
    }
    classList.add(classes.datepicker);
    classList.toggle(classes.inline, this.inline);
    classList.toggle(classes.hasWeekNumbers, this.config.weekNumbers);
    (_d = this._navigation) == null ? void 0 : _d.update();
    if (this.visible || this.inline) {
      classList.add(classes.active);
      (_e = this._views[this.currentView]) == null ? void 0 : _e.update();
      this._syncTextDirection();
      const input = this.altInput || this.input;
      if (input && !this.inline) {
        this._setPosition();
      }
    }
  }
  /**
   * Check if provided date is a different month from current view date.
   */
  isOtherMonth(date) {
    return date.getMonth() !== this.viewDate.getMonth();
  }
  /**
   * Check if provided date is a different year from current view date.
   */
  isOtherYear(date) {
    return date.getFullYear() !== this.viewDate.getFullYear();
  }
  /**
   * Check if provided date is a different decade from current view date.
   */
  isOtherDecade(date) {
    const [firstYear, lastYear] = getDecade(this.viewDate);
    const year = date.getFullYear();
    return year < firstYear || year > lastYear;
  }
  /**
   * Returns if edit mode is active
   */
  isEditMode() {
    return this._editMode;
  }
  /**
   * Process options
   */
  _parseConfig() {
    const config = this.config;
    let { dateFormat, locale, maxView, minView, startView: view } = config;
    let localeData = null;
    if (locale && typeof locale !== "string") {
      localeData = locale;
    } else if (typeof locale === "string" && locale !== "default") {
      if (_DatePicker.locales[locale]) {
        localeData = _DatePicker.locales[locale];
      } else {
        locale = locale.split("-")[0];
        if (_DatePicker.locales[locale]) {
          localeData = _DatePicker.locales[locale];
        }
      }
    }
    if (localeData) {
      this.locale = __spreadValues(__spreadValues({}, _DatePicker.locales.default), localeData);
    }
    this.dateFormat = dateFormat && isFormatValid(dateFormat) ? dateFormat : this.locale.format;
    this.altInputFormat = config.altInputFormat && isFormatValid(config.altInputFormat) ? config.altInputFormat : defaults.altInputFormat;
    this.weekStart = config.weekStart || config.weekStart === 0 ? config.weekStart : this.locale.weekStart;
    this.rtl = config.rtl !== null ? config.rtl : this.locale.rtl || this.element.dir === "rtl" || false;
    if (config.multipleDates === 0 || config.multipleDates === false) {
      config.multipleDates = 1;
    }
    this._isMultipleDates = config.multipleDates === true || config.multipleDates > 1;
    if (minView && viewTypes.includes(minView)) {
      this.minView = minView;
    }
    if (maxView && viewTypes.includes(maxView)) {
      maxView = viewIndexes[maxView] >= viewIndexes[this.minView] ? maxView : this.minView;
      this.maxView = maxView;
    }
    if (view && viewTypes.includes(view)) {
      if (viewIndexes[view] > viewIndexes[this.maxView]) {
        view = this.maxView;
      }
      if (viewIndexes[view] < viewIndexes[this.minView]) {
        view = this.minView;
      }
      this.currentView = view;
    }
    if (config.maxDate !== null) {
      this.maxDate = parseDate(config.maxDate, this.dateFormat, this.locale) || null;
    }
    if (config.minDate !== null) {
      this.minDate = parseDate(config.minDate, this.dateFormat, this.locale) || null;
    }
    if (config.position) {
      if (typeof config.position === "string") {
        this._position = this._parsePositionString(config.position);
        config.position = this._position.y + " " + this._position.x;
      } else {
        this._position = config.position;
      }
    }
  }
  /**
   * Parse position string
   */
  _parsePositionString(position) {
    let _position = position.toLowerCase().split(/\s+/g);
    if (_position.length !== 2) {
      _position = [
        _position.find((y) => y === "top" || y === "middle" || y === "bottom") || "auto",
        _position.find((x) => x === "left" || x === "center" || x === "right") || "auto"
      ];
    }
    return { y: _position[0], x: _position[1] };
  }
  /**
   * Initialize input elements
   */
  _initInputs() {
    if (this.element instanceof HTMLInputElement) {
      this.input = this.element;
      this._inputType = this.input.type;
      this._inputId = this.input.id;
      this._inputReadOnly = this.input.readOnly;
      this.input.type = "text";
      this.input.readOnly = !this.config.allowInput;
    }
    this._inputDirection = this.element.dir;
    this.element.dir = this.rtl ? "rtl" : "ltr";
    if (this.config.altInput) {
      this.altInput = this._createAltInput();
    }
  }
  /**
   * Bind input event listeners
   */
  _bindInputEvents() {
    const input = this.altInput || this.input;
    const showOn = this.config.showOn;
    if (showOn === "click" || showOn === true) {
      input.addEventListener("mousedown", this.inputMouseDownListener);
      input.addEventListener("click", this.inputClickListener);
    }
    if (showOn === "focus" || showOn === true) {
      input.addEventListener("focus", this.inputFocusListener);
    }
    input.addEventListener("blur", this.inputBlurListener);
    input.addEventListener("paste", this.inputPasteListener);
  }
  /**
   * Remove input event listeners
   */
  _removeInputEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    (_a = this.input) == null ? void 0 : _a.removeEventListener("click", this.inputClickListener);
    (_b = this.input) == null ? void 0 : _b.removeEventListener("focus", this.inputFocusListener);
    (_c = this.input) == null ? void 0 : _c.removeEventListener("blur", this.inputBlurListener);
    (_d = this.input) == null ? void 0 : _d.removeEventListener("mousedown", this.inputMouseDownListener);
    (_e = this.input) == null ? void 0 : _e.removeEventListener("paste", this.inputPasteListener);
    (_f = this.altInput) == null ? void 0 : _f.removeEventListener("click", this.inputClickListener);
    (_g = this.altInput) == null ? void 0 : _g.removeEventListener("focus", this.inputFocusListener);
    (_h = this.altInput) == null ? void 0 : _h.removeEventListener("blur", this.inputBlurListener);
    (_i = this.altInput) == null ? void 0 : _i.removeEventListener("mousedown", this.inputMouseDownListener);
    (_j = this.altInput) == null ? void 0 : _j.removeEventListener("paste", this.inputPasteListener);
  }
  /**
   * Create alternate input field.
   */
  _createAltInput() {
    let input;
    if (this.config.altInput instanceof HTMLInputElement) {
      input = this.config.altInput;
      if (this.input) {
        input.dir = this.input.dir;
      }
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.readOnly = !this.config.allowInput;
      if (this.input) {
        this.input.id && (input.id = this.input.id);
        input.placeholder = this.input.placeholder;
        input.disabled = this.input.disabled;
        input.required = this.input.required;
        input.tabIndex = this.input.tabIndex;
        input.dir = this.input.dir;
        this.input.type = "hidden";
        this.input.id = "";
      }
    }
    if (this.input) {
      this.input.after(input);
    } else {
      if (this.element.contains(this.pickerElement)) {
        this.pickerElement.before(input);
      } else {
        this.element.append(input);
      }
    }
    return input;
  }
  /**
   * Remove alternate input field
   */
  _removeAltInput() {
    var _a;
    (_a = this.altInput) == null ? void 0 : _a.remove();
    this.altInput = void 0;
    if (this.input) {
      this.input.type = "text";
      if (this._inputId)
        this.input.id = this._inputId;
    }
  }
  /**
   * Process dates from input and options
   */
  _processDates() {
    const preloadedDate = this.config.defaultDate || this.input && (this.input.placeholder && this.input.value === this.input.placeholder ? null : this.input.value) || this.element.dataset.date || null;
    if (preloadedDate) {
      this.selectDate(preloadedDate, true);
    }
    const { disabledDates, enabledDates } = this.config;
    if (enabledDates && enabledDates.length) {
      this._enabledDates = this._parseDateRules(enabledDates);
    } else if (disabledDates && disabledDates.length) {
      this._disabledDates = this._parseDateRules(disabledDates);
    }
  }
  /**
   * Parse date limit rules
   */
  _parseDateRules(rules) {
    return rules.slice().map((rule) => {
      if (typeof rule === "function") {
        return rule;
      } else if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
        return this.parseDate(rule);
      } else if (rule.from && rule.to) {
        return {
          from: this.parseDate(rule.from),
          to: this.parseDate(rule.to)
        };
      }
    }).filter((rule) => rule);
  }
  /**
   * Limit view date by min and max dates.
   */
  _limitViewDate() {
    if (this.maxDate && isDateAfter(this.viewDate, this.maxDate)) {
      this.setViewDate(this.maxDate);
    }
    if (this.minDate && isDateBefore(this.viewDate, this.minDate)) {
      this.setViewDate(this.minDate);
    }
  }
  /**
   * Retrieve container element
   */
  _getContainer() {
    const container = this.config.container;
    if (!container) {
      return document.body;
    }
    if (typeof container === "string") {
      return document.querySelector(container) || document.body;
    }
    return container || document.body;
  }
  /**
   * Bind events from config
   */
  _bindConfigEvents() {
    if (this.config.onShow) {
      const onShow = this.config.onShow;
      this.on("show", () => onShow(this));
    }
    if (this.config.onHide) {
      const onHide = this.config.onHide;
      this.on("hide", () => onHide(this));
    }
    if (this.config.onFocus) {
      const onFocus = this.config.onFocus;
      this.on("focus", ({ detail: { date, view } }) => onFocus(date, view, this));
    }
    if (this.config.onChangeDate) {
      const onChangeDate = this.config.onChangeDate;
      this.on("changeDate", ({ detail: { date, formatted } }) => onChangeDate(date, formatted, this));
    }
    if (this.config.onChangeView) {
      const onChangeView = this.config.onChangeView;
      this.on("changeView", ({ detail: { view } }) => onChangeView(view, this));
    }
    if (this.config.onChangeViewDate) {
      const onChangeViewDate = this.config.onChangeViewDate;
      this.on("changeViewDate", ({ detail: { date, oldDate } }) => onChangeViewDate(date, oldDate, this));
    }
  }
  /**
   * Render picker
   */
  _render() {
    if (this._rendered) {
      return;
    }
    this._rendered = true;
    this._attachToContainer();
    if (this.inline) {
      this.pickerElement.classList.add(classes.inline);
    }
    if (this.config.weekNumbers) {
      this.pickerElement.classList.add(classes.hasWeekNumbers);
    }
    const configClasses = classNames(this.config.classes);
    if (configClasses.length) {
      this.pickerElement.classList.add(...configClasses);
    }
    this._views[this.currentView] = new View(this, this.currentView);
    this.contentElement.append(this._views[this.currentView].element);
    this._navigation = new Navigation(this);
    this.navigationElement.append(this._navigation.element);
    if (this.config.buttons) {
      this._initButtons();
    }
  }
  /**
   * Attach picker element to container
   */
  _attachToContainer() {
    if (this.input) {
      if (this.inline) {
        this.element.after(this.pickerElement);
      } else {
        this._container.append(this.pickerElement);
      }
    } else {
      this.element.append(this.pickerElement);
    }
  }
  /**
   * Initialize buttons
   */
  _initButtons() {
    this.buttonsElement = document.createElement("div");
    this.buttonsElement.classList.add(classes.buttons);
    this._buttons = new Buttons(this);
    this.buttonsElement.append(this._buttons.element);
    this.pickerElement.firstElementChild.append(this.buttonsElement);
  }
  /**
   * Get value for input element
   */
  _getInputValue(format) {
    if (!this.selectedDates.length) {
      return "";
    }
    return this.selectedDates.map((date) => this.formatDate(date, format)).join(this.config.dateDelimiter);
  }
  /**
   * Set value to inputs
   */
  _setInputValue() {
    if (this.altInput) {
      this.altInput.value = this._getInputValue(this.altInputFormat);
    }
    const value = this._getInputValue();
    if (this.input) {
      this.input.value = value;
    } else {
      this.element.setAttribute("data-date", value);
    }
    this.element.dispatchEvent(new Event("change", { bubbles: true }));
  }
  /**
   * Trigger date change event
   */
  _triggerDateChange() {
    let dates = [];
    let formattedDates = [];
    const isMultiple = this._isMultipleDates || this.config.range;
    if (this.selectedDates.length) {
      dates = this.selectedDates.map((date) => new Date(date));
      formattedDates = dates.map((date) => this.formatDate(date));
    }
    this.trigger("changeDate", {
      date: isMultiple ? dates : dates[0],
      formatted: isMultiple ? formattedDates : formattedDates[0],
      datePicker: this
    });
  }
  /**
   * Sync text direction with input
   */
  _syncTextDirection() {
    const input = this.altInput || this.input;
    const direction = getTextDirection(input || this.element);
    const parent = (input == null ? void 0 : input.parentElement) || this.element;
    if (!parent || direction !== getTextDirection(parent)) {
      this.pickerElement.dir = direction;
    } else if (this.pickerElement.dir) {
      this.pickerElement.removeAttribute("dir");
    }
  }
  /**
   * Position picker element
   */
  _setPosition(position, isViewChange = false) {
    position = position || this._position;
    if (typeof position === "function") {
      this._hideCallback = position(this.pickerElement, this.element, isViewChange, this) || null;
      return;
    }
    const input = this.altInput || this.input;
    if (!input) {
      return;
    }
    if (typeof position === "string") {
      position = this._parsePositionString(position);
    }
    let { y: positionY, x: positionX } = position;
    this.pickerElement.style.display = "block";
    const pickerRect = this.pickerElement.getBoundingClientRect();
    const offsetParent = this.pickerElement.offsetParent;
    this.pickerElement.style.display = "";
    const inputRect = input.getBoundingClientRect();
    let top = inputRect.top;
    let left = inputRect.left;
    if (offsetParent === document.body || !offsetParent) {
      top += window.scrollY;
      left += window.scrollX;
    } else {
      const offsetParentRect = offsetParent.getBoundingClientRect();
      top -= offsetParentRect.top - offsetParent.scrollTop;
      left -= offsetParentRect.left - offsetParent.scrollLeft;
    }
    const offset = this.config.offset;
    const scrollParent = findScrollParents(input);
    let scrollTop = 0;
    let scrollLeft = 0;
    let { clientHeight: scrollBottom, clientWidth: scrollRight } = document.documentElement;
    if (scrollParent) {
      const scrollParentRect = scrollParent.getBoundingClientRect();
      if (scrollParentRect.top > 0) {
        scrollTop = scrollParentRect.top;
      }
      if (scrollParentRect.left > 0) {
        scrollLeft = scrollParentRect.left;
      }
      if (scrollParentRect.right < scrollRight) {
        scrollRight = scrollParentRect.right;
      }
      if (scrollParentRect.bottom < scrollBottom) {
        scrollBottom = scrollParentRect.bottom;
      }
    }
    let adjustment = 0;
    if (positionX === "auto") {
      if (inputRect.left < scrollLeft) {
        positionX = "left";
        adjustment = scrollLeft - inputRect.left;
      } else if (inputRect.left + pickerRect.width > scrollRight) {
        positionX = "right";
        if (scrollRight < inputRect.right) {
          adjustment = scrollRight - inputRect.right;
        }
      } else if (this.rtl) {
        positionX = inputRect.right - pickerRect.width < scrollLeft ? "left" : "right";
      } else {
        positionX = "left";
      }
    }
    if (positionX === "right") {
      left += inputRect.width - pickerRect.width;
    } else if (positionX === "center") {
      left += inputRect.width / 2 - pickerRect.width / 2;
    }
    left += adjustment;
    if (positionY === "auto") {
      if (inputRect.top - pickerRect.height > scrollTop) {
        positionY = inputRect.bottom + pickerRect.height > scrollBottom ? "top" : "bottom";
      } else {
        positionY = "bottom";
      }
    }
    if (positionY === "top") {
      top -= pickerRect.height + offset;
    } else if (positionY === "middle") {
      top += inputRect.height / 2 - pickerRect.height / 2;
    } else {
      top += inputRect.height + offset;
    }
    const classList = this.pickerElement.classList;
    classList.remove(...Object.values(classes.positions));
    classList.add(classes.positions[positionX], classes.positions[positionY]);
    this.pickerElement.style.top = top + "px";
    this.pickerElement.style.left = left + "px";
  }
  /**
   * Set last selected date
   */
  _setLastSelectedDate(date) {
    this.lastSelectedDate = date;
    this.trigger("_changeLastSelectedDate", date || void 0);
  }
  /**
   * Enter edit mode
   */
  _enterEditMode() {
    const input = this.altInput || this.input;
    if (!input || input.readOnly || !this.visible || this._editMode) {
      return;
    }
    this._editMode = true;
    input.classList.add(classes.editMode);
  }
  /**
   * Exit edit mode
   */
  _exitEditMode(update = false) {
    const input = this.altInput || this.input;
    if (!input || !this._editMode) {
      return;
    }
    this._editMode = false;
    input.classList.remove(classes.editMode);
    if (update) {
      this._updateFromInput();
    }
  }
  /**
   * Update selected dates from input
   */
  _updateFromInput() {
    const input = this.altInput || this.input;
    if (!input) {
      return;
    }
    const value = input.placeholder && input.value === input.placeholder ? null : input.value;
    if (value) {
      const oldDates = this.selectedDates.slice();
      this.clear();
      if (!this.selectDate(value)) {
        this.selectDate(oldDates);
      }
    }
  }
  /**
   * Retrieve selected date matching given date at specified level.
   */
  _getSelectedDate(date, type = "days") {
    let existingDate = null;
    this.selectedDates.some((selectedDate) => {
      const same = isSameDate(date, selectedDate, type);
      existingDate = same && selectedDate || null;
      return same;
    });
    return existingDate;
  }
  /**
   * Internal date selection processing.
   */
  _handleAlreadySelectedDates(existingDate, date) {
    const selectedLength = this.selectedDates.length;
    const datesAreSame = Boolean(this.config.range && selectedLength === 1 && existingDate);
    const dateCopy = datesAreSame ? new Date(date) : date;
    if (this.config.range) {
      if (!this.config.toggleSelected) {
        if (selectedLength !== 2) {
          this.selectDate(dateCopy);
        }
        if (selectedLength === 2 && isSameDate(this.rangeDateFrom, this.rangeDateTo, "days")) {
          return;
        }
      }
    }
    if (this.config.toggleSelected) {
      this.deselectDate(dateCopy);
    } else {
      this._setLastSelectedDate(datesAreSame ? dateCopy : existingDate);
    }
  }
  /**
   * Handle focused date change event
   */
  _onChangeFocusedDate(date, view, moveToOther) {
    if (!date) {
      return;
    }
    if (!this.config.range || !this.selectedDates.length) {
      this.pickerElement.classList.remove(classes.rangeDisabled);
    }
    if (this.config.range && this.selectedDates.length === 1) {
      this.pickerElement.classList.toggle(
        classes.rangeDisabled,
        this.isDisabledDateInRange(this.selectedDates[0], date)
      );
    }
    if (moveToOther && (this.isOtherMonth(date) || this.isOtherYear(date) || this.isOtherDecade(date))) {
      this.setViewDate(date);
    }
    this.trigger("focus", { date, view, datePicker: this });
  }
  /**
   * Handle selected date change event
   */
  _onChangeSelectedDate(silent) {
    setTimeout(() => {
      this._setInputValue();
      if (!silent) {
        this._triggerDateChange();
      }
    });
  }
  /**
   * Handle input blur event
   */
  _onBlurInput(event) {
    if (this.focused) {
      event.stopImmediatePropagation();
    }
    if (!this.focused && this.visible && !this.inline) {
      if (this.config.updateOnBlur) {
        this._exitEditMode(true);
      } else {
        this._setInputValue();
      }
      this.hide();
    }
  }
  /**
   * Handle input click event
   */
  _onClickInput() {
    if (!this._clicking) {
      return;
    }
    clearTimeout(this._clicking);
    this._clicking = null;
    if (this._active) {
      this._enterEditMode();
    }
    this._active = false;
    if (!this.visible && !this.inline) {
      this.show();
    }
  }
  /**
   * Handle input focus event
   */
  _onFocusInput() {
    if (!this.visible && !this.inline && !this._showing) {
      this.show();
    }
  }
  /**
   * Handle input mouse down event
   */
  _onMouseDownInput() {
    const showOn = this.config.showOn;
    if (this.visible || showOn === "click" || showOn === true) {
      this._active = document.activeElement === (this.altInput || this.input);
      this._clicking = window.setTimeout(() => {
        this._active = false;
        this._clicking = null;
      }, 2e3);
    }
  }
  /**
   * Handle input paste event
   */
  _onPasteInput(event) {
    var _a;
    if (this.config.allowInput && ((_a = event.clipboardData) == null ? void 0 : _a.types.includes("text/plain"))) {
      this._enterEditMode();
    }
  }
  /**
   * Handle picker mouse down event
   */
  _onMouseDown() {
    this.focused = true;
  }
  /**
   * Handle picker mouse up event
   */
  _onMouseUp() {
    var _a;
    this.focused = false;
    (_a = this.altInput || this.input) == null ? void 0 : _a.focus();
  }
  /**
   * Handle window resize event
   */
  _onResize() {
    if (this.visible && typeof this.config.position !== "function") {
      this._setPosition();
    }
  }
  /**
   * Retrieve locales
   */
  static get locales() {
    return locales;
  }
  /**
   * Retrieve datepicker instance for provided element, if one exists
   */
  static getInstance(element) {
    return instances.get(element);
  }
  /**
   * Extend default options (does not apply to existing instances)
   */
  static setDefaults(options) {
    this.defaults = merge({}, this.defaults, options);
  }
};
__publicField(_DatePicker, "defaults", {});
var DatePicker = _DatePicker;

if(__exports != exports)module.exports = exports;return module.exports}));
//# sourceMappingURL=index.js.map
