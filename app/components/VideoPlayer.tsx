import ReactPlayer from "react-player";
import { VideoDomainType } from "../types";

const VideoPlayer = ({
  selectedVideo,
}: {
  selectedVideo: VideoDomainType | null;
}) => {
  if (!selectedVideo) return "Choose a video to see it here. :)";
  const { title, description, video_url } = selectedVideo;

  return (
    <div className='flex flex-col gap-2'>
      <ReactPlayer
        url={video_url}
        controls
        width='100%'
        height='600px'
      />
      {(title || description) && (
        <div className='border-2 border-solid border-gray-600 p-3'>
          {title && <h3 className='font-semibold'>{title}</h3>}
          {description && <div>{description}</div>}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
