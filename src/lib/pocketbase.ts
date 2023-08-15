import { GetServerSidePropsContext } from 'next';
import PocketBase from 'pocketbase';

export async function initPocketBase(context: GetServerSidePropsContext) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    // load the store data from cookie
    pb.authStore.loadFromCookie(context.req.headers.cookie || '', 'pb_auth');

    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb.authStore.onChange(() => {
        context.res.setHeader('set-cookie', pb.authStore.exportToCookie());
    });

    try {
        // get the user data from server if the auth is valid
        pb.authStore.isValid && (await pb.collection('users').authRefresh());
    } catch (error) {
        // clear the auth store if the auth is invalid
        pb.authStore.clear();
    }

    // update the last active date
    if (pb.authStore.isValid && pb.authStore.model) {
        await pb.collection('users').update(pb.authStore.model.id, {
            lastActive: new Date(),
        });
    }

    return pb;
}

export const pbInstance = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL
);
