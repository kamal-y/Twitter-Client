import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient("http://localhost:8000/graphql",
    {
        headers:()=>{
            const token = isClient ? localStorage.getItem('__twitter_token') : null
            return {
                Authorization: isClient ? `Bearer ${token}` : ''
            }
        }
    }
);
