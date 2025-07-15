/*!
 * Czech translation for bootstrap-datepicker
 * Matěj Koubík <matej@koubik.name>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
    daysShort: ["Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob"],
    daysMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
    months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    monthsShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čnc", "Srp", "Zář", "Říj", "Lis", "Pro"],
    today: "Dnes",
    clear: "Vymazat",
    format: "dd.mm.yyyy",
    weekStart: 1
} satisfies CustomLocale;
