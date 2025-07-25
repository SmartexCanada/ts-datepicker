/*!
 * Slovak translation for bootstrap-datepicker
 * Marek Lichtner <marek@licht.sk>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
    daysShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"],
    daysMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
    months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
    today: "Dnes",
    clear: "Vymazať",
    format: "d.m.yyyy",
    weekStart: 1
} satisfies CustomLocale;
