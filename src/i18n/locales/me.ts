/*!
 * Montenegrin translation for bootstrap-datepicker
 * Miodrag Nikač <miodrag@restartit.me>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'me': {
        days: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
        daysShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
        daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        today: "Danas",
        clear: "Izbriši",
        format: "dd.mm.yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
