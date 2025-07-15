/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounce<F extends (...args: Parameters<F>) => any>(
    func: F,
    waitFor: number,
    immediate?: boolean
): DebouncedFunction<F> {
    let timeout: number | undefined = 0;
    let previous = Date.now();

    const debouncedFunction = function (
        this: ThisParameterType<F>,
        ...args: Parameters<F>
    ) {
        const context = this;

        const invokeFunction = function () {
            const passed = Date.now() - previous;
            if (waitFor > passed) {
                timeout = window.setTimeout(invokeFunction, waitFor - passed);
            } else {
                timeout = undefined;
                if (!immediate) func.apply(context, args);
            }
        }

        if (!timeout) {
            timeout = window.setTimeout(invokeFunction, waitFor);
            if (immediate) func.apply(context, args);
        }
    }

    debouncedFunction.cancel = function () {
        clearTimeout(timeout);
        timeout = undefined;
    }

    return debouncedFunction;
}

export interface DebouncedFunction<
    F extends (...args: Parameters<F>) => any
> {
    (this: ThisParameterType<F>, ...args: Parameters<F>): void;
    cancel: () => void;
}
