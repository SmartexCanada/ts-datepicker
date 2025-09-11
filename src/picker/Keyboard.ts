import type { DatePicker } from "@/datepicker";
import type { DatePickerAction, DatePickerShortcut, DatePickerShortcutAction, ShortcutKeys } from "@/types/datepicker";
import type { SpecificEventListener } from "@/types/events";
import { isDateAfter, isDateBefore } from "@/utils/date";
import { isEqual } from "@/utils/equal";

export type DatePickerShortcutRemoveParam<E extends HTMLElement> = Omit<DatePickerShortcut<E>, 'callback'>
    & Partial<Pick<DatePickerShortcut<E>,'callback'>>

type KeyboardKeybind<E extends HTMLElement> = {
    keys: ShortcutKeys,
    callbacks: {
        callback: DatePickerShortcutAction<E>,
        preventDefault: boolean
    }[]
};

export class Keyboard<E extends HTMLElement = HTMLInputElement> {
    public datePicker: DatePicker<E>;

    private keybinds: KeyboardKeybind<E>[] = [];
    private keydownListener: SpecificEventListener<'keydown'>;

    constructor(datePicker: DatePicker<E>) {
        this.datePicker = datePicker;

        const element = (this.datePicker.altInput || this.datePicker.element) as HTMLElement;
        this.keydownListener = this._onKeydown.bind(this);
        element.addEventListener('keydown', this.keydownListener);

        const keybinds = this.datePicker.config.keybinds;
        if (keybinds) {
            Object.keys(keybinds).forEach(name => this.on(keybinds[name]));
        }
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this.datePicker.element.removeEventListener('keydown', this.keydownListener);
        this.datePicker = null as any;
        this.keybinds = null as any;
    }

    /**
     * Add keybind.
     */
    public on(keybind: DatePickerShortcut<E> | DatePickerShortcut<E>[]) {
        if (Array.isArray(keybind)) {
            keybind.forEach(item => this.on(item) );
            return this;
        }

        if (!keybind.keys || !keybind.callback) {
            return this;
        }

        if (Array.isArray(keybind.keys)) {
            keybind.keys.forEach(key => this.on({...keybind, keys: key }) );
            return this;
        }

        const _keybind = {
            ...keybind,
            keys: {
                ...keybind.keys,
                key: keybind.keys.key.toLowerCase()
            }
        };

        let handler = this.keybinds.find(item => isEqual(item.keys, _keybind.keys));

        if (!handler) {
            handler = {
                keys: _keybind.keys,
                callbacks: []
            };
            this.keybinds.push(handler);
        }

        const callbacks = Array.isArray(_keybind.callback) ? _keybind.callback : [_keybind.callback];

        callbacks.forEach(callback => handler.callbacks.push(
            { callback, preventDefault: !!_keybind.preventDefault }
        ));

        return this;
    }

    /**
     * Remove keybind.
     * If `keybind.callback` is omitted, all keybinds with matching keys will be removed.
     * If keybind is omitted, all keybinds will be removed.
     */
    public off(keybind?: DatePickerShortcutRemoveParam<E> | DatePickerShortcutRemoveParam<E>[]) {
        if (!keybind) {
            this.keybinds = [];
            return this;
        }

        if (Array.isArray(keybind)) {
            keybind.forEach(item => this.off(item));
            return this;
        }

        if (!keybind.keys) {
            return this;
        }

        if (Array.isArray(keybind.keys)) {
            keybind.keys.forEach(key => this.off({ ...keybind, keys: key }) );
            return this;
        }

        keybind = {
            ...keybind,
            keys: {
                ...keybind.keys,
                key: keybind.keys.key.toLowerCase()
            }
        };

        const handler = this.keybinds.find(item => isEqual(item.keys, keybind.keys));

        if (handler) {
            if (keybind.callback) {
                const callbacks = Array.isArray(keybind.callback) ? keybind.callback : [keybind.callback];

                callbacks.forEach(callback => {
                    const index = handler.callbacks.findIndex(item => item.callback === callback);
                    if (index >= 0) {
                        handler.callbacks.splice(index, 1);
                    }
                });
            }

            if (!keybind.callback || !handler.callbacks.length) {
                this.keybinds.splice(this.keybinds.indexOf(handler), 1);
            }
        }

        return this;
    }

    /**
     * Handle keydown event
     */
    private _onKeydown(event: KeyboardEvent) {
        const isEditMode = this.datePicker.isEditMode();
        const key = event.key.toLowerCase();

        if (key === 'tab') {
            this._unfocus();
            return;
        }

        if (key === 'enter') {
            event.preventDefault();
            if (!this.datePicker.visible) {
                this.datePicker.show();
            }
            else if (isEditMode) {
                this.datePicker.adapter.exitEditMode(true);
            }
            else {
                if (!this.datePicker.isMinView()) {
                    this.datePicker.changeView('down');
                    return;
                }

                const focusDate = this.datePicker.focusDate;
                if (focusDate) {
                    const selectedDate = this.datePicker.adapter.getSelectedDate(focusDate);
                    if (selectedDate) {
                        this.datePicker.adapter.handleAlreadySelectedDates(selectedDate, focusDate);
                    } else {
                        this.datePicker.selectDate(focusDate);
                    }
                    return;
                }
            }
        }

        if (key === 'escape') {
            this.datePicker.hide();
            return;
        }

        const keybinds = this._findKeybinds(event);
        if (keybinds.length) {
            this._handleKeybinds(event, keybinds);
            return;
        }

        if (!isEditMode && this._focusNextCell(key)) {
            event.preventDefault();
            return;
        }

        const input = this.datePicker.altInput || this.datePicker.input;
        if ((key === 'backspace' || key === 'delete') && input) {
            setTimeout(() => {
                if (input.value === '') {
                    this.datePicker.clear();
                }
            });
        }

        if (!isEditMode) {
            this.datePicker.adapter.enterEditMode();
        }
    }

    /**
     * Retrieve matching keybinds for given event
     */
    private _findKeybinds(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        const ctrlKey = event.ctrlKey || event.metaKey;
        const { shiftKey, altKey } = event;

        return this.keybinds.filter(item => item.keys.key == key
            && (item.keys.ctrl == null || item.keys.ctrl === ctrlKey)
            && (item.keys.shift == null || item.keys.shift === shiftKey)
            && (item.keys.alt == null || item.keys.alt === altKey)
        );
    }

    /**
     * Handle keybinds for event
     */
    private _handleKeybinds(event: KeyboardEvent, handlers: KeyboardKeybind<E>[]) {
        handlers.sort((a, b) => Object.keys(b.keys).length - Object.keys(a.keys).length);

        handlers[0].callbacks.forEach(handler => {
            if (typeof handler.callback === 'string') {
                this._action(handler.callback);
            } else {
                handler.callback(event, this.datePicker);
            }

            if (handler.preventDefault) {
                event.preventDefault();
            }
        });
    }

    /**
     * Call datepicker action
     */
    private _action(action: DatePickerAction) {
        switch (action) {
            case 'show':
                this.datePicker.show();
                break;
            case 'hide':
                this.datePicker.hide();
                break;
            case 'toggle':
                if (this.datePicker.visible) {
                    this.datePicker.hide();
                } else {
                    this.datePicker.show();
                }
                break;
            case 'prevMonth':
            case 'nextMonth':
            case 'prevYear':
            case 'nextYear':
                break;
            case 'switchView':
                this.datePicker.changeView('up');
                break;
            case 'clear':
                this.datePicker.clear();
                break;
            case 'today':
                this.datePicker.setViewDate(new Date())
                break;
            case 'exitEditMode':
                this.datePicker.adapter.exitEditMode();
                break;
        }
    }

    /**
     * Move focus between cells
     */
    private _focusNextCell(key: string) {
        const { currentView } = this.datePicker;
        const focusDate = this._getFocusDate();
        let [year, month, day] = [focusDate.getFullYear(), focusDate.getMonth(), focusDate.getDate()];

        switch (key) {
            case 'arrowleft':
                currentView === 'days' ? (day -= 1) : '';
                currentView === 'months' ? (month -= 1) : '';
                currentView === 'years' ? (year -= 1) : '';
                break;
            case 'arrowright':
                currentView === 'days' ? (day += 1) : '';
                currentView === 'months' ? (month += 1) : '';
                currentView === 'years' ? (year += 1) : '';
                break;
            case 'arrowup':
                currentView === 'days' ? (day -= 7) : '';
                currentView === 'months' ? (month -= 3) : '';
                currentView === 'years' ? (year -= 4) : '';
                break;
            case 'arrowdown':
                currentView === 'days' ? (day += 7) : '';
                currentView === 'months' ? (month += 3) : '';
                currentView === 'years' ? (year += 4) : '';
                break;
            default:
                return false;
        }

        const newDate = this._clampDate(new Date(year, month, day));
        this.datePicker.setFocusDate(newDate, true);

        return true;
    }

    /**
     * Retrieve initial focus date
     */
    private _getFocusDate() {
        const { focusDate, selectedDates, viewDate } = this.datePicker;
        const [ year, month ] = [viewDate.getFullYear(), viewDate.getMonth()];
        let focused = focusDate || selectedDates[selectedDates.length - 1];

        if (!focused) {
            switch (this.datePicker.currentView) {
                case 'days':
                    focused = new Date(year, month, new Date().getDate());
                    break;
                case 'months':
                    focused = new Date(year, month, 1);
                    break;
                case 'years':
                    focused = new Date(year, 0, 1);
                    break;
            }
        }

        return focused;
    }

    /**
     * Clamp date between min and max dates
     */
    private _clampDate(date: Date) {
        const { minDate, maxDate } = this.datePicker;

        if (maxDate && isDateAfter(date, maxDate)) {
            return maxDate;
        }
        else if (minDate && isDateBefore(date, minDate)) {
            return minDate;
        }

        return date;
    }

    /**
     * Handle removing focus from datepicker input
     */
    private _unfocus() {
        if (this.datePicker.element !== document.activeElement) {
            if (this.datePicker.config.updateOnBlur) {
                this.datePicker.adapter.exitEditMode(true);
            } else {
                this.datePicker.adapter.setInputValue();
            }

            this.datePicker.hide();
        }
    }
}
