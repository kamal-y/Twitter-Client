import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import React, { useCallback, useMemo } from "react";
import Button from "../Button";
import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps } from "next";
import { User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/apis";
import { userFollowMutation, userUnFollowMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UserProps {
  userInfo?: User
}

const EditOrFollowButton: React.FC<UserProps> = ({ userInfo }) => {

  const { user: currentUser } = useCurrentUser()
  const queryClient = useQueryClient()


  const isFollowing = useMemo(() => {
    if (!userInfo) return false;

    return (currentUser?.following?.findIndex((el) => el?.id === userInfo?.id) ?? -1) >= 0
  }, [userInfo, currentUser?.following])

  const handleFollowUser = useCallback(async () => {
    if (!userInfo?.id) {
      toast.error("Please register");
      return;
    }

    try {
      await graphqlClient.request(userFollowMutation, { to: userInfo.id });
      await queryClient.invalidateQueries(["current-user-details"]);
      toast.success("Successfully followed the user!");
    } catch (error) {
      toast.error("Failed to follow the user. Please try again.");
      console.error("Error following user:", error);
    }
  }, [userInfo?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!userInfo?.id) {
      toast.error("please register");
      return
    }
    try {
      await graphqlClient.request(userUnFollowMutation, { to: userInfo.id });
      await queryClient.invalidateQueries(["current-user-details"]);
      toast.success("Successfully followed the user!");
    } catch (error) {
      toast.error("Failed to follow the user. Please try again.");
      console.error("Error following user:", error);
    }
  }, [userInfo?.id, queryClient])



  return (
    <>
      {currentUser?.id === userInfo?.id ? (
        // <Button secondary label="Edit" onClick={editModal.onOpen} />
        null
      ) : (
        <>
          {isFollowing ? (
            <Button
              onClick={handleUnfollowUser}
              label={"Unfollow"}
              secondary={!isFollowing}
              outline={isFollowing}
            />
          ) : (
            <Button
              onClick={handleFollowUser}
              label={"Follow"}
              secondary={!isFollowing}
              outline={isFollowing}
            />
          )}
        </>
      )}
    </>
  );
}

const UserBio: React.FC<UserProps> = ({ userInfo }) => {

  const { user: currentUser } = useCurrentUser()

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        <EditOrFollowButton userInfo={userInfo} />
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
        </div>

        <div className="mt-4 flex flex-row items-center gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userInfo?.following?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userInfo?.follower?.length}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
