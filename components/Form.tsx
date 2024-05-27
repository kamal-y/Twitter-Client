import { useCurrentUser } from "@/hooks/user";
import React, { useCallback } from "react";
import { graphqlClient } from '@/clients/apis';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import FormAfterLogin from "./FormAfterLogin";


const Form: React.FC= () => {

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();


  
  const handleLoginWithGoogle = useCallback(async (res: CredentialResponse) => {
    const googleToken = res.credential;

    if (!googleToken) return toast.error('Failed to login with google');

    const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
    );
    toast.success('Successfully logged in with google');

    if (verifyGoogleToken) window.localStorage.setItem("__twitter_token", verifyGoogleToken);

    await queryClient.invalidateQueries(["current-user-details"]);
}, [queryClient]);

  return (
    <div className="border-b-[1px] border-neutral-500 px-5 py-2">
      {user ? (
        <FormAfterLogin />
      ) : (
        <div className="py-8">
          <h1
            className="
                mb-4
                text-center
                text-2xl
                font-bold
                text-white
            "
          >
            {"Welcome to Twitter!"}
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">

            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;