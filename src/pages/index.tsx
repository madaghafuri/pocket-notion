import { Inter } from 'next/font/google';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { initPocketBase } from '@/lib/pocketbase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '@/hooks/auth';

export default function Home() {
    const { isLoggedIn } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) router.push('/auth');
    }, [isLoggedIn, router]);

    return (
        <main className={`flex min-h-screen flex-col items-center p-24`}></main>
    );
}
