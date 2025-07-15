import type { DatePicker } from "../datepicker";
export declare class Buttons<E extends HTMLElement = HTMLInputElement> {
    datePicker: DatePicker<E>;
    element: HTMLElement;
    constructor(datePicker: DatePicker<E>);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Re-render buttons
     */
    update(): void;
    /**
     * Render buttons
     */
    private _render;
    /**
     * Create button
     */
    private _createButton;
    /**
     * Remove buttons
     */
    private _clearButtons;
}
