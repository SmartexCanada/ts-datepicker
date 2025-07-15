import type { Nullable, ViewType } from "@/types/datepicker";
import type { DayOfWeek } from "../types/locale";

/**
 * Remove time from given value
 */
export function stripTime(timeValue: number | Date): number {
    return new Date(timeValue).setHours(0, 0, 0, 0);
}

/**
 * Get time at start of current day.
 */
export function today(): number {
    return new Date().setHours(0, 0, 0, 0);
}

/**
 * Get decade for the year of the given date.
 */
export function getDecade(date: Date): [number, number] {
    const firstYear = Math.floor(date.getFullYear() / 10) * 10;
    return [firstYear, firstYear + 9];
}

/**
 * Get number of days in the month of the given date.
 */
export function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Return new date object with specified number of days added
 */
export function addDays(date: Date, days: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * Return new date object with specified number of days subtracted
 */
export function subtractDays(date: Date, days: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

/**
 * Sort given dates
 */
export function sortDates(dates: Date[], withTime: boolean = false): Date[] {
    return dates.slice().sort((a, b) => {
        return withTime
            ? a.getTime() - b.getTime()
            : stripTime(a) - stripTime(b);
    });
}

/**
 * Check if passed dates are the same for given view level.
 */
export function isSameDate(d1: Nullable<Date>, d2: Nullable<Date>, type: ViewType) {
    if (!d1 || !d2) {
        return false;
    }

    switch (type) {
        case 'days':
            return d1.getDate() === d2.getDate()
                && d1.getMonth() === d2.getMonth()
                && d1.getFullYear() === d2.getFullYear();
        case 'months':
            return d1.getMonth() === d2.getMonth()
                && d1.getFullYear() === d2.getFullYear();
        case 'years':
            return d1.getFullYear() === d2.getFullYear();
    }
}

/**
 * Check if date is before the compared date.
 */
export function isDateBefore(date: Date, comparedDate: Date, includeEqual: boolean = false) {
    const d1 = stripTime(date),
        d2 = stripTime(comparedDate);

    return includeEqual
        ? d1 <= d2
        : d1 < d2;
}

/**
 * Check if date is after the compared date.
 */
export function isDateAfter(date: Date, comparedDate: Date, includeEqual: boolean = false) {
    const d1 = stripTime(date),
        d2 = stripTime(comparedDate);

    return includeEqual
        ? d1 >= d2
        : d1 > d2;
}

/**
 * Check if date is between the given dates.
 */
export function isDateBetween(date: Date, dateFrom: Date, dateTo: Date) {
    return isDateAfter(date, dateFrom) && isDateBefore(date, dateTo);
}

/**
 * Calculate distance between 2 days of the week
 */
export function dayDiff(day: number, from: number) {
    return (day - from + 7) % 7;
}

/**
 * Return the date of the specified day of the week for given date
 */
export function getDayOfWeek(date: Date | number, dayOfWeek: DayOfWeek, weekStart: DayOfWeek) {
    date = typeof date === 'number' ? new Date(date) : date;
    const day = date.getDay();

    return addDays(date, dayDiff(dayOfWeek, weekStart) - dayDiff(day, weekStart));
}

/**
 * Get the week number for given date and week start
 */
export function getWeekNumber(date: Date, weekStart: DayOfWeek) {
    switch (weekStart) {
        case 6:
            return getMidEasternWeek(date);
        case 0:
            return getWesternTradWeek(date);
        default:
            return getIsoWeek(date);
    }
}

/**
 * Get the ISO week number for given date
 */
export function getIsoWeek(date: Date) {
    const thursOfWeek = getDayOfWeek(date, 4, 1);
    const firstThurs = getDayOfWeek(new Date(thursOfWeek).setMonth(0, 4), 4, 1);

    return calculateWeekNumber(thursOfWeek.getTime(), firstThurs.getTime());
}

/**
 * Get western traditional week number for given date
 */
export function getWesternTradWeek(date: Date) {
    return calculateTraditionalWeekNumber(date, 0);
}

/**
 * Get middle eastern week number for given date
 */
export function getMidEasternWeek(date: Date) {
    return calculateTraditionalWeekNumber(date, 6);
}

/**
 * Calculate week number for given date and week start
 */
function calculateWeekNumber(dayOfWeek: number, dayOfFirstWeek: number) {
    return Math.round((dayOfWeek - dayOfFirstWeek) / 604800000) + 1;
}

/**
 * Calculate traditional week number for given date and week start
 */
function calculateTraditionalWeekNumber(date: Date, weekStart: DayOfWeek) {
    const startOfFirstWeek = getDayOfWeek(new Date(date).setMonth(0, 1), weekStart, weekStart);
    const startOfWeek = getDayOfWeek(date, weekStart, weekStart);
    const weekNumber = calculateWeekNumber(startOfWeek.getTime(), startOfFirstWeek.getTime());

    if (weekNumber < 53) {
        return weekNumber;
    }

    const weekOneOfNextYear = getDayOfWeek(new Date(date).setDate(32), weekStart, weekStart);
    return startOfWeek === weekOneOfNextYear ? 1 : weekNumber;
}
