import { PropsWithChildren, useEffect, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList,
} from './ui/command';
import HomeIcon from '@/assets/home.svg';
import NotifIcon from '@/assets/notification.svg';
import { Icon } from './ui/icon';
import Link from 'next/link';

export function NavBar() {
    const [open, setOpen] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);

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

    const handleFocus = () => {
        setSearchFocus(true);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 w-1/6">
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
            <NavBarItem title="Home" icon={HomeIcon} target="/home" />
            <NavBarItem
                title="Notification"
                icon={NotifIcon}
                target="/notification"
            />
        </div>
    );
}

interface NavBarItemProps {
    title: string;
    icon?: any;
    target: string;
}

function NavBarItem({
    title,
    icon,
    target,
}: PropsWithChildren<NavBarItemProps>) {
    return (
        <Link href={target}>
            <div className="flex px-5 items-center hover:bg-slate-300">
                <Icon icon={icon} />
                <h2 className="text-slate-500 select-none p-4">{title}</h2>
            </div>
        </Link>
    );
}
