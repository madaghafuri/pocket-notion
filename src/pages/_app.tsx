import { Layout } from '@/components/layout';
import { AuthProvider } from '@/hooks/auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </QueryClientProvider>
    );
}
