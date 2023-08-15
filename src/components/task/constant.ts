import { Task } from './task-table';

export type Status = {
    label: 'In Progress' | 'Done' | 'Not Started';
    color: string;
    taskList?: Task[];
};

const taskListA: Task[] = [
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

const taskListB: Task[] = [
    {
        id: '727ab52f',
        name: 'Tusuk Ayang',
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
        id: '489e1c31',
        name: 'Dipipisin Ayang',
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

export const statusList: Status[] = [
    {
        label: 'Not Started',
        color: 'grey',
        taskList: taskListA,
    },
    { label: 'In Progress', color: 'blue', taskList: taskListB },
    { label: 'Done', color: 'green' },
];
