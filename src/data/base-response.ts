export type BaseResponse<T> = {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    items: T[];
};
