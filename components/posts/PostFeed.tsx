import React from "react";

import PostItem from "./PostItem";
import { Tweet } from "@/gql/graphql";

interface PostFeedArgType {
  tweets:Tweet[]
}

const PostFeed: React.FC<PostFeedArgType> = ({tweets}) => {

  return (
    <>
    {

      tweets.map((ele) =>{
        return <PostItem key={ele?.id} post={ele as Tweet} userId={ele?.author?.id} />
      } 
        
      )
    }
    </>
  );
};

export default PostFeed;
