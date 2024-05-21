import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";


interface SidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {

  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(href);
  }, [router, href]);


  return (
    <div onClick={handleClick} className="flex flex-row items-center ">
      <div
        className="
            relative
            flex
            h-14
            w-14 cursor-pointer
            items-center 
            justify-center
            rounded-full
            p-4
            hover:bg-slate-300
            hover:bg-opacity-10
            lg:hidden
        "
      >
        <Icon size={28} color="white" />
          <BsDot size={70} className="absolute -top-4 left-0 text-sky-500" />
      </div>
      <div
        className="
            relative
            hidden
            cursor-pointer
            items-center
            gap-4
            rounded-full
            p-4
            hover:bg-slate-300
            hover:bg-opacity-10
            lg:flex
        "
      >
        <Icon size={24} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
          {
            label==='Home' &&
            <BsDot size={70} className="absolute -top-4 left-0 text-sky-500" />
          }
      </div>
    </div>
  );
};

export default SidebarItem;
