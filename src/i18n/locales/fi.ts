/*!
 * Finnish translation for bootstrap-datepicker
 * Jaakko Salonen <https: //github.com/jsalonen>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
    daysShort: ["sun", "maa", "tii", "kes", "tor", "per", "lau"],
    daysMin: ["su", "ma", "ti", "ke", "to", "pe", "la"],
    months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
    monthsShort: ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"],
    today: "tänään",
    clear: "Tyhjennä",
    format: "d.m.yyyy",
    weekStart: 1
} satisfies CustomLocale;
