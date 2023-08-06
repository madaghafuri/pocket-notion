export default {
    list: '/collections/users/records',
    byId: (id: string) => `/collections/users/records/${id}`,
    create: '/collections/users/records',
    update: (id: string) => `/collections/users/records/${id}`,
    delete: (id: string) => `/collections/users/records/${id}`,
};
