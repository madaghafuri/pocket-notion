import { api, workspace } from '@/api';
import { useQuery } from 'react-query';
import { BaseResponse } from '../base-response';

export interface BaseQueryParams {
    page: number;
    perPage: number;
    ownerId: string;
    memberId: string;
}

export type Workspace = {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    name: string;
    attachment: string;
    owner: string;
    member: string[];
};

export function useWorkspaceById(id: string, enabled = true) {
    const { data, ...other } = useQuery(
        ['workspace', id],
        () => api.get<Workspace>(workspace.byId(id)),
        {
            enabled,
        }
    );

    return { ...other, data: data?.data };
}

export function useWorkspaces(params: BaseQueryParams, enabled = true) {
    const { data, ...other } = useQuery(
        ['workspace'],
        () => api.get<BaseResponse<Workspace>>(workspace.list, { params }),
        { enabled }
    );

    return { ...other, data: data?.data.items };
}
