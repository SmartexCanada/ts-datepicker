import { Eventable } from "./eventable";
import type { DateLike, DateLimit, DatePickerFormat, Position, PositionCallback, PositionHorizontal, PositionVertical, ViewType } from "./types/datepicker";
import type { DatePickerEvents } from "./types/events";
import type { DayOfWeek, Locale } from "./types/locale";
import type { DatePickerOptions, ParsedOptions } from "./types/options";
type PositionData = {
    y: PositionVertical;
    x: PositionHorizontal;
};
export declare class DatePicker<E extends HTMLElement = HTMLInputElement> extends Eventable<DatePickerEvents<E>> {
    static defaults: DatePickerOptions;
    element: E;
    config: ParsedOptions<E>;
    input?: HTMLInputElement;
    altInput?: HTMLInputElement;
    altInputFormat: string | DatePickerFormat;
    pickerElement: HTMLElement;
    navigationElement: HTMLElement;
    contentElement: HTMLElement;
    buttonsElement: HTMLElement | null;
    locale: Locale;
    dateFormat: string | DatePickerFormat;
    weekStart: DayOfWeek;
    rtl: boolean;
    minDate: Date | null;
    maxDate: Date | null;
    minView: ViewType;
    maxView: ViewType;
    inline: boolean;
    visible: boolean;
    focused: boolean;
    focusDate: Date | null;
    viewDate: Date;
    currentView: ViewType;
    selectedDates: Date[];
    lastSelectedDate: Date | null;
    rangeDateFrom: Date | null;
    rangeDateTo: Date | null;
    private _disabledDates;
    private _enabledDates;
    private _isMultipleDates;
    private _views;
    private _navigation?;
    private _buttons?;
    private _keyboardNav?;
    private _container;
    private _position;
    private _inputType?;
    private _inputId?;
    private _inputReadOnly?;
    private _inputDirection;
    private _rendered;
    private _editMode;
    private _active;
    private _clicking;
    private _showing;
    private _hideCallback;
    private changeSelectedListener;
    private changeFocusedListener;
    private inputBlurListener;
    private inputClickListener;
    private inputFocusListener;
    private inputMouseDownListener;
    private inputPasteListener;
    private mouseDownListener;
    private mouseUpListener;
    private resizeListener;
    /**
     * @private
     */
    adapter: {
        setPosition: (position?: Position | PositionData | PositionCallback<E>, isViewChange?: boolean) => void;
        getSelectedDate: (date: Date, type?: ViewType) => Date | null;
        handleAlreadySelectedDates: (existingDate: Date | null, date: Date) => void;
        setInputValue: () => void;
        enterEditMode: () => void;
        exitEditMode: (update?: boolean) => void;
    };
    constructor(element: E | string, options?: DatePickerOptions<E>);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Check if provided date is currently selected at specified view level.
     */
    isDateSelected(date: Date, type?: ViewType): boolean;
    /**
     * Select provided date(s).
     * Returns false if date was invalid or not selected.
     *
     * @param silent silence date change events
     */
    selectDate(dates: DateLike | DateLike[], silent?: boolean): boolean;
    /**
     * Deselect provided date.
     */
    deselectDate(date: DateLike): void;
    /**
     * Replace selected date with new date
     */
    replaceDate(selectedDate: Date, newDate: Date): void;
    /**
     * Set focused date
     *
     * @param moveToOther move to other month/year/decade
     */
    setFocusDate(date: Date | null, moveToOther?: boolean): void;
    /**
     * Set new view date
     */
    setViewDate(date: Date): void;
    /**
     * Navigate to next month/year/decade in current view level.
     */
    next(): void;
    /**
     * Navigate to previous month/year/decade in current view level.
     */
    prev(): void;
    /**
     * Change view level.
     *
     * @param silent silence view change events
     */
    changeView(view: ViewType | 'up' | 'down', silent?: boolean): void;
    /**
     * Returns if current view level is min configured level.
     */
    isMinView(): boolean;
    /**
     * Returns if current view level is max configured level.
     */
    isMaxView(): boolean;
    /**
     * Format date
     */
    formatDate(date: Date, format?: string | DatePickerFormat): string;
    /**
     * Parse date
     */
    parseDate(date: DateLike, format?: string | DatePickerFormat): Date | undefined;
    /**
     * Disable specified dates.
     * Overrides currently disabled dates.
     *
     * If enabled dates is currently set, removes from those instead.
     */
    disableDates(rules: DateLimit<DateLike> | DateLimit<DateLike>[]): void;
    /**
     * Enable specified dates, or all dates if `true` is passed.
     * Overrides currently enabled dates.
     */
    enableDates(dates: DateLimit<DateLike> | DateLimit<DateLike>[] | boolean): void;
    /**
     * Check if given date is disabled.
     */
    isDateDisabled(date: Date): boolean;
    /**
     * Check if there is a disabled date between given dates
     */
    isDisabledDateInRange(from: Date, to: Date): boolean;
    /**
     * Show the date picker
     */
    show(): void;
    /**
     * Hide the date picker
     */
    hide(): void;
    /**
     * Clear selected values
     *
     * @param silent silence date change events
     */
    clear(silent?: boolean): void;
    /**
     * Update date picker options.
     *
     * (Does not process event listener options, use the on/off methods instead.)
     *
     * @param silent silence view/date change events
     */
    update(options: DatePickerOptions, silent?: boolean): void;
    /**
     * Check if provided date is a different month from current view date.
     */
    isOtherMonth(date: Date): boolean;
    /**
     * Check if provided date is a different year from current view date.
     */
    isOtherYear(date: Date): boolean;
    /**
     * Check if provided date is a different decade from current view date.
     */
    isOtherDecade(date: Date): boolean;
    /**
     * Returns if edit mode is active
     */
    isEditMode(): boolean;
    /**
     * Process options
     */
    private _parseConfig;
    /**
     * Parse position string
     */
    private _parsePositionString;
    /**
     * Initialize input elements
     */
    private _initInputs;
    /**
     * Bind input event listeners
     */
    private _bindInputEvents;
    /**
     * Remove input event listeners
     */
    private _removeInputEvents;
    /**
     * Create alternate input field.
     */
    private _createAltInput;
    /**
     * Remove alternate input field
     */
    private _removeAltInput;
    /**
     * Process dates from input and options
     */
    private _processDates;
    /**
     * Parse date limit rules
     */
    private _parseDateRules;
    /**
     * Limit view date by min and max dates.
     */
    private _limitViewDate;
    /**
     * Retrieve container element
     */
    private _getContainer;
    /**
     * Bind events from config
     */
    private _bindConfigEvents;
    /**
     * Render picker
     */
    private _render;
    /**
     * Attach picker element to container
     */
    private _attachToContainer;
    /**
     * Initialize buttons
     */
    private _initButtons;
    /**
     * Get value for input element
     */
    private _getInputValue;
    /**
     * Set value to inputs
     */
    private _setInputValue;
    /**
     * Trigger date change event
     */
    private _triggerDateChange;
    /**
     * Sync text direction with input
     */
    private _syncTextDirection;
    /**
     * Position picker element
     */
    private _setPosition;
    /**
     * Set last selected date
     */
    private _setLastSelectedDate;
    /**
     * Enter edit mode
     */
    private _enterEditMode;
    /**
     * Exit edit mode
     */
    private _exitEditMode;
    /**
     * Update selected dates from input
     */
    private _updateFromInput;
    /**
     * Retrieve selected date matching given date at specified level.
     */
    private _getSelectedDate;
    /**
     * Internal date selection processing.
     */
    private _handleAlreadySelectedDates;
    /**
     * Handle focused date change event
     */
    private _onChangeFocusedDate;
    /**
     * Handle selected date change event
     */
    private _onChangeSelectedDate;
    /**
     * Handle input blur event
     */
    private _onBlurInput;
    /**
     * Handle input click event
     */
    private _onClickInput;
    /**
     * Handle input focus event
     */
    private _onFocusInput;
    /**
     * Handle input mouse down event
     */
    private _onMouseDownInput;
    /**
     * Handle input paste event
     */
    private _onPasteInput;
    /**
     * Handle picker mouse down event
     */
    private _onMouseDown;
    /**
     * Handle picker mouse up event
     */
    private _onMouseUp;
    /**
     * Handle window resize event
     */
    private _onResize;
    /**
     * Retrieve locales
     */
    static get locales(): Record<string, Partial<Locale>> & {
        default: Locale;
    };
    /**
     * Retrieve datepicker instance for provided element, if one exists
     */
    static getInstance<E extends HTMLElement = HTMLInputElement>(element: E): DatePicker<E>;
    /**
     * Extend default options (does not apply to existing instances)
     */
    static setDefaults(options: DatePickerOptions): void;
}
export {};
