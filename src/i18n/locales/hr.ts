/*!
 * Croatian localisation
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
    daysShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
    daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
    months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
    monthsShort: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
    today: "Danas"
} satisfies CustomLocale;
