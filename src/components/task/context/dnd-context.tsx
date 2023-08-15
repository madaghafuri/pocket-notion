import { PropsWithChildren } from 'react';
import { DndContext } from '@dnd-kit/core';

export function DragDropListener() {}

export function DndProvider({}: PropsWithChildren) {
    return <DndContext></DndContext>;
}
