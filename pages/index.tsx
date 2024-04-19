import React, { useCallback, useState } from "react"
import Image from 'next/image'
import { BsBookmark, BsPeopleFill, BsPerson } from "react-icons/bs"
import { BiSolidHomeCircle, BiMessageDetail, BiImageAlt } from "react-icons/bi"
import { RiNotification4Line, RiTwitterXLine } from "react-icons/ri"
import { AiOutlineSearch } from "react-icons/ai"
import { HiMiniQueueList } from "react-icons/hi2"
import { CgMoreO } from "react-icons/cg"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import toast from 'react-hot-toast'
import { graphqlClient } from '@/clients/apis'
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user'
import { useCurrentUser } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query"
import FeedCard from '../components/FeedCard'
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet"
import { Tweet } from "@/gql/graphql"

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

export default function Home() {

  const { user } = useCurrentUser()
  const { tweets = []} = useGetAllTweets()
  const {mutate} = useCreateTweet()
  const queryClient = useQueryClient()

  const [content , setContent ] = useState<string>('')

  const handleSelectedImage = useCallback(()=>{
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()
  },[])


  const handleLoginWithGoogle = useCallback(async (res: CredentialResponse) => {
    const googleToken = res.credential;

    if (!googleToken) return toast.error('Failed to login with google')

    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    )

    toast.success('Successfully logged in with google')

    if (verifyGoogleToken) window.localStorage.setItem("__twitter_token", verifyGoogleToken)

    await queryClient.invalidateQueries(["current-user-details"])
  }
    , [])

  const handleCreateTweet = useCallback(async () => {
    if(!content) return toast.error('Content is required')
    mutate({content})
    setContent('')
  },[content, mutate])


  return (
    <div className='h-screen w-screen grid grid-cols-12 px-56 bg-black text-white'>

      <div className='relative col-span-3 flex flex-col justify-start pt-8 border border-blue  px-2 transition-all font-medium'>

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

        {
          user &&
          <div className="absolute bottom-5 left-2 flex gap-2 items-center bg-slate-800 px-3 py-3 rounded-full ">
            <Image
              src={user?.profileImageUrl || '/images/default-profile.png'}
              alt="profile image"
              height={50}
              width={50}
              className="rounded-full"
            />
            <div><h3 className="text-xl">{user?.firstName + " " + user?.lastName}</h3></div>
          </div>
        }

      </div>

      <div className=' col-span-5 border-l-[1px] border-r-[1px] border-gray-600 h-screen overflow-scroll'>
        <div>

          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageUrl &&
                  <Image
                    src={user?.profileImageUrl}
                    alt="user-image"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />}
              </div>
            </div>

            <div className="col-span-11">
              <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent text-xl p-3 border-b border-slate-700"
                placeholder="What's happening"
                rows={4}>
              </textarea>

              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt className="text-3xl " onClick={handleSelectedImage}/>
                <button onClick={handleCreateTweet} className=" mt-4 group relative h-12 w-48 overflow-hidden  rounded-full bg-[#1d9bf0] text-lg font-bold text-white">
                  Tweet
                  <div className="absolute inset-0 h-full scale-0  transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
              </div>
            </div>

          </div>

        </div>

        <div>
          {
            tweets?.map(
              tweet => <FeedCard key={tweet?.id} data={tweet as Tweet} />
            )
          }
        </div>

      </div>

      <div className=' col-span-3'>

        {
          !user &&
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        }

      </div>
    </div>

  )
}
