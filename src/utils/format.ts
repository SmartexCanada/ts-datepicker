import type { DateLike, DatePickerFormat } from "@/types/datepicker";
import type { Locale } from "@/types/locale";
import { getDecade, stripTime, today } from "./date";

type Formatter = {
    parse: (date: string, locale: Locale) => Date
    format: (date: Date, locale: Locale) => string
}

const knownFormats: Record<string, Formatter> = {};

export const reFormatTokens = /yy(?:yy)?(?:1|2)?|mm?|MM?|dd?|DD?|o/;
export const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;

const parseFns = {
    y: (date: DateLike, year: string) => {
        return new Date(date).setFullYear(parseInt(year, 10));
    },
    m: (date: DateLike, month: string, locale: Locale) => {
        const newDate = new Date(date);
        let monthIndex = parseInt(month, 10) - 1;

        if (isNaN(monthIndex)) {
            if (!month) {
                return NaN;
            }

            const monthName = month.toLowerCase();
            const compareNames = (name: string) => name.toLowerCase().startsWith(monthName);

            monthIndex = locale.monthsShort.findIndex(compareNames);
            if (monthIndex < 0) {
                monthIndex = locale.months.findIndex(compareNames);
            }
            if (monthIndex < 0) {
                return NaN;
            }
        }

        newDate.setMonth(monthIndex);
        return newDate.getMonth() !== normalizeMonth(monthIndex)
            ? newDate.setDate(0)
            : newDate.getTime();
    },
    d: (date: DateLike, day: string) => {
        return new Date(date).setDate(parseInt(day, 10));
    }
};

type ParserToken = keyof typeof parseFns;

const formatFns = {
    d: (date: Date) => date.getDate().toString(),
    dd: (date: Date) => padZero(date.getDate(), 2),
    D: (date: Date, locale: Locale) => locale.daysShort[date.getDay()],
    DD: (date: Date, locale: Locale) => locale.days[date.getDay()],
    o: (date: Date) => {
        return Math.round(
            (new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
                - new Date(date.getFullYear(), 0, 0).getTime()
            ) / 864e5
        ).toString();
    },
    m: (date: Date) => (date.getMonth() + 1).toString(),
    mm: (date: Date) => padZero(date.getMonth() + 1, 2),
    M: (date: Date, locale: Locale) => locale.monthsShort[date.getMonth()],
    MM: (date: Date, locale: Locale) => locale.months[date.getMonth()],
    yy: (date: Date) => padZero(date.getFullYear(), 2).slice(-2),
    yyyy: (date: Date) => padZero(date.getFullYear(), 4),
    yyyy1: (date: Date) => padZero(getDecade(date)[0], 4),
    yyyy2: (date: Date) => padZero(getDecade(date)[1], 4)
};

type FormatToken = keyof typeof formatFns;

function padZero(num: number | string, length: number) {
    return num.toString().padStart(length, '0');
}

function normalizeMonth(monthIndex: number): number {
    return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}

function parseFormatString(format: string): Formatter {
    if (typeof format !== 'string') {
        throw new Error("Invalid date format");
    }

    if (format in knownFormats) {
        return knownFormats[format];
    }

    // split format string into parts and separators
    const parts = format.match(new RegExp(reFormatTokens, 'g'));
    const separators = format.split(reFormatTokens);
    if (!separators.length || !parts) {
        throw new Error("Invalid date format");
    }

    // collect used format functions
    const partFormatters = parts.map(token => formatFns[token as FormatToken]);

    const partParserKeys = (Object.keys(parseFns) as ParserToken[]).reduce((keys: ParserToken[], key) => {
        const token = parts.find(part => part[0] !== 'D' && part[0].toLowerCase() === key);
        if (token) {
            keys.push(key);
        }
        return keys;
    }, []);

    return knownFormats[format] = {
        parse: (dateStr: string, locale: Locale) => {
            const dateParts = dateStr.split(reNonDateParts).reduce((dateParts: Record<string, string>, part, index) => {
                if (part.length > 0 && parts[index]) {
                    const token = parts[index][0];
                    if (token === 'M') {
                        dateParts.m = part;
                    }
                    else if (token !== 'D') {
                        dateParts[token] = part;
                    }
                }
                return dateParts;
            }, {});

            const date = partParserKeys.reduce((origDate, key) => {
                const newDate = parseFns[key](origDate, dateParts[key], locale);

                return isNaN(newDate) ? origDate : newDate;
            }, today());

            return new Date(date);
        },
        format: (date: Date, locale: Locale) => {
            let dateStr = partFormatters.reduce((str, fn, index) => {
                return str + `${separators[index]}${fn(date, locale)}`;
            }, '');

            return dateStr + separators[separators.length - 1];
        }
    }
}

/**
 * Parse date string using provided format and locale
 */
export function parseDate(dateStr: DateLike, format: string | DatePickerFormat, locale: Locale): Date | undefined {
    if (dateStr instanceof Date || typeof dateStr === 'number') {
        const date = stripTime(dateStr);
        return isNaN(date) ? undefined : new Date(date);
    }
    if (!dateStr) {
        return undefined;
    }
    if (dateStr === 'today') {
        return new Date(today());
    }

    if (typeof format !== 'string') {
        const date = format.toValue
            ? format.toValue(dateStr, format, locale)
            : undefined;

        return typeof date !== 'undefined' && !isNaN(date)
            ? new Date(stripTime(date))
            : undefined;
    }

    return parseFormatString(format).parse(dateStr, locale);
}

/**
 * Format date using provided format and locale
 */
export function formatDate(date: number | Date, format: string | DatePickerFormat, locale: Locale): string {
    if (isNaN(date as number) || (!date && date !== 0)) {
        return '';
    }

    const dateObj = typeof date === 'number' ? new Date(date) : date;

    if (typeof format !== 'string') {
        return format.toDisplay
            ? format.toDisplay(dateObj, format, locale)
            : '';
    }

    return parseFormatString(format).format(dateObj, locale);
}

/**
 * Check if provided format is valid
 */
export function isFormatValid(format: string | Partial<DatePickerFormat>) {
    if (typeof format === 'string') {
        return reFormatTokens.test(format);
    }

    return !!(format.toDisplay && format.toValue);
}
