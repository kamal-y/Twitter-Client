import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(
    `#graphql
    query GetAllTweets {
        getAllTweets {
        imageURL
        content
        id
        author {
            id
            profileImageUrl
            firstName
            lastName
        }
  }
    }
    `
)

export const getSignedUrl = graphql(
    `#graphql
    query GetSignedUrl($imageType: String!, $imageName: String!) {
        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)
        }
    `
)