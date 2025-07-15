import type { DatePickerButton, DatePickerButtonPreset } from "../types/datepicker";
export declare const buttonPresets: Record<DatePickerButtonPreset, DatePickerButton>;
export declare function getButtonPreset<E extends HTMLElement>(preset: DatePickerButtonPreset): DatePickerButton<E>;
