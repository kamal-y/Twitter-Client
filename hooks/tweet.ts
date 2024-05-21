import { graphqlClient } from "@/clients/apis"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { userDeleteTweetMutation } from "@/graphql/mutation/user"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutation, { payload }),
        onMutate: () => toast.loading("Creating tweet...", { id: "create-tweet" }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["all-tweets"])
            toast.success("Tweet created successfully", { id: "create-tweet" })
        }
    })

    return mutation
}

export const useDeleteTweet = () => {
    const queryClient = useQueryClient();

    const deleteTweetMutation = useMutation({
        mutationFn: (payload: string) => graphqlClient.request(userDeleteTweetMutation,{id:payload}),
        onMutate: () => toast.loading("Deleting tweet...", { id: "delete-tweet" }),
        onSuccess: async () => {
            await queryClient.invalidateQueries(["all-tweets"]);
            toast.success("Tweet deleted successfully", { id: "delete-tweet" });
        }
    });

    return deleteTweetMutation
};

export const useGetAllTweets = () => {

    const query = useQuery({
        queryKey: ["all-tweets"],
        queryFn: () => graphqlClient.request(getAllTweetsQuery)
    })

    return { ...query, tweets: query.data?.getAllTweets }

}  