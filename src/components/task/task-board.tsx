import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, tasks } from './task-table';
import { SortableTaskItem } from './sortable-task';
import { useState } from 'react';
import { statusList } from './constant';

export function TaskBoard() {
    const [taskList, setTaskList] = useState(tasks);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setTaskList((items) => {
                const activeItem = items.find(
                    (value) => value.id === active.id
                ) as Task;
                const overItem = items.find(
                    (value) => value.id === over?.id
                ) as Task;
                const oldIndex = items.indexOf(activeItem);
                const newIndex = items.indexOf(overItem);

                console.log({ activeIndex: oldIndex, overIndex: newIndex });

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div>
            <div>Filter</div>
            <div>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-3">
                        {statusList.map((status) => {
                            return (
                                <SortableContext
                                    key={status.label}
                                    items={taskList}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h4>{status.label}</h4>
                                        {taskList?.map((task) => {
                                            return (
                                                <SortableTaskItem
                                                    key={task.id}
                                                    id={task.id}
                                                    title={task.name}
                                                />
                                            );
                                        })}
                                    </div>
                                </SortableContext>
                            );
                        })}
                    </div>
                </DndContext>
            </div>
        </div>
    );
}
