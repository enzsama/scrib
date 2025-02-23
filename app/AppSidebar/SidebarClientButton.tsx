"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";
import Link from "next/link";

interface Props {
  item: {
    title: string;
    url: string;
    icon: JSX.Element;
  };
  index: number;
}

const SidebarClientButton = ({ item: { title, url, icon }, index }: Props) => {
  const [button, setButton] = useState(0);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={button === index}
        asChild
        className="p-4"
        onClick={() => setButton(index)}
      >
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
export default SidebarClientButton;
