import type { Nullable, ViewType } from "../types/datepicker";
import type { DayOfWeek } from "../types/locale";
/**
 * Remove time from given value
 */
export declare function stripTime(timeValue: number | Date): number;
/**
 * Get time at start of current day.
 */
export declare function today(): number;
/**
 * Get decade for the year of the given date.
 */
export declare function getDecade(date: Date): [number, number];
/**
 * Get number of days in the month of the given date.
 */
export declare function getDaysInMonth(date: Date): number;
/**
 * Return new date object with specified number of days added
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Return new date object with specified number of days subtracted
 */
export declare function subtractDays(date: Date, days: number): Date;
/**
 * Sort given dates
 */
export declare function sortDates(dates: Date[], withTime?: boolean): Date[];
/**
 * Check if passed dates are the same for given view level.
 */
export declare function isSameDate(d1: Nullable<Date>, d2: Nullable<Date>, type: ViewType): boolean;
/**
 * Check if date is before the compared date.
 */
export declare function isDateBefore(date: Date, comparedDate: Date, includeEqual?: boolean): boolean;
/**
 * Check if date is after the compared date.
 */
export declare function isDateAfter(date: Date, comparedDate: Date, includeEqual?: boolean): boolean;
/**
 * Check if date is between the given dates.
 */
export declare function isDateBetween(date: Date, dateFrom: Date, dateTo: Date): boolean;
/**
 * Calculate distance between 2 days of the week
 */
export declare function dayDiff(day: number, from: number): number;
/**
 * Return the date of the specified day of the week for given date
 */
export declare function getDayOfWeek(date: Date | number, dayOfWeek: DayOfWeek, weekStart: DayOfWeek): Date;
/**
 * Get the week number for given date and week start
 */
export declare function getWeekNumber(date: Date, weekStart: DayOfWeek): number;
/**
 * Get the ISO week number for given date
 */
export declare function getIsoWeek(date: Date): number;
/**
 * Get western traditional week number for given date
 */
export declare function getWesternTradWeek(date: Date): number;
/**
 * Get middle eastern week number for given date
 */
export declare function getMidEasternWeek(date: Date): number;
