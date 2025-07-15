/*!
 *  ts-deepmerge
 *  https://github.com/voodoocreation/ts-deepmerge
 */

type TAllKeys<T> = T extends any ? keyof T : never;

type TIndexValue<T, K extends PropertyKey, D = never> = T extends any
    ? K extends keyof T
        ? T[K]
        : D
    : never;

type TPartialKeys<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>> extends infer O
        ? { [P in keyof O]: O[P] }
        : never;

type TFunction = (...a: any[]) => any;

type TPrimitives =
    | string
    | number
    | boolean
    | bigint
    | symbol
    | Date
    | TFunction;

type TMerged<T> = [T] extends [Array<any>]
    ? { [K in keyof T]: TMerged<T[K]> }
    : [T] extends [TPrimitives]
        ? T
        : [T] extends [object]
            ? TPartialKeys<{ [K in TAllKeys<T>]: TMerged<TIndexValue<T, K>> }, never>
            : T;

interface IObject {
    [key: string]: any;
}

function isObject(obj: any): obj is IObject {
    if (typeof obj === "object" && obj !== null) {
        if (typeof Object.getPrototypeOf === "function") {
            const prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }

        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    return false;
}

/**
 * Deep merge objects into first object
 */
export function merge<T extends IObject[]>(...objects: T): TMerged<T[number]> {
    return objects.reduce((result, current) => {
        if (current === undefined) {
            return result;
        }

        if (Array.isArray(current)) {
            throw new TypeError(
                "Arguments provided to ts-deepmerge must be objects, not arrays.",
            );
        }

        Object.keys(current).forEach((key) => {
            if (["__proto__", "constructor", "prototype"].includes(key)) {
                return;
            }

            if (Array.isArray(result[key]) && Array.isArray(current[key])) {
                result[key] = merge.options.mergeArrays
                    ? merge.options.uniqueArrayItems
                        ? Array.from(
                            new Set((result[key] as unknown[]).concat(current[key]))
                        )
                        : [...result[key], ...current[key]]
                    : current[key];
            }
            else if (isObject(result[key]) && isObject(current[key])) {
                result[key] = merge(result[key], current[key]);
            }
            else if (!isObject(result[key]) && isObject(current[key])) {
                result[key] = merge(current[key], undefined!);
            }
            else {
                result[key] = current[key] === undefined
                    ? merge.options.allowUndefinedOverrides
                        ? current[key]
                        : result[key]
                    : current[key];
            }
        });

        return result;
    }, {}) as TMerged<T[number]>;
}

interface MergeOptions {
    /**
     * When `true`, values explicitly provided as `undefined` will override existing values, though properties that are simply omitted won't affect anything.
     * When `false`, values explicitly provided as `undefined` won't override existing values.
     *
     * Default: `true`
     */
    allowUndefinedOverrides: boolean;

    /**
     * When `true` it will merge array properties.
     * When `false` it will replace array properties with the last instance entirely instead of merging their contents.
     *
     * Default: `true`
     */
    mergeArrays: boolean;

    /**
     * When `true` it will ensure there are no duplicate array items.
     * When `false` it will allow duplicates when merging arrays.
     *
     * Default: `true`
     */
    uniqueArrayItems: boolean;
}

const defaultOptions: MergeOptions = {
    allowUndefinedOverrides: true,
    mergeArrays: true,
    uniqueArrayItems: true
};

merge.options = defaultOptions;

/**
 * Deep merge objects into first object, using specified options
 */
merge.withOptions = <T extends IObject[]>(
    options: Partial<MergeOptions>,
    ...objects: T
) => {
    merge.options = {
        ...defaultOptions,
        ...options,
    };

    const result = merge(...objects);

    merge.options = defaultOptions;

    return result;
};
