import type { DatePicker } from "../datepicker";
import type { ViewType } from "../types/datepicker";
export declare class Cell<E extends HTMLElement = HTMLInputElement> {
    datePicker: DatePicker<E>;
    type: ViewType;
    date: Date;
    focused: boolean;
    disabled: boolean;
    selected: boolean;
    element: HTMLElement;
    private renderOptions;
    private changeFocusListener;
    private changeSelectedListener;
    constructor(datePicker: DatePicker<E>, type: ViewType, date: Date);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Render cell content
     */
    render(): void;
    /**
     * Create cell element
     */
    private _createElement;
    /**
     * Retrieve cell content
     */
    private _getContent;
    /**
     * Update cell classes
     */
    private _updateClasses;
    /**
     * Update focused state
     */
    private _updateFocused;
    /**
     * Update selected state
     */
    private _updateSelected;
    /**
     * Update range state
     */
    private _updateRangeStatus;
    /**
     * Check if cell date is out of min/max range at current level
     */
    private _isOutOfMinMaxRange;
    /**
     * Handle cell focus change
     */
    private _onChangeFocus;
    /**
     * Handle date change
     */
    private _onChangeSelected;
}
