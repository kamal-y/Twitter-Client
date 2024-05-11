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