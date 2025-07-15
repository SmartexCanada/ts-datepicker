/*!
 * Catalan translation for bootstrap-datepicker
 * J. Garcia <jogaco.en@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'ca': {
        days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
        daysShort: ["dg.",  "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
        daysMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
        months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
        monthsShort: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."],
        today: "Avui",
        clear: "Esborra",
        format: "dd/mm/yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
