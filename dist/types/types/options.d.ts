import { DatePicker } from "../datepicker";
import type { DateLimit, DatePickerButton, DatePickerButtonPreset, DateLike, DatePickerFormat, NavTitleEntry, Nullable, Position, PositionCallback, RenderCellOptions, ViewType, DatePickerShortcut } from "./datepicker";
import type { CustomLocale, DayOfWeek } from "./locale";
type DatePickerButtonOption<E extends HTMLElement> = DatePickerButtonPreset | DatePickerButton<E>;
export interface Options<E extends HTMLElement = HTMLInputElement> {
    /**
     * Allow user to enter a date directly into the input field.
     */
    allowInput: boolean;
    /**
     * An additional text field to display the date with the format from `altFieldFormat`.
     */
    altInput: boolean | HTMLInputElement;
    /**
     * Date format for the `altField` input.
     */
    altInputFormat: string | DatePickerFormat;
    /**
     * Whether to hide the date picker immediately after a date is selected.
     */
    autoClose: boolean;
    /**
     * Add buttons to the date picker. Available button presets: 'today' and 'clear'.
     */
    buttons: DatePickerButtonOption<E> | DatePickerButtonOption<E>[] | false;
    /**
     * CSS classes to add to date picker element.
     */
    classes: string;
    /**
     * The element or CSS selector for the element to append the date picker, instead of body.
     */
    container: Nullable<string | HTMLElement>;
    /**
     * Separator between date strings when in multiple date mode.
     */
    dateDelimiter: string;
    /**
     * Date format for main input/element.
     * Overrides format set in selected locale.
     */
    dateFormat: Nullable<string | DatePickerFormat>;
    /**
     * Initial selected date(s). Overrides value of date picker input.
     */
    defaultDate: DateLike | DateLike[];
    /**
     * Specifies select dates or ranges to disable.
     */
    disabledDates: DateLimit<DateLike>[];
    /**
     * Specifies select dates or ranges to enable, disabling all others.
     */
    enabledDates: DateLimit<DateLike>[];
    /**
     * Display date picker inline, instead of as a popup.
     * Implicitly enabled when picker is initialized on a non-input element.
     */
    inline: boolean;
    /**
     * Whether to enable keyboard navigation.
     */
    keyboardNav: boolean;
    /**
     * Custom key binds for keyboard navgiation.
     */
    keybinds: Nullable<Record<string, DatePickerShortcut<E>>>;
    /**
     * A locale string or custom locale object specifying language strings and format defaults.
     * Available locales are located in `datepicker/i18n/locales`.
     */
    locale: string | CustomLocale;
    /**
     * The maximum date that can be selected.
     */
    maxDate: Nullable<DateLike>;
    /**
     * The minimum date that can be selected.
     */
    minDate: Nullable<DateLike>;
    /**
     * The maximum view level for the date picker.
     * Available levels are `days`, `months` or `years`.
     */
    maxView: ViewType;
    /**
     * The minimum view level for the date picker.
     * Useful for selecting a month or year instead of a day.
     * Available levels are `days`, `months` or `years`.
     */
    minView: ViewType;
    /**
     * Starting view level for the picker.
     * Available levels are `days`, `months` or `years`.
     */
    startView: ViewType;
    /**
     * Field from the locale object to use for month names in the months view.
     * Available fields are `months` and `monthsShort`.
     */
    monthsField: 'months' | 'monthsShort';
    /**
     * Allow selecting multiple dates.
     * Can be a specific number, or `true` for unlimited.
     * The values `0` and `false` are treated as allowing only a single date.
     */
    multipleDates: number | boolean;
    /**
     * Navigation title formats for the different view levels.
     * All date formating tokens can be used.
     */
    navTitles: Partial<Record<ViewType, NavTitleEntry<E>>>;
    /**
     * Html for the 'next' arrow.
     */
    nextArrow: string;
    /**
     * Html for the 'prev' arrow.
     */
    prevArrow: string;
    /**
     * Offset in px to display the picker from the input element.
     * Ignored in inline mode.
     */
    offset: number;
    /**
     * Position of the picker relative to the input field, in the format `<vertical> <horizontal>`.
     * Vertical options: `top`, `middle`, `bottom`, `auto`.
     * Horizontal options: `left`, `center`, `right`, `auto`.
     *
     * Either direction can be omitted to fall back to auto.
     * Auto will use the direction with the most space.
     *
     * Can also be a function to position the element manually, useful with libraries like floating-ui.
     */
    position: Position | PositionCallback<E>;
    /**
     * Allow selecting a range of dates. `dateDelimiter` will be used as the separator.
     */
    range: boolean;
    /**
     * Allow dragging range ends after selecting.
     */
    dynamicRange: boolean;
    /**
     * Override rtl text direction
     */
    rtl: Nullable<boolean>;
    /**
     * Specifies which event from the input element displays the picker popup.
     * Can be either `click` or `focus`, `true` for both, or `false` for neither.
     */
    showOn: 'click' | 'focus' | boolean;
    /**
     * Whether to display dates from other months in days view.
     */
    showOtherMonths: boolean;
    /**
     * Allow selecting dates from other months in days view.
     */
    selectOtherMonths: boolean;
    /**
     * Allow selecting years from other decades in years view.
     */
    selectOtherYears: boolean;
    /**
     * Whether to allow deselecting selected dates.
     */
    toggleSelected: boolean;
    /**
     * Whether to update input value when picker is closed.
     */
    updateOnBlur: boolean;
    /**
     * Whether to show week numbers in days view.
     * Numbering system is determined from locale/configured week start.
     */
    weekNumbers: boolean;
    /**
     * First day of the week.
     * Possible values are from 0 (Sunday) to 6 (Saturday).
     * Overrides value set in selected locale.
     */
    weekStart: Nullable<DayOfWeek>;
    /**
     * Called before a cell (day/month/year) is selected.
     * Must return either `true` or `false` specifying whether to select the cell or not.
     */
    onBeforeSelect: ((date: Date, datePicker: DatePicker<E>) => boolean) | null;
    /**
     * Called when rendering a cell (day/month/year).
     * Used to customize the contents of the cell.
     */
    onRenderCell: ((date: Date, type: ViewType, datePicker: DatePicker<E>) => (RenderCellOptions | void)) | null;
    /**
     * Event fired when date picker is opened.
     * Not fired when in inline mode.
     */
    onShow: ((datePicker: DatePicker<E>) => void) | null;
    /**
     * Event fired when date picker is closed.
     * Not fired when in inline mode.
     */
    onHide: ((datePicker: DatePicker<E>) => void) | null;
    /**
     * Event fired when a cell (day/month/year) is focused.
     */
    onFocus: ((date: Date, view: ViewType, datePicker: DatePicker<E>) => void) | null;
    /**
     * Event fired when a date is selected/deselected.
     */
    onChangeDate: ((date: Date | Date[], formatted: string | string[], datePicker: DatePicker<E>) => void) | null;
    /**
     * Event fired when changing view levels.
     */
    onChangeView: ((view: ViewType, datePicker: DatePicker<E>) => void) | null;
    /**
     * Event fired when navigating navigating between months/decades.
     */
    onChangeViewDate: ((date: Date, oldDate: Date, datePicker: DatePicker<E>) => void) | null;
}
export type DatePickerOptions<E extends HTMLElement = HTMLInputElement> = Partial<Options<E>>;
export interface ParsedOptions<E extends HTMLElement = HTMLInputElement> extends Options<E> {
    multipleDates: number | true;
}
export {};
