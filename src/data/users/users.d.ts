export type UsersResponse = {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    items: UserData[];
};

export type UserData = {
    id: string;
    collectionId: string;
    collectionName: string;
    username: string;
    verified: string;
    emailVisibility: string;
    email: string;
    created: string;
    updated: string;
    name: string;
    avatar: string;
};
