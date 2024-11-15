import { VideoDomainType } from "@/app/types";
import Image from "next/image";

export const VideoListItem = ({
  video,
  selectedVideo,
  setSelectedVideo,
}: {
  video: VideoDomainType;
  selectedVideo: VideoDomainType | null;
  setSelectedVideo: (video: VideoDomainType) => void;
}) => {
  const getVideoThumbnail = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  return (
    <div className='flex flex-col items-center'>
      <div onClick={() => setSelectedVideo(video)}>
        <Image
          priority={true}
          src={getVideoThumbnail(video.video_url)}
          alt={video.title}
          width='300'
          height='200'
          className={`object-cover cursor-pointer h-32 ${
            video.id === selectedVideo?.id
              ? "border-solid border-2 border-blue-600"
              : ""
          }`}
        />
      </div>
      <div className='p-2'>
        <h3 className='font-semibold text-wrap'>{video.title}</h3>
      </div>
    </div>
  );
};
