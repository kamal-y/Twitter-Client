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