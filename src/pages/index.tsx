import { Inter } from 'next/font/google';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { initPocketBase } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context);

    const result = await pb.collection('users').getList(1, 10);
    const res = structuredClone(result);

    return {
        props: {
            res,
        },
    };
}

export default function Home({
    res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(res);

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
            <Button variant="ghost">Button</Button>
            <Label>YOUR BUTTON</Label>
        </main>
    );
}
