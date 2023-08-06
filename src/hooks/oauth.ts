import { pbInstance } from '@/lib/pocketbase';
import { useMutation } from 'react-query';

export function useGoogleLogin() {
    const login = async () => {
        const authData = await pbInstance
            .collection('users')
            .authWithOAuth2({ provider: 'google' });
    };

    return useMutation(login);
}
