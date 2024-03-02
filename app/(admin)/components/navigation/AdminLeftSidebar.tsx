import ClientLeftSidebarLink from "@/app/(client)/components/navigation/ClientLeftSidebarLink";
import { adminSidebarLinks } from "@/utils/links";

export default function AdminLeftSideBar() {
  return (
    <div className="hidden lg:block col-span-2 h-svh">
      <div className="flex flex-col gap-5">
        {/* Navigation */}
        <div className="bg-white flex flex-col gap-3 rounded-2xl h-full p-2">
          {adminSidebarLinks.map((link) => (
            <ClientLeftSidebarLink key={link.label} {...link} variant="admin" />
          ))}
        </div>
      </div>
    </div>
  );
}
