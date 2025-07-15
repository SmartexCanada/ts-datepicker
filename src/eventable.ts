import type { TEventHandler } from "@/types/events";

export class Eventable<EventSpec> {
    private __listeners: Map<keyof EventSpec, TEventHandler[]> = new Map();

    /**
     * Add event listener for specified event
     */
    public on<K extends keyof EventSpec, E extends EventSpec[K]>(eventType: K, handler: TEventHandler<E>) {
        if (!handler) {
            return () => {};
        }

        let listeners = this.__listeners.get(eventType);
        if (!listeners) {
            listeners = [];
            this.__listeners.set(eventType, listeners);
        }

        listeners.push(handler);

        return () => this.off(eventType, handler);
    }

    /**
     * Remove specific or all event listeners for specified event
     */
    public off<K extends keyof EventSpec>(eventType: K, handler?: TEventHandler): void;
    public off(): void;
    public off<K extends keyof EventSpec>(eventType?: K, handler?: TEventHandler) {
        if (typeof eventType === 'undefined') {
            return this.__listeners.clear();
        }

        if (typeof handler === 'undefined') {
            this.__listeners.delete(eventType);
            return;
        }

        const listeners = this.__listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(handler);

            if (index > -1) {
                listeners.splice(index, 1);

                if (!listeners.length) {
                    this.__listeners.delete(eventType);
                }
            }
        }
    }

    /**
     * Trigger an event
     */
    public trigger<K extends keyof EventSpec, E extends EventSpec[K]>(eventType: K, data?: E): void;
    public trigger<K extends keyof EventSpec, E extends EventSpec[K]>(event: CustomEvent<E>): void;
    public trigger<K extends keyof EventSpec, E extends EventSpec[K]>(eventType: K | CustomEvent<E>, data?: E) {
        if (!(eventType instanceof CustomEvent)) {
            eventType = new CustomEvent(eventType as string, {
                detail: data
            });
        }

        const listeners = this.__listeners.get(eventType.type as K);
        if (listeners) {
            listeners.forEach(handler => handler(eventType));
        }
    }
}
