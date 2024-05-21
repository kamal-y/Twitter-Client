/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation CreateTweet($payload: createTweetData!) {\n        createTweet(payload: $payload) {\n            id\n         }\n}\n": types.CreateTweetDocument,
    "#graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n": types.FollowUserDocument,
    "#graphql\n    mutation UnFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n": types.UnFollowUserDocument,
    "#graphql\n    mutation DeleteTweetById($id: String) {\n        deleteTweetById(id: $id)\n    }\n": types.DeleteTweetByIdDocument,
    "#graphql\n    query GetAllTweets {\n        getAllTweets {\n        imageURL\n        content\n        id\n        author {\n            id\n            profileImageUrl\n            firstName\n            lastName\n        }\n  }\n    }\n    ": types.GetAllTweetsDocument,
    "#graphql\n    query GetSignedUrl($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n        }\n    ": types.GetSignedUrlDocument,
    "#graphql\n\nquery verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token) \n}       \n": types.VerifyUserGoogleTokenDocument,
    "#graphql\n    query GetCurrentUserDetails {\n    getCurrentUserDetails {\n    email\n    firstName\n    id\n    lastName\n    profileImageUrl\n    recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n    }\n    follower {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n": types.GetCurrentUserDetailsDocument,
    "#graphql\n  query GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profileImageUrl\n    follower {\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      imageURL\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreateTweet($payload: createTweetData!) {\n        createTweet(payload: $payload) {\n            id\n         }\n}\n"): (typeof documents)["#graphql\n    mutation CreateTweet($payload: createTweetData!) {\n        createTweet(payload: $payload) {\n            id\n         }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"): (typeof documents)["#graphql\n    mutation FollowUser($to: ID!) {\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation UnFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n"): (typeof documents)["#graphql\n    mutation UnFollowUser($to: ID!) {\n        unFollowUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation DeleteTweetById($id: String) {\n        deleteTweetById(id: $id)\n    }\n"): (typeof documents)["#graphql\n    mutation DeleteTweetById($id: String) {\n        deleteTweetById(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllTweets {\n        getAllTweets {\n        imageURL\n        content\n        id\n        author {\n            id\n            profileImageUrl\n            firstName\n            lastName\n        }\n  }\n    }\n    "): (typeof documents)["#graphql\n    query GetAllTweets {\n        getAllTweets {\n        imageURL\n        content\n        id\n        author {\n            id\n            profileImageUrl\n            firstName\n            lastName\n        }\n  }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetSignedUrl($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n        }\n    "): (typeof documents)["#graphql\n    query GetSignedUrl($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\nquery verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token) \n}       \n"): (typeof documents)["#graphql\n\nquery verifyUserGoogleToken($token: String!) {\n    verifyGoogleToken(token: $token) \n}       \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetCurrentUserDetails {\n    getCurrentUserDetails {\n    email\n    firstName\n    id\n    lastName\n    profileImageUrl\n    recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n    }\n    follower {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n"): (typeof documents)["#graphql\n    query GetCurrentUserDetails {\n    getCurrentUserDetails {\n    email\n    firstName\n    id\n    lastName\n    profileImageUrl\n    recommendedUsers {\n        id\n        firstName\n        lastName\n        profileImageUrl\n    }\n    follower {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profileImageUrl\n    follower {\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      imageURL\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n"): (typeof documents)["#graphql\n  query GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    profileImageUrl\n    follower {\n        firstName\n        lastName\n        profileImageUrl\n      }\n      following {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    tweets {\n      id\n      content\n      imageURL\n      author {\n          id\n          firstName\n          lastName\n          profileImageUrl\n        }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;