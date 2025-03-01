import { Calendar, Home, Settings, Bot, Layout, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
  SidebarGroupAction,
} from "@/components/ui/sidebar";
import SearchButton from "./SearchButton";
import SidebarClientButton from "./SidebarClientButton";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Calendar",
    url: "#",
    icon: <Calendar />,
  },
  {
    title: "Scrib chat",
    url: "#",
    icon: <Bot />,
  },
  {
    title: "Templates",
    url: "#",
    icon: <Layout />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <Settings />,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="text-black">
      <SidebarContent>
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel className="flex justify-between">
            {/*TODO: Set to space name from DB*/}
            <h2 className="font-semibold text-lg">Scrib</h2>
            <span>
              <SearchButton />
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item, index) => (
                <SidebarClientButton
                  key={item.title}
                  item={item}
                  index={index}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <h2 className="font-semibold text-md">Personal</h2>
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only p-4">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <h2 className="font-semibold text-md">Workspace</h2>
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Plus /> <span className="sr-only p-4">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button className="p-4 text-left">Log out</button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
