/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export declare function debounce<F extends (...args: Parameters<F>) => any>(func: F, waitFor: number, immediate?: boolean): DebouncedFunction<F>;
export interface DebouncedFunction<F extends (...args: Parameters<F>) => any> {
    (this: ThisParameterType<F>, ...args: Parameters<F>): void;
    cancel: () => void;
}
