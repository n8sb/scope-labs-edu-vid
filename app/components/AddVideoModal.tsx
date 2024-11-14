"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { USER_ID } from "../constants";
import { postVideo } from "../services/videos";
import { VideoDomainType, VideoInputType } from "../types";

export const AddVideoModal = ({
  isModalOpen,
  setIsModalOpen,
  successAlert,
  setSelectedVideo,
  getVideos,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  successAlert: (message: string) => void;
  setSelectedVideo: (video: VideoDomainType) => void;
  getVideos: () => void;
}) => {
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addVideo = async () => {
    if (!titleInput || !descriptionInput || !videoUrlInput) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!videoUrlInput.includes("youtube.com")) {
      setErrorMessage("Please enter a valid YouTube URL.");
      return;
    }

    const newVideo: VideoInputType = {
      title: titleInput,
      description: descriptionInput,
      video_url: videoUrlInput.trim(),
    };

    try {
      const result = await postVideo(newVideo);
      if (result.success) {
        setIsModalOpen(false);
        setTitleInput("");
        setDescriptionInput("");
        setVideoUrlInput("");
        getVideos();
        setSelectedVideo({ ...newVideo, id: USER_ID });
        successAlert("Video added successfully!");
      } else {
        console.error("Error adding video:", result.error);
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
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
                    className='text-base font-semibold text-white'>
                    Add Video
                  </DialogTitle>
                  <div className='flex flex-col mt-2 w-100'>
                    <label className='mt-3 mb-1 text-sm text-white'>
                      Video URL
                    </label>
                    <input
                      value={videoUrlInput}
                      className='px-1 rounded-sm text-black'
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                    />
                    <label className=' mt-3 mb-1 text-sm text-white'>
                      Title
                    </label>
                    <input
                      value={titleInput}
                      className='px-1 rounded-sm text-black'
                      onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <label className='mt-3 mb-1 text-sm text-white '>
                      Description
                    </label>
                    <textarea
                      value={descriptionInput}
                      className='px-1 rounded-sm text-black'
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-black mx-4 mb-6 mt-2 flex sm:px-6 gap-2 justify-between items-center'>
              <div className='text-red-600 text-xs'>{errorMessage}</div>
              <div>
                <button
                  type='button'
                  data-autofocus
                  onClick={() => setIsModalOpen(false)}
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
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
