/*!
 * Korean translation for bootstrap-datepicker
 * This is a port from https: //github.com/moment/moment/blob/develop/src/locale/ko.js
 */

import type { CustomLocale } from "@/types/locale";

export default {
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    daysShort: ["일", "월", "화", "수", "목", "금", "토"],
    daysMin: ["일", "월", "화", "수", "목", "금", "토"],
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    today: "오늘",
    clear: "삭제",
    format: "yyyy-mm-dd",
    weekStart: 0
} satisfies CustomLocale;
