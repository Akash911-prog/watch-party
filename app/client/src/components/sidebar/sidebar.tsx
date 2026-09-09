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
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { title: 'Home', icon: Home, href: '/' },
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Room', icon: DoorOpen, href: '/room' },
  { title: 'Upload', icon: Upload, href: '/upload' },
];

export function AppSidebar() {
  const { user } = useAuthStore();
  const initial = user?.username?.[0] ?? 'G';

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
            {initial}
          </div>
          <span className="text-sm font-semibold">
            {user?.username ?? 'Guest'}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.title.toLowerCase() === pathname}
                    onClick={() => navigate({ to: item.href })}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
              <span className="font-medium truncate">username</span>
              <ChevronsUpDown className="h-4 w-4 opacity-60" />
            </div>
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
