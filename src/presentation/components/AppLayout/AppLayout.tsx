import {
  AppHeader,
  IconLocalLibrary,
  Navbar,
  NavbarTab,
  IconApartment,
  IconDashboard,
  IconAssignment,
} from "@luislongo/ds-core";
import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const ROUTES = [
  { path: "/empreendimento", label: "Empreendimento", icon: <IconApartment />, disabled: false },
  { path: "/dashboards", label: "Dashboards", icon: <IconDashboard />, disabled: false },
  { path: "/relatorios", label: "Relatórios", icon: <IconAssignment />, disabled: false },
];

const Avatar = () => <div className="w-12 h-12 rounded-full bg-neutral-300" />;

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader
        title="Aplicação"
        icon={<IconLocalLibrary />}
        avatar={<Avatar />}
        navbar={
          <Navbar>
            {ROUTES.map((route) => (
              <NavbarTab
                key={route.path}
                label={route.label}
                icon={route.icon}
                active={pathname === route.path}
                disabled={route.disabled}
                onClick={route.disabled ? undefined : () => navigate(route.path)}
              />
            ))}
          </Navbar>
        }
        className="h-[64px] border-b border-neutral-200"
      />
      <main className="flex-1 flex flex-col p-800 w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
