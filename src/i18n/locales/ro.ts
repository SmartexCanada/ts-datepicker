/*!
 * Romanian translation for bootstrap-datepicker
 * Cristian Vasile <cristi.mie@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    'ro': {
        days: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
        daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
        daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
        months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Astăzi",
        clear: "Șterge",
        format: "dd/mm/yyyy",
        weekStart: 1
    } satisfies CustomLocale
};
