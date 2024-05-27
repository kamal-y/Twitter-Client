import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Image from "next/image";
import Avatar from "../Avatar";
import { Tweet } from "@/gql/graphql";
import DeleteItem from "./DeleteItem";
import { formatDistanceToNowStrict } from 'date-fns';

interface PostItemProps {
  post: Tweet,
  userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ post, userId }) => {
  const router = useRouter();

  const goToUser = useCallback((event: React.MouseEvent<HTMLParagraphElement>) => {
    event.stopPropagation();
    if (userId) {
      router.push(`/${userId}`);
    }
  }, [router, userId]);

  const [isClicked, setIsClicked] = useState(false);

  const onClickLike = useCallback(() => {
    setIsClicked(prevState => !prevState);
  }, []);

  return (
    <div
      className="
          cursor-pointer
          border-b-[1px]
          border-neutral-800
          p-5
          transition
          hover:bg-neutral-900
        "
    >
      <div className="flex flex-row items-start gap-3">
        {userId && post?.author?.profileImageUrl && (
          <Avatar userId={userId} imageURL={post.author.profileImageUrl} />
        )}
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                  cursor-pointer 
                  font-semibold 
                  text-white 
                  hover:underline
                "
            >
              {post?.author?.firstName} {post?.author?.lastName}
            </p>
          </div>
          <div
            className="
                mt-1 max-w-xs 
                text-white 
                transition 
                md:max-w-lg 
                lg:max-w-2xl
              "
          >
            {post?.content}
          </div>
          {post.imageURL && (
            <Image src={post.imageURL} alt="image" width={400} height={400} />
          )}
          <div className="mt-3 flex flex-row items-center gap-10">
            {/* COMMENTS */}
            <div
              className="
                  flex
                  cursor-pointer
                  flex-row
                  items-center
                  gap-2
                  text-neutral-500
                  transition
                  hover:text-sky-500
                "
            >
              <AiOutlineMessage size={20} />
            </div>

            {/* LIKES */}
            <div
              onClick={onClickLike}
              className="
                  flex
                  cursor-pointer
                  flex-row
                  items-center
                  gap-2
                  text-neutral-500
                  transition
                  hover:text-red-500
                "
            >
              {isClicked ? (
                <AiFillHeart size={20} color="red" />
              ) : (
                <AiOutlineHeart size={20} />
              )}
            </div>

            {/* DELETE */}
            {userId && <DeleteItem post={post} userId={userId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

