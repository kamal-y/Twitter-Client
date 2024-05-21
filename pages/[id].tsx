import { TwitterLayout } from "@/components/TwitterLayout";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useGetAllTweets } from "@/hooks/tweet";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/apis";
import { getCurrentUserById } from "@/graphql/query/user";
import { useCallback, useMemo, useState } from "react";
import { userFollowMutation, userUnFollowMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter()
    const { user: currentUser } = useCurrentUser()
    const queryClient = useQueryClient()

    const amIFollowing = useMemo(() => {
        if (!props.userInfo) return false;

        return (currentUser?.following?.findIndex((el) => el?.id === props.userInfo?.id) ?? -1) >= 0
    }, [props.userInfo, currentUser?.following])

    const handleFollowUser = useCallback(async () => {
        if (!props.userInfo?.id) return;
        await graphqlClient.request(userFollowMutation, { to: props.userInfo?.id })
        await queryClient.invalidateQueries(["current-user-details"])
    }, [props.userInfo?.id, queryClient])

    const handleUnfollowUser = useCallback(async () => {
        if (!props.userInfo?.id) return;
        await graphqlClient.request(userUnFollowMutation, { to: props.userInfo?.id })
        await queryClient.invalidateQueries(["current-user-details"])
    }, [props.userInfo?.id, queryClient])

    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort className="text-4xl" />

                        <div>
                            <h1 className="text-2xl font-bold">
                                {props.userInfo?.firstName} {props.userInfo?.lastName}
                            </h1>
                            <h1 className="text-md font-bold text-slate-500">
                                {props.userInfo?.tweets?.length} Tweets
                            </h1>
                        </div>
                    </nav>
                </div>

                <div className="p-4 border-b border-slate-800">
                    {props?.userInfo?.profileImageUrl && (
                        <Image
                            src={props.userInfo?.profileImageUrl}
                            alt="user-image"
                            className="rounded-full"
                            width={100}
                            height={100}
                        />
                    )}
                </div>

                <h1 className="text-2xl font-bold mt-5">
                    {props.userInfo?.firstName} {props.userInfo?.lastName}
                </h1>

                <div className="flex justify-between items-center">
                    <div className="flex gap-4 mt-2 text-sm text-gray-400">
                        <span>{props.userInfo?.follower?.length} Followers</span>
                        <span>{props.userInfo?.following?.length} Following</span>
                    </div>

                    {
                        currentUser?.id !== props.userInfo?.id &&
                        <>
                            {
                                amIFollowing ?
                                    (<button onClick={handleUnfollowUser}
                                        className="bg-white text-black px-3 py-1 rounded-full text-sm">
                                        unfollow
                                    </button>) :
                                    (<button onClick={handleFollowUser}
                                        className="bg-white text-black px-3 py-1 rounded-full text-sm">
                                        follow
                                    </button>)

                            }
                        </>
                    }
                </div>

                <div>
                    {props.userInfo?.tweets?.map((tweet) => (
                        <FeedCard data={tweet as Tweet} key={tweet?.id} />
                    ))}
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
    let id = context.query.id as string | undefined;

    if (!id) return { notFound: true }

    const userInfo = await graphqlClient.request(getCurrentUserById, { id })

    if (!userInfo?.getUserById) return { notFound: true, props: { userInfo: undefined } };

    return {
        props: {
            userInfo: userInfo.getUserById as User,
        }
    }
}

export default UserProfilePage