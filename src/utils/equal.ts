/*!
 * Optimized `isEqual`
 * Underscore.js 1.13.7
 * https://underscorejs.org
 */

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const symbolValueOf = Symbol.prototype.valueOf;
const keys = Object.keys;
const isView = ArrayBuffer.isView;

/**
 * Performs an optimized deep comparison between `object` and `other`
 * to determine if they should be considered equal.
 */
export function isEqual(object: any, other: any): boolean {
    return eq(object, other);
}

function eq(a: any, b: any, aStack?: any[], bStack?: any[]) {
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;

    if (a == null || b == null)
        return false;

    if (a !== a)
        return b !== b;

    const type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object')
        return false;

    return deepEqual(a, b, aStack, bStack);
}

function deepEqual(a: any, b: any, aStack?: any[], bStack?: any[]) {
    const className = toString.call(a);

    if (className !== toString.call(b))
        return false;

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a)
                return +b !== +b;

            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
        case '[object Symbol]':
            return symbolValueOf.call(a) === symbolValueOf.call(b);
        case '[object ArrayBuffer]':
        case '[object DataView]':
            return false;
    }

    let areArrays = className === '[object Array]';
    if (!areArrays && isTypedArray(a)) {
        if (getByteLength(a) !== getByteLength(b))
            return false;

        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
            return true;

        areArrays = true;
    }

    if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object')
            return false;

        const aCtor = a.constructor,
            bCtor = b.constructor;

        if (aCtor !== bCtor
            && !(typeof aCtor === 'function' && aCtor instanceof aCtor
                && typeof bCtor === 'function' && bCtor instanceof bCtor
            )
            && ('constructor' in a && 'constructor' in b)
        ) {
            return false;
        }
    }

    aStack = aStack || [];
    bStack = bStack || [];

    let length = aStack.length;
    while (length--) {
        if (aStack[length] === a)
            return bStack[length] === b;
    }

    aStack.push(a);
    bStack.push(b);

    if (areArrays) {
        length = a.length;
        if (length !== b.length)
            return false;

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    } else {
        const _keys = keys(a);
        let key;

        length = _keys.length;

        if (keys(b).length !== length)
            return false;

        while (length--) {
            key = _keys[length];
            if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }

    aStack.pop();
    bStack.pop();

    return true;
}

/**
 * Helper functions
 */

function has(object: any, key: PropertyKey) {
    return object != null && hasOwnProperty.call(object, key);
}

function getByteLength(obj: any) {
    return obj == null ? void 0 : obj.byteLength;
}

function isTypedArray(obj: any) {
    return isView(obj) && !(toString.call(obj) === '[object DataView]');
}
