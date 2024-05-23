import React, { useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMessageDetail, BiSolidHomeCircle } from "react-icons/bi";
import { BsBookmark, BsPeopleFill, BsPerson, BsTwitter } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { HiMiniQueueList } from "react-icons/hi2";
import { RiNotification4Line, RiTwitterXLine } from "react-icons/ri";
import { useCurrentUser } from "@/hooks/user";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";



const SidebarWithSession = () => {
    const { user } = useCurrentUser();
    

  const sidebarItems = useMemo(
    () => [
      {
        label: 'Home',
        icon: BiSolidHomeCircle ,
        href: '/'
      },
      {
        label: 'Profile',
        icon: BsPerson ,
        href: `/${user?.id}`
      },
      {
        label: 'More',
        icon: CgMoreO ,
        href: '/'
      }
    ],
    [user?.id]
  );

  return (
    <>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </>
  );
};

const SidebarWithoutSession = () => {
  const { user } = useCurrentUser();

  const sidebarItems =[
      {
        label: 'Home',
        icon: BiSolidHomeCircle ,
        href: '/'
      },
      {
        label: 'Profile',
        icon: BsPerson ,
        href: `/${user?.id}`
      },
      {
        label: 'More',
        icon: CgMoreO ,
        href: '/'
      }
    ]

  return (
    <>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </>
  );
};

const Sidebar = () => {

  const {user} = useCurrentUser()

  return (
    <div className="col-span-1 h-full pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-0">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />

          {user ? (
            <SidebarWithSession />
          ) : (
            <SidebarWithoutSession />
          )}

          {/* {user && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Log Out"
              href=""
            />
          )} */}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
