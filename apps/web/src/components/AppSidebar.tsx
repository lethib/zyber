import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ClipboardList, LayoutDashboard, ListTodo, LogOut } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { clearToken } from "@/lib/auth";
import { trpc } from "@/lib/trpc";

const NAV_ITEMS = [
	{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/checklist", label: "Checklist", icon: ClipboardList },
	{ to: "/plan-action", label: "Plan d'action", icon: ListTodo },
] as const;

export function AppSidebar() {
	const navigate = useNavigate();
	const { location } = useRouterState();
	const logout = trpc.auth.logout.useMutation({
		onSuccess: () => {
			clearToken();
			navigate({ to: "/login" });
		},
	});

	function isActive(to: string) {
		return to === "/dashboard" ? location.pathname === to : location.pathname.startsWith(to);
	}

	return (
		<Sidebar>
			<SidebarHeader className="px-3 py-4">
				<span className="text-lg font-semibold text-zinc-900">Vauban</span>
			</SidebarHeader>
			<SidebarContent className="px-3">
				<SidebarMenu>
					{NAV_ITEMS.map(({ to, label, icon: Icon }) => (
						<SidebarMenuItem key={to}>
							<SidebarMenuButton asChild isActive={isActive(to)}>
								<Link to={to}>
									<Icon />
									<span>{label}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="px-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton onClick={() => logout.mutate()} disabled={logout.isPending}>
							<LogOut />
							<span>{logout.isPending ? "Déconnexion..." : "Se déconnecter"}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
