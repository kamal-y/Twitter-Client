import { graphqlClient } from '@/clients/apis'
import { Tweet } from '@/gql/graphql'
import { userDeleteTweetMutation } from '@/graphql/mutation/user'
import { useDeleteTweet } from '@/hooks/tweet'
import { useCurrentUser } from '@/hooks/user'
import { QueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

interface DeleteItemProps {
  post: Tweet,
  userId: string
}

const DeleteItem: React.FC<DeleteItemProps> = ({ post, userId }) => {
  const { user: currentUser } = useCurrentUser()
  const queryClient = new QueryClient()

  const { mutate } = useDeleteTweet()

  const onDelete = useCallback(async () => {

    if (!currentUser) return
    mutate(post.id)

  }
  , [currentUser, mutate, post.id])

  return (
    <div
      onClick={onDelete}
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
      {userId === currentUser?.id && <AiOutlineDelete size={20} />}
    </div>
  )
}

export default DeleteItem