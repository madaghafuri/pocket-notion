import { pbInstance } from '@/lib/pocketbase';
import { useRouter } from 'next/router';
import { AuthProviderInfo, Record } from 'pocketbase';
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useGoogleLogin } from './oauth';

interface AuthValue {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    loginGoogle: () => void;
    logout: () => void;
    setUser: Dispatch<SetStateAction<Record | null | undefined>>;
    user: Record | null | undefined;
    authProviders: AuthProviderInfo[];
}

const defaultProvider: AuthValue = {
    isLoggedIn: false,
    setIsLoggedIn: () => false,
    user: null,
    setUser: () => null,
    logout: () => Promise.resolve(),
    loginGoogle: () => Promise.resolve(),
    authProviders: [],
};

const AuthContext = createContext(defaultProvider);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<Record | null>();
    const [isLoggedIn, setIsLoggedIn] = useState(!!pbInstance.authStore.model);
    const [authProviders, setAuthProviders] = useState<AuthProviderInfo[]>([]);

    const router = useRouter();
    const { mutate: loginWithGoogle } = useGoogleLogin();

    useEffect(() => {
        const unsubscribe = pbInstance.authStore.onChange(async (_, model) => {
            if (!!model) {
                setUser(model as Record);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(function getAuthProvider() {
        (async function () {
            const authList = await pbInstance
                .collection('users')
                .listAuthMethods({ $autoCancel: false });
            setAuthProviders(authList.authProviders);
        })();
    }, []);

    const loginGoogle = async () => {
        loginWithGoogle();
    };

    const logout = async () => {
        pbInstance.authStore.clear();
        setUser(null);
        router.push('/auth');
    };

    const values = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        loginGoogle,
        authProviders,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error('Hook must be used within AuthProvider');

    return context;
}
