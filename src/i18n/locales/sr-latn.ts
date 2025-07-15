/*!
 * Serbian latin translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'sr-latn': {
        days: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
        daysShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
        daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su"],
        months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        today: "Danas",
        format: "dd.mm.yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
