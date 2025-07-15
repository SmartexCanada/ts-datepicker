/**
 * Parse html string
 */
export declare function parseHTML(html: string): DocumentFragment;
/**
 * Conditionally join class names together.
 */
export declare function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string[];
/**
 * Find parent element with scrollable overflow
 */
export declare function findScrollParents(element: HTMLElement): HTMLElement | null;
/**
 * Get parent element for given element
 */
export declare function getParent(element: HTMLElement): HTMLElement | null;
/**
 * Return computed text direction of given element
 */
export declare function getTextDirection(element: Element): string;
