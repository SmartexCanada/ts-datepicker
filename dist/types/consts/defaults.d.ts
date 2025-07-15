import type { Options } from "../types/options";
import type { ViewType } from "../types/datepicker";
export declare const viewTypes: ViewType[];
export declare const defaults: Options<HTMLElement>;
export declare function getDefaults<E extends HTMLElement>(): Options<E>;
