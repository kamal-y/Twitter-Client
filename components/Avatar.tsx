import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  imageURL: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, imageURL,  isLarge, hasBorder  }) => {
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
          ${hasBorder ? "border-4 border-black" : ""}
          ${isLarge ? "h-32" : "h-12"}
          ${isLarge ? "w-32" : "w-12"}
            relative
            cursor-pointer
            rounded-full
            transition
            hover:opacity-90
        `}
    >
      <Image
        fill
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        style={{
          objectFit: "cover",
          borderRadius: "100%"
        }}
        alt="Avatar"
        onClick={onClick}
        src={imageURL || `/images/placeholder.png`}
      />
    </div>
  );
};

export default Avatar;
