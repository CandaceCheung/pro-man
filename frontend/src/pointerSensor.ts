import type { PointerEvent } from 'react';
import { PointerSensor } from '@dnd-kit/core';

export class SmartPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown' as any,
            handler: ({ nativeEvent: event }: PointerEvent) => {
                if (isInteractiveElement(event.target as Element)) {
                    return false;
                }
                return true;
            }
        }
    ];
}

function isInteractiveElement(element: Element | null) {
    const interactiveElements = [
        'button',
        'input',
        'textarea',
        'span',
        'svg',
        'th',
        'tr',
        'td',
        'line',
        'circle',
        'path'
    ];
    const classNameElements = ['mantine-Popover-dropdown'];
    if (element?.tagName && interactiveElements.includes(element.tagName.toLowerCase())) {
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
