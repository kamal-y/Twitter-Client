import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/apis";
import { getCurrentUserById } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";

interface ServerProps {
    userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = ({userInfo}) => {

    console.log(userInfo?.tweets);

    return (
        <>
          {
            userInfo?.firstName &&
            <Header showBackArrow label={userInfo?.firstName} />
          }
          {
            userInfo?.profileImageUrl &&
            <UserHero userId={userInfo?.id as string} imageURL={userInfo?.profileImageUrl} />
          }
          <UserBio userInfo={userInfo} />
          <PostFeed tweets={userInfo?.tweets as Tweet[]} />
        </>
      );

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