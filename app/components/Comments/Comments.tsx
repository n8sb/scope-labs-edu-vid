import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { getComments, postComment } from "@/app/services/comments";
import {
  VideoDomainType,
  CommentDomainType,
  CommentInputType,
} from "@/app/types";
import { SingleComment } from "./SingleComment";

export const Comments = ({
  selectedVideo,
  successAlert,
  errorAlert,
}: {
  selectedVideo: VideoDomainType | null;
  successAlert: (message: string) => void;
  errorAlert: (message: string) => void;
}) => {
  const [comments, setComments] = useState<CommentDomainType[]>([]);
  const [commentInput, setCommentInput] = useState("");

  // fetch comments when selected video changes
  useEffect(() => {
    if (!selectedVideo) return;
    getComments(selectedVideo?.id).then((comments) => {
      setComments(comments);
    });
  }, [selectedVideo]);

  const getUserId = () => {
    // mock user ID generation
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return `${firstName}_${lastName}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const addComment = async () => {
    if (!selectedVideo) return;

    const newComment: CommentInputType = {
      content: commentInput,
      video_id: selectedVideo.id,
      user_id: getUserId(),
    };

    try {
      const result = await postComment(newComment);
      const newDate = new Date();
      if (result.success) {
        setComments([
          { ...newComment, created_at: newDate.toString() },
          ...comments,
        ]);
        successAlert("Comment added");
        setCommentInput("");
      } else {
        const errorMessage = result.error;
        console.error("Failed to post comment:", errorMessage);
        errorAlert(`Failed to post comment: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error;
      console.error("Failed to post comment:", errorMessage);
      errorAlert(`Failed to post comment: ${errorMessage}`);
    }
  };

  return (
    <div>
      <div className='flex flex-col border-b-2 border-gray-600 py-4'>
        <h3 className='font-semibold'>Add a Comment</h3>
        <textarea
          value={commentInput}
          className='border-2 border-gray-600 p-2 w-full bg-black font-white my-3'
          onChange={handleInputChange}
        />
        <div className='flex justify-end'>
          <button
            className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'
            onClick={addComment}>
            Add Comment
          </button>
        </div>
      </div>
      {comments.length === 0 && <div>No comments yet.</div>}
      {comments.map((comment, index) => (
        <SingleComment
          comment={comment}
          key={index}
        />
      ))}
    </div>
  );
};
