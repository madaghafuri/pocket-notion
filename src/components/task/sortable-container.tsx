import { SortableContext } from '@dnd-kit/sortable';
import { PropsWithChildren, useState } from 'react';

interface Props {
    items: any[];
    id: string;
}

export function SortableContainer({
    items,
    id,
    children,
}: PropsWithChildren<Props>) {
    const [itemList, setItemList] = useState(items);

    return (
        <SortableContext id={id} items={itemList}>
            {children}
        </SortableContext>
    );
}
