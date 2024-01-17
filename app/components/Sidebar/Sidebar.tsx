import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import SidebarHeader from "./SidebarHeader";
import NavLinks from "./NavLinks";
import MemberProfile from "./MemberProfile";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="drawer-button sm:hidden fixed top-6 right-6">
          <FaBarsStaggered className="w-8 h-8 text-primary" />
        </label>
        <div className="bg-base-200 px-8 py-12 min-h-screen">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
          <SidebarHeader />
          <NavLinks />
          <MemberProfile />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
