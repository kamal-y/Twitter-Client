import Avatar from "../Avatar";
import Image from "next/image";
import React from "react";

interface UserHeroProps {
  userId: string;
  imageURL? : string
}

const UserHero: React.FC<UserHeroProps> = ({ userId , imageURL}) => {

  return (
    <div>
      <div className="relative h-44 bg-neutral-700">
        {(
          <Image
            fill
            priority
            alt={"Cover Image"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVJ3FTrhBszEdjfEmXtB4gPCzjV0DTBSP8UViYwfnsQ&s"
            style={{
              objectFit: "cover"
            }}
          />
        )}
        <div
          className="
                absolute
                -bottom-12
                left-4
            "
        >
          {
            imageURL &&
            <Avatar userId={userId} isLarge hasBorder imageURL= {imageURL}/>
          }
        </div>
      </div>
    </div>
  );
};

export default UserHero;
