import type { DateLike, DatePickerFormat } from "../types/datepicker";
import type { Locale } from "../types/locale";
export declare const reFormatTokens: RegExp;
export declare const reNonDateParts: RegExp;
/**
 * Parse date string using provided format and locale
 */
export declare function parseDate(dateStr: DateLike, format: string | DatePickerFormat, locale: Locale): Date | undefined;
/**
 * Format date using provided format and locale
 */
export declare function formatDate(date: number | Date, format: string | DatePickerFormat, locale: Locale): string;
/**
 * Check if provided format is valid
 */
export declare function isFormatValid(format: string | Partial<DatePickerFormat>): boolean;
