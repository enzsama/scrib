import {
  Calendar,
  Home,
  Settings,
  Bot,
  Layout,
  NotebookTabs,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SearchButton from "./SearchButton";
import SidebarClientButton from "./SidebarClientButton";
import UserNav from "./UserNav";

// TODO: Get this data from the session or fetch from DB
const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Notes",
    url: "/n",
    icon: <NotebookTabs />,
  },
  {
    title: "Scrib chat",
    url: "/chat",
    icon: <Bot />,
  },
  {
    title: "Calendar",
    url: "#",
    icon: <Calendar />,
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

const AppSidebar = ({
  userDetails,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userDetails: { name: string; email: string; image: string | null };
}) => {
  return (
    <Sidebar className="text-black" {...props}>
      <SidebarContent>
        <SidebarGroup className="space-y-4">
          <SidebarGroupLabel className="flex justify-between">
            <h2 className="font-semibold text-lg">Scrib</h2>
            <span>
              <SearchButton />
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarClientButton key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={userDetails} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
