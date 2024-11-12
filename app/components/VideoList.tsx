import React from "react";
import { VideoDBType } from "../types";
import Image from "next/image";

export const VideoList = ({
  videos,
  setSelectedVideo,
  selectedVideo,
}: {
  videos: VideoDBType[];
  setSelectedVideo: (video: VideoDBType) => void;
  selectedVideo: VideoDBType | null;
}) => {
  if (videos.length === 0) return <p>Loading...</p>;

  console.log(videos);

  const getVideoThumbnail = (videoUrl: string) => {
    if (!videoUrl.includes("youtube.com")) return "";
    const videoId = videoUrl.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/0`;
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      {videos.map((video) => (
        <div
          key={video.id}
          className={`border-solid border-2 border-white w-full h-24 cursor-pointer ${
            video.video_url === selectedVideo?.video_url
              ? "bg-blue-500 text-white"
              : ""
          }`}
          onClick={() => setSelectedVideo(video)}>
          <Image
            src={getVideoThumbnail(video.video_url)}
            alt={video.title}
            className='w-full h-full object-cover'
          />
          <div className='p-4'>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
