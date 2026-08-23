import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata = {
  title: "Admin Console | Portfolio CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
