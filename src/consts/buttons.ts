import type { DatePickerButton, DatePickerButtonPreset } from "@/types/datepicker";

export const buttonPresets: Record<DatePickerButtonPreset, DatePickerButton> = {
    today: {
        content: (picker) => picker.locale.today,
        onClick: (picker) => {
            const today = new Date();

            if (picker.config.range) {
                picker.selectDate([today, today]);
            } else {
                const selectedDate = picker.adapter.getSelectedDate(today);
                if (selectedDate) {
                    picker.adapter.handleAlreadySelectedDates(selectedDate, today);
                } else {
                    picker.selectDate(today);
                }
            }
        }
    },
    clear: {
        content: (picker) => picker.locale.clear,
        onClick: (picker) => picker.clear()
    }
};

export function getButtonPreset<E extends HTMLElement>(preset: DatePickerButtonPreset): DatePickerButton<E> {
    return buttonPresets[preset] as unknown as DatePickerButton<E>;
}
