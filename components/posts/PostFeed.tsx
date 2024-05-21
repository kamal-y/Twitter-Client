import React from "react";

import PostItem from "./PostItem";
import { Tweet } from "@/gql/graphql";
import { useGetAllTweets } from "@/hooks/tweet";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/apis";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

interface PostFeedArgType {
  tweets:Tweet[]
}

const PostFeed: React.FC<PostFeedArgType> = (tweets) => {

  return (
    <>
    {

      tweets.tweets.map((ele) => 
        <PostItem key={ele?.id} post={ele as Tweet} userId={ele?.author?.id} />
      )
    }
    </>
  );
};

export default PostFeed;
