import type { PointerEvent } from 'react';
import { PointerSensor } from '@dnd-kit/core';

export class SmartPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown' as any,
            handler: ({ nativeEvent: event }: PointerEvent) => {
                if (isNotMovableElement(event.target as Element) || isTouchScreen()) {
                    return false;
                }
                return true;
            }
        }
    ];
}

function isNotMovableElement(element: Element | null) {
    const notMovableElements = ['button', 'input', 'textarea', 'span', 'svg', 'th', 'tr', 'td', 'line', 'circle', 'path'];
    const classNameElements = ['mantine-Popover-dropdown'];
    if (element?.tagName && notMovableElements.includes(element.tagName.toLowerCase())) {
        return true;
    }
    if (element?.classList) {
        for (const classNameElement of classNameElements) {
            if (element.classList.contains(classNameElement)) {
                return true;
            }
        }
    }
    return false;
}

function isTouchScreen(): boolean {
    return "ontouchstart" in document.documentElement;
}