import type { TEventHandler } from "./types/events";
export declare class Eventable<EventSpec> {
    private __listeners;
    /**
     * Add event listener for specified event
     */
    on<K extends keyof EventSpec, E extends EventSpec[K]>(eventType: K, handler: TEventHandler<E>): () => void;
    /**
     * Remove specific or all event listeners for specified event
     */
    off<K extends keyof EventSpec>(eventType: K, handler?: TEventHandler): void;
    off(): void;
    /**
     * Trigger an event
     */
    trigger<K extends keyof EventSpec, E extends EventSpec[K]>(eventType: K, data?: E): void;
    trigger<K extends keyof EventSpec, E extends EventSpec[K]>(event: CustomEvent<E>): void;
}
