import type { DatePicker } from "../datepicker";
import type { DateLike, ViewType } from "../types/datepicker";
export declare const templates: Record<ViewType, string>;
export declare const weekNumbersTemplate: string;
export declare class View<E extends HTMLElement = HTMLInputElement> {
    datePicker: DatePicker<E>;
    element: HTMLElement;
    selected: DateLike[];
    type: ViewType;
    isMinView: boolean;
    visible: boolean;
    cellsElement: HTMLElement;
    dayNamesElement: HTMLElement | null;
    weeksElement: HTMLElement | null;
    weeksContainer: HTMLElement | null;
    private _cells;
    private _cellsMap;
    private _isRange;
    private _pressed;
    private _focusedDate;
    private _rangeFromFocused;
    private _rangeToFocused;
    private _rangeMoved;
    private _ignoreClick;
    private mouseOverListener;
    private mouseOutListener;
    private clickListener;
    private mouseDownListener;
    private mouseMoveListener;
    private mouseUpListener;
    private changeViewListener;
    private changeViewDateListener;
    constructor(datePicker: DatePicker<E>, type: ViewType);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Render view content
     */
    render(): void;
    /**
     * Update view content
     */
    update(): void;
    /**
     * Show view
     */
    show(): void;
    /**
     * Hide view
     */
    hide(): void;
    /**
     * Bind range event listeners
     */
    private _bindRangeListeners;
    /**
     * Remove range event listeners
     */
    private _removeRangeListeners;
    /**
     * Render week day names
     */
    private _renderDayNames;
    /**
     * Render week numbers
     */
    private _renderWeekNumbers;
    /**
     * Destroy current cells
     */
    private _destroyCells;
    /**
     * Generate cells
     */
    private _generateCells;
    /**
     * Handle view level change
     */
    private _onChangeView;
    /**
     * Handle view date change
     */
    private _onChangeViewDate;
    /**
     * Handle mouse over event on cell
     */
    private _onMouseOver;
    /**
     * Handle mouse out event
     */
    private _onMouseOut;
    /**
     * Handle click event on cell
     */
    private _onClick;
    /**
     * Handle mouse down event
     */
    private _onMouseDown;
    /**
     * Handle mouse move event
     */
    private _onMouseMove;
    /**
     * Handle mouse up event
     */
    private _onMouseUp;
    /**
     * Get dates function for specified view.
     */
    static getDatesFunction(type: ViewType): typeof View.getDaysDates;
    /**
     * Get dates for days view.
     */
    static getDaysDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>): Date[];
    /**
     * Get dates for months view.
     */
    static getMonthsDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>): Date[];
    /**
     * Get dates for years view.
     */
    static getYearsDates<E extends HTMLElement = HTMLInputElement>(datePicker: DatePicker<E>): Date[];
}
