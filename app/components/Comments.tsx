import React, { useEffect, useState } from "react";
import { getComments, postComment } from "../services/comments";
import { CommentDomainType, CommentInputType, VideoDomainType } from "../types"; //+
import { Comment } from "./Comment";
import { faker } from "@faker-js/faker";
import { formatDate } from "../utils";

export const Comments = ({
  selectedVideo,
  successAlert,
}: {
  selectedVideo: VideoDomainType | null;
  successAlert: (message: string) => void;
}) => {
  const [comments, setComments] = useState<CommentDomainType[]>([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (!selectedVideo) return; // Exit if no video is selected
    getComments(selectedVideo?.id).then((comments) => {
      // Update the state with the fetched comments
      setComments(comments);
    });
  }, [selectedVideo]);

  const getUserId = () => {
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
      user_id: getUserId(), // Populated with mock data for now
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
        console.error("Failed to post comment:", result.error);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
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
        <Comment
          comment={comment}
          key={index}
        />
      ))}
    </div>
  );
};
