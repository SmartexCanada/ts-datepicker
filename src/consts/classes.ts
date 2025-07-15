import type { PositionHorizontal, PositionVertical } from "@/types/datepicker";

type PositionSide = Exclude<PositionVertical | PositionHorizontal, 'auto'> | 'outside';

const positions: PositionSide[] = ['left', 'center', 'right', 'top', 'middle', 'bottom', 'outside'];
const positionPrefix = 'datepicker-position--';

export const classes = {
    datepicker: 'datepicker',
    picker: 'datepicker-picker',
    navigation: 'datepicker--navigation',
    content: 'datepicker--content',
    buttons: 'datepicker--buttons',

    navContainer: 'datepicker-nav',
    navAction: 'datepicker-nav--action',
    navTitle: 'datepicker-nav--title',

    body: 'datepicker-body',
    dayNames: 'datepicker-body--day-names',
    dayName: 'datepicker-body--day-name',
    weekNumbers: 'datepicker-body--week-numbers',
    daysContainer: 'datepicker-days',
    cells: 'datepicker-body--cells',
    cell: 'datepicker-cell',

    buttonsContainer: 'datepicker-buttons',
    button: 'datepicker-button',

    active: 'active',
    inline: 'inline',
    hidden: 'hidden',
    disabled: 'disabled',
    current: 'current',
    focused: 'focus',
    selected: 'selected',
    minDate: 'min-date',
    maxDate: 'max-date',
    otherMonth: 'other-month',
    otherDecade: 'other-decade',
    rangeFrom: 'range-from',
    rangeTo: 'range-to',
    inRange: 'in-range',
    rangeDisabled: 'range-disabled',
    editMode: 'edit-mode',
    hasWeekNumbers: 'has-week-numbers',
    positions: positions.reduce((result, position) => {
        result[position] = positionPrefix + position;
        return result;
    }, {} as Record<PositionSide, string>),
};
