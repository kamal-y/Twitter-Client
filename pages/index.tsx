import React, { useCallback, useState } from "react";
import Image from 'next/image';
import { TwitterLayout } from "../components/TwitterLayout";
import toast from 'react-hot-toast';
import { useCurrentUser } from "@/hooks/user";
import FeedCard from '../components/FeedCard';
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import { BiImageAlt } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/apis";
import { getAllTweetsQuery, getSignedUrl } from "@/graphql/query/tweet";
import axios from "axios";
import { Head } from "next/document";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";

interface HomeProps {
  tweets?: Tweet[]
}


export default function Home(props : HomeProps) {
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();

  const { mutate } = useCreateTweet();
  const { user } = useCurrentUser();

  const [content, setContent] = useState<string>('');
  const [imageURL, setImageURL] = useState('');

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);

      if (!file) return;

      const { getSignedUrlForTweet } = await graphqlClient.request(getSignedUrl, {
        imageName: file.name,
        imageType: file.type.split('/')[1]
      });

      if (getSignedUrlForTweet) {
        toast.loading("Uploading...", { id: "getSignedUrlForTweet" });
        try {
          await axios.put(getSignedUrlForTweet, file, {
            headers: { "Content-Type": file.type }
          });
        } catch (error) {
          throw new Error("Error in axios");
        }
        toast.success("Upload Completed", { id: "getSignedUrlForTweet" });
        const url = new URL(getSignedUrlForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    }
  }, []);

  const handleSelectedImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const handlerFunction = handleInputChangeFile(input);

    input.addEventListener("change", handlerFunction);
    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(async () => {
    if (!content) return toast.error('Content is required');
    mutate({ content, imageURL });
    setContent('');
    setImageURL('');
  }, [content, mutate, imageURL]);

  return (
    <TwitterLayout>


        <Header label="Home"/>

      <div className="border-b border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
          

        <Form/>


      </div>

      <div>
        
        <PostFeed tweets={tweets as Tweet[]}/>

      </div>
    </TwitterLayout>
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
