import type { DatePickerShortcut } from "../types/datepicker";
export declare const defaultKeybinds: Record<string, DatePickerShortcut<HTMLElement>>;
export declare function getDefaultKeybinds<E extends HTMLElement>(): DatePickerShortcut<E>[];
