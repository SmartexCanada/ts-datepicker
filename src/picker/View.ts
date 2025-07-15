import { classes } from "@/consts/classes";
import type { DatePicker } from "@/datepicker";
import type { DateLike, ViewType } from "@/types/datepicker";
import type { ChangeViewDateEventDetail, SpecificEventListener, TEventHandler } from "@/types/events";
import {
    addDays,
    getDayOfWeek,
    getDaysInMonth,
    getDecade,
    getWeekNumber,
    isDateAfter,
    isDateBefore,
    isSameDate,
    sortDates,
    subtractDays
} from "@/utils/date";
import { Cell } from "./Cell";

export const templates: Record<ViewType, string> = {
    days: `<div class="${classes.daysContainer}">`
        + `<div class="${classes.dayNames}"></div>`
        + `<div class="${classes.cells} days"></div>`
        + '</div>',
    months: `<div class="${classes.cells} months"></div>`,
    years: `<div class="${classes.cells} years"></div>`
};

export const weekNumbersTemplate = `<div class="${classes.weekNumbers}">`
    + `<div class="${classes.dayNames}"><div class="${classes.dayName}">&nbsp;</div></div>`
    + `<div class="${classes.cells} weeks"></div>`
    + `</div>`;

export class View<E extends HTMLElement = HTMLInputElement> {
    public datePicker: DatePicker<E>;
    public element: HTMLElement;
    public selected: DateLike[] = [];

    public type: ViewType;
    public isMinView: boolean = false;
    public visible = true;

    public cellsElement: HTMLElement;
    public dayNamesElement: HTMLElement | null;
    public weeksElement: HTMLElement | null = null;
    public weeksContainer: HTMLElement | null = null;

    private _cells: Cell<E>[] = [];
    private _cellsMap = new WeakMap<HTMLElement, Cell<E>>();

    private _isRange: boolean = false;
    private _pressed: boolean = false;
    private _focusedDate: Date | null = null;
    private _rangeFromFocused: boolean = false;
    private _rangeToFocused: boolean = false;
    private _rangeMoved: boolean = false;
    private _ignoreClick: boolean = false;

    private mouseOverListener: SpecificEventListener<'mouseover'>;
    private mouseOutListener: SpecificEventListener<'mouseout'>;
    private clickListener: SpecificEventListener<'click'>;
    private mouseDownListener: SpecificEventListener<'mousedown'>;
    private mouseMoveListener: SpecificEventListener<'mousemove'>;
    private mouseUpListener: SpecificEventListener<'mouseup'>;

    private changeViewListener: TEventHandler<ViewType>;
    private changeViewDateListener: TEventHandler<ChangeViewDateEventDetail<E>>;

    constructor(datePicker: DatePicker<E>, type: ViewType) {
        this.datePicker = datePicker;
        this.type = type;

        const config = this.datePicker.config;

        this.element = document.createElement('div');
        this.element.classList.add(classes.body, this.type);
        this.element.innerHTML = templates[this.type];

        this.cellsElement = this.element.querySelector(`.${classes.cells}`)!;
        this.dayNamesElement = this.type === 'days'
            ? this.element.querySelector(`.${classes.dayNames}`)
            : null;

        this.isMinView = this.type === config.minView;

        if (this.type === 'days') {
            if (this.dayNamesElement) {
                this._renderDayNames();
            }
            const tmp = document.createElement('div');
            tmp.innerHTML = weekNumbersTemplate;

            this.weeksElement = tmp.firstElementChild as HTMLElement;
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

        this.element.addEventListener('mouseover', this.mouseOverListener);
        this.element.addEventListener('mouseout', this.mouseOutListener);
        this.element.addEventListener('click', this.clickListener);

        if (config.range && config.dynamicRange) {
            this._isRange = true;
            this._bindRangeListeners();
        }

        this.changeViewListener = (event) => this._onChangeView(event.detail);
        this.changeViewDateListener = ({ detail }) => this._onChangeViewDate(detail.date, detail.oldDate);

        this.datePicker.on('_changeCurrentView', this.changeViewListener);
        this.datePicker.on('changeViewDate', this.changeViewDateListener);

        this.render();
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this._removeRangeListeners();

        this.datePicker.off('_changeCurrentView', this.changeViewListener);
        this.datePicker.off('changeViewDate', this.changeViewDateListener);
        this.datePicker = null as any;

        this._destroyCells();

        this._cellsMap = null as any;
        this.cellsElement = null as any;
        this.dayNamesElement = null;
        this.weeksContainer = null;
        this.weeksElement = null;

        this.element.remove();
        this.element = null as any;
    }

    /**
     * Render view content
     */
    public render() {
        this._destroyCells();
        this._generateCells();

        this._cells.forEach(cell => cell.render());

        if (this.type === 'days') {
            this._renderWeekNumbers();
        }
    }

    /**
     * Update view content
     */
    public update() {
        this.render();

        if (this.type === 'days') {
            this._renderDayNames();

            if (!this.datePicker.config.weekNumbers) {
                this.weeksElement!.remove();
            }
            else if (!this.element.contains(this.weeksElement)) {
                this.element.prepend(this.weeksElement!);
            }
        }

        const config = this.datePicker.config;
        const isRange = config.range && config.dynamicRange;

        if (isRange && !this._isRange) {
            this._bindRangeListeners();
        }
        else if (!isRange && this._isRange) {
            this._removeRangeListeners();
        }
    }

    /**
     * Show view
     */
    public show() {
        this.visible = true;
        this.element.classList.remove(classes.hidden);
    }

    /**
     * Hide view
     */
    public hide() {
        this.visible = false;
        this.element.classList.add(classes.hidden);
    }

    /**
     * Bind range event listeners
     */
    private _bindRangeListeners() {
        this.element.addEventListener('mousedown', this.mouseDownListener);
    }

    /**
     * Remove range event listeners
     */
    private _removeRangeListeners() {
        this.element.removeEventListener('mousedown', this.mouseDownListener!);
        this.element.removeEventListener('mousemove', this.mouseMoveListener!);
        document.removeEventListener('mouseup', this.mouseUpListener!);
    }

    /**
     * Render week day names
     */
    private _renderDayNames() {
        const weekStart = this.datePicker.weekStart;
        let current = weekStart;

        this.dayNamesElement!.innerHTML = '';

        for (let i = 0; i < 7; i++) {
            const day = current % 7,
                element = document.createElement('div');

            element.classList.add(classes.dayName);
            element.setAttribute('data-day-index', day + '');
            element.textContent = this.datePicker.locale.daysMin[day];

            this.dayNamesElement!.append(element);

            current++;
        }
    }

    /**
     * Render week numbers
     */
    private _renderWeekNumbers() {
        if (!this.datePicker.config.weekNumbers) {
            return;
        }

        this.weeksContainer!.innerHTML = '';

        const { viewDate, weekStart } = this.datePicker;
        const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        const startOfWeek = getDayOfWeek(firstOfMonth, weekStart, weekStart);

        const weeksToRender = this._cells.length / 7;

        for (let i = 0; i < weeksToRender; i++) {
            const element = document.createElement('div');
            element.classList.add(classes.cell, 'week');
            element.textContent = '' + getWeekNumber(addDays(startOfWeek, 7 * i), weekStart);

            this.weeksContainer!.append(element);
        }
    }

    /**
     * Destroy current cells
     */
    private _destroyCells() {
        this._cells.forEach(cell => {
            this._cellsMap.delete(cell.element);
            cell.destroy();
        });
        this._cells = [];
        this.cellsElement.innerHTML = '';
    }

    /**
     * Generate cells
     */
    private _generateCells() {
        const getDates = View.getDatesFunction(this.type);

        getDates(this.datePicker).forEach(date => {
            const cell = new Cell<E>(
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
    private _onChangeView(view: ViewType) {
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
    private _onChangeViewDate(viewDate: Date, oldViewDate: Date) {
        if (!this.visible) {
            return;
        }

        const decade = getDecade(viewDate),
            decadeOld = getDecade(oldViewDate);

        switch (this.datePicker.currentView) {
            case 'days':
                if (isSameDate(viewDate, oldViewDate, 'months')) {
                    return;
                }
                break;
            case 'months':
                if (isSameDate(viewDate, oldViewDate, 'years')) {
                    return;
                }
                break;
            case 'years':
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
    private _onMouseOver(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
            const element = event.target.closest<HTMLElement>(`.${classes.cell}`);
            const cell = element ? this._cellsMap.get(element) : null;

            this.datePicker.setFocusDate(cell ? cell.date : null);
        }
    }

    /**
     * Handle mouse out event
     */
    private _onMouseOut() {
        this.datePicker.setFocusDate(null);
    }

    /**
     * Handle click event on cell
     */
    private _onClick(event: MouseEvent) {
        if (event.target instanceof HTMLElement) {
            const element = event.target.closest<HTMLElement>(`.${classes.cell}`);
            const cell = element ? this._cellsMap.get(element) : null;

            if (cell && !cell.disabled) {
                if (!this.datePicker.isMinView()) {
                    this.datePicker.changeView('down');
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
    private _onMouseDown(event: MouseEvent) {
        if (!this.datePicker.isMinView() || !(event.target instanceof HTMLElement)) {
            return;
        }

        const element = event.target.closest<HTMLElement>(`.${classes.cell}`);
        const cell = element ? this._cellsMap.get(element) : null;

        if (!cell) {
            return;
        }

        this._pressed = true;

        this.element.addEventListener('mousemove', this.mouseMoveListener!);
        document.addEventListener('mouseup', this.mouseUpListener!);

        this._focusedDate = new Date(cell.date);

        if (isSameDate(cell.date, this.datePicker.rangeDateFrom, 'days')) {
            this._rangeFromFocused = true;
        }
        if (isSameDate(cell.date, this.datePicker.rangeDateTo, 'days')) {
            this._rangeToFocused = true;
        }
    }

    /**
     * Handle mouse move event
     */
    private _onMouseMove(event: MouseEvent) {
        if (!this._pressed
            || !this.datePicker.isMinView()
            || !(event.target instanceof HTMLElement)
        ) {
            return;
        }

        const element = event.target.closest<HTMLElement>(`.${classes.cell}`);
        const cell = element ? this._cellsMap.get(element) : null;
        const onBeforeSelect = this.datePicker.config.onBeforeSelect;
        const pickerClassList = this.datePicker.pickerElement.classList;

        if (!cell || cell.disabled || (onBeforeSelect && !onBeforeSelect(cell.date, this.datePicker))) {
            pickerClassList.add(classes.rangeDisabled);
            return;
        }

        const { rangeDateFrom, rangeDateTo } = this.datePicker;

        if (this.datePicker.selectedDates.length === 2) {
            const [firstDate, , lastDate] = sortDates([rangeDateFrom!, cell.date, rangeDateTo!]);

            if (this.datePicker.isDisabledDateInRange(firstDate, lastDate)) {
                pickerClassList.add(classes.rangeDisabled);
                return;
            } else {
                pickerClassList.remove(classes.rangeDisabled);
            }

            if (this._rangeFromFocused) {
                if (isDateAfter(cell.date, rangeDateTo!)) {
                    cell.date.setHours(rangeDateTo!.getHours());
                    cell.date.setMinutes(rangeDateTo!.getMinutes());
                    rangeDateTo!.setHours(rangeDateFrom!.getHours());
                    rangeDateTo!.setMinutes(rangeDateFrom!.getMinutes());

                    this.datePicker.rangeDateTo = cell.date;
                    this.datePicker.rangeDateFrom = rangeDateTo!;
                    this.datePicker.replaceDate(rangeDateTo!, cell.date);
                    this.datePicker.replaceDate(rangeDateFrom!, rangeDateTo!);

                    this._rangeFromFocused = false;
                    this._rangeToFocused = true;
                    this._rangeMoved = true;
                }
                else if (isDateBefore(cell.date, rangeDateTo!)) {
                    cell.date.setHours(rangeDateFrom!.getHours());
                    cell.date.setMinutes(rangeDateFrom!.getMinutes());

                    this.datePicker.rangeDateFrom = cell.date;
                    this.datePicker.replaceDate(rangeDateFrom!, cell.date);
                    this._rangeMoved = true;
                }
            }
            else if (this._rangeToFocused) {
                if (isDateBefore(cell.date, rangeDateFrom!)) {
                    cell.date.setHours(rangeDateFrom!.getHours());
                    cell.date.setMinutes(rangeDateFrom!.getMinutes());
                    rangeDateFrom!.setHours(rangeDateTo!.getHours());
                    rangeDateFrom!.setMinutes(rangeDateTo!.getMinutes());

                    this.datePicker.rangeDateFrom = cell.date;
                    this.datePicker.rangeDateTo = rangeDateFrom!;
                    this.datePicker.replaceDate(rangeDateFrom!, cell.date);
                    this.datePicker.replaceDate(rangeDateTo!, rangeDateFrom!);

                    this._rangeToFocused = false;
                    this._rangeFromFocused = true;
                    this._rangeMoved = true;
                }
                else if (isDateAfter(cell.date, rangeDateFrom!)) {
                    cell.date.setHours(rangeDateTo!.getHours());
                    cell.date.setMinutes(rangeDateTo!.getMinutes());

                    this.datePicker.rangeDateTo = cell.date;
                    this.datePicker.replaceDate(rangeDateTo!, cell.date);
                    this._rangeMoved = true;
                }
            }
        }
    }

    /**
     * Handle mouse up event
     */
    private _onMouseUp(event: MouseEvent) {
        this._pressed = false;
        this._rangeFromFocused = false;
        this._rangeToFocused = false;
        this._ignoreClick = false;

        if (event.target instanceof HTMLElement && this.datePicker.selectedDates.length === 2) {
            const element = event.target.closest<HTMLElement>(`.${classes.cell}`);
            const cell = element ? this._cellsMap.get(element) : null;

            if (cell && isSameDate(cell.date, this._focusedDate, this.type) && this._rangeMoved) {
                this._ignoreClick = true;
            }
        }
        this._rangeMoved = false;
        this._focusedDate = null;

        this.element.removeEventListener('mousemove', this.mouseMoveListener!);
        document.removeEventListener('mouseup', this.mouseUpListener!);
    }

    /**
     * Get dates function for specified view.
     */
    static getDatesFunction(type: ViewType) {
        switch (type) {
            case 'days':
                return View.getDaysDates;
            case 'months':
                return View.getMonthsDates;
            case 'years':
                return View.getYearsDates;
        }
    }

    /**
     * Get dates for days view.
     */
    static getDaysDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>) {
        const { viewDate, weekStart } = datePicker,
            daysInMonth = getDaysInMonth(viewDate),
            year = viewDate.getFullYear(),
            month = viewDate.getMonth(),
            firstDay = new Date(year, month, 1),
            lastDay = new Date(year, month, daysInMonth),
            dates: Date[] = [];

        let daysFromPrevMonth = firstDay.getDay() - weekStart,
            daysFromNextMonth = 6 - lastDay.getDay() - weekStart;

        daysFromPrevMonth = daysFromPrevMonth < 0 ? daysFromPrevMonth + 7 : daysFromPrevMonth;
        daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

        const firstRenderDate = subtractDays(firstDay, daysFromPrevMonth),
            totalRenderDays = daysInMonth + daysFromPrevMonth + daysFromNextMonth,
            firstRenderDayDate = firstRenderDate.getDate(),
            renderYear = firstRenderDate.getFullYear(),
            renderMonth = firstRenderDate.getMonth();

        for (let i = 0; i < totalRenderDays; i++) {
            dates.push(new Date(renderYear, renderMonth, firstRenderDayDate + i));
        }

        return dates;
    }

    /**
     * Get dates for months view.
     */
    static getMonthsDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>) {
        const year = datePicker.viewDate.getFullYear(),
            dates: Date[] = [];

        for (let month = 0; month < 12; month++) {
            dates.push(new Date(year, month));
        }

        return dates;
    }

    /**
     * Get dates for years view.
     */
    static getYearsDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>) {
        const viewDate = datePicker.viewDate,
            decade = getDecade(viewDate),
            dates: Date[] = [];

        for (let year = decade[0] - 1; year <= decade[1] + 1; year++) {
            dates.push(new Date(year, 0));
        }

        return dates;
    }
}
