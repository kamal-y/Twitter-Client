import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";
import { useCurrentUser } from "@/hooks/user";
import { graphqlClient } from "@/clients/apis";
import { getSignedUrl } from "@/graphql/query/tweet";
import Image from 'next/image';
import { BiImageAlt } from "react-icons/bi";
import { useCreateTweet } from "@/hooks/tweet";


const FormAfterLogin: React.FC = () => {

  const { user } = useCurrentUser()
  const [content, setContent] = useState<string>('');
  const [imageURL, setImageURL] = useState('');

  const { mutate } = useCreateTweet();



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
    <div className="flex flex-row gap-4">
      <div>
        {
          user?.id && user?.profileImageUrl &&
          <Avatar userId={user?.id} imageURL={user?.profileImageUrl} />
        }
      </div>
      <div className="w-full">
        <textarea
          id="myTextarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening"
          className="
                      peer
                      mt-3
                      w-full
                      resize-none
                      bg-black
                      text-[20px]
                      text-white
                      placeholder-neutral-500
                      outline-none
                      ring-0
                      disabled:opacity-80
  
                  "
        ></textarea>

        {imageURL && (
          <Image src={imageURL} alt="tweet-image" width={300} height={300} />
        )}

        <BiImageAlt className="text-xl" onClick={handleSelectedImage} />

        <hr
          className="
                  h-[1px]
                  w-full
                  border-neutral-800
                  opacity-0
                  transition
                  peer-focus:opacity-100
              "
        />
        <div className="mt-4 flex flex-row justify-end">
          <Button
            onClick={handleCreateTweet}

            label="Tweet"
          />
        </div>
      </div>
    </div>
  );
};

export default FormAfterLogin;
