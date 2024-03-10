import TabNavigator from "@/components/TabNavigator";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-black/85 text-white">
      <div className="sticky top-0 z-50">
        <TabNavigator />
      </div>
      <div className="flex-1 overflow-y-auto p-2">{children}</div>
    </div>
  );
};

export default HomeLayout;
