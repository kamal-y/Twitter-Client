import React, { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMessageDetail, BiSolidHomeCircle } from "react-icons/bi";
import { BsBookmark, BsPeopleFill, BsPerson, BsTwitter } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { HiMiniQueueList } from "react-icons/hi2";
import { RiNotification4Line, RiTwitterXLine } from "react-icons/ri";
import { useCurrentUser } from "@/hooks/user";
import SidebarItem from "./SidebarItem";



const Sidebar = () => {
    const { user } = useCurrentUser();

  const sidebarItems = useMemo(
    () => [
      {
        label: 'Home',
        icon: BiSolidHomeCircle ,
        href: '/'
      },
      {
        label: 'Explore',
        icon: AiOutlineSearch ,
        href: '/'
      },
      {
        label: 'Notifications',
        icon: RiNotification4Line ,
        href: '/'
      },
      {
        label: 'Messages',
        icon: BiMessageDetail ,
        href: '/'
      },
      {
        label: 'Lists',
        icon: HiMiniQueueList ,
        href: '/'
      },
      {
        label: 'Bookmarks',
        icon: BsBookmark ,
        href: '/'
      },
      {
        label: 'Communities',
        icon: BsPeopleFill ,
        href: '/'
      },
      {
        label: 'Verified',
        icon: RiTwitterXLine ,
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

export default Sidebar;
