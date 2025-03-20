"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Package, Boxes, Truck, Users, BarChart } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
          )}
        >
          <div className="mr-2 h-4 w-4">{item.icon}</div>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      href: "/dashboard/products",
      title: "Products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "/dashboard/inventory",
      title: "Inventory",
      icon: <Boxes className="h-4 w-4" />,
    },
    {
      href: "/dashboard/suppliers",
      title: "Suppliers",
      icon: <Truck className="h-4 w-4" />,
    },
    {
      href: "/dashboard/customers",
      title: "Customers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/reports",
      title: "Reports",
      icon: <BarChart className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Smart Inventory</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <SidebarNav items={items} />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
} 