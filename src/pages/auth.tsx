import { UserAuthForm } from '@/components/user-auth-form';
import { useGoogleLogin } from '@/hooks/oauth';
import { initPocketBase, pbInstance } from '@/lib/pocketbase';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context);
    const authList = await pb.collection('users').listAuthMethods();
    const result = structuredClone(authList);

    return {
        props: {
            result,
        },
    };
}

export default function Auth({
    result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(result);

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
            <UserAuthForm authProviders={result.authProviders} />
        </main>
    );
}
