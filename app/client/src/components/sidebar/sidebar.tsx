import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  LayoutDashboard,
  DoorOpen,
  Upload,
  ChevronsUpDown,
  Settings,
  LogOut,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

const NAV_ITEMS = [
  { title: 'Home', icon: Home, href: '/' },
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Room', icon: DoorOpen, href: '/room' },
  { title: 'Upload', icon: Upload, href: '/upload' },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
            A
          </div>
          <span className="text-sm font-semibold">Acme</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === 'Dashboard'}
                  >
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <span className="font-medium truncate">username</span>
              <ChevronsUpDown className="h-4 w-4 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width]"
          >
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
