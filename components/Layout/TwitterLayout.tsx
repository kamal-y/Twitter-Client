import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMessageDetail, BiSolidHomeCircle } from "react-icons/bi";
import { BsBookmark, BsPeopleFill, BsPerson } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { HiMiniQueueList } from "react-icons/hi2";
import { RiNotification4Line, RiTwitterXLine } from "react-icons/ri";
import Image from 'next/image'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/apis";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";



interface TwitterSidebar {
    title: string,
    icon: React.ReactNode,
    link: string
}



interface TwitterLayoutProps {
    children: React.ReactNode
}

export const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {

    const { user } = useCurrentUser()
    const queryClient = useQueryClient()


    const sidebarItems: TwitterSidebar[] = useMemo(
        () => [
            {
                title: 'Home',
                icon: <BiSolidHomeCircle />,
                link: '/'
            },
            {
                title: 'Explore',
                icon: <AiOutlineSearch />,
                link: '/'
            },
            {
                title: 'Notifications',
                icon: <RiNotification4Line />,
                link: '/'
            },
            {
                title: 'Messages',
                icon: <BiMessageDetail />,
                link: '/'
            },
            {
                title: 'Lists',
                icon: <HiMiniQueueList />,
                link: '/'
            },
            {
                title: 'Bookmarks',
                icon: <BsBookmark />,
                link: '/'
            },
            {
                title: 'Communities',
                icon: <BsPeopleFill />,
                link: '/'
            },
            {
                title: 'Verified',
                icon: <RiTwitterXLine />,
                link: '/'
            },
            {
                title: 'Profile',
                icon: <BsPerson />,
                link: `/${user?.id}`
            },
            {
                title: 'More',
                icon: <CgMoreO />,
                link: '/'
            }
        ],
        [user?.id]
    );



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


    return (
        <div>
            <div className='h-screen w-screen grid grid-cols-12 px-56 bg-black text-white'>

                <div className='relative col-span-3 flex flex-col justify-start pt-8  px-2 transition-all font-medium'>

                    <div className=" text-white text-center text-3xl hover:bg-gray-800 cursor-pointer h-fit w-fit px-4 py-2 rounded-full">
                        <RiTwitterXLine />
                    </div>

                    <div className="mt-4">
                        <ul>

                            {
                                sidebarItems.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                                            href={item.link}
                                        >
                                            <span className=" text-3xl">{item.icon}</span>
                                            <span className="hidden sm:inline">{item.title}</span>
                                        </Link>
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

                <div className=' col-span-5 border-l-[1px] border-r-[1px] border-gray-600 h-screen overflow-scroll no-scrollbar overflow-y-auto'>
                    {props.children}
                </div>

                <div className=' col-span-3'>

                    {
                        !user ?
                            (<div className="p-5 bg-slate-700 rounded-lg">
                                <h1 className="my-2 text-2xl">New to Twitter?</h1>
                                <GoogleLogin onSuccess={handleLoginWithGoogle} />
                            </div>) :
                            (
                                <div className="px-4 py-3 bg-slate-800 rounded-lg">
                                    <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
                                    {
                                        user.recommendedUsers?.map((el) => (
                                            <div className="flex items-center gap-3 mt-2" key={el?.id}>
                                                {el?.profileImageUrl && (
                                                    <Image
                                                        src={el?.profileImageUrl}
                                                        alt="user-image"
                                                        className="rounded-full"
                                                        width={60}
                                                        height={60}
                                                    />
                                                )}
                                                <div>
                                                    <div className="text-lg">
                                                        {el?.firstName} {el?.lastName}
                                                    </div>
                                                    <Link
                                                        href={`/${el?.id}`}
                                                        className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                    }

                </div>
            </div>
        </div>
    )
}
