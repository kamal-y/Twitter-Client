import { TwitterLayout } from "@/components/Layout/TwitterLayout";
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

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter()

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