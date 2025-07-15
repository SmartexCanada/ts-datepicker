import { classes } from "@/consts/classes";
import type { DatePicker } from "@/datepicker";
import type { RenderCellOptions, ViewType } from "@/types/datepicker";
import type { TEventHandler } from "@/types/events";
import { isDateAfter, isDateBefore, isDateBetween, isSameDate } from "@/utils/date";
import { classNames } from "@/utils/dom";

const typesSingle: Record<ViewType, string> = {
    days: 'day',
    months: 'month',
    years: 'year'
};

export class Cell<E extends HTMLElement = HTMLInputElement> {
    public datePicker: DatePicker<E>;
    public type: ViewType;
    public date: Date;
    public focused: boolean = false;
    public disabled: boolean = false;
    public selected: boolean = false;

    public element!: HTMLElement;

    private renderOptions: RenderCellOptions | null = null;

    private changeFocusListener: TEventHandler<{ date: Date, view: ViewType}>;
    private changeSelectedListener: TEventHandler;

    constructor(datePicker: DatePicker<E>, type: ViewType, date: Date) {
        this.datePicker = datePicker;
        this.type = type;
        this.date = date;

        const { onRenderCell } = this.datePicker.config;
        if (onRenderCell) {
            this.renderOptions = onRenderCell(this.date, this.type, this.datePicker) || null;
        }

        this._createElement();
        this.changeFocusListener = ({ detail: { date }}) => this._onChangeFocus(date);
        this.changeSelectedListener = () => this._onChangeSelected();

        this.datePicker.on('_changeSelectedDate', this.changeSelectedListener);
        this.datePicker.on('_changeFocusedDate', this.changeFocusListener);
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this.datePicker.off('_changeSelectedDate', this.changeSelectedListener);
        this.datePicker.off('_changeFocusedDate', this.changeFocusListener);
        this.datePicker = null as any;

        this.element.remove();
        this.element = null as any;
    }

    /**
     * Render cell content
     */
    public render() {
        this.element.innerHTML = this._getContent();

        this._updateClasses();
        this._updateFocused();
        this._updateSelected();
        this._updateRangeStatus();
    }

    /**
     * Create cell element
     */
    private _createElement() {
        const [year, month, day] = [this.date.getFullYear(), this.date.getMonth(), this.date.getDate()],
            attributes: Record<string, string> = {
                'data-year': year + '',
                'data-month': month + '',
                'data-date': day + '',
                'data-iso-date': `${year}-${month}-${day}`,
                ...this.renderOptions?.attributes
            };

        this.element = document.createElement('div');
        this.element.classList.add(
            ...classNames(classes.cell, typesSingle[this.type], this.renderOptions?.classes)
        );

        Object.keys(attributes).forEach(attr => {
            this.element.setAttribute(attr, attributes[attr]);
        });
    }

    /**
     * Retrieve cell content
     */
    private _getContent() {
        if (this.renderOptions?.content) {
            return this.renderOptions.content;
        }

        const config = this.datePicker.config;

        switch (this.type) {
            case 'days':
                return config.showOtherMonths || !this.datePicker.isOtherMonth(this.date)
                    ? '' + this.date.getDate()
                    : '';
            case 'months':
                return this.datePicker.locale[config.monthsField][this.date.getMonth()];
            case 'years':
                return '' + this.date.getFullYear();
        }
    }

    /**
     * Update cell classes
     */
    private _updateClasses() {
        const { config, minDate, maxDate } = this.datePicker;
        const outOfRange = this._isOutOfMinMaxRange();
        const disabled = this.datePicker.isDateDisabled(this.date) || this.renderOptions?.disabled || false;
        const classList = this.element.classList;

        classList.toggle(classes.current, isSameDate(new Date(), this.date, this.type));
        classList.toggle(classes.minDate, minDate && isSameDate(minDate, this.date, this.type) || false);
        classList.toggle(classes.maxDate, maxDate && isSameDate(maxDate, this.date, this.type) || false);

        switch (this.type) {
            case 'days':
                const otherMonth = this.datePicker.isOtherMonth(this.date);
                this.disabled = !config.selectOtherMonths && otherMonth || outOfRange || disabled;

                classList.toggle(classes.otherMonth, otherMonth);
                classList.toggle(classes.disabled, this.disabled);
                break;
            case 'months':
                this.disabled = outOfRange || disabled;
                classList.toggle(classes.disabled, disabled);
                break;
            case 'years':
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
    private _updateFocused() {
        this.focused = isSameDate(this.datePicker.focusDate, this.date, this.type);
        this.element.classList.toggle(classes.focused, this.focused);
    }

    /**
     * Update selected state
     */
    private _updateSelected() {
        this.selected = this.datePicker.isDateSelected(this.date, this.type);
        this.element.classList.toggle(classes.selected, this.selected);
    }

    /**
     * Update range state
     */
    private _updateRangeStatus() {
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
    private _isOutOfMinMaxRange(): boolean {
        const { minDate, maxDate } = this.datePicker;

        if (!minDate && !maxDate) {
            return false;
        }

        const isDay = this.type === 'days';
        const isYear = this.type === 'years';
        let result: boolean = false;

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
    private _onChangeFocus(date: Date) {
        this._updateFocused();

        if (!date) {
            return;
        }

        this._updateRangeStatus();
    }

    /**
     * Handle date change
     */
    private _onChangeSelected() {
        if (this.disabled) {
            return;
        }

        this._updateSelected();
        this._updateRangeStatus();
    }
}
