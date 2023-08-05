import { FC, PropsWithChildren } from 'react';
import { NavBar } from './navbar';

export function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex">
                <NavBar />
                <main>{children}</main>
            </div>
        </>
    );
}
