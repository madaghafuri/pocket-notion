import { Inter } from 'next/font/google';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { initPocketBase } from '@/lib/pocketbase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context);

    const result = pb.authStore.isValid;
    console.log(result);

    return {
        props: {
            res: result,
        },
    };
}

export default function Home({
    res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    useEffect(() => {
        if (!res) router.push('/auth');
    }, [res, router]);

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        ></main>
    );
}
