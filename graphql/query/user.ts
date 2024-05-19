import { graphql } from "../../gql"

export const verifyUserGoogleTokenQuery = graphql(`#graphql

query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token) 
}       
`)

export const getCurrentUserDetailsQuery = graphql(`#graphql
    query GetCurrentUserDetails {
    getCurrentUserDetails {
    email
    firstName
    id
    lastName
    profileImageUrl
    recommendedUsers {
        id
        firstName
        lastName
        profileImageUrl
    }
    follower {
        id
        firstName
        lastName
        profileImageUrl
      }
      following {
        id
        firstName
        lastName
        profileImageUrl
      }
    tweets {
      id
      content
      author {
          id
          firstName
          lastName
          profileImageUrl
        }
    }
  }
}
`)

export const getCurrentUserById = graphql(`#graphql
  query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    firstName
    lastName
    profileImageUrl
    follower {
        firstName
        lastName
        profileImageUrl
      }
      following {
        firstName
        lastName
        profileImageUrl
      }
    tweets {
      id
      content
      author {
          id
          firstName
          lastName
          profileImageUrl
        }
    }
  }
}
`)