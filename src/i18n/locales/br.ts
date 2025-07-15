/*!
 * Breton translation for bootstrap-datepicker
 * Gwenn Meynier <tornoz@laposte.net>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'br': {
        days: ["Sul", "Lun", "Meurzh", "Merc'her", "Yaou", "Gwener", "Sadorn"],
        daysShort: ["Sul", "Lun", "Meu.", "Mer.", "Yao.", "Gwe.", "Sad."],
        daysMin: ["Su", "L", "Meu", "Mer", "Y", "G", "Sa"],
        months: ["Genver", "C'hwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu"],
        monthsShort: ["Genv.", "C'hw.", "Meur.", "Ebre.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kerz."],
        today: "Hiziv",
        clear: "Dilemel",
        format: "dd/mm/yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
