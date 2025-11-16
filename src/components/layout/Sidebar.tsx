"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Package,
  Users,
  UserCog,
  Image,
  BarChart3,
  Receipt,
  Settings,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Shop Overview",
    href: "/shop",
    icon: LayoutDashboard,
  },
  {
    title: "Sales Management",
    href: "/shop/sales",
    icon: ShoppingCart,
    submenu: [
      { title: "Point of Sale", href: "/shop/sales/pos" },
      { title: "Orders", href: "/shop/sales/orders" },
      { title: "Reports", href: "/shop/sales/reports" },
    ],
  },
  {
    title: "Bill Management",
    href: "/shop/bills",
    icon: FileText,
    submenu: [
      { title: "All Bills", href: "/shop/bills/all" },
      { title: "Create Bill", href: "/shop/bills/create" },
      { title: "Templates", href: "/shop/bills/templates" },
    ],
  },
  {
    title: "Products & Inventory",
    href: "/shop/products",
    icon: Package,
    submenu: [
      { title: "Products", href: "/shop/products/list" },
      { title: "Categories", href: "/shop/products/categories" },
      { title: "Inventory", href: "/shop/products/inventory" },
      { title: "Suppliers", href: "/shop/products/suppliers" },
    ],
  },
  {
    title: "Customers",
    href: "/shop/customers",
    icon: Users,
  },
  {
    title: "Staff Management",
    href: "/shop/staff",
    icon: UserCog,
    submenu: [
      { title: "Staff List", href: "/shop/staff/list" },
      { title: "Attendance", href: "/shop/staff/attendance" },
      { title: "Schedules", href: "/shop/staff/schedules" },
    ],
  },
  {
    title: "Shop Display",
    href: "/shop/display",
    icon: Image,
  },
  {
    title: "Reports & Analytics",
    href: "/shop/reports",
    icon: BarChart3,
  },
  {
    title: "Expenses",
    href: "/shop/expenses",
    icon: Receipt,
  },
  {
    title: "Settings",
    href: "/shop/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 text-white rounded-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
            <h1 className="text-xl font-bold text-primary-600">Shop Manage</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openSubmenus.includes(item.title);

              return (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleSubmenu(item.title);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </div>
                    {hasSubmenu && (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          isSubmenuOpen && "transform rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Submenu */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu?.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors",
                              isSubActive
                                ? "bg-primary-50 text-primary-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </aside>
    </>
  );
}

