import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../ui/data-table';
import {
    ArrowDownCircle,
    Calendar,
    CircleDashed,
    Tag,
    User,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { DateToDDDMMMDDYYYY } from '@/helper/date';
import { TaskColumnHeader } from './task-column-header';

export type Task = {
    id: string;
    name: string;
    status: { label: 'Done' | 'In Progress' | 'Not Started'; color: string };
    assignee: string;
    dueDate: Date;
    priority: 'Low' | 'High' | 'Medium';
    tags: { label: string; value: string }[];
};

const columns: ColumnDef<Task>[] = [
    {
        accessorKey: 'name',
        header: 'Task Name',
    },
    {
        accessorKey: 'status',
        header: () => {
            return (
                <TaskColumnHeader title="Status">
                    <CircleDashed className="w-4 h-4" />
                </TaskColumnHeader>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue('status') as {
                label: 'Done' | 'In Progress' | 'Not Started';
                color: string;
            };

            return (
                <div className="flex gap-1">
                    <Badge
                        className={`bg-${status.color}-300`}
                        variant={'outline'}
                    >
                        {status.label}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'assignee',
        header: () => {
            return (
                <TaskColumnHeader title="Assignee">
                    <User className="w-4 h-4" />
                </TaskColumnHeader>
            );
        },
    },
    {
        accessorKey: 'dueDate',
        header: () => {
            return (
                <TaskColumnHeader title="Due">
                    <Calendar className="w-4 h-4" />
                </TaskColumnHeader>
            );
        },
        cell: ({ getValue }) => {
            const val = getValue() as Date;
            const date = DateToDDDMMMDDYYYY(val);

            return <h4>{date}</h4>;
        },
    },
    {
        accessorKey: 'priority',
        header: () => {
            return (
                <TaskColumnHeader title="Priority">
                    <ArrowDownCircle className="w-4 h-4" />
                </TaskColumnHeader>
            );
        },
    },
    {
        accessorKey: 'tags',
        header: () => {
            return (
                <TaskColumnHeader title="Tags">
                    <Tag className="w-4 h-4" />
                </TaskColumnHeader>
            );
        },
        cell: ({ row }) => {
            const tags = row.getValue('tags') as {
                label: string;
                value: string;
            }[];

            return (
                <div className="flex gap-1">
                    {tags.map((value) => {
                        return <Badge key={value.value}>{value.label}</Badge>;
                    })}
                </div>
            );
        },
    },
];

export const tasks: Task[] = [
    {
        id: '728ed52f',
        name: 'Cari Referensi',
        status: { label: 'In Progress', color: 'blue' },
        assignee: 'Mada',
        dueDate: new Date(),
        priority: 'High',
        tags: [
            { label: 'Improvement', value: 'improvement' },
            { label: 'Feature', value: 'feature' },
        ],
    },
    {
        id: '489e1d42',
        name: 'Sitasi Referensi',
        status: { label: 'In Progress', color: 'blue' },
        assignee: 'Dinda',
        dueDate: new Date(),
        priority: 'Medium',
        tags: [
            { label: 'Bug', value: 'bug' },
            { label: 'Chore', value: 'chore' },
        ],
    },
];

export function TaskTable() {
    return <DataTable columns={columns} data={tasks} />;
}
