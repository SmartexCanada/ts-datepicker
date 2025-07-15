import type { DatePicker } from "../datepicker";
import type { ViewType } from "../types/datepicker";
export declare const defaultTitles: Record<ViewType, string>;
export declare const defaultNextArrow: string;
export declare const defaultPrevArrow: string;
export declare class Navigation<E extends HTMLElement = HTMLInputElement> {
    datePicker: DatePicker<E>;
    element: HTMLElement;
    prevButton: HTMLButtonElement;
    nextButton: HTMLButtonElement;
    titleElement: HTMLButtonElement;
    private prevClickListener;
    private nextClickListener;
    private titleClickListener;
    private changeViewListener;
    private changeDateListener;
    constructor(datePicker: DatePicker<E>);
    /**
     * Destroy instance
     */
    destroy(): void;
    /**
     * Render title
     */
    render(): void;
    /**
     * Update navigation
     */
    update(): void;
    /**
     * Build html for navigation
     */
    private _buildHtml;
    /**
     * Update arrows content
     */
    private _updateArrows;
    /**
     * Check if any nav title template is a callback
     */
    private _hasNavTitleCallback;
    /**
     * Get content for title
     */
    private _getTitle;
    /**
     * Handle view level change
     */
    private _onChangeView;
    /**
     * Update navigation actions
     */
    private _updateNavStatus;
}
