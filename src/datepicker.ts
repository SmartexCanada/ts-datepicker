import { classes } from "@/consts/classes";
import { defaults, getDefaults, viewTypes } from "@/consts/defaults";
import { Eventable } from "@/eventable";
import { locales } from "@/i18n/default";
import { Buttons } from "@/picker/Buttons";
import { Keyboard } from "@/picker/Keyboard";
import { Navigation } from "@/picker/Navigation";
import { View } from "@/picker/View";
import type {
    DateLike,
    DateLimit,
    DatePickerFormat,
    Position,
    PositionCallback,
    PositionHorizontal,
    PositionVertical,
    ViewType
} from "@/types/datepicker";
import type {
    _ChangeFocusedDateEventDetail,
    _ChangeSelectedDateEventDetail,
    DatePickerEvents,
    SpecificEventListener,
    TEventHandler
} from "@/types/events";
import type { CustomLocale, DayOfWeek, Locale } from "@/types/locale";
import type { DatePickerOptions, Options, ParsedOptions } from "@/types/options";
import {
    getDecade,
    isDateAfter,
    isDateBefore,
    isSameDate,
    sortDates,
    stripTime,
    today
} from "@/utils/date";
import { classNames, findScrollParents, getTextDirection } from "@/utils/dom";
import { formatDate, isFormatValid, parseDate } from "@/utils/format";
import { merge } from "@/utils/merge";
import { debounce } from "@/utils/misc";
import { dayDuration } from "./consts/date";

type PositionData = {
    y: PositionVertical
    x: PositionHorizontal
};

function makeInstances<E extends HTMLElement>() {
    const instances = new WeakMap<E, DatePicker<E>>;

    return {
        get<T extends E>(key: T) {
            return instances.get(key) as unknown as DatePicker<T>;
        },
        set<T extends E>(key: T, value: DatePicker<T>) {
            instances.set(key, value as unknown as DatePicker<E>);
        },
        delete<T extends E>(key: T) {
            instances.delete(key);
        }
    };
}

const instances = makeInstances();

const viewIndexes: Record<ViewType, number> = {
    days: 0,
    months: 1,
    years: 1
};

const template = `<div class="${classes.picker}">`
    + `<div class="${classes.navigation}"></div>`
    + `<div class="${classes.content}"></div>`
    + '</div>';

export class DatePicker<E extends HTMLElement = HTMLInputElement>
    extends Eventable<DatePickerEvents<E>>
{
    static defaults: DatePickerOptions = {};

    public element: E;
    public config: ParsedOptions<E>;

    public input?: HTMLInputElement;
    public altInput?: HTMLInputElement;
    public altInputFormat!: string | DatePickerFormat;

    public pickerElement!: HTMLElement;
    public navigationElement: HTMLElement;
    public contentElement: HTMLElement;
    public buttonsElement: HTMLElement | null = null;

    public locale: Locale = DatePicker.locales.default;
    public dateFormat!: string | DatePickerFormat;
    public weekStart: DayOfWeek = 0;
    public rtl: boolean = false;
    public minDate: Date | null = null;
    public maxDate: Date | null = null;
    public minView: ViewType = 'days';
    public maxView: ViewType = 'years';

    public inline: boolean = false;
    public visible: boolean = false;
    public focused: boolean = false;
    public focusDate: Date | null = null;
    public viewDate: Date = new Date(today());
    public currentView: ViewType = 'days';

    public selectedDates: Date[] = [];
    public lastSelectedDate: Date | null = null;
    public rangeDateFrom: Date | null = null;
    public rangeDateTo: Date | null = null;

    private _disabledDates: DateLimit<Date>[] = [];
    private _enabledDates: DateLimit<Date>[] = [];
    private _isMultipleDates: boolean = false;

    private _views: Partial<Record<ViewType, View<E>>> = {};
    private _navigation?: Navigation<E>;
    private _buttons?: Buttons<E>;
    private _keyboardNav?: Keyboard<E>;

    private _container: HTMLElement;
    private _position!: PositionData | PositionCallback<E>;

    private _inputType?: string;
    private _inputId?: string;
    private _inputReadOnly?: boolean;
    private _inputDirection!: string;

    private _rendered: boolean = false;
    private _editMode: boolean = false;
    private _active: boolean = false;
    private _clicking: number | null = null;
    private _showing: boolean = false;

    private _hideCallback: (() => void) | null = null;

    private changeSelectedListener: TEventHandler<_ChangeSelectedDateEventDetail>;
    private changeFocusedListener: TEventHandler<_ChangeFocusedDateEventDetail>;

    private inputBlurListener: SpecificEventListener<'blur'>;
    private inputClickListener: SpecificEventListener<'click'>;
    private inputFocusListener: SpecificEventListener<'focus'>;
    private inputMouseDownListener: SpecificEventListener<'mousedown'>;
    private inputPasteListener: SpecificEventListener<'paste'>;
    private mouseDownListener: SpecificEventListener<'mousedown'>;
    private mouseUpListener: SpecificEventListener<'mouseup'>;
    private resizeListener: SpecificEventListener<'resize'>;

    /**
     * @private
     */
    public adapter = {
        setPosition: this._setPosition.bind(this),
        getSelectedDate: this._getSelectedDate.bind(this),
        handleAlreadySelectedDates: this._handleAlreadySelectedDates.bind(this),
        setInputValue: this._setInputValue.bind(this),
        enterEditMode: this._enterEditMode.bind(this),
        exitEditMode: this._exitEditMode.bind(this)
    };

    constructor(element: E | string, options: DatePickerOptions<E>) {
        super();

        const _element = typeof element === 'string' ? document.querySelector<E>(element) : element;
        if (!_element) {
            throw new Error('Could not find element to initialize DatePicker');
        }
        this.element = _element;

        (this.element as any).datePicker = this;
        instances.set<E>(this.element, this);

        this.config = merge({},
            getDefaults<E>(),
            DatePicker.defaults as Options<E>,
            options as Options<E>
        ) as ParsedOptions<E>;
        this._parseConfig();
        this._initInputs();
        this._processDates();
        this._limitViewDate();

        this.inline = this.config.inline || !this.input;
        this._container = this._getContainer();

        this.pickerElement = document.createElement('div');
        this.pickerElement.classList.add(classes.datepicker);
        this.pickerElement.innerHTML = template;

        this.changeFocusedListener = ({ detail: { date, view, moveToOther } }) => this._onChangeFocusedDate(date, view, moveToOther);
        this.changeSelectedListener = ({ detail: { silent } }) => this._onChangeSelectedDate(silent);

        this.on('_changeFocusedDate', this.changeFocusedListener);
        this.on('_changeSelectedDate', this.changeSelectedListener);

        this._bindConfigEvents();

        this.inputBlurListener = this._onBlurInput.bind(this);
        this.inputClickListener = () => this._onClickInput();
        this.inputFocusListener = () => this._onFocusInput();
        this.inputMouseDownListener = () => this._onMouseDownInput();
        this.inputPasteListener = this._onPasteInput.bind(this);
        this.mouseDownListener = () => this._onMouseDown();
        this.mouseUpListener = () => this._onMouseUp();
        this.resizeListener = debounce(() => this._onResize(), 300);

        this.pickerElement.addEventListener('mousedown', this.mouseDownListener);
        this.pickerElement.addEventListener('mouseup', this.mouseUpListener);

        if (this.input || this.altInput) {
            this._bindInputEvents();
        }
        if (!this.inline) {
            window.addEventListener('resize', this.resizeListener);
        }

        if (this.config.keyboardNav) {
            this._keyboardNav = new Keyboard<E>(this);
        }

        this.navigationElement = this.pickerElement.querySelector(`.${classes.navigation}`)!;
        this.contentElement = this.pickerElement.querySelector(`.${classes.content}`)!;

        if (this.inline) {
            this.show();
        }
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this.off();
        this.hide();

        this._removeInputEvents();

        this.pickerElement.removeEventListener('mousedown', this.mouseDownListener);
        this.pickerElement.removeEventListener('mouseup', this.mouseUpListener);

        window.removeEventListener('resize', this.resizeListener);

        this._keyboardNav?.destroy();

        this._navigation?.destroy();
        this._navigation = null as any;

        this._buttons?.destroy();
        this._buttons = null as any;

        this.pickerElement.remove();
        this.pickerElement = null as any;
        this.navigationElement = null as any;
        this.contentElement = null as any;
        this.buttonsElement = null as any;

        if (this.input) {
            if (this._inputType)
                this.input.type = this._inputType;

            if (this._inputId)
                this.input.id = this._inputId;

            if (this._inputReadOnly !== undefined)
                this.input.readOnly = this._inputReadOnly;
        }
        this.input = null as any;

        this.element.dir = this._inputDirection!;

        this.altInput?.remove();
        this.altInput = null as any;

        instances.delete(this.element);
        delete (this.element as any).datePicker;
        this.element = null as any;
    }

    /**
     * Check if provided date is currently selected at specified view level.
     */
    public isDateSelected(date: Date, type: ViewType = 'days'): boolean {
        return this.selectedDates.some(selectedDate => isSameDate(date, selectedDate, type));
    }

    /**
     * Select provided date(s).
     * Returns false if date was invalid or not selected.
     *
     * @param silent silence date change events
     */
    public selectDate(dates: DateLike | DateLike[], silent: boolean = false): boolean {
        if (Array.isArray(dates)) {
            return dates.map(date => this.selectDate(date, silent))
                .some(item => item);
        }

        if (typeof dates === 'string' && this._isMultipleDates) {
            return this.selectDate(dates.split(this.config.dateDelimiter || ','), silent);
        }

        let date = this.parseDate(dates);
        if (date === undefined || this.isDateDisabled(date)) {
            return false;
        }

        let newViewDate: Date | undefined;

        if (this.config.onBeforeSelect && !silent && !this.config.onBeforeSelect(date, this)) {
            return false;
        }

        if (this.config.range && this.selectedDates.length === 1 && this.isDisabledDateInRange(this.selectedDates[0], date)) {
            return false;
        }

        if (this.currentView === 'days') {
            if (date.getMonth() !== this.viewDate.getMonth()
                || date.getFullYear() !== this.viewDate.getFullYear()
            ) {
                newViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
            }
        }

        if (this.currentView === 'years' || this.currentView === 'months') {
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
        }
        else if (this.config.range) {
            switch (this.selectedDates.length) {
                case 1:
                    this.selectedDates.push(date);
                    if (!this.rangeDateTo) {
                        this.rangeDateTo = date;
                    }

                    if (isDateAfter(this.rangeDateFrom!, this.rangeDateTo)) {
                        this.rangeDateTo = this.rangeDateFrom;
                        this.rangeDateFrom = date;
                    }
                    this.selectedDates = [this.rangeDateFrom!, this.rangeDateTo!];
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
        }
        else {
            this.selectedDates = [date];
        }

        this.trigger('_changeSelectedDate', { date, selected: true, silent });
        this._setLastSelectedDate(date);

        if (this.config.autoClose && this.visible) {
            if ((!this._isMultipleDates && !this.config.range)
                || (this.config.range && this.selectedDates.length === 2)
            ) {
                this.hide();
            }
        }

        return true;
    }

    /**
     * Deselect provided date.
     */
    public deselectDate(date: DateLike) {
        const _date = this.parseDate(date);

        if (_date === undefined) {
            return;
        }

        this.selectedDates.some((curDate, index) => {
            if (isSameDate(curDate, _date, 'days')) {
                this.selectedDates.splice(index, 1);

                if (!this.selectedDates.length) {
                    this.rangeDateFrom = null;
                    this.rangeDateTo = null;
                    this._setLastSelectedDate(null);
                }
                else {
                    this.rangeDateTo = null;
                    this.rangeDateFrom = this.selectedDates[0];

                    this._setLastSelectedDate(this.selectedDates[this.selectedDates.length - 1]);
                }

                this.trigger('_changeSelectedDate', { date: _date, selected: false });

                return true;
            }
        });
    }

    /**
     * Replace selected date with new date
     */
    public replaceDate(selectedDate: Date, newDate: Date) {
        const index = this.selectedDates.findIndex(date => isSameDate(date, selectedDate, this.currentView));

        if (index < 0 || isSameDate(this.selectedDates[index], newDate, this.currentView)) {
            return;
        }

        this.selectedDates[index] = newDate;

        this.trigger('_changeSelectedDate', { date: newDate, selected: true });
        this._setLastSelectedDate(newDate);
    }

    /**
     * Set focused date
     *
     * @param moveToOther move to other month/year/decade
     */
    public setFocusDate(date: Date | null, moveToOther?: boolean) {
        this.focusDate = date;

        this.trigger('_changeFocusedDate', { date, view: this.currentView, moveToOther });
    }

    /**
     * Set new view date
     */
    public setViewDate(date: Date) {
        if (isSameDate(date, this.viewDate, 'days')) {
            return;
        }

        const oldDate = this.viewDate;
        this.viewDate = date;

        this.trigger('changeViewDate', { date, oldDate, datePicker: this });
    }

    /**
     * Navigate to next month/year/decade in current view level.
     */
    public next() {
        const year = this.viewDate.getFullYear();
        const month = this.viewDate.getMonth();

        switch (this.currentView) {
            case 'days':
                this.setViewDate(new Date(year, month + 1, 1));
                break;
            case 'months':
                this.setViewDate(new Date(year + 1, month, 1));
                break;
            case 'years':
                this.setViewDate(new Date(year + 10, 0, 1));
                break;
        }
    }

    /**
     * Navigate to previous month/year/decade in current view level.
     */
    public prev() {
        const year = this.viewDate.getFullYear();
        const month = this.viewDate.getMonth();

        switch (this.currentView) {
            case 'days':
                this.setViewDate(new Date(year, month - 1, 1));
                break;
            case 'months':
                this.setViewDate(new Date(year - 1, month, 1));
                break;
            case 'years':
                this.setViewDate(new Date(year - 10, 0, 1));
                break;
        }
    }

    /**
     * Change view level.
     *
     * @param silent silence view change events
     */
    public changeView(view: ViewType | 'up' | 'down', silent: boolean = false) {
        if (view === 'up') {
            view = this.currentView === 'days' ? 'months' : 'years';
        }
        else if (view === 'down') {
            view = this.currentView === 'years' ? 'months' : 'days';
        }

        if (!viewTypes.includes(view)) {
            return;
        }

        if (viewIndexes[view] > viewIndexes[this.maxView]) {
            view = this.maxView;
        }
        else if (viewIndexes[view] < viewIndexes[this.minView]) {
            view = this.minView;
        }

        const date = this.focusDate || this.viewDate;
        this.setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));

        if (!viewTypes.includes(view) || this.currentView === view) {
            return;
        }

        this.currentView = view;

        if ((this.altInput || this.input) && this.visible) {
            this._setPosition(undefined, true);
        }

        this.trigger('_changeCurrentView', view);

        if (!this._views[view]) {
            this._views[view] = new View<E>(this, view);
            this.contentElement.append(this._views[view]!.element);
        }

        if (!silent) {
            this.trigger('changeView', { view, datePicker: this });
        }
    }

    /**
     * Returns if current view level is min configured level.
     */
    public isMinView(): boolean {
        return this.currentView === this.minView;
    }

    /**
     * Returns if current view level is max configured level.
     */
    public isMaxView(): boolean {
        return this.currentView === this.maxView;
    }

    /**
     * Format date
     */
    public formatDate(date: Date, format?: string | DatePickerFormat) {
        return formatDate(date, format || this.dateFormat, this.locale);
    }

    /**
     * Parse date
     */
    public parseDate(date: DateLike, format?: string | DatePickerFormat) {
        return parseDate(date, format || this.dateFormat, this.locale);
    }

    /**
     * Disable specified dates.
     * Overrides currently disabled dates.
     *
     * If enabled dates is currently set, removes from those instead.
     */
    public disableDates(rules: DateLimit<DateLike> | DateLimit<DateLike>[]) {
        rules = Array.isArray(rules) ? rules : [rules];

        const parsedRules = this._parseDateRules(rules);

        if (!this._enabledDates.length) {
            this._disabledDates = parsedRules;
            this._views[this.currentView]?.render();
            return;
        }

        parsedRules.forEach(rule => {
            if (typeof rule === 'function') {
                const index = this._enabledDates.indexOf(rule);
                if (index >= 0) {
                    this._enabledDates.splice(index, 1);
                }
            }
            else if (rule instanceof Date) {
                const index = this._enabledDates.findIndex(date => date instanceof Date && isSameDate(date, rule, 'days'));
                if (index >= 0) {
                    this._enabledDates.splice(index, 1);
                }
            }
            else {
                const index = this._enabledDates.findIndex(date => {
                    if (!(date instanceof Date || typeof date === 'function')) {
                        return isSameDate(date.from, rule.from, 'days')
                            && isSameDate(date.to, rule.to, 'days');
                    }
                });
                if (index >= 0) {
                    this._enabledDates.splice(index, 1);
                }
            }
        });

        this._views[this.currentView]?.render();
    }

    /**
     * Enable specified dates, or all dates if `true` is passed.
     * Overrides currently enabled dates.
     */
    public enableDates(dates: DateLimit<DateLike> | DateLimit<DateLike>[] | boolean) {
        dates = typeof dates === 'boolean' || Array.isArray(dates) ? dates : [dates];

        this._enabledDates = Array.isArray(dates) ? this._parseDateRules(dates) : [];
        this._disabledDates = [];

        this._views[this.currentView]?.render();
    }

    /**
     * Check if given date is disabled.
     */
    public isDateDisabled(date: Date): boolean {
        if ((this.minDate && isDateBefore(date, this.minDate))
            || (this.maxDate && isDateAfter(date, this.maxDate))
        ) {
            return true;
        }

        if (!this._enabledDates.length && !this._disabledDates.length) {
            return false;
        }

        const bool = !this._enabledDates.length;
        const rules = this._enabledDates.length ? this._enabledDates : this._disabledDates;

        for (let i = 0, d; i < rules.length; i++) {
            d = rules[i];

            if (typeof d === 'function') {
                return d(date)
                    ? bool
                    : !bool;
            }
            else if (d instanceof Date) {
                return d.getTime() === date.getTime()
                    ? bool
                    : !bool;
            }
            else {
                return date.getTime() >= d.from.getTime() && date.getTime() <= d.to.getTime()
                    ? bool
                    : !bool;
            }
        }

        return !bool;
    }

    /**
     * Check if there is a disabled date between given dates
     */
    public isDisabledDateInRange(from: Date, to: Date): boolean {
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
    public show() {
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

        this.trigger('show', this);
    }

    /**
     * Hide the date picker
     */
    public hide() {
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

        this.trigger('hide', this);
    }

    /**
     * Clear selected values
     *
     * @param silent silence date change events
     */
    public clear(silent: boolean = false) {
        this.selectedDates = [];
        this.rangeDateFrom = null;
        this.rangeDateTo = null;
        this.lastSelectedDate = null;

        this.trigger('_changeSelectedDate', { date: null, selected: false, silent });
    }

    /**
     * Update date picker options.
     *
     * (Does not process event listener options, use the on/off methods instead.)
     *
     * @param silent silence view/date change events
     */
    public update(options: DatePickerOptions, silent: boolean = false) {
        const currentView = this.currentView;
        const oldConfig = merge({}, this.config);
        this.config = merge(this.config, options) as ParsedOptions<E>;

        this._parseConfig();
        this._limitViewDate();
        this.currentView = currentView;

        this.element.dir = this.rtl ? 'rtl' : 'ltr';

        this.inline = this.config.inline || !this.input;

        window.removeEventListener('resize', this.resizeListener);
        if (!this.inline) {
            window.addEventListener('resize', this.resizeListener);
        }

        if (!this.config.altInput && this.altInput) {
            this._removeAltInput();
        }
        if (this.config.altInput) {
            if (this.altInput
                && this.config.altInput instanceof HTMLInputElement
                && this.config.altInput !== this.altInput
            ) {
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
        }
        else if (!oldConfig.range && this.config.range) {
            if (this.selectedDates.length) {
                this.rangeDateFrom = this.selectedDates[0] || null;
                this.rangeDateTo = this.selectedDates[1] || null;
            }
        }

        if (this.config.buttons && !this._buttons && this._rendered) {
            this._initButtons();
        }
        this._buttons?.update();

        if (oldConfig.buttons && !this.config.buttons) {
            this.buttonsElement?.remove();
            this.buttonsElement = null as any;
            this._buttons?.destroy();
            this._buttons = null as any;
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

        this._navigation?.update();
        if (this.visible || this.inline) {
            classList.add(classes.active);

            this._views[this.currentView]?.update();
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
    public isOtherMonth(date: Date) {
        return date.getMonth() !== this.viewDate.getMonth();
    }

    /**
     * Check if provided date is a different year from current view date.
     */
    public isOtherYear(date: Date) {
        return date.getFullYear() !== this.viewDate.getFullYear();
    }

    /**
     * Check if provided date is a different decade from current view date.
     */
    public isOtherDecade(date: Date) {
        const [firstYear, lastYear] = getDecade(this.viewDate);
        const year = date.getFullYear();

        return year < firstYear || year > lastYear;
    }

    /**
     * Returns if edit mode is active
     */
    public isEditMode() {
        return this._editMode;
    }

    /**
     * Process options
     */
    private _parseConfig() {
        const config = this.config as Options<E>;
        let { dateFormat, locale, maxView, minView, startView: view } = config;
        let localeData: CustomLocale | null = null;

        if (locale && typeof locale !== 'string') {
            localeData = locale;
        }
        else if (typeof locale === 'string' && locale !== 'default') {
            if (DatePicker.locales[locale]) {
                localeData = DatePicker.locales[locale];
            } else {
                locale = locale.split('-')[0];
                if (DatePicker.locales[locale]) {
                    localeData = DatePicker.locales[locale];
                }
            }
        }

        if (localeData) {
            this.locale = { ...DatePicker.locales.default, ...localeData };
        }

        this.dateFormat = dateFormat && isFormatValid(dateFormat)
            ? dateFormat
            : this.locale.format;

        this.altInputFormat = config.altInputFormat && isFormatValid(config.altInputFormat)
            ? config.altInputFormat
            : defaults.altInputFormat;

        this.weekStart = config.weekStart || config.weekStart === 0
            ? config.weekStart
            : this.locale.weekStart;

        this.rtl = config.rtl !== null ? config.rtl : (
            this.locale.rtl
            || this.element.dir === 'rtl'
            || false
        );

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

        // normalize position option
        if (config.position) {
            if (typeof config.position === 'string') {
                this._position = this._parsePositionString(config.position);
                config.position = (this._position.y + ' ' + this._position.x) as Position;
            } else {
                this._position = config.position;
            }
        }
    }

    /**
     * Parse position string
     */
    private _parsePositionString(position: Position): PositionData {
        let _position = position.toLowerCase().split(/\s+/g);

        if (_position.length !== 2) {
            _position = [
                _position.find(y => (y === 'top' || y === 'middle' || y === 'bottom')) || 'auto',
                _position.find(x => (x === 'left' || x === 'center' || x === 'right')) || 'auto'
            ];
        }

        return { y: _position[0], x: _position[1] } as PositionData;
    }

    /**
     * Initialize input elements
     */
    private _initInputs() {
        if (this.element instanceof HTMLInputElement) {
            this.input = this.element;
            this._inputType = this.input.type;
            this._inputId = this.input.id;
            this._inputReadOnly = this.input.readOnly;

            this.input.type = 'text';
            this.input.readOnly = !this.config.allowInput;
        }

        this._inputDirection = this.element.dir;
        this.element.dir = this.rtl ? 'rtl' : 'ltr';

        if (this.config.altInput) {
            this.altInput = this._createAltInput();
        }
    }

    /**
     * Bind input event listeners
     */
    private _bindInputEvents() {
        const input = this.altInput || this.input!;
        const showOn = this.config.showOn;

        if (showOn === 'click' || showOn === true) {
            input.addEventListener('mousedown', this.inputMouseDownListener);
            input.addEventListener('click', this.inputClickListener);
        }
        if (showOn === 'focus' || showOn === true) {
            input.addEventListener('focus', this.inputFocusListener);
        }

        input.addEventListener('blur', this.inputBlurListener);
        input.addEventListener('paste', this.inputPasteListener);
    }

    /**
     * Remove input event listeners
     */
    private _removeInputEvents() {
        this.input?.removeEventListener('click', this.inputClickListener);
        this.input?.removeEventListener('focus', this.inputFocusListener);
        this.input?.removeEventListener('blur', this.inputBlurListener);
        this.input?.removeEventListener('mousedown', this.inputMouseDownListener);
        this.input?.removeEventListener('paste', this.inputPasteListener);

        this.altInput?.removeEventListener('click', this.inputClickListener);
        this.altInput?.removeEventListener('focus', this.inputFocusListener);
        this.altInput?.removeEventListener('blur', this.inputBlurListener);
        this.altInput?.removeEventListener('mousedown', this.inputMouseDownListener);
        this.altInput?.removeEventListener('paste', this.inputPasteListener);
    }

    /**
     * Create alternate input field.
     */
    private _createAltInput() {
        let input: HTMLInputElement;

        if (this.config.altInput instanceof HTMLInputElement) {
            input = this.config.altInput;

            if (this.input) {
                input.dir = this.input.dir;
            }
        } else {
            input = document.createElement('input');

            input.type = 'text';
            input.readOnly = !this.config.allowInput;

            if (this.input) {
                this.input.id && (input.id = this.input.id);
                input.placeholder = this.input.placeholder;
                input.disabled = this.input.disabled;
                input.required = this.input.required;
                input.tabIndex = this.input.tabIndex;
                input.dir = this.input.dir;

                this.input.type = 'hidden';
                this.input.id = '';
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
    private _removeAltInput() {
        this.altInput?.remove();
        this.altInput = undefined;

        if (this.input) {
            this.input.type = 'text';

            if (this._inputId)
                this.input.id = this._inputId;
        }
    }

    /**
     * Process dates from input and options
     */
    private _processDates() {
        const preloadedDate = this.config.defaultDate
            || (this.input && (this.input.placeholder && this.input.value === this.input.placeholder
                ? null
                : this.input.value
            ))
            || this.element.dataset.date
            || null;

        if (preloadedDate) {
            this.selectDate(preloadedDate, true);
        }

        const { disabledDates, enabledDates } = this.config;

        if (enabledDates && enabledDates.length) {
            this._enabledDates = this._parseDateRules(enabledDates);
        }
        else if (disabledDates && disabledDates.length) {
            this._disabledDates = this._parseDateRules(disabledDates);
        }
    }

    /**
     * Parse date limit rules
     */
    private _parseDateRules(rules: DateLimit[]): DateLimit<Date>[] {
        return rules.slice()
            .map(rule => {
                if (typeof rule === 'function') {
                    return rule;
                }
                else if (typeof rule === 'string' || typeof rule === 'number' || rule instanceof Date) {
                    return this.parseDate(rule);
                }
                else if (rule.from && rule.to) {
                    return {
                        from: this.parseDate(rule.from),
                        to: this.parseDate(rule.to)
                    };
                }
            })
            .filter(rule => rule) as DateLimit<Date>[];
    }

    /**
     * Limit view date by min and max dates.
     */
    private _limitViewDate() {
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
    private _getContainer() {
        const container = this.config.container;

        if (!container) {
            return document.body;
        }

        if (typeof container === 'string') {
            return document.querySelector<HTMLElement>(container) || document.body;
        }

        return container || document.body;
    }

    /**
     * Bind events from config
     */
    private _bindConfigEvents() {
        if (this.config.onShow) {
            const onShow = this.config.onShow;
            this.on('show', () => onShow(this));
        }

        if (this.config.onHide) {
            const onHide = this.config.onHide;
            this.on('hide', () => onHide(this));
        }

        if (this.config.onFocus) {
            const onFocus = this.config.onFocus;
            this.on('focus', ({ detail: { date, view } }) => onFocus(date, view, this));
        }

        if (this.config.onChangeDate) {
            const onChangeDate = this.config.onChangeDate;
            this.on('changeDate', ({ detail: { date, formatted } }) => onChangeDate(date, formatted, this));
        }

        if (this.config.onChangeView) {
            const onChangeView = this.config.onChangeView;
            this.on('changeView', ({ detail: { view } }) => onChangeView(view, this));
        }

        if (this.config.onChangeViewDate) {
            const onChangeViewDate = this.config.onChangeViewDate;
            this.on('changeViewDate', ({ detail: { date, oldDate }}) => onChangeViewDate(date, oldDate, this));
        }
    }

    /**
     * Render picker
     */
    private _render() {
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

        this._views[this.currentView] = new View<E>(this, this.currentView);
        this.contentElement.append(this._views[this.currentView]!.element);

        this._navigation = new Navigation<E>(this);
        this.navigationElement.append(this._navigation.element);

        if (this.config.buttons) {
            this._initButtons();
        }
    }

    /**
     * Attach picker element to container
     */
    private _attachToContainer() {
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
    private _initButtons() {
        this.buttonsElement = document.createElement('div');
        this.buttonsElement.classList.add(classes.buttons);

        this._buttons = new Buttons(this);
        this.buttonsElement.append(this._buttons.element);
        this.pickerElement.firstElementChild!.append(this.buttonsElement);
    }

    /**
     * Get value for input element
     */
    private _getInputValue(format?: string | DatePickerFormat): string {
        if (!this.selectedDates.length) {
            return '';
        }

        return this.selectedDates.map(date => this.formatDate(date, format))
            .join(this.config.dateDelimiter);
    }

    /**
     * Set value to inputs
     */
    private _setInputValue() {
        if (this.altInput) {
            this.altInput.value = this._getInputValue(this.altInputFormat);
        }

        const value = this._getInputValue();

        if (this.input) {
            this.input.value = value;
        } else {
            this.element.setAttribute('data-date', value);
        }

        this.element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    /**
     * Trigger date change event
     */
    private _triggerDateChange() {
        let dates: Date[] = [];
        let formattedDates: string[] = [];
        const isMultiple = this._isMultipleDates || this.config.range;

        if (this.selectedDates.length) {
            dates = this.selectedDates.map(date => new Date(date));
            formattedDates = dates.map(date => this.formatDate(date));
        }

        this.trigger('changeDate', {
            date: isMultiple ? dates : dates[0],
            formatted: isMultiple ? formattedDates : formattedDates[0],
            datePicker: this
        });
    }

    /**
     * Sync text direction with input
     */
    private _syncTextDirection() {
        const input = this.altInput || this.input;
        const direction = getTextDirection(input || this.element);
        const parent = input?.parentElement || this.element;

        if (!parent || direction !== getTextDirection(parent)) {
            this.pickerElement.dir = direction;
        }
        else if (this.pickerElement.dir) {
            this.pickerElement.removeAttribute('dir');
        }
    }

    /**
     * Position picker element
     */
    private _setPosition(position?: Position | PositionData | PositionCallback<E>, isViewChange: boolean = false) {
        position = position || this._position;

        if (typeof position === 'function') {
            this._hideCallback = position(this.pickerElement, this.element, isViewChange, this) || null;
            return;
        }

        const input = this.altInput || this.input;
        if (!input) {
            return;
        }

        if (typeof position === 'string') {
            position = this._parsePositionString(position);
        }

        let { y: positionY, x: positionX } = position;

        // temporarily display picker to get correct sizing
        this.pickerElement.style.display = 'block';

        const pickerRect = this.pickerElement.getBoundingClientRect();
        const offsetParent = this.pickerElement.offsetParent;

        // restore picker display to hidden (hidden by css)
        this.pickerElement.style.display = '';

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

        // determine horizontal position and left offset
        let adjustment = 0;
        if (positionX === 'auto') {
            if (inputRect.left < scrollLeft) {
                positionX = 'left';
                adjustment = scrollLeft - inputRect.left;
            }
            else if (inputRect.left + pickerRect.width > scrollRight) {
                positionX = 'right';
                if (scrollRight < inputRect.right) {
                    adjustment = scrollRight - inputRect.right;
                }
            }
            else if (this.rtl) {
                positionX = inputRect.right - pickerRect.width < scrollLeft ? 'left' : 'right';
            }
            else {
                positionX = 'left';
            }
        }

        if (positionX === 'right') {
            left += inputRect.width - pickerRect.width;
        }
        else if (positionX === 'center') {
            left += inputRect.width / 2 - pickerRect.width / 2;
        }
        left += adjustment;

        // determine vertical position and top offset
        if (positionY === 'auto') {
            if (inputRect.top - pickerRect.height > scrollTop) {
                positionY = inputRect.bottom + pickerRect.height > scrollBottom ? 'top' : 'bottom';
            } else {
                positionY = 'bottom';
            }
        }

        if (positionY === 'top') {
            top -= pickerRect.height + offset;
        }
        else if (positionY === 'middle') {
            top += inputRect.height / 2 - pickerRect.height / 2;
        }
        else {
            top += inputRect.height + offset;
        }

        const classList = this.pickerElement.classList;
        classList.remove(...Object.values(classes.positions));
        classList.add(classes.positions[positionX], classes.positions[positionY]);

        this.pickerElement.style.top = top + 'px';
        this.pickerElement.style.left = left + 'px';
    }

    /**
     * Set last selected date
     */
    private _setLastSelectedDate(date: Date | null) {
        this.lastSelectedDate = date;
        this.trigger('_changeLastSelectedDate', date || undefined);
    }

    /**
     * Enter edit mode
     */
    private _enterEditMode() {
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
    private _exitEditMode(update: boolean = false) {
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
    private _updateFromInput() {
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
    private _getSelectedDate(date: Date, type: ViewType = 'days'): Date | null {
        let existingDate: Date | null = null;

        this.selectedDates.some(selectedDate => {
            const same = isSameDate(date, selectedDate, type);
            existingDate = same && selectedDate || null;
            return same;
        });

        return existingDate;
    }

    /**
     * Internal date selection processing.
     */
    private _handleAlreadySelectedDates(existingDate: Date | null, date: Date) {
        const selectedLength = this.selectedDates.length;
        const datesAreSame = Boolean(this.config.range && selectedLength === 1 && existingDate);
        const dateCopy = datesAreSame ? new Date(date) : date;

        if (this.config.range) {
            if (!this.config.toggleSelected) {
                if (selectedLength !== 2) {
                    this.selectDate(dateCopy);
                }
                if (selectedLength === 2 && isSameDate(this.rangeDateFrom, this.rangeDateTo, 'days')) {
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
    private _onChangeFocusedDate(date: Date | null, view: ViewType, moveToOther?: boolean) {
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

        this.trigger('focus', { date, view, datePicker: this });
    }

    /**
     * Handle selected date change event
     */
    private _onChangeSelectedDate(silent?: boolean) {
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
    private _onBlurInput(event: FocusEvent) {
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
    private _onClickInput() {
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
    private _onFocusInput() {
        if (!this.visible && !this.inline && !this._showing) {
            this.show();
        }
    }

    /**
     * Handle input mouse down event
     */
    private _onMouseDownInput() {
        const showOn = this.config.showOn;

        if (this.visible || showOn === 'click' || showOn === true) {
            this._active = document.activeElement === (this.altInput || this.input!);
            this._clicking = window.setTimeout(() => {
                this._active = false;
                this._clicking = null;
            }, 2000);
        }
    }

    /**
     * Handle input paste event
     */
    private _onPasteInput(event: ClipboardEvent) {
        if (this.config.allowInput && event.clipboardData?.types.includes('text/plain')) {
            this._enterEditMode();
        }
    }

    /**
     * Handle picker mouse down event
     */
    private _onMouseDown() {
        this.focused = true;
    }

    /**
     * Handle picker mouse up event
     */
    private _onMouseUp() {
        this.focused = false;

        (this.altInput || this.input)?.focus();
    }

    /**
     * Handle window resize event
     */
    private _onResize() {
        if (this.visible && typeof this.config.position !== 'function') {
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
    static getInstance<E extends HTMLElement = HTMLInputElement>(element: E) {
        return instances.get<E>(element);
    }

    /**
     * Extend default options (does not apply to existing instances)
     */
    static setDefaults(options: DatePickerOptions) {
        this.defaults = merge({}, this.defaults, options);
    }
}
