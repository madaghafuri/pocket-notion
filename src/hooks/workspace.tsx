import { Workspace, useWorkspaces } from '@/data/workspaces/workspace-data';
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useAuthContext } from './auth';

interface WorkspaceValue {
    workspaceList?: Workspace[];
    setWorkspaceList: Dispatch<SetStateAction<Workspace[] | undefined>>;
    currentWorkspace?: Workspace | null;
    setCurrentWorkspace: Dispatch<SetStateAction<Workspace | undefined>>;
}

const defaultProvider: WorkspaceValue = {
    workspaceList: [],
    setCurrentWorkspace: () => [],
    currentWorkspace: null,
    setWorkspaceList: () => null,
};

const WorkspaceContext = createContext(defaultProvider);

export function WorkspaceProvider({ children }: PropsWithChildren) {
    const { user } = useAuthContext();
    const { data: wsList, isSuccess } = useWorkspaces(
        {
            page: 1,
            perPage: 10,
            ownerId: user?.id || '',
            memberId: user?.id || '',
        },
        !!user
    );
    const [workspaceList, setWorkspaceList] = useState<Workspace[]>();
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>();

    useEffect(() => {
        if (!wsList) return;

        setWorkspaceList(wsList);
        setCurrentWorkspace(wsList[0]);
    }, [isSuccess, wsList]);

    const values: WorkspaceValue = {
        workspaceList,
        setWorkspaceList,
        currentWorkspace,
        setCurrentWorkspace,
    };

    return (
        <WorkspaceContext.Provider value={values}>
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspaceContext() {
    return useContext(WorkspaceContext);
}
