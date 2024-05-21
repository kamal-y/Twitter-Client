import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";

import Image from 'next/image';
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/apis";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Sidebar from "./Layout/Sidebar";
import { BsTwitter } from "react-icons/bs";
import FollowBar from "./Layout/FollowBar";


interface TwitterLayoutProps {
  children: React.ReactNode
}

export const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();


   

  return (
    <div className="grid grid-cols-12 h-screen w-screen px-4 sm:px-56 bg-black text-white">



      <div className="col-span-2 sm:col-span-3 pt-1 flex justify-end pr-2 sm:pr-4 relative">
  <div className="w-full sm:w-auto"> {/* Adjust width to auto for smaller screens */}
    <div>
      <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
        <BsTwitter />
      </div>
      
      
      <Sidebar/>

      {user && (
      <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
        {user.profileImageUrl && (
          <Image
            className="rounded-full"
            src={user.profileImageUrl}
            alt="user-image"
            height={50}
            width={50}
          />
        )}
        <div className="hidden sm:block">
          <h3 className="text-xl">
            {user.firstName} {user.lastName}
          </h3>
        </div>
      </div>
    )}
    </div>
    
  </div>
</div>






      <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600 custom-scrollbar">
        {props.children}
      </div>

      <div className="col-span-0 sm:col-span-3 p-5">
        <FollowBar/>
      </div>
    </div>
  );
};
