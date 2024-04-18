import React, { useCallback } from "react"
import Image from 'next/image'
import { BsBookmark, BsPeopleFill, BsPerson } from "react-icons/bs"
import { BiSolidHomeCircle, BiMessageDetail } from "react-icons/bi"
import { RiNotification4Line, RiTwitterXLine } from "react-icons/ri"
import { AiOutlineSearch } from "react-icons/ai"
import { HiMiniQueueList } from "react-icons/hi2"
import { CgMoreO } from "react-icons/cg"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import toast from 'react-hot-toast'
import { graphqlClient } from '@/clients/apis'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'
// import FeedCard from '@/components/FeedCard'


export default function Home() {


  interface TwitterSidebar {
    title: string,
    icon: React.ReactNode
  }

  const siderbarItems: TwitterSidebar[] = [
    {
      title: 'Home',
      icon: <BiSolidHomeCircle />
    },
    {
      title: 'Explore',
      icon: <AiOutlineSearch />
    },
    {
      title: 'Notifications',
      icon: <RiNotification4Line />
    },
    {
      title: 'Messages',
      icon: <BiMessageDetail />
    },
    {
      title: 'Lists',
      icon: <HiMiniQueueList />
    },
    {
      title: 'Bookmarks',
      icon: <BsBookmark />
    },
    {
      title: 'Communities',
      icon: <BsPeopleFill />
    },
    {
      title: 'Verified',
      icon: <RiTwitterXLine />
    },
    {
      title: 'Profile',
      icon: <BsPerson />
    },
    {
      title: 'More',
      icon: <CgMoreO />
    },
  ]

  const handleLoginWithGoogle = useCallback(async (res: CredentialResponse) => {
    const googleToken = res.credential;

    console.log("google credential for user --->", googleToken);

    if (!googleToken) return toast.error('Failed to login with google')

    const {verifyGoogleToken} = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      )
      
    toast.success('Successfully logged in with google')

    if(verifyGoogleToken) window.localStorage.setItem("__twitter_token",verifyGoogleToken)
  }
    , [])


  return (
    <div className='h-screen w-screen grid grid-cols-12 px-56 bg-black text-white'>

      <div className=' col-span-3 flex flex-col justify-start pt-8 border border-blue  px-2 transition-all font-medium'>

        <div className=" text-white text-center text-3xl hover:bg-gray-800 cursor-pointer h-fit w-fit px-4 py-2 rounded-full">
          <RiTwitterXLine />
        </div>

        <div className="mt-4">
          <ul>
            {
              siderbarItems.map(item => (
                <li
                  className="text-2xl flex justify-start gap-2 items-center hover:bg-gray-800 px-4 py-2 w-fit rounded-full cursor-pointer"
                  key={item.title}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </div>

        <button className=" mt-4 group relative h-12 w-48 overflow-hidden  rounded-full bg-[#1d9bf0] text-lg font-bold text-white">
          Post
          <div className="absolute inset-0 h-full w-full scale-0  transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>

      </div>

      <div className=' col-span-6 border-l-[1px] border-r-[1px] border-gray-500'>
        {/* <FeedCard/> */}

      </div>

      <div className=' col-span-3'>

        <div className="p-5 bg-slate-700 rounded-lg">
          <h1 className="my-2 text-2xl">New to Twitter?</h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>

      </div>
    </div>

  )
}
