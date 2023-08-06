import { FC, PropsWithChildren } from 'react';
import { NavBar } from './navbar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { NewTask } from './new-task';

export function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex">
                <NavBar />
                <main className="bg-white w-full">{children}</main>
                <div className="absolute bottom-5 right-5 flex gap-4">
                    <Button>+ Task</Button>
                    <Button>+ Task</Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>+ Task</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[600px] h-[600px]">
                            <NewTask />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    );
}
