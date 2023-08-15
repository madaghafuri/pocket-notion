import { useWorkspaces } from '@/data/workspaces/workspace-data';
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const workspaceId = router.query.id as string;
    console.log(workspaceId);

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-2xl font-bold">Home</h1>
        </main>
    );
}
