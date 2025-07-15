import { DatePicker } from "../datepicker";
import type { ViewType } from "./datepicker";
export type EventType = keyof GlobalEventHandlersEventMap;
export type SpecificEventListener<K extends EventType> = (evt: GlobalEventHandlersEventMap[K]) => void;
export type TEventHandler<T = any> = (event: CustomEvent<T>) => any;
export interface DatePickerEvents<E extends HTMLElement> {
    /**
     * Fired when date picker is opened.
     * Not fired when in inline mode.
     */
    show: DatePicker<E>;
    /**
     * Fired when date picker is closed.
     * Not fired when in inline mode.
     */
    hide: DatePicker<E>;
    /**
     * Fired when a cell (day/month/year) is selected/deselected.
     */
    focus: FocusEventDetail<E>;
    /**
     * Fired when a date is selected/deselected.
     */
    changeDate: ChangeDateEventDetail<E>;
    /**
     * Fired when changing view levels
     */
    changeView: ChangeViewEventDetail<E>;
    /**
     * Fired when navigating between months/decades.
     */
    changeViewDate: ChangeViewDateEventDetail<E>;
    /** @private */
    _changeCurrentView: ViewType;
    /** @private */
    _changeFocusedDate: _ChangeFocusedDateEventDetail;
    /** @private */
    _changeSelectedDate: _ChangeSelectedDateEventDetail;
    /** @private */
    _changeLastSelectedDate: Date;
}
export type FocusEventDetail<E extends HTMLElement> = {
    date: Date;
    view: ViewType;
    datePicker: DatePicker<E>;
};
export type ChangeDateEventDetail<E extends HTMLElement> = {
    date: Date | Date[];
    formatted: string | string[];
    datePicker: DatePicker<E>;
};
export type ChangeViewEventDetail<E extends HTMLElement> = {
    view: ViewType;
    datePicker: DatePicker<E>;
};
export type ChangeViewDateEventDetail<E extends HTMLElement> = {
    date: Date;
    oldDate: Date;
    datePicker: DatePicker<E>;
};
export type _ChangeFocusedDateEventDetail = {
    date: Date | null;
    view: ViewType;
    moveToOther?: boolean;
};
export type _ChangeSelectedDateEventDetail = {
    date: Date | null;
    selected: boolean;
    silent?: boolean;
};
