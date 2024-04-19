import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(
    `#graphql
    query GetAllTweets {
        getAllTweets {
        imageURL
        content
        id
        author {
            profileImageUrl
            firstName
            lastName
        }
  }
    }
    `
)