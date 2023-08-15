import { UserAuthForm } from '@/components/user-auth-form';
import { useAuthContext } from '@/hooks/auth';
import { initPocketBase, pbInstance } from '@/lib/pocketbase';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Auth() {
    const { authProviders } = useAuthContext();

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
            <UserAuthForm authProviders={authProviders} />
        </main>
    );
}
