import { VideoDomainType } from "../types";
import { VideoListItem } from "./VideoListItem";

export const VideoList = ({
  videos,
  setSelectedVideo,
  selectedVideo,
}: {
  videos: VideoDomainType[];
  setSelectedVideo: (video: VideoDomainType) => void;
  selectedVideo: VideoDomainType | null;
}) => {
  if (videos.length === 0) return <p>Loading...</p>;

  return (
    <div className='flex flex-col gap-4 sm:justify-start items-center sm:w-80 w-full'>
      <div className='w-full text-left'>
        <h3 className='font-semibold text-white text-left'>All Videos</h3>
      </div>
      {videos.map((video, index) => (
        <VideoListItem
          video={video}
          setSelectedVideo={setSelectedVideo}
          selectedVideo={selectedVideo}
          key={index}
        />
      ))}
    </div>
  );
};
