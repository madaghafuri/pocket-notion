import { WorkspaceCard } from '@/components/workspace/workspace';
import { WorkspaceProvider, useWorkspaceContext } from '@/hooks/workspace';
import { pbInstance } from '@/lib/pocketbase';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <WorkspaceProvider>
            <main
                className={`flex min-h-screen flex-col p-24 gap-4 ${inter.className}`}
            >
                <div className="flex gap-5">
                    <div>WorkspaceList navbar</div>
                    <WorkspaceCard />
                </div>
            </main>
        </WorkspaceProvider>
    );
}
