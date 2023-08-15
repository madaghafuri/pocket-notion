export default {
    list: '/collections/workspaces/records',
    byId: (id: string) => `/collections/workspaces/records/${id}`,
    create: '/collections/workspaces/records',
    update: (id: string) => `/collections/workspaces/records/${id}`,
    delete: (id: string) => `/collections/workspaces/records/${id}`,
};
