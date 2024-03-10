import FriendsCard from "@/components/FriendsCard";
import React from "react";

const HistoryPage = () => {
  const arr = new Array(20).fill(undefined);
  return (
    <div className="flex flex-col gap-2">
      {arr.map((val: any, index: number) => {
        return <FriendsCard />;
      })}
    </div>
  );
};

export default HistoryPage;
