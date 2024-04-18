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
  }
}
`)