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
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        ></main>
    );
}
