/*!
 * Serbian cyrillic translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
    daysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
    daysMin: ["Н", "По", "У", "Ср", "Ч", "Пе", "Су"],
    months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
    monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
    today: "Данас",
    format: "dd.mm.yyyy",
    weekStart: 1
} satisfies CustomLocale;
