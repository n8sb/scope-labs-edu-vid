"use client"; // import Image from "next/image";

import { useEffect, useState } from "react";
import { getVideos } from "./services/videos";
import { VideoList } from "./components/VideoList";
import { VideoDBType } from "./types";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDBType | null>(null);

  useEffect(() => {
    getVideos("1").then((videos) => {
      // Update the state with the fetched videos
      setVideos(videos);
      console.log(videos);
    });
  }, []);

  return (
    <div className='grid grid-cols-6 grid-rows-8 gap-4 items-center justify-items-center min-h-screen'>
      <div className='col-span-6 border-solid border-2 border-white w-100 h-100'>
        Header
      </div>
      <div className='row-span-6 col-start-6 row-start-2 border-solid border-2 border-white w-100 h-100'>
        <VideoList
          videos={videos}
          setSelectedVideo={setSelectedVideo}
          selectedVideo={selectedVideo}
        />
      </div>
      <div className='col-span-5 row-span-4 col-start-1 row-start-2 border-solid border-2 border-white w-100 h-100'>
        Selected Video
      </div>
      <div className='col-span-5 row-span-2 row-start-6 border-solid border-2 border-white w-100 h-100'>
        Comments
      </div>
      <div className='col-span-6 row-start-8 border-solid border-2 border-white w-100 h-100'>
        Footer
      </div>
    </div>
  );
}
