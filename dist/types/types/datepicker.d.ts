import type { DatePicker } from "../datepicker";
export type Nullable<T> = T | null;
export type Decade = [number, number];
export type ViewType = "days" | "months" | "years";
export type ViewTypeSingle = "day" | "month" | "year";
export type DateLike = string | number | Date;
export type DateRangeLimit<D = DateLike> = {
    from: D;
    to: D;
};
export type DateLimit<D = DateLike> = D | DateRangeLimit<D> | ((date: Date) => boolean);
export interface DatePickerFormat {
    toValue: (date: string, format: DatePickerFormat, locale: object) => (number | undefined);
    toDisplay: (date: Date, format: DatePickerFormat, locale: object) => string;
}
export type PositionVertical = "top" | "middle" | "bottom" | "auto";
export type PositionHorizontal = "left" | "center" | "right" | "auto";
export type Position = `${PositionVertical} ${PositionHorizontal}` | PositionVertical | PositionHorizontal | "auto";
export type PositionCallback<E extends HTMLElement> = (pickerElement: HTMLElement, anchor: E, isViewChange: boolean, datePicker: DatePicker<E>) => (void | (() => void));
export type NavTitleEntry<E extends HTMLElement> = string | ((datePicker: DatePicker<E>) => string);
export type RenderCellOptions = {
    classes?: string;
    content?: string;
    disabled?: boolean;
    attributes?: Record<string, string | number | undefined>;
};
export type DatePickerButtonPreset = 'clear' | 'today';
export type DatePickerButton<E extends HTMLElement = HTMLInputElement> = {
    content: string | ((datePicker: DatePicker<E>) => string);
    tagName?: keyof HTMLElementTagNameMap;
    className?: string;
    attributes?: Record<string, string>;
    onClick?: (datePicker: DatePicker<E>) => void;
};
export type DatePickerShortcut<E extends HTMLElement> = {
    keys: ShortcutKeys | ShortcutKeys[];
    callback: DatePickerShortcutAction<E> | DatePickerShortcutAction<E>[];
    preventDefault?: boolean;
};
export type ShortcutKeys = {
    /**
     * The key to listen for
     */
    key: string;
    /**
     * Whether the ctrl/meta key needs to be pressed
     */
    ctrl?: boolean;
    /**
     * Whether the shift key needs to be pressed
     */
    shift?: boolean;
    /**
     * Whether the alt key needs to be pressed
     */
    alt?: boolean;
};
export type DatePickerShortcutAction<E extends HTMLElement> = DatePickerAction | ShortcutCallback<E>;
export type ShortcutCallback<E extends HTMLElement> = (event: KeyboardEvent, datePicker: DatePicker<E>) => void;
export type DatePickerAction = 'show' | 'hide' | 'toggle' | 'prevMonth' | 'nextMonth' | 'prevYear' | 'nextYear' | 'switchView' | 'clear' | 'today' | 'exitEditMode';
