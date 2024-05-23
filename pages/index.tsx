import React, { useCallback, useState } from "react";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/apis";
import { getAllTweetsQuery, getSignedUrl } from "@/graphql/query/tweet";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";

interface HomeProps {
  tweets?: Tweet[]
}


export default function Home(props: HomeProps) {
  const { tweets = props.tweets} = useGetAllTweets();

  return (

    <>
      <main>
        <Header label="Home" />
        <Form />
        <PostFeed tweets={tweets as Tweet[]} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { getAllTweets } = await graphqlClient.request(getAllTweetsQuery);

  if (!Array.isArray(getAllTweets)) {
    throw new Error('Expected an array for getAllTweets');
  }

  return {
    props: { tweets: getAllTweets as Tweet[] }
  }
}
