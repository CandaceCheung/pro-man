import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { elements, RowElement } from '../../pages/MainTable';

type TableRowProps = {
    rowID: number;
}

export function TableRow({ rowID }: TableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: rowID });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const element: RowElement = elements[rowID];

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <span>{element[1]}</span>
                <span>{element[2]}</span>
                <span>{element[3]}</span>
                <span>{element[4]}</span>
        </div>
    )
}