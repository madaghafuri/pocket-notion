import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList,
} from './ui/command';
import Link from 'next/link';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible';
import { Bell, ChevronsUpDown, Home } from 'lucide-react';
import { Button } from './ui/button';
import { pbInstance } from '@/lib/pocketbase';
import { useAuthContext } from '@/hooks/auth';

export function NavBar() {
    const [open, setOpen] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    const [isLoggedIn, setIsLoggedin] = useState(!!pbInstance.authStore.model);

    const { logout } = useAuthContext();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        const unsubscribe = pbInstance.authStore.onChange((_, model) => {
            if (!model) setIsLoggedin(false);
            else setIsLoggedin(true);
        });
        return () => unsubscribe();
    }, []);

    const handleFocus = () => {
        setSearchFocus(true);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 w-1/6">
            <div>
                <div className="p-2">
                    <Command className="rounded-xl border shadow-md">
                        <CommandInput placeholder="Type a command or search..." />
                        {searchFocus && (
                            <CommandList>
                                <CommandEmpty>No Result Found</CommandEmpty>
                            </CommandList>
                        )}
                    </Command>
                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <CommandInput
                            placeholder="Type a command or search..."
                            className="rounded-lg"
                        />
                    </CommandDialog>
                </div>
                <NavBarItem title="Home" Icon={Home} target="/home" />
                <NavBarItem
                    title="Notification"
                    Icon={Bell}
                    target="/notification"
                />
                <Collapsible className="w-[350px] space-y-2 hover:bg-slate-300">
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <h4 className="text-sm font-semibold">Spaces</h4>
                            <ChevronsUpDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @radix-ui/colors
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @stitches/react
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            {isLoggedIn && (
                <div>
                    <Button onClick={logout}>Logout</Button>
                </div>
            )}
        </div>
    );
}

interface NavBarItemProps {
    title: string;
    target: string;
    Icon?: any;
}

function NavBarItem({
    title,
    Icon,
    target,
}: PropsWithChildren<NavBarItemProps>) {
    return (
        <Link href={target}>
            <div className="flex px-5 items-center hover:bg-slate-300">
                <Icon />
                <h2 className="text-slate-500 select-none p-4">{title}</h2>
            </div>
        </Link>
    );
}
