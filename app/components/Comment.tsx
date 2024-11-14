"use client";

import React, { useMemo } from "react";
import { CommentDomainType } from "../types";
import Image from "next/image";
import { formatDate } from "../utils";

export const Comment = ({ comment }: { comment: CommentDomainType }) => {
  const { content, user_id, created_at } = comment;

  const getAvatars = () => {
    return `https://avatar.iran.liara.run/public/${
      Math.floor(Math.random() * 100) + 1
    }`;
  };

  // prevent avatars from re-rendering when the comment input changes
  const avatar = useMemo(() => getAvatars(), []);

  return (
    <div className='flex gap-2 items-center border-b-2 border-gray-600 py-2'>
      <div className='flex flex-col gap-1 items-center'>
        <Image
          src={avatar}
          alt='avatar'
          width={30}
          height={30}
        />
      </div>
      <div>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <div className='font-semibold'>{user_id}</div>
            <div>{formatDate(created_at)}</div>
          </div>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};
