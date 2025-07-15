export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayNames = [string, string, string, string, string, string, string];
export type MonthNames = [string, string, string, string, string, string, string, string, string, string, string, string];
export type Locale = {
    days: DayNames;
    daysShort: DayNames;
    daysMin: DayNames;
    months: MonthNames;
    monthsShort: MonthNames;
    today: string;
    clear: string;
    format: string;
    weekStart: DayOfWeek;
    rtl?: boolean;
};
export type CustomLocale = Partial<Locale>;
