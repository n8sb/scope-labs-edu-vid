import { USER_ID } from "../constants";
import { CommentInputType } from "../types";

const baseUrl =
  "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments";

export async function getComments(videoId: string) {
  const data = await fetch(baseUrl + `?video_id=${videoId}`);
  const comments = await data.json();

  return comments.comments;
}

export const postComment = async (commentInput: CommentInputType) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...commentInput,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }

  return response.json();
};
