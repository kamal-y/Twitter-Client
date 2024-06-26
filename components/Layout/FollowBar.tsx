import React from 'react'
import { useCurrentUser } from '@/hooks/user';
import Avatar from '../Avatar';


const FollowBar = () => {
    const { user } = useCurrentUser();





    return (
        <div>
                < div className="hidden px-6 py-4 lg:block" >
                    <div className="rounded-xl bg-neutral-800 p-4">
                        <h2 className="text-xl font-semibold text-white">Whom to Follow?</h2>
                        <div className="mt-4 flex flex-col gap-6">
                            {user?.recommendedUsers?.map((user) => (
                                <>
                                    {
                                        user?.id && user.profileImageUrl &&
                                        <div key={user?.id} className="flex flex-row gap-4">
                                            <Avatar userId={user?.id} imageURL={user?.profileImageUrl} />
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-white">{user?.firstName} {user.lastName}</p>
                                                <p className="text-sm text-neutral-400">@</p>
                                            </div>
                                        </div>
                                    }</>
                            ))}
                        </div>
                    </div>
                </div >
        </div>
    )

}
export default FollowBar

