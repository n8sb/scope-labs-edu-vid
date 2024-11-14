"use client"; // import Image from "next/image";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddVideoModal } from "./components/AddVideoModal";
import { Comments } from "./components/Comments";
import { VideoList } from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";
import { getVideos } from "./services/videos";
import { VideoDomainType } from "./types";

export default function Home() {
  const [videosList, setVideosList] = useState<VideoDomainType[] | []>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDomainType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllVideos = () => {
    getVideos().then((videos) => {
      // Update the state with the fetched videos
      setVideosList(videos);
      setSelectedVideo(videos[0]); // Set the first video as the selected video by default
    });
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const successAlert = (message: string) => toast(message);

  return (
    <div className='flex flex-col items-center justify-between min-h-screen'>
      <div className='rounded-md bg-blue-600 bg-opacity-25 w-full h-50 p-3'>
        <div className='flex justify-between items-center'>
          <div>EduVids</div>
          <button
            className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white'
            onClick={() => setIsModalOpen(true)}>
            + Add Video
          </button>
        </div>
      </div>
      <div className='flex sm:flex-row flex-col justify-around w-full mt-5 gap-5'>
        <div className='flex flex-col gap-4 w-full'>
          <VideoPlayer selectedVideo={selectedVideo} />
          <Comments
            selectedVideo={selectedVideo}
            successAlert={successAlert}
          />
        </div>
        <VideoList
          videos={videosList}
          setSelectedVideo={setSelectedVideo}
          selectedVideo={selectedVideo}
        />
      </div>
      <AddVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        successAlert={successAlert}
        setSelectedVideo={setSelectedVideo}
        getVideos={getAllVideos}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
