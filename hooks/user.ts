import { graphqlClient } from "@/clients/apis"
import { getCurrentUserDetailsQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user-details"],
        queryFn: () => graphqlClient.request(getCurrentUserDetailsQuery)
    })

    return {...query , user : query.data?.getCurrentUserDetails}
}