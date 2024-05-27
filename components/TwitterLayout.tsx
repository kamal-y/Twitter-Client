import React from "react";
import Sidebar from "./Layout/Sidebar";
import FollowBar from "./Layout/FollowBar";


interface TwitterLayoutProps {
  children: React.ReactNode
}

export const TwitterLayout: React.FC<TwitterLayoutProps> = ({children}) => {

  return (
    <div className="h-screen bg-black pt-1">
      <div className="xl:px-20 container mx-auto h-full max-w-7xl">
        <div className="grid h-full grid-cols-5">
          <Sidebar />
          <div
            className="
                    col-span-4
                    border-x-[1px]
                    border-neutral-800
                    lg:col-span-3
                    
                "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
  
};


