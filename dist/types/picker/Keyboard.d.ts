import type { DatePicker } from "../datepicker";
import type { DatePickerShortcut } from "../types/datepicker";
export type DatePickerShortcutRemoveParam<E extends HTMLElement> = Omit<DatePickerShortcut<E>, 'callback'> & Partial<Pick<DatePickerShortcut<E>, 'callback'>>;
export declare class Keyboard<E extends HTMLElement = HTMLInputElement> {
    datePicker: DatePicker<E>;
    private keybinds;
    private keydownListener;
    constructor(datePicker: DatePicker<E>);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Add keybind.
     */
    on(keybind: DatePickerShortcut<E> | DatePickerShortcut<E>[]): this;
    /**
     * Remove keybind.
     * If `keybind.callback` is omitted, all keybinds with matching keys will be removed.
     * If keybind is omitted, all keybinds will be removed.
     */
    off(keybind?: DatePickerShortcutRemoveParam<E> | DatePickerShortcutRemoveParam<E>[]): this;
    /**
     * Handle keydown event
     */
    private _onKeydown;
    /**
     * Retrieve matching keybinds for given event
     */
    private _findKeybinds;
    /**
     * Handle keybinds for event
     */
    private _handleKeybinds;
    /**
     * Call datepicker action
     */
    private _action;
    /**
     * Move focus between cells
     */
    private _focusNextCell;
    /**
     * Retrieve initial focus date
     */
    private _getFocusDate;
    /**
     * Clamp date between min and max dates
     */
    private _clampDate;
    /**
     * Handle removing focus from datepicker input
     */
    private _unfocus;
}
