/*!
 * Australian English translation for bootstrap-datepicker
 * Steve Chapman <steven.p.chapman@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'en-AU': {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Today",
        clear: "Clear",
        format: "d/mm/yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
