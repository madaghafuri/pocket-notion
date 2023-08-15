import { HTMLAttributes, SyntheticEvent, useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { AuthProviderInfo } from 'pocketbase';
import { useGoogleLogin } from '@/hooks/oauth';
import { useRouter } from 'next/router';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
    authProviders: AuthProviderInfo[];
}

export function UserAuthForm({
    className,
    authProviders,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        mutate: login,
        isSuccess,
        isLoading: oauthLoading,
    } = useGoogleLogin();
    const router = useRouter();

    const onSumbit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    const onClick = () => {
        login();
    };

    if (isSuccess) router.push('/home');

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <div>
                <h1 className="text-2xl font-semibold">Create a new account</h1>
            </div>
            <form onSubmit={onSumbit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading || oauthLoading}
                        />
                    </div>
                    <Button disabled={isLoading || oauthLoading}>
                        Sign in with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            {authProviders.map((value) => {
                return (
                    <Button
                        key={value.codeVerifier}
                        variant="outline"
                        type="button"
                        disabled={isLoading || oauthLoading}
                        onClick={onClick}
                    >
                        {value.name.toUpperCase()}
                    </Button>
                );
            })}
        </div>
    );
}
