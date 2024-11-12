import { VideoInputType } from "../types";

const baseUrl =
  "https://take-home-assessment-423502.uc.r.appspot.com/api/videos";

export async function getVideos(userId: string) {
  const data = await fetch(baseUrl + `?user_id=${userId}`);
  const videos = await data.json();

  return videos.videos;
}

export const postVideo = async (videoObject: VideoInputType) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoObject),
  });

  if (!response.ok) {
    throw new Error("Failed to post video");
  }

  return response.json();
};

export const getSingleVideo = async (videoId: string) => {
  const data = await fetch(baseUrl + `/single?video_id=${videoId}`);
  const video = await data.json();

  return video;
};
