import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableElement } from '../../pages/MainTable';

type TableRowProps = {
    id: number;
    elements: TableElement;
}

export function TableRow({ id, elements }: TableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const element = elements[id];

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <span className='cell'>{element.position}</span>
                <span className='cell'>{element.name}</span>
                <span className='cell'>{element.symbol}</span>
                <span className='cell'>{element.mass}</span>
        </div>
    )
}