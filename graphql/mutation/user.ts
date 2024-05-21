import { graphql } from "@/gql";

export const userFollowMutation  = graphql(`#graphql
    mutation FollowUser($to: ID!) {
        followUser(to: $to)
    }
`)

export const userUnFollowMutation = graphql(`#graphql
    mutation UnFollowUser($to: ID!) {
        unFollowUser(to: $to)
    }
`)

export const userDeleteTweetMutation = graphql(`#graphql
    mutation DeleteTweetById($id: String) {
        deleteTweetById(id: $id)
    }
`)