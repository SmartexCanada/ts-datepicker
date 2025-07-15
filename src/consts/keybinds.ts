import type { DatePickerShortcut } from "@/types/datepicker";

export const defaultKeybinds: Record<string, DatePickerShortcut<HTMLElement>> = {
    prevMonth: {keys: {key: 'ArrowLeft', ctrl: true}, callback: 'prevMonth', preventDefault: true},
    nextMonth: {keys: {key: 'ArrowRight', ctrl: true}, callback: 'nextMonth', preventDefault: true},
    prevYear: {keys: {key: 'ArrowLeft', shift: true}, callback: 'prevYear', preventDefault: true},
    nextYear: {keys: {key: 'ArrowRight', shift: true}, callback: 'nextYear', preventDefault: true},
    switchView: {keys: {key: 'ArrowUp', ctrl: true}, callback: 'switchView', preventDefault: true},
    exitEditMode: {keys: {key: 'ArrowDown', ctrl: true}, callback: 'exitEditMode', preventDefault: true}
};

export function getDefaultKeybinds<E extends HTMLElement>(): DatePickerShortcut<E>[] {
    return defaultKeybinds as unknown as DatePickerShortcut<E>[];
}
