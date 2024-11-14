import { USER_ID } from "../constants";
import { VideoDbType, VideoDomainType, VideoInputType } from "../types";

const baseUrl =
  "https://take-home-assessment-423502.uc.r.appspot.com/api/videos";

export async function getVideos() {
  const data = await fetch(baseUrl + `?user_id=${USER_ID}`);
  const videos = await data.json();

  const domainVideos: VideoDomainType[] = videos.videos.map(
    (video: VideoDbType) => ({
      video_url: video.video_url,
      title: video.title,
      description: video.description,
      id: video.id,
    })
  );
  return domainVideos;
}

export const postVideo = async (videoInput: VideoInputType) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...videoInput, user_id: USER_ID }),
  });

  if (!response.ok) {
    throw new Error("Failed to post video");
  }

  return response.json();
};
