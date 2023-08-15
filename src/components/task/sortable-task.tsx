import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../ui/button';

interface Props {
    id: string;
    title: string;
}

export function SortableTaskItem({ id, title }: Props) {
    const { transform, attributes, listeners, setNodeRef, transition } =
        useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Button>{title}</Button>
        </div>
    );
}
