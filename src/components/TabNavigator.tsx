"use client";
import { Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabNavigator = () => {
  const pathName = usePathname();

  return (
    <Tabs
      value={pathName}
      textColor="primary"
      aria-label="tab navigator"
      TabIndicatorProps={{
        className: "bg-white",
      }}
    >
      <Tab
        className="normal-case text-white"
        value="/home"
        label="Friends"
        LinkComponent={Link}
        href="/home"
      />
      <Tab
        className="normal-case text-white"
        value="/home/history"
        label="History"
        LinkComponent={Link}
        href="/home/history"
      />
      <Tab
        className="normal-case text-white"
        value="/home/settings"
        label="Settings"
        LinkComponent={Link}
        href="/home/settings"
      />
    </Tabs>
  );
};

export default TabNavigator;
