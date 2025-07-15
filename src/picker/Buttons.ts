import { buttonPresets, getButtonPreset } from "@/consts/buttons";
import { classes } from "@/consts/classes";
import type { DatePicker } from "@/datepicker";
import type { DatePickerButton } from "@/types/datepicker";
import { classNames, parseHTML } from "@/utils/dom";

export class Buttons<E extends HTMLElement = HTMLInputElement> {
    public datePicker: DatePicker<E>;
    public element: HTMLElement;

    constructor(datePicker: DatePicker<E>) {
        this.datePicker = datePicker;

        this.element = document.createElement('div');
        this.element.classList.add(classes.buttonsContainer);

        this._render();
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this.datePicker = null as any;

        this.element.remove();
        this.element = null as any;
    }

    /**
     * Re-render buttons
     */
    public update() {
        this._clearButtons();
        this._render();
    }

    /**
     * Render buttons
     */
    private _render() {
        let buttons = this.datePicker.config.buttons;

        if (buttons === false || this.element.childElementCount) {
            return;
        }

        if (!Array.isArray(buttons)) {
            buttons = [buttons];
        }

        buttons.forEach(data => {
            if (typeof data === 'string') {
                if (!buttonPresets[data]) {
                    return;
                }
                data = getButtonPreset<E>(data);
            }

            const button = this._createButton(data);
            this.element.append(button);
        });
    }

    /**
     * Create button
     */
    private _createButton(data: DatePickerButton<E>): HTMLElement {
        const button = document.createElement(data.tagName || 'button');
        const content = typeof data.content === 'function'
            ? data.content(this.datePicker)
            : data.content;

        button.append(parseHTML(content));

        button.classList.add(...classNames(classes.button, data.className));

        if (data.attributes) {
            Object.keys(data.attributes).forEach(attr => {
                if (data.attributes![attr] !== undefined) {
                    button.setAttribute(attr, data.attributes![attr]);
                }
            });
        }

        if (data.onClick) {
            const onClick = data.onClick;
            button.addEventListener('click', () => onClick(this.datePicker));
        }

        return button;
    }

    /**
     * Remove buttons
     */
    private _clearButtons() {
        this.element.innerHTML = '';
    }
}
