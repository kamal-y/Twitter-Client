import React, { useCallback, useState } from "react"
import Image from 'next/image'
import { TwitterLayout } from "../components/Layout/TwitterLayout"
import toast from 'react-hot-toast'
import { useCurrentUser } from "@/hooks/user"
import FeedCard from '../components/FeedCard'
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet"
import { Tweet } from "@/gql/graphql"
import { BiImageAlt } from "react-icons/bi"
import { GetServerSideProps } from "next"
import { graphqlClient } from "@/clients/apis"
import { getAllTweetsQuery, getSignedUrl } from "@/graphql/query/tweet"
import axios from "axios"

interface HomeProps {
  tweets?: Tweet[]
}


export default function Home(props : HomeProps) {

  const { tweets = props.tweets as Tweet[] } = useGetAllTweets()
  const { mutate } = useCreateTweet()
  const { user } = useCurrentUser()

  const [content, setContent] = useState<string>('')
  const [imageURL , setImageURL] = useState('')

  const hadleInputChangeFile = useCallback((input: HTMLInputElement)=>{
      return async (event : Event) => {
        event.preventDefault();
        const file : File | null | undefined = input.files?.item(0)

        if(!file) return;

        console.log("file->",file);

        const {getSignedUrlForTweet} = await graphqlClient.request(getSignedUrl,{
          imageName:file.name,
          imageType:file.type.split('/')[1]
        })

        console.log(getSignedUrlForTweet);

        if(getSignedUrlForTweet){
          toast.loading("Uploading..." , {id:"getSignedUrlForTweet"})
          try {
            await axios.put(getSignedUrlForTweet, file,{
              headers : {
                "Content-Type":file.type
              }
            })
          } catch (error) {
            throw new Error("error in axios")
          }
          toast.success("Upload Completed" , {id:"getSignedUrlForTweet"})
          const url = new URL(getSignedUrlForTweet)
          const myFilePath = `${url.origin}${url.pathname}`
          setImageURL(myFilePath)
        }
      }
  }, [])

  const handleSelectedImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    const handlerFunction = hadleInputChangeFile(input)

    input.addEventListener("change", handlerFunction)

    input.click()
  }, [hadleInputChangeFile])



  const handleCreateTweet = useCallback(async () => {
    if (!content) return toast.error('Content is required')
    mutate({ 
      content,
      imageURL
           })
    setContent('')
    setImageURL('')
  }, [content, mutate , imageURL])


  return (

    <TwitterLayout>
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
              {
                imageURL && <Image src={imageURL} alt="tweet-image" width={300} height={300}></Image>
              }

              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt className="text-3xl " onClick={handleSelectedImage} />
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
    </TwitterLayout>

  )
}

export const getServerSideProps : GetServerSideProps <HomeProps>= async( context ) =>{

  const allTweets = await graphqlClient.request(getAllTweetsQuery)
 return{
  props:{
    tweets : allTweets.getAllTweets as Tweet[]
  }
 }
}
