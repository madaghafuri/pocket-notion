import { PropsWithChildren } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SortAsc } from 'lucide-react';

interface Props {
    title: string;
}

export function TaskColumnHeader({
    children,
    title,
}: PropsWithChildren<Props>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                    {children}
                    <h4 className="select-none">{title}</h4>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-muted-foreground">
                    <MenuItem name="Sort Ascending">
                        <SortAsc className="w-4 h-4" />
                    </MenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                    Sort Ascending
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                    Sort Ascending
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface MenuItemProps {
    name: string;
}

function MenuItem({ children, name }: PropsWithChildren<MenuItemProps>) {
    return (
        <div className="flex items-center gap-2">
            {children}
            <p className="text-muted-foreground">{name}</p>
        </div>
    );
}
