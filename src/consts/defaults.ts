import type { Options } from "@/types/options";
import type { ViewType } from "@/types/datepicker";
import { defaultKeybinds } from "./keybinds";

export const viewTypes: ViewType[] = ['days', 'months', 'years'];

export const defaults: Options<HTMLElement> = {
    allowInput: true,
    altInput: false,
    altInputFormat: 'M d, yyyy',
    autoClose: true,
    buttons: false,
    classes: '',
    container: null,
    dateDelimiter: ',',
    dateFormat: null,
    defaultDate: '',
    disabledDates: [],
    enabledDates: [],
    inline: false,
    keyboardNav: true,
    keybinds: defaultKeybinds,
    locale: 'en',
    maxDate: null,
    minDate: null,
    maxView: 'years',
    minView: 'days',
    startView: 'days',
    monthsField: 'monthsShort',
    multipleDates: false,
    navTitles: {
        days: 'MM, <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },
    nextArrow: '',
    prevArrow: '',
    offset: 0,
    position: 'auto',
    range: false,
    dynamicRange: true,
    rtl: null,
    showOtherMonths: true,
    selectOtherMonths: true,
    selectOtherYears: true,
    showOn: true,
    toggleSelected: true,
    updateOnBlur: true,
    weekNumbers: false,
    weekStart: null,

    onBeforeSelect: null,
    onRenderCell: null,

    onShow: null,
    onHide: null,
    onFocus: null,
    onChangeDate: null,
    onChangeView: null,
    onChangeViewDate: null,
};

export function getDefaults<E extends HTMLElement>(): Options<E> {
    return defaults as unknown as Options<E>;
}
