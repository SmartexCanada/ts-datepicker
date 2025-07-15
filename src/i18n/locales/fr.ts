/*!
 * French translation for vanillajs-datepicker
 *
 * Based on French translation for bootstrap-datepicker
 * Nico Mollet <nico.mollet@gmail.com>
 *
 * @see https://fr.wikipedia.org/wiki/Mois
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'fr': {
        days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        daysMin: ["D", "L", "M", "M", "J", "V", "S"],
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        monthsShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        today: "Aujourd'hui",
        clear: "Effacer",
        format: "dd/mm/yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
