/*!
 * Hungarian translation for bootstrap-datepicker
 * Sotus László <lacisan@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
    daysShort: ["vas", "hét", "ked", "sze", "csü", "pén", "szo"],
    daysMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
    months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
    monthsShort: ["jan", "feb", "már", "ápr", "máj", "jún", "júl", "aug", "sze", "okt", "nov", "dec"],
    today: "ma",
    clear: "töröl",
    format: "yyyy.mm.dd",
    weekStart: 1
} satisfies CustomLocale;
