import { PropsWithChildren } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Edit, Filter, SortAsc, SortDesc } from 'lucide-react';

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
                <DropdownMenuItem className="text-muted-foreground">
                    <MenuItem name="Edit Property">
                        <Edit className="w-4 h-4" />
                    </MenuItem>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-muted-foreground">
                    <MenuItem name="Sort Ascending">
                        <SortAsc className="w-4 h-4" />
                    </MenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                    <MenuItem name="Sort Descending">
                        <SortDesc className="w-4 h-4" />
                    </MenuItem>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-muted-foreground">
                    <MenuItem name="Filter">
                        <Filter className="w-4 h-4" />
                    </MenuItem>
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
