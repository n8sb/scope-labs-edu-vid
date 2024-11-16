"use client";

import { USER_ID } from "@/app/constants";
import { postVideo } from "@/app/services/videos";
import { VideoDomainType, VideoInputType } from "@/app/types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export const AddVideoModal = ({
  isModalOpen,
  setIsModalOpen,
  successAlert,
  errorAlert,
  setSelectedVideo,
  getVideos,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  successAlert: (message: string) => void;
  errorAlert: (message: string) => void;
  setSelectedVideo: (video: VideoDomainType) => void;
  getVideos: () => void;
}) => {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateYouTubeUrl = (videoUrl: string): boolean => {
    const regExp =
      /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/;
    const match = videoUrl.match(regExp);
    if (match) {
      return true;
    }

    return false;
  };

  const addVideo = async () => {
    setErrorMessage("");
    //basic validation
    if (!titleInput || !descriptionInput || !videoUrlInput) {
      setErrorMessage("All fields are required.");
      return;
    }

    const isUrlValid = validateYouTubeUrl(videoUrlInput);
    //only allowing youtube URLs for now since we can grab a thumbnail from the video URL
    if (isUrlValid === false) {
      setErrorMessage(
        "Please enter a valid YouTube URL in the format 'https://www.youtube.com/watch?v=...'."
      );
      return;
    }

    const newVideo: VideoInputType = {
      title: titleInput,
      description: descriptionInput,
      video_url: videoUrlInput.trim(),
    };

    try {
      await postVideo(newVideo);

      setIsModalOpen(false);
      setTitleInput("");
      setDescriptionInput("");
      setVideoUrlInput("");

      // update the list of videos and select the new video
      getVideos();
      setSelectedVideo({ ...newVideo, id: USER_ID });

      successAlert("Video added successfully!");
    } catch (error) {
      const errorMessage = error;
      console.error(errorMessage);
      errorAlert(`${errorMessage}`);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTitleInput("");
    setDescriptionInput("");
    setVideoUrlInput("");
    setErrorMessage("");
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
            <div className='bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='sm:mx-4 sm:text-left w-full'>
                  <DialogTitle
                    as='h3'
                    className='font-semibold text-white text-lg'>
                    Add Video
                  </DialogTitle>
                  <div className='flex flex-col mt-2 w-100'>
                    <label className='mt-3 mb-1 text-md font-semibold text-white'>
                      Video URL
                    </label>
                    <input
                      value={videoUrlInput}
                      className='px-1 rounded-sm text-white bg-gray-800 border border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600'
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                    />
                    <label className=' mt-3 mb-1 text-md font-semibold text-white'>
                      Title
                    </label>
                    <input
                      value={titleInput}
                      className='px-1 rounded-sm text-white bg-gray-800 border border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600'
                      onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <label className='mt-3 mb-1 text-md font-semibold text-white '>
                      Description
                    </label>
                    <textarea
                      value={descriptionInput}
                      className='px-1 rounded-sm text-white bg-gray-800 border border-gray-300 focus:ring-1 focus:ring-blue-600 focus:border-blue-600'
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mx-4 mb-6 mt-2 flex flex-col sm:px-6 gap-2 justify-between items-end'>
              <div>
                <button
                  type='button'
                  data-autofocus
                  onClick={handleClose}
                  className='mr-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={addVideo}
                  className='inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto'>
                  Add Video
                </button>
              </div>
              <div className='flex w-full text-red-600 text-xs font-semibold'>
                {errorMessage}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
