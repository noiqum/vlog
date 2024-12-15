import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Video } from '../types/video';
import uuid from 'react-native-uuid';

interface VideoState {
  videos: Video[];
  addVideo: (videoData: Omit<Video, 'id' | 'createdAt'>) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
}

const useVideoStore = create<VideoState>()(
  persist(
    (set) => ({
      videos: [],
      
      addVideo: (videoData) => set((state) => ({
        videos: [
          ...state.videos, 
          {
            ...videoData,
            id: uuid.v4().toString(),
            createdAt: Date.now()
          }
        ]
      })),
      
      updateVideo: (id, updates) => set((state) => ({
        videos: state.videos.map(video => 
          video.id === id 
            ? { ...video, ...updates } 
            : video
        )
      })),
      
      deleteVideo: (id) => set((state) => ({
        videos: state.videos.filter(video => video.id !== id)
      }))
    }),
    {
      name: 'video-diary-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useVideoStore;