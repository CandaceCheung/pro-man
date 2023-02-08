import type { PointerEvent } from 'react';
import { PointerSensor } from '@dnd-kit/core';

export class SmartPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown' as any,
            handler: ({ nativeEvent: event }: PointerEvent) => {
                return isMovableElement(event.target as Element) && !isTouchScreen();
            }
        }
    ];
}

function isMovableElement(element: Element | null) {
    const notMovableElements = ['button', 'input', 'textarea', 'span', 'svg', 'th', 'tr', 'td', 'line', 'circle', 'path'];
    const classNameElements = ['mantine-Popover-dropdown'];
    if (element?.tagName && notMovableElements.includes(element.tagName.toLowerCase())) {
        return false;
    }
    if (element?.classList) {
        for (const classNameElement of classNameElements) {
            if (element.classList.contains(classNameElement)) {
                return false;
            }
        }
    }
    return true;
}

function isTouchScreen(): boolean {
    return 'ontouchstart' in document.documentElement;
}
