"use client"; // import Image from "next/image";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Comments } from "./components/Comments";
import { VideoList } from "./components/VideoList";
import { getVideos } from "./services/videos";
import { VideoDomainType } from "./types";
import { VideoPlayer } from "./components/VideoPlayer";
import { AddVideoModal } from "./components/AddVideoModal";
import Image from "next/image";

export default function Home() {
  const [videosList, setVideosList] = useState<VideoDomainType[] | []>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDomainType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllVideos = () => {
    getVideos().then((videos) => {
      // Update the state with the fetched videos
      console.log(videos);
      setVideosList(videos);
      setSelectedVideo(videos[0]); // Set the first video as the selected video by default
    });
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const successAlert = (message: string) => toast(message);
  const errorAlert = (message: string) => toast.error(message);

  return (
    <div className='flex flex-col items-center min-h-screen gap-8'>
      <div className='rounded-md bg-blue-600 bg-opacity-25 w-full h-50 p-3'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <Image
              src='video-clip.svg'
              alt='Video Clip'
              width={50}
              height={50}
            />
            <div className='font-semibold text-xl'>EduVids</div>
          </div>
          <button
            className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white'
            onClick={() => setIsModalOpen(true)}>
            + Add Video
          </button>
        </div>
      </div>
      <BarLoader
        color='#337AB7'
        loading={!selectedVideo}
        width='100px'
        height='10px'
      />
      {selectedVideo && (
        <div className='flex sm:flex-row flex-col justify-around w-full gap-5'>
          <div className='flex flex-col gap-4 w-full'>
            <VideoPlayer selectedVideo={selectedVideo} />
            <Comments
              selectedVideo={selectedVideo}
              successAlert={successAlert}
              errorAlert={errorAlert}
            />
          </div>
          <VideoList
            videos={videosList}
            setSelectedVideo={setSelectedVideo}
            selectedVideo={selectedVideo}
          />
        </div>
      )}
      <AddVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        successAlert={successAlert}
        errorAlert={errorAlert}
        setSelectedVideo={setSelectedVideo}
        getVideos={getAllVideos}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
