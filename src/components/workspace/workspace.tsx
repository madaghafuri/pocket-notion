import { useWorkspaceContext } from '@/hooks/workspace';

export function WorkspaceCard() {
    const { workspaceList } = useWorkspaceContext();

    return (
        <div>
            {workspaceList?.map((workspace) => {
                return <h1 key={workspace.id}>{workspace.name}</h1>;
            })}
        </div>
    );
}
