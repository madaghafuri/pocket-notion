import { api, user } from '@/api';
import { useQuery } from 'react-query';
import { UsersResponse } from './users';

const cacheKey = 'users';

export type Params = {
    page?: number;
    perPage?: number;
    sort?: string;
    filter?: string;
    expand?: string;
    fields?: string;
    skipTotal?: boolean;
};

export const useUserList = (params: Params) => {
    const { data, ...other } = useQuery([cacheKey], () =>
        api.get<UsersResponse>(user.list, {
            params,
        })
    );

    return { ...other, data: data?.data };
};
