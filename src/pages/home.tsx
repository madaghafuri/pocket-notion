import { TaskTable } from '@/components/task/task-table';
import { DataTable, columns, payments } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initPocketBase } from '@/lib/pocketbase';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Inter } from 'next/font/google';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context);

    const users = await pb.collection('workspaces').getList(1, 10);
    const userList = structuredClone(users);

    return {
        props: {
            userList,
        },
    };
}

const inter = Inter({ subsets: ['latin'] });

export default function Home({
    userList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(userList);

    return (
        <main
            className={`flex min-h-screen flex-col p-24 gap-4 ${inter.className}`}
        >
            <div>
                <h1 className="text-3xl font-bold">Tasks</h1>
            </div>
            <Tabs>
                <TabsList className="grid w-1/5 grid-cols-3">
                    <TabsTrigger value="project">By Project</TabsTrigger>
                    <TabsTrigger value="board">Board</TabsTrigger>
                    <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="project">PROJECT</TabsContent>
                <TabsContent value="board">BOARD</TabsContent>
                <TabsContent value="all-tasks">
                    <TaskTable />
                </TabsContent>
            </Tabs>
        </main>
    );
}
